"use client";

import { useAuth } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

type CalculationResponse = {
  total_energy_kwh: number;
  total_carbon_kg: number;
  processing_energy_kwh: number;
  idle_energy_kwh: number;
  energy_cost?: number;
  energy_currency?: string;
  applied_rate_per_kwh?: number;
  efficiency_score?: number;
  optimization_tips?: Array<{
    code: string;
    idle_pct?: number;
    increase_pct?: number;
  }>;
};

export default function QuickCalculator() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled =
    typeof publishableKey === "string" &&
    publishableKey.startsWith("pk_") &&
    publishableKey.length >= 20 &&
    !publishableKey.includes("XXXX") &&
    !publishableKey.includes("xxxxxxxx");

  return clerkEnabled ? (
    <QuickCalculatorWithClerk />
  ) : (
    <QuickCalculatorCore auth={{ clerkEnabled: false, isLoaded: true, isSignedIn: false }} />
  );
}


function QuickCalculatorWithClerk() {
  const auth = useAuth();
  return (
    <QuickCalculatorCore
      auth={{
        clerkEnabled: true,
        isLoaded: auth.isLoaded ?? true,
        isSignedIn: auth.isSignedIn ?? false,
      }}
    />
  );
}

function QuickCalculatorCore({
  auth,
}: {
  auth: { clerkEnabled: boolean; isLoaded: boolean; isSignedIn: boolean };
}) {
  const t = useTranslations();
  const router = useRouter();
  const machines = useMemo(
    () => [
      { id: "cnc_1", label: "Mazak" },
      { id: "cnc_2", label: "Doosan" },
    ],
    [],
  );

  const materials = useMemo(
    () => [
      { id: "mat_4140", label: "Steel" },
      { id: "mat_6061", label: "Aluminum" },
    ],
    [],
  );

  const [machineId, setMachineId] = useState(machines[0]?.id ?? "");
  const [materialId, setMaterialId] = useState(materials[0]?.id ?? "");
  const [initialWeight, setInitialWeight] = useState("10");
  const [finalWeight, setFinalWeight] = useState("9.2");
  const [timeMin, setTimeMin] = useState("30");
  const [toolDiameterMm, setToolDiameterMm] = useState("10");

  const [tariffType, setTariffType] = useState<"Single" | "Multi">("Single");
  const [currency, setCurrency] = useState<"TRY" | "USD">("TRY");
  const [operationStart, setOperationStart] = useState("14:30");
  const [operationEnd, setOperationEnd] = useState("15:30");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const emerald500Ref = useRef<HTMLSpanElement | null>(null);
  const emerald200Ref = useRef<HTMLSpanElement | null>(null);
  const slate300Ref = useRef<HTMLSpanElement | null>(null);
  const orange500Ref = useRef<HTMLSpanElement | null>(null);
  const slate500Ref = useRef<HTMLSpanElement | null>(null);

  const [chartColors, setChartColors] = useState({
    emerald500: "",
    emerald200: "",
    slate300: "",
    orange500: "",
    slate500: "",
  });

  useEffect(() => {
    const read = (el: HTMLSpanElement | null) => (el ? getComputedStyle(el).color : "");
    setChartColors({
      emerald500: read(emerald500Ref.current),
      emerald200: read(emerald200Ref.current),
      slate300: read(slate300Ref.current),
      orange500: read(orange500Ref.current),
      slate500: read(slate500Ref.current),
    });
  }, []);

  async function onCalculate() {
    if (auth.clerkEnabled && auth.isLoaded && !auth.isSignedIn) {
      router.push("/sign-in?redirect_url=/dashboard");
      return;
    }

    setError(null);
    setResult(null);
    setShowUpgradeModal(false);

    const initial = Number(initialWeight);
    const final = Number(finalWeight);
    const time = Number(timeMin);

    if (!Number.isFinite(initial) || !Number.isFinite(final) || !Number.isFinite(time)) {
      setError(t("dashboard.quickCalculator.errors.invalidNumber"));
      return;
    }

    setIsLoading(true);
    const payload = {
      machine_id: machineId,
      material_id: materialId,
      initial_weight: initial,
      final_weight: final,
      time_min: time,
      tariff_type: tariffType,
      currency,
      operation_start_hhmm: operationStart,
      operation_end_hhmm: operationEnd,
    };

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as unknown;
      if (!res.ok) {
        if (res.status === 402) {
          setShowUpgradeModal(true);
          return;
        }

        const message =
          typeof data === "object" && data !== null && "detail" in data
            ? String((data as { detail?: unknown }).detail)
            : t("dashboard.quickCalculator.errors.calculateFailed");
        const err = new Error(message);
        Sentry.captureException(err, {
          tags: { feature: "quick_calculator", action: "calculate" },
          extra: { status: res.status, payload },
        });
        throw err;
      }

      const typed = data as {
        total_energy_kwh: number;
        total_carbon_kg: number;
        processing_energy_kwh: number;
        idle_energy_kwh: number;
        energy_cost?: number;
        energy_currency?: string;
        applied_rate_per_kwh?: number;
        efficiency_score?: number;
        credits_left?: number;
        optimization_tips?: Array<{
          code: string;
          idle_pct?: number;
          increase_pct?: number;
        }>;
      };

      if (typeof typed.credits_left === "number" && Number.isFinite(typed.credits_left)) {
        try {
          localStorage.setItem("carboncam_credits_left", String(typed.credits_left));
        } catch {
          // ignore
        }
      }
      setResult({
        total_energy_kwh: typed.total_energy_kwh,
        total_carbon_kg: typed.total_carbon_kg,
        processing_energy_kwh: typed.processing_energy_kwh,
        idle_energy_kwh: typed.idle_energy_kwh,
        energy_cost: typed.energy_cost,
        energy_currency: typed.energy_currency,
        applied_rate_per_kwh: typed.applied_rate_per_kwh,
        efficiency_score: typed.efficiency_score,
        optimization_tips: typed.optimization_tips,
      });
    } catch (e) {
      Sentry.captureException(e, {
        tags: { feature: "quick_calculator", action: "calculate" },
        extra: { payload },
      });
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tailwind renklerini Recharts'a taşımak için gizli referanslar */}
      <span ref={emerald500Ref} className="hidden text-emerald-500" />
      <span ref={emerald200Ref} className="hidden text-emerald-200" />
      <span ref={slate300Ref} className="hidden text-slate-300" />
      <span ref={orange500Ref} className="hidden text-orange-500" />
      <span ref={slate500Ref} className="hidden text-slate-500" />

      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-700">{t("dashboard.quickCalculator.tag")}</span>
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
          {t("dashboard.quickCalculator.title")}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t("dashboard.quickCalculator.subtitle")}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sol Sütun: Girdi Paneli */}
        <section className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-50 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{t("dashboard.quickCalculator.machineParameters.title")}</h3>
                <p className="text-sm text-slate-400">{t("dashboard.quickCalculator.machineParameters.subtitle")}</p>
              </div>
            </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-slate-900">{t("dashboard.quickCalculator.sections.equipmentDetails")}</p>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.machine")}</label>
                    <span className="relative inline-flex items-center">
                      <span className="group inline-flex items-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[11px] font-semibold text-slate-500">
                          i
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                          {t("dashboard.quickCalculator.tooltips.machine")}
                        </span>
                      </span>
                    </span>
                  </div>
                  <select
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {machines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.material")}</label>
                    <span className="relative inline-flex items-center">
                      <span className="group inline-flex items-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[11px] font-semibold text-slate-500">
                          i
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-72 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                          {t("dashboard.quickCalculator.tooltips.material")}
                        </span>
                      </span>
                    </span>
                  </div>
                  <select
                    value={materialId}
                    onChange={(e) => setMaterialId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.tariffType")}</label>
                  <select
                    value={tariffType}
                    onChange={(e) => setTariffType(e.target.value as "Single" | "Multi")}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Single">{t("dashboard.quickCalculator.tariff.single")}</option>
                    <option value="Multi">{t("dashboard.quickCalculator.tariff.multi")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.currency")}</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as "TRY" | "USD")}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div>
              <p className="text-sm font-semibold text-slate-900">{t("dashboard.quickCalculator.sections.processParameters")}</p>
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.initialWeight")}</label>
                    <span className="relative inline-flex items-center">
                      <span className="group inline-flex items-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[11px] font-semibold text-slate-500">
                          i
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                          {t("dashboard.quickCalculator.tooltips.initialWeight")}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="relative mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
                    <input
                      inputMode="decimal"
                      value={initialWeight}
                      onChange={(e) => setInitialWeight(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 pr-12 text-slate-900 outline-none"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                      kg
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.finalWeight")}</label>
                    <span className="relative inline-flex items-center">
                      <span className="group inline-flex items-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[11px] font-semibold text-slate-500">
                          i
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                          {t("dashboard.quickCalculator.tooltips.finalWeight")}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="relative mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
                    <input
                      inputMode="decimal"
                      value={finalWeight}
                      onChange={(e) => setFinalWeight(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 pr-12 text-slate-900 outline-none"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                      kg
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.operationStart")}</label>
                  <input
                    type="time"
                    value={operationStart}
                    onChange={(e) => setOperationStart(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.operationEnd")}</label>
                  <input
                    type="time"
                    value={operationEnd}
                    onChange={(e) => setOperationEnd(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.time")}</label>
                    <span className="relative inline-flex items-center">
                      <span className="group inline-flex items-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[11px] font-semibold text-slate-500">
                          i
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                          {t("dashboard.quickCalculator.tooltips.time")}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="relative mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
                    <input
                      inputMode="decimal"
                      value={timeMin}
                      onChange={(e) => setTimeMin(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 pr-12 text-slate-900 outline-none"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                      min
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-slate-700">{t("dashboard.quickCalculator.labels.toolDiameter")}</label>
                    <span className="relative inline-flex items-center">
                      <span className="group inline-flex items-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[11px] font-semibold text-slate-500">
                          i
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                          {t("dashboard.quickCalculator.tooltips.toolDiameter")}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="relative mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
                    <input
                      inputMode="decimal"
                      value={toolDiameterMm}
                      onChange={(e) => setToolDiameterMm(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 pr-12 text-slate-900 outline-none"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                      mm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}

          <button
            type="button"
            data-tour="new-calculation"
            onClick={onCalculate}
            disabled={isLoading}
            className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M13 2L3 14h7l-1 8 12-14h-7l-1-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {isLoading ? "..." : `${t("actions.calculate")} · ${t("terms.carbonFootprint")}`}
          </button>
          </div>
        </section>

        {/* Sağ Sütun: Sonuç Önizleme */}
        <section className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-slate-50 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg shadow-slate-500/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{t("dashboard.quickCalculator.resultPreview.title")}</h3>
                <p className="text-sm text-slate-400">{t("dashboard.quickCalculator.resultPreview.subtitle")}</p>
              </div>
            </div>

          {result &&
          typeof result.efficiency_score === "number" &&
          result.efficiency_score < 70 &&
          result.optimization_tips &&
          result.optimization_tips.length > 0 ? (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <div className="text-sm font-semibold">{t("optimization.title")}</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {result.optimization_tips.map((tip, idx) => {
                  if (tip.code === "idle_high") {
                    const idlePct = `${Math.round(tip.idle_pct ?? 0)}%`;
                    return (
                      <li key={`${tip.code}-${idx}`}>
                        {t("optimization.idleHigh", { idlePct })}
                      </li>
                    );
                  }

                  if (tip.code === "material_aluminum_feed_rate") {
                    const increasePct = `${Math.round(tip.increase_pct ?? 15)}%`;
                    return (
                      <li key={`${tip.code}-${idx}`}>
                        {t("optimization.aluminumFeedRate", { increasePct })}
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            </div>
          ) : null}

          {!result ? (
            <div className="relative h-72 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div aria-hidden="true" className="pointer-events-none space-y-4 blur-sm">
                <div className="grid gap-3 lg:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="h-3 w-24 rounded bg-slate-200" />
                    <div className="mt-3 h-8 w-32 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-40 rounded bg-slate-100" />
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="mt-3 h-8 w-28 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-36 rounded bg-slate-100" />
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="mt-3 h-8 w-20 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-44 rounded bg-slate-100" />
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-32 rounded bg-slate-200" />
                    <div className="h-3 w-20 rounded bg-slate-100" />
                  </div>
                  <div className="mt-4 h-3 w-full rounded-full bg-slate-100" />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="h-3 w-28 rounded bg-slate-100" />
                    <div className="h-3 w-24 rounded bg-slate-100" />
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-40 rounded bg-slate-200" />
                      <div className="h-3 w-24 rounded bg-slate-100" />
                    </div>
                    <div className="mt-4 flex h-28 items-center justify-center">
                      <div className="h-20 w-20 rounded-full bg-slate-100" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="h-3 w-24 rounded bg-slate-100" />
                      <div className="h-3 w-20 rounded bg-slate-100" />
                      <div className="h-3 w-16 rounded bg-slate-100" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 rounded bg-slate-200" />
                      <div className="h-3 w-28 rounded bg-slate-100" />
                    </div>
                    <div className="mt-5 flex h-24 items-end justify-center gap-3">
                      <div className="h-12 w-8 rounded-t bg-slate-200" />
                      <div className="h-20 w-8 rounded-t bg-slate-200" />
                      <div className="h-16 w-8 rounded-t bg-slate-200" />
                      <div className="h-10 w-8 rounded-t bg-slate-200" />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="h-3 w-32 rounded bg-slate-100" />
                      <div className="h-3 w-24 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <p className="max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                  {t("dashboard.quickCalculator.resultPreview.noDataCta")}
                </p>
              </div>
            </div>
          ) : (
            (() => {
              const total = result.total_energy_kwh;
              const cutting = result.processing_energy_kwh;
              const idle = result.idle_energy_kwh;
              const aux = Math.max(0, total - cutting - idle);

              const cuttingPct = total > 0 ? (cutting / total) * 100 : 0;
              const idlePct = total > 0 ? (idle / total) * 100 : 0;
              const auxPct = total > 0 ? (aux / total) * 100 : 0;
              const efficiencyScore = Math.max(0, Math.min(100, Math.round(cuttingPct)));

              const donutData = [
                { name: "Processing", value: cutting },
                { name: "Idle", value: idle },
                { name: "Aux", value: aux },
              ];

              const industryAvgKwh = 15.0;
              const betterThanAvg = total <= industryAvgKwh;
              const benchmarkData = [
                { name: "Current", value: total },
                { name: "Industry Avg", value: industryAvgKwh },
              ];

              return (
                <div className="space-y-6">
                  {/* Özet Kartları */}
                  <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Total Energy</p>
                          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                            {result.total_energy_kwh.toFixed(1)}
                            <span className="ml-2 text-base font-medium text-slate-500">kWh</span>
                          </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                            <path
                              d="M13 2L3 14h7l-1 8 12-14h-7l-1-6Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-slate-500">Toplam tüketilen elektrik enerjisi</p>
                    </div>

                    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-orange-800">Carbon Emission</p>
                          <p className="mt-2 text-3xl font-semibold tracking-tight text-orange-900">
                            {result.total_carbon_kg.toFixed(1)}
                            <span className="ml-2 text-base font-medium text-orange-700">kg CO2</span>
                          </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 text-orange-700">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                            <path
                              d="M7.5 18a4.5 4.5 0 0 1-.4-8.98A6 6 0 0 1 18.5 10.5a3.5 3.5 0 0 1 .5 6.97H7.5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-orange-700">Şebeke karbon yoğunluğuna göre</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Efficiency Score</p>
                          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">%{efficiencyScore}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                            Good
                          </span>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                              <path
                                d="M12 3v3m0 12v3M5 12h3m8 0h3M7.2 7.2l2.1 2.1m5.4 5.4 2.1 2.1m0-9.6-2.1 2.1M9.3 14.7l-2.1 2.1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M12 8a4 4 0 1 0 4 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-slate-500">Kesme enerjisi / toplam enerji</p>
                    </div>
                  </div>

                  {/* Görselleştirme: Kesme vs Boşta */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Energy Breakdown</p>
                      <p className="text-xs text-slate-500">Kesme vs Boşta</p>
                    </div>

                    <div className="mt-4">
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-3 bg-emerald-600"
                          style={{ width: `${Math.max(0, Math.min(100, cuttingPct))}%` }}
                        />
                        <div
                          className="-mt-3 h-3 bg-slate-300"
                          style={{
                            width: `${Math.max(0, Math.min(100, idlePct))}%`,
                            marginLeft: `${Math.max(0, Math.min(100, cuttingPct))}%`,
                          }}
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                          <span className="font-medium text-slate-700">Kesme</span>
                          <span className="text-slate-500">{Math.round(cuttingPct)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                          <span className="font-medium text-slate-700">Boşta</span>
                          <span className="text-slate-500">{Math.round(idlePct)}%</span>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-2 text-xs text-slate-500 md:grid-cols-2">
                        <div>
                          Kesme Enerjisi:{" "}
                          <span className="font-medium text-slate-700">{cutting.toFixed(3)} kWh</span>
                        </div>
                        <div>
                          Boşta Enerji:{" "}
                          <span className="font-medium text-slate-700">{idle.toFixed(3)} kWh</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grafikler */}
                  <div className="grid gap-4 lg:grid-cols-2">
                    {/* Donut Chart */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Energy Distribution</p>
                        <p className="text-xs text-slate-500">Processing / Idle / Aux</p>
                      </div>

                      <div className="mt-4 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={donutData}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={52}
                              outerRadius={78}
                              paddingAngle={2}
                            >
                              <Cell fill={chartColors.emerald500 || undefined} />
                              <Cell fill={chartColors.emerald200 || undefined} />
                              <Cell fill={chartColors.slate300 || undefined} />
                            </Pie>
                            <RechartsTooltip
                              formatter={(value: unknown, name: unknown) => {
                                const v = typeof value === "number" ? value : Number(value);
                                const pct = total > 0 ? (v / total) * 100 : 0;
                                return [`${v.toFixed(3)} kWh (${Math.round(pct)}%)`, String(name)];
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          Processing <span className="text-slate-500">{Math.round(cuttingPct)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
                          Idle <span className="text-slate-500">{Math.round(idlePct)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                          Aux <span className="text-slate-500">{Math.round(auxPct)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Benchmark</p>
                        <p className="text-xs text-slate-500">Current vs Industry Avg</p>
                      </div>

                      <div className="mt-4 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={benchmarkData} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} width={34} />
                            <RechartsTooltip
                              formatter={(value: unknown) => {
                                const v = typeof value === "number" ? value : Number(value);
                                return [`${v.toFixed(2)} kWh`, "Energy"];
                              }}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                              <Cell
                                fill={
                                  betterThanAvg
                                    ? chartColors.emerald500 || undefined
                                    : chartColors.orange500 || undefined
                                }
                              />
                              <Cell fill={chartColors.slate300 || undefined} />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <div className="text-slate-600">
                          Status:{" "}
                          <span
                            className={
                              betterThanAvg
                                ? "font-semibold text-emerald-600"
                                : "font-semibold text-orange-600"
                            }
                          >
                            {betterThanAvg ? "Better than average" : "Above average"}
                          </span>
                        </div>
                        <div className="text-slate-500">Industry Avg: {industryAvgKwh.toFixed(1)} kWh</div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-500">
                      <path
                        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 7h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11h6M9 15h6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {t("actions.downloadReport")}
                  </button>
                </div>
              );
            })()
          )}
          </div>
        </section>
      </div>

      {showUpgradeModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close upgrade modal"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setShowUpgradeModal(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Plan Limit</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                  Aylık ücretsiz hesaplama hakkınız bitti
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Bu ayki 3 ücretsiz hesaplamayı kullandınız. Pro’ya geçerek sınırsız hesaplama,
                  raporlama ve kurumsal özellikleri açabilirsiniz.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
                aria-label="Close"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-2 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Sınırsız hesaplama ve sonuç karşılaştırma</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                  <span>PDF raporları ve ekip içi paylaşım</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Kurumsal izlenebilirlik (audit-ready)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Şimdilik değil
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
