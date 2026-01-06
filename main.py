from __future__ import annotations

import hashlib
import io
import json
import math
import os
import uuid
from datetime import datetime
from functools import wraps
from typing import TypedDict, cast
from urllib.error import HTTPError, URLError
from urllib.request import Request as UrlRequest
from urllib.request import urlopen

import pandas as pd
import sentry_sdk
from fastapi import Depends, FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fpdf import FPDF  # type: ignore[import-untyped]
from pydantic import BaseModel, Field
from pydantic.config import ConfigDict
from sentry_sdk.integrations.fastapi import FastApiIntegration
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from starlette.requests import Request

from carboncam_engine.machining import calculate_machining_carbon, estimate_energy_cost

try:
    from carboncam_engine.email_service import (
        send_quota_alert_email,
        send_report_ready_email,
        send_welcome_email,
        should_send_quota_alert,
    )
except Exception:
    send_quota_alert_email = None  # type: ignore[assignment]
    send_report_ready_email = None  # type: ignore[assignment]
    send_welcome_email = None  # type: ignore[assignment]
    should_send_quota_alert = None  # type: ignore[assignment]

import logging
from logging.handlers import RotatingFileHandler


# Configure logging
def setup_logging():
    """Configure application-wide logging"""
    log_level = os.getenv("LOG_LEVEL", "INFO").upper()
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(log_level)
    console_handler.setFormatter(logging.Formatter(log_format))
    
    # File handler (optional, for local development)
    if os.getenv("LOG_TO_FILE", "false").lower() == "true":
        os.makedirs("logs", exist_ok=True)
        file_handler = RotatingFileHandler(
            "logs/carboncam.log",
            maxBytes=10485760,  # 10MB
            backupCount=5
        )
        file_handler.setLevel(log_level)
        file_handler.setFormatter(logging.Formatter(log_format))
        logging.root.addHandler(file_handler)
    
    logging.root.addHandler(console_handler)
    logging.root.setLevel(log_level)
    
    # Reduce noise from third-party libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("httpx").setLevel(logging.WARNING)

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title="CarbonCAM Developer API",
    version="1.0.0",
    description="Carbon footprint tracking for manufacturing processes"
)


_sentry_dsn = os.getenv("SENTRY_DSN")
logger.info(f"Starting CarbonCAM API - Sentry: {'Enabled' if _sentry_dsn else 'Disabled'}")
if _sentry_dsn:
    sentry_sdk.init(
        dsn=_sentry_dsn,
        integrations=[FastApiIntegration()],
        environment=os.getenv("SENTRY_ENVIRONMENT", os.getenv("ENVIRONMENT", "development")),
        release=os.getenv("SENTRY_RELEASE"),
        traces_sample_rate=float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0")),
        send_default_pii=False,
    )


@app.middleware("http")
async def sentry_error_middleware(request: Request, call_next):
    user_id = getattr(request.state, "user_id", None) or request.headers.get("X-Carboncam-User-Id")

    with sentry_sdk.configure_scope() as scope:
        if user_id:
            scope.set_user({"id": str(user_id)})
        scope.set_tag("http.method", request.method)
        scope.set_tag("http.path", request.url.path)

    try:
        response = await call_next(request)
        if response.status_code >= 500:
            sentry_sdk.capture_message(
                f"HTTP {response.status_code} at {request.method} {request.url.path}",
                level="error",
            )
        return response
    except Exception as exc:
        sentry_sdk.capture_exception(exc)
        raise


def _extract_api_key_from_headers(headers: dict[str, str] | None) -> str | None:
    if not headers:
        return None
    raw = headers.get("x-api-key") or headers.get("X-API-Key")
    if raw and raw.strip():
        return raw.strip()

    auth = headers.get("authorization") or headers.get("Authorization")
    if not auth:
        return None
    auth = auth.strip()
    if auth.lower().startswith("bearer "):
        token = auth[7:].strip()
        return token or None
    return None


def _rate_limit_key_func(request: Request) -> str:
    token = _extract_api_key_from_headers(dict(request.headers))
    if token:
        # Don't use raw secret as identifier.
        return hashlib.sha256(token.encode("utf-8")).hexdigest()
    return get_remote_address(request)


_rate_limit_storage_uri = os.getenv("RATE_LIMIT_REDIS_URL")
limiter = Limiter(
    key_func=_rate_limit_key_func,
    storage_uri=_rate_limit_storage_uri if _rate_limit_storage_uri else None,
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)


def _parse_cors_origins(value: str | None) -> list[str]:
    if not value:
        return ["http://localhost:3000"]
    if value.strip() == "*":
        return ["*"]
    return [origin.strip() for origin in value.split(",") if origin.strip()]


_cors_origins = _parse_cors_origins(os.getenv("CORS_ALLOW_ORIGINS"))
_allow_all = "*" in _cors_origins

logger.info(f"CORS configured - Origins: {', '.join(_cors_origins)}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    # allow_credentials=True iken allow_origins='*' OLAMAZ. Bu yüzden '*' varsa credentials kapatılır.
    allow_credentials=(not _allow_all),
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def _consume_monthly_credit_or_raise(*, user_id: str) -> int:
    """Consumes one monthly credit for the user and returns remaining credits.

    Uses Supabase RPC (service role). If Supabase env is missing, behaves as unlimited (dev).
    """

    supabase_url = os.getenv("SUPABASE_URL")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
        return 999  # dev fallback

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/rpc/consume_monthly_credit"
    payload = json.dumps({"p_user_id": user_id}).encode("utf-8")
    req = UrlRequest(
        endpoint,
        data=payload,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
        },
    )

    try:
        with urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
    except HTTPError as e:
        try:
            detail = e.read().decode("utf-8")
        except Exception:
            detail = str(e)
        raise HTTPException(status_code=500, detail=f"Credits service error: {detail}")
    except URLError as e:
        raise HTTPException(status_code=500, detail=f"Credits service unreachable: {e}")

    try:
        remaining = int(json.loads(body))
    except Exception:
        raise HTTPException(status_code=500, detail="Credits service returned invalid response")

    if remaining < 0:
        raise HTTPException(status_code=402, detail="Payment Required: monthly free credits exhausted")

    return remaining


def _parse_time_to_minutes(value: str) -> int:
    """Parses Postgres time (HH:MM[:SS]) into minutes since midnight."""

    value = value.strip()
    parts = value.split(":")
    if len(parts) < 2:
        raise ValueError("invalid time")
    hour = int(parts[0])
    minute = int(parts[1])
    if hour < 0 or hour > 23:
        raise ValueError("invalid hour")
    if minute < 0 or minute > 59:
        raise ValueError("invalid minute")
    return hour * 60 + minute


class ElectricityRateRow(TypedDict, total=False):
    region: str
    currency: str
    tariff_type: str
    single_rate_per_kwh: float | str
    day_rate_per_kwh: float | str
    peak_rate_per_kwh: float | str
    night_rate_per_kwh: float | str
    day_start: str
    peak_start: str
    night_start: str


def _maybe_parse_float(value: object) -> float | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        try:
            return float(value.strip())
        except Exception:
            return None
    return None


def _maybe_time_to_minutes(value: object) -> int | None:
    if isinstance(value, str):
        try:
            return _parse_time_to_minutes(value)
        except Exception:
            return None
    return None


def _fetch_electricity_rates_or_none(
    *,
    region: str,
    currency: str,
    tariff_type: str,
) -> ElectricityRateRow | None:
    """Fetches a single matching electricity_rates row from Supabase.

    Returns None if Supabase env is not configured or no row is found.
    """

    supabase_url = os.getenv("SUPABASE_URL")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
        return None

    query = (
        "electricity_rates"
        "?select=region,currency,tariff_type,single_rate_per_kwh,day_rate_per_kwh,peak_rate_per_kwh,night_rate_per_kwh,day_start,peak_start,night_start"
        f"&region=eq.{region}"
        f"&currency=eq.{currency}"
        f"&tariff_type=eq.{tariff_type}"
        "&limit=1"
    )
    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/{query}"
    req = UrlRequest(
        endpoint,
        method="GET",
        headers={
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
        },
    )

    try:
        with urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
    except Exception:
        return None

    try:
        rows_obj: object = json.loads(body)
        if not isinstance(rows_obj, list) or not rows_obj:
            return None
        rows_list = cast(list[object], rows_obj)
        row_obj = rows_list[0]
        if not isinstance(row_obj, dict):
            return None
        return cast(ElectricityRateRow, row_obj)
    except Exception:
        return None


class ApiKeyRow(TypedDict, total=False):
    user_id: str
    revoked_at: str | None


def _fetch_api_key_row_or_none(*, key_hash: str) -> ApiKeyRow | None:
    supabase_url = os.getenv("SUPABASE_URL")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
        return None

    query = (
        "api_keys"
        "?select=user_id,revoked_at"
        f"&key_hash=eq.{key_hash}"
        "&revoked_at=is.null"
        "&limit=1"
    )
    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/{query}"
    req = UrlRequest(
        endpoint,
        method="GET",
        headers={
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
        },
    )

    try:
        with urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
    except Exception:
        return None

    try:
        rows_obj: object = json.loads(body)
        if not isinstance(rows_obj, list) or not rows_obj:
            return None
        rows_list = cast(list[object], rows_obj)
        row_obj = rows_list[0]
        if not isinstance(row_obj, dict):
            return None
        return cast(ApiKeyRow, row_obj)
    except Exception:
        return None


def _mark_api_key_used(*, key_hash: str) -> None:
    supabase_url = os.getenv("SUPABASE_URL")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
        return

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/api_keys?key_hash=eq.{key_hash}"
    payload = json.dumps({"last_used_at": datetime.utcnow().isoformat()}).encode("utf-8")
    req = UrlRequest(
        endpoint,
        data=payload,
        method="PATCH",
        headers={
            "Content-Type": "application/json",
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
        },
    )

    try:
        with urlopen(req, timeout=10) as resp:
            resp.read()
    except Exception:
        # Best-effort; do not block API requests.
        return


def _emails_enabled() -> bool:
    return os.getenv("EMAIL_AUTOMATION_ENABLED", "").strip().lower() in {"1", "true", "yes", "on"}


def _get_client_ip(request: Request) -> str | None:
    # Vercel/Proxy ortamlarında gerçek client IP genelde X-Forwarded-For'da olur.
    xff = request.headers.get("x-forwarded-for")
    if xff:
        first = xff.split(",")[0].strip()
        return first or None
    if request.client:
        return request.client.host
    return None


def _insert_audit_log(
    *,
    user_id: str,
    action: str,
    resource_id: str | None,
    ip_address: str | None,
    company_id: str | None = None,
    actor_name: str | None = None,
    actor_email: str | None = None,
) -> None:
    supabase_url = os.getenv("SUPABASE_URL")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
        return

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/audit_logs"
    payload = {
        "company_id": company_id,
        "user_id": user_id,
        "actor_name": actor_name,
        "actor_email": actor_email,
        "action": action,
        "resource_id": resource_id,
        "ip_address": ip_address,
    }

    req = UrlRequest(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Content-Type": "application/json",
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
        },
    )

    try:
        with urlopen(req, timeout=10) as resp:
            resp.read()
    except Exception:
        return


def audit_log(*, action: str | None = None):
    """FastAPI route decorator: başarılı işlemden sonra audit log yazar.

    - user_id: X-Carboncam-User-Id (zorunlu)
    - action: parametre olarak verilebilir veya body/header'dan okunur
    - resource_id: body.resource_id veya X-Audit-Resource-Id
    - ip_address: X-Forwarded-For / request.client

    Not: Best-effort; audit yazılamazsa endpoint başarısız sayılmaz.
    """

    def decorator(fn):
        @wraps(fn)
        async def wrapper(*args, **kwargs):
            request: Request | None = kwargs.get("request")
            if request is None:
                for v in args:
                    if isinstance(v, Request):
                        request = v
                        break

            result = await fn(*args, **kwargs)

            try:
                if not request:
                    return result

                user_id = request.headers.get("X-Carboncam-User-Id")
                if not user_id:
                    return result

                resolved_action = action or request.headers.get("X-Audit-Action")
                resource_id = request.headers.get("X-Audit-Resource-Id")

                if not resolved_action or not resource_id:
                    # Body'den dene
                    try:
                        body_obj = await request.json()
                        if not resolved_action and isinstance(body_obj, dict):
                            resolved_action = str(body_obj.get("action") or "") or None
                        if not resource_id and isinstance(body_obj, dict):
                            rid = body_obj.get("resource_id")
                            resource_id = str(rid) if rid is not None else None
                    except Exception:
                        pass

                if not resolved_action:
                    return result

                ip_address = _get_client_ip(request)
                _insert_audit_log(
                    user_id=str(user_id),
                    action=str(resolved_action),
                    resource_id=str(resource_id) if resource_id else None,
                    ip_address=ip_address,
                )
            except Exception:
                return result

            return result

        return wrapper

    return decorator


class AuditLogRequest(BaseModel):
    action: str
    resource_id: str | None = None
    company_id: str | None = None
    actor_name: str | None = None
    actor_email: str | None = None


@app.post("/internal/audit/log")
async def internal_audit_log(
    request: Request,
    payload: AuditLogRequest,
    x_audit_secret: str | None = Header(default=None, alias="X-Audit-Secret"),
) -> dict[str, object]:
    expected = os.getenv("AUDIT_LOG_SECRET")
    if not expected:
        raise HTTPException(status_code=503, detail="Audit log secret not configured")
    if not x_audit_secret or x_audit_secret != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")
    # Best-effort insert: audit yazılamazsa request başarısız sayılmaz.
    try:
        user_id = request.headers.get("X-Carboncam-User-Id")
        if user_id:
            _insert_audit_log(
                user_id=str(user_id),
                action=str(payload.action),
                resource_id=str(payload.resource_id) if payload.resource_id else None,
                ip_address=_get_client_ip(request),
                company_id=str(payload.company_id) if payload.company_id else None,
                actor_name=str(payload.actor_name) if payload.actor_name else None,
                actor_email=str(payload.actor_email) if payload.actor_email else None,
            )
    except Exception:
        pass
    return {"ok": True}


class EmailContext(TypedDict, total=False):
    user_email: str
    user_name: str
    company_name: str


def _email_context_from_headers(
    *,
    user_email: str | None,
    user_name: str | None,
    company_name: str | None,
) -> EmailContext | None:
    if not user_email:
        return None
    ctx: EmailContext = {"user_email": user_email}
    if user_name:
        ctx["user_name"] = user_name
    if company_name:
        ctx["company_name"] = company_name
    return ctx


def _maybe_send_quota_alert_email(*, ctx: EmailContext | None, credits_left: int) -> None:
    if not ctx or not ctx.get("user_email"):
        return
    if not _emails_enabled() or send_quota_alert_email is None or should_send_quota_alert is None:
        return

    monthly_limit = int(os.getenv("MONTHLY_FREE_CREDITS", "3"))
    if monthly_limit <= 0:
        return

    # Dedup: sadece eşik ilk kez aşıldığında gönder.
    prev_credits = credits_left + 1
    try:
        if not should_send_quota_alert(credits_left=credits_left, monthly_limit=monthly_limit):
            return
        if should_send_quota_alert(credits_left=prev_credits, monthly_limit=monthly_limit):
            return

        base = os.getenv("WEB_BASE_URL", "").rstrip("/")
        upgrade_url = os.getenv("UPGRADE_URL") or (f"{base}/dashboard" if base else "")

        send_quota_alert_email(
            to_email=str(ctx["user_email"]),
            user_name=str(ctx.get("user_name") or ""),
            company_name=cast(str | None, ctx.get("company_name")),
            credits_left=int(credits_left),
            monthly_limit=monthly_limit,
            upgrade_url=upgrade_url,
        )
    except Exception:
        # Best-effort: email hatası hesaplamayı bloklamasın.
        return


def _maybe_send_report_ready_email(*, ctx: EmailContext | None, batch_id: str) -> None:
    if not ctx or not ctx.get("user_email"):
        return
    if not _emails_enabled() or send_report_ready_email is None:
        return

    try:
        base = os.getenv("WEB_BASE_URL", "").rstrip("/")
        download_url = os.getenv("BATCH_RESULTS_URL") or (f"{base}/dashboard" if base else "")

        send_report_ready_email(
            to_email=str(ctx["user_email"]),
            user_name=str(ctx.get("user_name") or ""),
            company_name=cast(str | None, ctx.get("company_name")),
            report_filename="Results.xlsx",
            download_url=download_url,
            batch_id=batch_id,
        )
    except Exception:
        return


class WelcomeEmailRequest(BaseModel):
    to_email: str
    user_name: str = ""
    company_name: str | None = None
    howto_url: str | None = None


@app.post("/internal/email/welcome")
def internal_send_welcome_email(
    payload: WelcomeEmailRequest,
    x_email_secret: str | None = Header(default=None, alias="X-Email-Secret"),
) -> dict[str, object]:
    expected = os.getenv("EMAIL_AUTOMATION_SECRET")
    if not expected:
        raise HTTPException(status_code=503, detail="Email automation secret not configured")
    if not x_email_secret or x_email_secret != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if not _emails_enabled() or send_welcome_email is None:
        raise HTTPException(status_code=503, detail="Email automation disabled")

    howto_url = payload.howto_url
    if not howto_url:
        base = os.getenv("WEB_BASE_URL", "").rstrip("/")
        howto_url = os.getenv("HOWTO_URL") or (f"{base}/dashboard" if base else "")

    try:
        message_id = send_welcome_email(
            to_email=payload.to_email,
            user_name=payload.user_name,
            company_name=payload.company_name,
            howto_url=howto_url,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email send failed: {e}")

    return {"id": message_id}


def require_api_key(request: Request) -> str:
    """Validates incoming API key and returns associated user_id."""

    token = _extract_api_key_from_headers(dict(request.headers))
    if not token:
        raise HTTPException(status_code=401, detail="Missing API key")

    if not (token.startswith("sk_live_") or token.startswith("sk_test_")):
        raise HTTPException(status_code=401, detail="Invalid API key format")

    key_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
    row = _fetch_api_key_row_or_none(key_hash=key_hash)
    if not row or not row.get("user_id"):
        raise HTTPException(status_code=401, detail="Invalid API key")

    user_id = str(row["user_id"])
    request.state.user_id = user_id
    _mark_api_key_used(key_hash=key_hash)
    return user_id


class Material(TypedDict):
    kc_value: float
    density: float


class Machine(TypedDict):
    model: str
    standby_power_kw: float
    carbon_intensity: float


# Şimdilik mock data (ileride Supabase/PostgreSQL'den çekilecek)
MATERIALS: dict[str, Material] = {
    "mat_4140": {
        "kc_value": 2400.0,
        "density": 7850.0,
    },
    "mat_6061": {
        "kc_value": 800.0,
        "density": 2700.0,
    },
}

MACHINES: dict[str, Machine] = {
    "cnc_1": {
        "model": "Mazak",
        "standby_power_kw": 1.5,
        "carbon_intensity": 0.44,
    },
    "cnc_2": {
        "model": "Doosan",
        "standby_power_kw": 2.2,
        "carbon_intensity": 0.44,
    },
}

MATERIAL_NAMES: dict[str, str] = {
    "mat_4140": "Steel 4140",
    "mat_6061": "Aluminum 6061",
}


class OptimizationTip(TypedDict, total=False):
    code: str
    idle_pct: int
    increase_pct: int


def _compute_efficiency_score(*, total_energy_kwh: float, processing_energy_kwh: float) -> int:
    if total_energy_kwh <= 0:
        return 0
    pct = (processing_energy_kwh / total_energy_kwh) * 100.0
    return int(round(max(0.0, min(100.0, pct))))


def _is_aluminum(*, material_id: str, material_name: str) -> bool:
    v = f"{material_id} {material_name}".lower()
    return "aluminum" in v or "alümin" in v or "alu" in v


def _build_optimization_tips(
    *,
    material_id: str,
    material_name: str,
    total_energy_kwh: float,
    processing_energy_kwh: float,
    idle_energy_kwh: float,
) -> list[OptimizationTip]:
    tips: list[OptimizationTip] = []

    idle_pct = 0
    if total_energy_kwh > 0:
        idle_pct = int(round((idle_energy_kwh / total_energy_kwh) * 100.0))

    # Rule 1: Idle Energy yüksekse
    if idle_pct > 30:
        tips.append({"code": "idle_high", "idle_pct": idle_pct})

    # Rule 2: Alüminyum ise feed rate önerisi
    if _is_aluminum(material_id=material_id, material_name=material_name):
        tips.append({"code": "material_aluminum_feed_rate", "increase_pct": 15})

    return tips


class CalculateRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "machine_id": "cnc_1",
                    "material_id": "mat_6061",
                    "initial_weight": 10.0,
                    "final_weight": 9.2,
                    "time_min": 30,
                    "tariff_type": "Single",
                    "currency": "TRY",
                    "operation_start_hhmm": "14:30",
                    "operation_end_hhmm": "15:30",
                }
            ]
        }
    )

    machine_id: str = Field(..., description="Makine kaydı ID")
    material_id: str = Field(..., description="Malzeme kaydı ID")
    initial_weight: float = Field(..., ge=0, description="İşleme öncesi ağırlık (kg)")
    final_weight: float = Field(..., ge=0, description="İşleme sonrası ağırlık (kg)")
    time_min: float = Field(..., gt=0, description="İşleme süresi (dakika)")

    tariff_type: str = Field(
        default="Single",
        description="Elektrik tarifesi: 'Single' (tek zamanlı) veya 'Multi' (üç zamanlı)",
    )
    operation_start_hhmm: str | None = Field(
        default=None,
        description="İşlem başlangıç saati (HH:MM). Örn: 14:30",
    )
    operation_end_hhmm: str | None = Field(
        default=None,
        description="İşlem bitiş saati (HH:MM). Örn: 15:30 (opsiyonel)",
    )
    currency: str = Field(default="TRY", description="Enerji maliyeti para birimi (TRY/USD gibi)")


CALCULATE_REQUEST_EXAMPLE: dict[str, object] = {
    "machine_id": "cnc_1",
    "material_id": "mat_6061",
    "initial_weight": 10.0,
    "final_weight": 9.2,
    "time_min": 30,
    "tariff_type": "Single",
    "currency": "TRY",
    "operation_start_hhmm": "14:30",
    "operation_end_hhmm": "15:30",
}

CALCULATE_RESPONSE_EXAMPLE: dict[str, object] = {
    "machine_id": "cnc_1",
    "material_id": "mat_6061",
    "credits_left": 2,
    "efficiency_score": 68,
    "optimization_tips": [
        {"code": "idle_high", "idle_pct": 35},
        {"code": "material_aluminum_feed_rate", "increase_pct": 15},
    ],
    "energy_cost": 18.75,
    "energy_currency": "TRY",
    "applied_rate_per_kwh": 1.25,
    "total_energy_kwh": 15.0,
    "processing_energy_kwh": 10.2,
    "idle_energy_kwh": 4.8,
    "total_carbon_kg": 6.6,
}


class MachineInfo(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "id": "cnc_1",
                    "model": "Mazak",
                    "standby_power_kw": 2.5,
                    "max_power_kw": 12.0,
                    "carbon_intensity": 0.44,
                }
            ]
        }
    )

    id: str = Field(..., description="Makine ID")
    model: str = Field(..., description="Model adı")
    standby_power_kw: float = Field(..., description="Boşta güç tüketimi (kW)")
    max_power_kw: float = Field(..., description="Maksimum güç tüketimi (kW)")
    carbon_intensity: float = Field(..., description="Elektrik şebekesi karbon yoğunluğu (kgCO2/kWh)")


@app.get(
    "/machines",
    summary="List available machines",
    description=(
        "Sistemde desteklenen varsayılan makine tanımlarını listeler. "
        "Bu endpoint public'tir ve entegrasyon geliştirenlerin doğru machine_id seçebilmesi için tasarlanmıştır."
    ),
    response_model=list[MachineInfo],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": "cnc_1",
                            "model": "Mazak",
                            "standby_power_kw": 2.5,
                            "max_power_kw": 12.0,
                            "carbon_intensity": 0.44,
                        }
                    ]
                }
            }
        }
    },
)
def list_machines() -> list[MachineInfo]:
    return [MachineInfo(id=k, **cast(dict, v)) for k, v in MACHINES.items()]


@app.get(
    "/v1/machines",
    summary="List available machines (API key)",
    description=(
        "API key ile erişilen entegrasyon endpoint'i. Rate limit uygulanır. "
        "Authorization: Bearer <api_key> veya X-API-Key header'ı ile çağırın."
    ),
    response_model=list[MachineInfo],
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": "cnc_1",
                            "model": "Mazak",
                            "standby_power_kw": 2.5,
                            "max_power_kw": 12.0,
                            "carbon_intensity": 0.44,
                        }
                    ]
                }
            }
        }
    },
)
@limiter.limit("60/minute")
def api_list_machines(
    request: Request,
    user_id: str = Depends(require_api_key),
) -> list[MachineInfo]:
    return list_machines()


class ReportRequest(BaseModel):
    machine_id: str = Field(..., description="Makine kaydı ID")
    material_id: str = Field(..., description="Malzeme kaydı ID")
    initial_weight: float = Field(..., ge=0, description="İşleme öncesi ağırlık (kg)")
    final_weight: float = Field(..., ge=0, description="İşleme sonrası ağırlık (kg)")
    time_min: float = Field(..., gt=0, description="İşleme süresi (dakika)")
    operator_name: str = Field(..., min_length=1, description="Operatör adı")


def generate_carboncam_pdf_report(
    *,
    operation_date: datetime,
    machine_model: str,
    material_type: str,
    operator_name: str,
    total_energy_kwh: float,
    carbon_footprint_kg_co2e: float,
) -> bytes:
    """CarbonCAM PDF raporu üretir ve PDF'i bytes olarak döndürür.

    Bu fonksiyon frontend'e download edilebilir binary stream olarak dönmek için uygundur.
    """

    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    # ----- Header -----
    pdf.set_font("Helvetica", style="B", size=16)
    pdf.set_text_color(15, 23, 42)  # slate-900
    pdf.cell(0, 10, "CarbonCAM", new_x="LMARGIN", new_y="TOP")

    pdf.set_font("Helvetica", style="", size=10)
    pdf.set_text_color(71, 85, 105)  # slate-600
    pdf.set_xy(0, 10)
    pdf.set_right_margin(14)
    pdf.cell(0, 10, "ISO 14067 Compliant Report", align="R")

    pdf.ln(6)
    pdf.set_draw_color(226, 232, 240)  # border-slate-200
    pdf.line(14, pdf.get_y(), 196, pdf.get_y())
    pdf.ln(8)

    # ----- Info Table -----
    pdf.set_font("Helvetica", style="B", size=12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, "Report Details", ln=1)

    table_x = 14
    table_y = pdf.get_y()
    table_w = 182
    row_h = 10
    col1_w = 50
    col2_w = table_w - col1_w

    rows = [
        ("İşlem Tarihi", operation_date.strftime("%Y-%m-%d %H:%M")),
        ("Makine Modeli", machine_model),
        ("Malzeme Tipi", material_type),
        ("Operatör Adı", operator_name),
    ]

    pdf.set_fill_color(248, 250, 252)  # slate-50
    pdf.set_font("Helvetica", size=10)
    pdf.set_text_color(51, 65, 85)  # slate-700
    for i, (k, v) in enumerate(rows):
        y = table_y + i * row_h
        pdf.set_xy(table_x, y)
        pdf.set_draw_color(226, 232, 240)
        pdf.cell(col1_w, row_h, k, border=1, fill=True)
        pdf.cell(col2_w, row_h, v, border=1, fill=False)

    pdf.ln(row_h * len(rows) + 10)

    # ----- Main Data -----
    pdf.set_font("Helvetica", style="B", size=14)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, "Summary", ln=1)

    pdf.set_font("Helvetica", style="", size=12)
    pdf.set_text_color(51, 65, 85)

    pdf.set_fill_color(255, 255, 255)
    card_x = 14
    card_w = 182
    card_h = 42
    card_y = pdf.get_y() + 2

    pdf.set_draw_color(226, 232, 240)
    pdf.rect(card_x, card_y, card_w, card_h)

    pdf.set_xy(card_x + 10, card_y + 10)
    pdf.set_font("Helvetica", style="B", size=12)
    pdf.cell(0, 8, "Total Energy Consumed:")
    pdf.set_font("Helvetica", style="B", size=20)
    pdf.set_text_color(5, 150, 105)  # emerald-600
    pdf.set_xy(card_x + 10, card_y + 18)
    pdf.cell(0, 12, f"{total_energy_kwh:.2f} kWh")

    pdf.set_font("Helvetica", style="B", size=12)
    pdf.set_text_color(51, 65, 85)
    pdf.set_xy(card_x + 10, card_y + 32)
    pdf.cell(0, 8, "Carbon Footprint:")
    pdf.set_font("Helvetica", style="B", size=20)
    pdf.set_text_color(234, 88, 12)  # orange-600
    pdf.set_xy(card_x + 10, card_y + 40)
    pdf.cell(0, 12, f"{carbon_footprint_kg_co2e:.2f} kg CO2e")

    pdf.ln(card_h + 12)

    # ----- Footer -----
    pdf.set_y(-32)
    pdf.set_draw_color(226, 232, 240)
    pdf.line(14, pdf.get_y(), 196, pdf.get_y())
    pdf.ln(6)
    pdf.set_font("Helvetica", size=8)
    pdf.set_text_color(100, 116, 139)  # slate-500
    pdf.multi_cell(  # type: ignore[no-untyped-call]
        0,
        4,
        "Bu belge CarbonCAM mühendislik motoru kullanılarak bilimsel verilerle üretilmiştir.",
    )

    # QR placeholder (sağ altta)
    qr_size = 18
    qr_x = 196 - qr_size
    qr_y = 297 - 18 - qr_size
    pdf.set_draw_color(203, 213, 225)  # slate-300
    pdf.rect(qr_x, qr_y, qr_size, qr_size)
    pdf.set_xy(qr_x, qr_y + 6)
    pdf.set_font("Helvetica", size=8)
    pdf.set_text_color(148, 163, 184)  # slate-400
    pdf.cell(qr_size, 6, "QR", align="C")

    out = pdf.output(dest="S")
    if isinstance(out, str):
        return out.encode("latin-1")
    return bytes(out)

@app.post(
    "/calculate",
    summary="Calculate carbon footprint",
    description=(
        "CarbonCAM hesap motoru ile tek bir işleme operasyonu için enerji (kWh) ve karbon (kgCO2) hesabı yapar.\n\n"
        "Kimlik: UI kullanımı için `X-Carboncam-User-Id` header'ı gereklidir (Clerk üzerinden gelir).\n"
        "Bu endpoint, freemium kredi sisteminden 1 hak tüketir ve kalan hakkı `credits_left` olarak döndürür.\n\n"
        "Örnek request/response Swagger'da gösterilmiştir."
    ),
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": CALCULATE_RESPONSE_EXAMPLE,
                }
            }
        }
    },
)
def calculate(
    req: CalculateRequest,
    x_carboncam_user_id: str | None = Header(default=None, alias="X-Carboncam-User-Id"),
    x_carboncam_user_email: str | None = Header(default=None, alias="X-Carboncam-User-Email"),
    x_carboncam_user_name: str | None = Header(default=None, alias="X-Carboncam-User-Name"),
    x_carboncam_company_name: str | None = Header(default=None, alias="X-Carboncam-Company-Name"),
) -> dict[str, object]:
    if not x_carboncam_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    credits_left = _consume_monthly_credit_or_raise(user_id=x_carboncam_user_id)
    ctx = _email_context_from_headers(
        user_email=x_carboncam_user_email,
        user_name=x_carboncam_user_name,
        company_name=x_carboncam_company_name,
    )
    _maybe_send_quota_alert_email(ctx=ctx, credits_left=credits_left)

    material = MATERIALS.get(req.material_id)
    if material is None:
        raise HTTPException(status_code=404, detail="material_id not found")

    machine = MACHINES.get(req.machine_id)
    if machine is None:
        raise HTTPException(status_code=404, detail="machine_id not found")

    result = calculate_machining_carbon(
        initial_weight_kg=req.initial_weight,
        final_weight_kg=req.final_weight,
        process_time_minutes=req.time_min,
        kc_value=material["kc_value"],
        standby_power_kw=machine["standby_power_kw"],
        carbon_intensity=machine["carbon_intensity"],
        density=material["density"],
    )

    total_energy_kwh = float(result.get("total_energy_kwh", 0.0))
    processing_energy_kwh = float(result.get("processing_energy_kwh", 0.0))
    idle_energy_kwh = float(result.get("idle_energy_kwh", 0.0))

    material_name = MATERIAL_NAMES.get(req.material_id, req.material_id)
    efficiency_score = _compute_efficiency_score(
        total_energy_kwh=total_energy_kwh,
        processing_energy_kwh=processing_energy_kwh,
    )
    optimization_tips = _build_optimization_tips(
        material_id=req.material_id,
        material_name=material_name,
        total_energy_kwh=total_energy_kwh,
        processing_energy_kwh=processing_energy_kwh,
        idle_energy_kwh=idle_energy_kwh,
    )

    energy_cost_payload: dict[str, object] = {}
    if req.operation_start_hhmm:
        region = os.getenv("ELECTRICITY_RATES_REGION", "TR")
        db_row = _fetch_electricity_rates_or_none(
            region=region,
            currency=req.currency,
            tariff_type=req.tariff_type,
        )

        # Fallback (ENV)
        single_rate = float(os.getenv("ELECTRICITY_RATE_SINGLE_PER_KWH", "1"))
        day_rate = float(os.getenv("ELECTRICITY_RATE_DAY_PER_KWH", "1"))
        peak_rate = float(os.getenv("ELECTRICITY_RATE_PEAK_PER_KWH", "2"))
        night_rate = float(os.getenv("ELECTRICITY_RATE_NIGHT_PER_KWH", "0.8"))

        day_start_min = 6 * 60
        peak_start_min = 17 * 60
        night_start_min = 22 * 60

        if db_row:
            # Supabase time kolonları genelde 'HH:MM:SS' formatında döner.
            try:
                parsed = _maybe_parse_float(db_row.get("single_rate_per_kwh"))
                if parsed is not None:
                    single_rate = parsed

                parsed = _maybe_parse_float(db_row.get("day_rate_per_kwh"))
                if parsed is not None:
                    day_rate = parsed

                parsed = _maybe_parse_float(db_row.get("peak_rate_per_kwh"))
                if parsed is not None:
                    peak_rate = parsed

                parsed = _maybe_parse_float(db_row.get("night_rate_per_kwh"))
                if parsed is not None:
                    night_rate = parsed

                parsed_min = _maybe_time_to_minutes(db_row.get("day_start"))
                if parsed_min is not None:
                    day_start_min = parsed_min

                parsed_min = _maybe_time_to_minutes(db_row.get("peak_start"))
                if parsed_min is not None:
                    peak_start_min = parsed_min

                parsed_min = _maybe_time_to_minutes(db_row.get("night_start"))
                if parsed_min is not None:
                    night_start_min = parsed_min
            except Exception:
                pass

        try:
            cost = estimate_energy_cost(
                total_energy_kwh=float(result["total_energy_kwh"]),
                tariff_type=req.tariff_type,
                operation_start_hhmm=req.operation_start_hhmm,
                operation_end_hhmm=req.operation_end_hhmm,
                process_time_minutes=req.time_min,
                currency=req.currency,
                single_rate_per_kwh=single_rate,
                day_rate_per_kwh=day_rate,
                peak_rate_per_kwh=peak_rate,
                night_rate_per_kwh=night_rate,
                day_start_min=day_start_min,
                peak_start_min=peak_start_min,
                night_start_min=night_start_min,
            )
            energy_cost_payload = {
                "energy_cost": cost["energy_cost"],
                "energy_currency": cost["energy_currency"],
                "applied_rate_per_kwh": cost["applied_rate_per_kwh"],
            }
        except ValueError as e:
            # Saat formatı vb. hatalarda cost'u pas geçiyoruz.
            energy_cost_payload = {"energy_cost_error": str(e)}

    return {
        "machine_id": req.machine_id,
        "material_id": req.material_id,
        "credits_left": credits_left,
        "efficiency_score": efficiency_score,
        "optimization_tips": optimization_tips,
        **energy_cost_payload,
        **result,
    }


@app.post(
    "/v1/calculate",
    summary="Calculate carbon footprint (API key)",
    description=(
        "Developer API endpoint'i. API key ile çağırılır ve rate limit uygulanır.\n\n"
        "Kimlik: `Authorization: Bearer <api_key>` veya `X-API-Key: <api_key>` header'ı.\n"
        "Bu endpoint de kredi sisteminden hak tüketir ve `credits_left` döndürür."
    ),
    responses={
        200: {
            "content": {
                "application/json": {
                    "example": CALCULATE_RESPONSE_EXAMPLE,
                }
            }
        }
    },
)
@limiter.limit("60/minute")
def api_calculate(
    request: Request,
    req: CalculateRequest,
    user_id: str = Depends(require_api_key),
) -> dict[str, object]:
    # Credits are enforced same as UI unless you choose otherwise.
    credits_left = _consume_monthly_credit_or_raise(user_id=user_id)
    # API key kullanan entegrasyonlarda email context yok; quota email default kapalı.

    material = MATERIALS.get(req.material_id)
    if material is None:
        raise HTTPException(status_code=404, detail="material_id not found")

    machine = MACHINES.get(req.machine_id)
    if machine is None:
        raise HTTPException(status_code=404, detail="machine_id not found")

    result = calculate_machining_carbon(
        initial_weight_kg=req.initial_weight,
        final_weight_kg=req.final_weight,
        process_time_minutes=req.time_min,
        kc_value=material["kc_value"],
        standby_power_kw=machine["standby_power_kw"],
        carbon_intensity=machine["carbon_intensity"],
        density=material["density"],
    )

    total_energy_kwh = float(result.get("total_energy_kwh", 0.0))
    processing_energy_kwh = float(result.get("processing_energy_kwh", 0.0))
    idle_energy_kwh = float(result.get("idle_energy_kwh", 0.0))

    material_name = MATERIAL_NAMES.get(req.material_id, req.material_id)
    efficiency_score = _compute_efficiency_score(
        total_energy_kwh=total_energy_kwh,
        processing_energy_kwh=processing_energy_kwh,
    )
    optimization_tips = _build_optimization_tips(
        material_id=req.material_id,
        material_name=material_name,
        total_energy_kwh=total_energy_kwh,
        processing_energy_kwh=processing_energy_kwh,
        idle_energy_kwh=idle_energy_kwh,
    )

    energy_cost_payload: dict[str, object] = {}
    if req.operation_start_hhmm:
        region = os.getenv("ELECTRICITY_RATES_REGION", "TR")
        db_row = _fetch_electricity_rates_or_none(
            region=region,
            currency=req.currency,
            tariff_type=req.tariff_type,
        )

        single_rate = float(os.getenv("ELECTRICITY_RATE_SINGLE_PER_KWH", "1"))
        day_rate = float(os.getenv("ELECTRICITY_RATE_DAY_PER_KWH", "1"))
        peak_rate = float(os.getenv("ELECTRICITY_RATE_PEAK_PER_KWH", "2"))
        night_rate = float(os.getenv("ELECTRICITY_RATE_NIGHT_PER_KWH", "0.8"))

        day_start_min = 6 * 60
        peak_start_min = 17 * 60
        night_start_min = 22 * 60

        if db_row:
            try:
                parsed = _maybe_parse_float(db_row.get("single_rate_per_kwh"))
                if parsed is not None:
                    single_rate = parsed

                parsed = _maybe_parse_float(db_row.get("day_rate_per_kwh"))
                if parsed is not None:
                    day_rate = parsed

                parsed = _maybe_parse_float(db_row.get("peak_rate_per_kwh"))
                if parsed is not None:
                    peak_rate = parsed

                parsed = _maybe_parse_float(db_row.get("night_rate_per_kwh"))
                if parsed is not None:
                    night_rate = parsed

                parsed_min = _maybe_time_to_minutes(db_row.get("day_start"))
                if parsed_min is not None:
                    day_start_min = parsed_min

                parsed_min = _maybe_time_to_minutes(db_row.get("peak_start"))
                if parsed_min is not None:
                    peak_start_min = parsed_min

                parsed_min = _maybe_time_to_minutes(db_row.get("night_start"))
                if parsed_min is not None:
                    night_start_min = parsed_min
            except Exception:
                pass

        try:
            cost = estimate_energy_cost(
                total_energy_kwh=float(result["total_energy_kwh"]),
                tariff_type=req.tariff_type,
                operation_start_hhmm=req.operation_start_hhmm,
                operation_end_hhmm=req.operation_end_hhmm,
                process_time_minutes=req.time_min,
                currency=req.currency,
                single_rate_per_kwh=single_rate,
                day_rate_per_kwh=day_rate,
                peak_rate_per_kwh=peak_rate,
                night_rate_per_kwh=night_rate,
                day_start_min=day_start_min,
                peak_start_min=peak_start_min,
                night_start_min=night_start_min,
            )
            energy_cost_payload = {
                "energy_cost": cost["energy_cost"],
                "energy_currency": cost["energy_currency"],
                "applied_rate_per_kwh": cost["applied_rate_per_kwh"],
            }
        except ValueError as e:
            energy_cost_payload = {"energy_cost_error": str(e)}

    return {
        "machine_id": req.machine_id,
        "material_id": req.material_id,
        "credits_left": credits_left,
        "efficiency_score": efficiency_score,
        "optimization_tips": optimization_tips,
        **energy_cost_payload,
        **result,
    }


@app.get("/batch/template")
def download_batch_template(
    x_carboncam_user_id: str | None = Header(default=None, alias="X-Carboncam-User-Id"),
):
    if not x_carboncam_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    df = pd.DataFrame(columns=["Weight_In", "Weight_Out", "Time", "Machine_ID", "Material_ID"])
    buf = io.BytesIO()
    df.to_excel(buf, index=False)
    buf.seek(0)

    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=Template.xlsx"},
    )


@app.get("/v1/batch/template")
@limiter.limit("60/minute")
def api_download_batch_template(
    request: Request,
    user_id: str = Depends(require_api_key),
):
    df = pd.DataFrame(columns=["Weight_In", "Weight_Out", "Time", "Machine_ID", "Material_ID"])
    buf = io.BytesIO()
    df.to_excel(buf, index=False)
    buf.seek(0)
    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=Template.xlsx"},
    )


@app.post("/batch/process")
def process_batch(
    file: UploadFile = File(...),
    x_carboncam_user_id: str | None = Header(default=None, alias="X-Carboncam-User-Id"),
    x_carboncam_user_email: str | None = Header(default=None, alias="X-Carboncam-User-Email"),
    x_carboncam_user_name: str | None = Header(default=None, alias="X-Carboncam-User-Name"),
    x_carboncam_company_name: str | None = Header(default=None, alias="X-Carboncam-Company-Name"),
):
    if not x_carboncam_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        content = file.file.read()
    except Exception:
        raise HTTPException(status_code=400, detail="Dosya okunamadı")

    try:
        df = pd.read_excel(io.BytesIO(content))
    except Exception:
        raise HTTPException(status_code=400, detail="Geçersiz Excel dosyası")

    required_cols = ["Weight_In", "Weight_Out", "Time", "Machine_ID", "Material_ID"]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise HTTPException(status_code=400, detail=f"Eksik sütunlar: {', '.join(missing)}")

    output_rows: list[dict[str, object]] = []
    single_rate = float(os.getenv("ELECTRICITY_RATE_SINGLE_PER_KWH", "1"))
    currency = os.getenv("ELECTRICITY_RATE_CURRENCY", "TRY")
    credits_left_last: int | None = None
    ctx = _email_context_from_headers(
        user_email=x_carboncam_user_email,
        user_name=x_carboncam_user_name,
        company_name=x_carboncam_company_name,
    )

    for _, row in df.iterrows():
        try:
            credits_left_last = _consume_monthly_credit_or_raise(user_id=x_carboncam_user_id)
        except HTTPException:
            # Kredi bitince hatayı üst kata aynen ilet.
            raise

        if credits_left_last is not None:
            _maybe_send_quota_alert_email(ctx=ctx, credits_left=int(credits_left_last))

        try:
            initial = float(row["Weight_In"])
            final = float(row["Weight_Out"])
            time_min = float(row["Time"])
            machine_id = str(row["Machine_ID"]).strip()
            material_id = str(row["Material_ID"]).strip()
        except Exception:
            output_rows.append({
                "Weight_In": row.get("Weight_In", ""),
                "Weight_Out": row.get("Weight_Out", ""),
                "Time": row.get("Time", ""),
                "Machine_ID": row.get("Machine_ID", ""),
                "Material_ID": row.get("Material_ID", ""),
                "Total_Energy_kWh": "",
                "Total_Carbon_kg": "",
                "Energy_Cost": "",
                "Currency": currency,
                "Applied_Rate_per_kWh": single_rate,
                "Credits_Left": credits_left_last if credits_left_last is not None else "",
                "Error": "Sayısal değerler parse edilemedi",
            })
            continue

        if not (math.isfinite(initial) and math.isfinite(final) and math.isfinite(time_min)):
            output_rows.append({
                "Weight_In": initial,
                "Weight_Out": final,
                "Time": time_min,
                "Machine_ID": machine_id,
                "Material_ID": material_id,
                "Total_Energy_kWh": "",
                "Total_Carbon_kg": "",
                "Energy_Cost": "",
                "Currency": currency,
                "Applied_Rate_per_kWh": single_rate,
                "Credits_Left": credits_left_last if credits_left_last is not None else "",
                "Error": "Geçersiz sayı (NaN/inf)",
            })
            continue

        if time_min <= 0 or initial < 0 or final < 0:
            output_rows.append({
                "Weight_In": initial,
                "Weight_Out": final,
                "Time": time_min,
                "Machine_ID": machine_id,
                "Material_ID": material_id,
                "Total_Energy_kWh": "",
                "Total_Carbon_kg": "",
                "Energy_Cost": "",
                "Currency": currency,
                "Applied_Rate_per_kWh": single_rate,
                "Credits_Left": credits_left_last if credits_left_last is not None else "",
                "Error": "Geçersiz ağırlık/süre",
            })
            continue

        machine = MACHINES.get(machine_id)
        material = MATERIALS.get(material_id)
        if not machine or not material:
            output_rows.append({
                "Weight_In": initial,
                "Weight_Out": final,
                "Time": time_min,
                "Machine_ID": machine_id,
                "Material_ID": material_id,
                "Total_Energy_kWh": "",
                "Total_Carbon_kg": "",
                "Energy_Cost": "",
                "Currency": currency,
                "Applied_Rate_per_kWh": single_rate,
                "Credits_Left": credits_left_last if credits_left_last is not None else "",
                "Error": "Makine veya malzeme bulunamadı",
            })
            continue

        try:
            calc = calculate_machining_carbon(
                initial_weight_kg=initial,
                final_weight_kg=final,
                process_time_minutes=time_min,
                kc_value=material["kc_value"],
                standby_power_kw=machine["standby_power_kw"],
                carbon_intensity=machine["carbon_intensity"],
                density=material["density"],
            )

            energy_cost_value = float(calc["total_energy_kwh"]) * single_rate

            output_rows.append({
                "Weight_In": initial,
                "Weight_Out": final,
                "Time": time_min,
                "Machine_ID": machine_id,
                "Material_ID": material_id,
                "Total_Energy_kWh": float(calc["total_energy_kwh"]),
                "Total_Carbon_kg": float(calc["total_carbon_kg"]),
                "Energy_Cost": energy_cost_value,
                "Currency": currency,
                "Applied_Rate_per_kWh": single_rate,
                "Credits_Left": credits_left_last if credits_left_last is not None else "",
                "Error": "",
            })
        except Exception as e:
            output_rows.append({
                "Weight_In": initial,
                "Weight_Out": final,
                "Time": time_min,
                "Machine_ID": machine_id,
                "Material_ID": material_id,
                "Total_Energy_kWh": "",
                "Total_Carbon_kg": "",
                "Energy_Cost": "",
                "Currency": currency,
                "Applied_Rate_per_kWh": single_rate,
                "Credits_Left": credits_left_last if credits_left_last is not None else "",
                "Error": str(e),
            })

    if not output_rows:
        output_rows.append({"Error": "İşlenecek satır bulunamadı"})

    out_df = pd.DataFrame(output_rows)
    out_buf = io.BytesIO()
    out_df.to_excel(out_buf, index=False)
    out_buf.seek(0)

    batch_id = uuid.uuid4().hex[:12]
    _maybe_send_report_ready_email(ctx=ctx, batch_id=batch_id)

    return StreamingResponse(
        out_buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=Results.xlsx"},
    )


@app.post("/v1/batch/process")
@limiter.limit("60/minute")
def api_process_batch(
    request: Request,
    file: UploadFile = File(...),
    user_id: str = Depends(require_api_key),
):
    # Reuse the same logic by calling the internal function body.
    # Credits are enforced per row via user_id.
    return process_batch(file=file, x_carboncam_user_id=user_id)


@app.post("/report")
def report(req: ReportRequest):
    material = MATERIALS.get(req.material_id)
    if material is None:
        raise HTTPException(status_code=404, detail="material_id not found")

    machine = MACHINES.get(req.machine_id)
    if machine is None:
        raise HTTPException(status_code=404, detail="machine_id not found")

    result = calculate_machining_carbon(
        initial_weight_kg=req.initial_weight,
        final_weight_kg=req.final_weight,
        process_time_minutes=req.time_min,
        kc_value=material["kc_value"],
        standby_power_kw=machine["standby_power_kw"],
        carbon_intensity=machine["carbon_intensity"],
        density=material["density"],
    )

    pdf_bytes = generate_carboncam_pdf_report(
        operation_date=datetime.now(),
        machine_model=str(machine.get("model", req.machine_id)),
        material_type=MATERIAL_NAMES.get(req.material_id, req.material_id),
        operator_name=req.operator_name,
        total_energy_kwh=float(result["total_energy_kwh"]),
        carbon_footprint_kg_co2e=float(result["total_carbon_kg"]),
    )

    filename = f"carboncam_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""},
    )


# Health check endpoint for monitoring and load balancers
@app.get("/health")
def health_check():
    """Health check endpoint for Docker, Kubernetes, and load balancers"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }


# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("CarbonCAM API started successfully")
    logger.info(f"Environment: {os.getenv('ENVIRONMENT', 'development')}")
    logger.info(f"Sentry enabled: {bool(os.getenv('SENTRY_DSN'))}")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("CarbonCAM API shutting down")
