from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from string import Template
from typing import Any

import resend


_TEMPLATES_DIR = Path(__file__).resolve().parent / "email_templates"


@dataclass(frozen=True)
class EmailConfig:
    api_key: str
    from_email: str


def _get_email_config() -> EmailConfig:
    api_key = os.getenv("RESEND_API_KEY")
    from_email = os.getenv("RESEND_FROM")
    if not api_key:
        raise RuntimeError("RESEND_API_KEY env missing")
    if not from_email:
        raise RuntimeError("RESEND_FROM env missing (ex: 'CarbonCAM <noreply@yourdomain.com>')")
    return EmailConfig(api_key=api_key, from_email=from_email)


def _load_template(name: str) -> Template:
    path = _TEMPLATES_DIR / f"{name}.html"
    if not path.exists():
        raise FileNotFoundError(f"Email template not found: {path}")
    return Template(path.read_text(encoding="utf-8"))


def _render_template(name: str, **vars: Any) -> str:
    tpl = _load_template(name)
    # safe_substitute: eksik alanları boş bırakır yerine exception atmaz
    return tpl.safe_substitute(**{k: "" if v is None else str(v) for k, v in vars.items()})


def send_email(*, to_email: str, subject: str, html: str) -> str:
    cfg = _get_email_config()
    resend.api_key = cfg.api_key

    resp = resend.Emails.send(
        {
            "from": cfg.from_email,
            "to": [to_email],
            "subject": subject,
            "html": html,
        }
    )

    # resp genelde { id: "..." }
    if isinstance(resp, dict) and "id" in resp:
        return str(resp["id"])
    return str(resp)


def send_welcome_email(*, to_email: str, user_name: str, company_name: str | None, howto_url: str) -> str:
    html = _render_template(
        "welcome",
        user_email=to_email,
        user_name=user_name,
        company_name=company_name,
        howto_url=howto_url,
    )
    return send_email(to_email=to_email, subject="CarbonCAM'e hoş geldiniz", html=html)


def send_report_ready_email(
    *,
    to_email: str,
    user_name: str,
    company_name: str | None,
    report_filename: str,
    download_url: str,
    batch_id: str,
) -> str:
    html = _render_template(
        "report_ready",
        user_name=user_name,
        company_name=company_name,
        report_filename=report_filename,
        download_url=download_url,
        batch_id=batch_id,
    )
    return send_email(to_email=to_email, subject="Excel raporunuz hazır", html=html)


def send_quota_alert_email(
    *,
    to_email: str,
    user_name: str,
    company_name: str | None,
    credits_left: int,
    monthly_limit: int,
    upgrade_url: str,
) -> str:
    html = _render_template(
        "quota_alert",
        user_name=user_name,
        company_name=company_name,
        credits_left=credits_left,
        monthly_limit=monthly_limit,
        upgrade_url=upgrade_url,
    )
    return send_email(to_email=to_email, subject="Krediniz bitmek üzere", html=html)


def should_send_quota_alert(*, credits_left: int, monthly_limit: int) -> bool:
    """Basit kural: kalan kredi <= %10 eşiği.

    Not: Spam'i önlemek için prod'da 'ayda bir kez' gibi DB tabanlı dedup önerilir.
    """

    if monthly_limit <= 0:
        return False

    threshold = max(1, int((monthly_limit * 0.1) + 0.9999))  # ceil(%10)
    return credits_left <= threshold
