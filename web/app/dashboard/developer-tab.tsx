"use client";

import { useCallback, useState } from "react";

export default function DeveloperTab() {
  const [apiKey, setApiKey] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setStatus("Anahtar üretiliyor...");
    setApiKey("");

    try {
      const res = await fetch("/api/developer/api-key", { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as { api_key?: string; detail?: string };
      if (!res.ok) {
        throw new Error(data.detail || "API key üretilemedi");
      }
      if (!data.api_key) {
        throw new Error("API key üretilemedi");
      }
      setApiKey(data.api_key);
      setStatus("Anahtar üretildi (yalnızca bir kez gösterilir)");
    } catch (err) {
      setError(err instanceof Error ? err.message : "API key üretilemedi");
      setStatus("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const copy = useCallback(async () => {
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      setStatus("Kopyalandı");
    } catch {
      setStatus("Kopyalanamadı");
    }
  }, [apiKey]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Developer</p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">API Erişimi</h2>
      <p className="mt-2 text-sm text-slate-600">
        ERP/MES entegrasyonları için API anahtarı üretin. Anahtar yalnızca bir kez gösterilir.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={generate}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Üretiliyor..." : "Generate API Key"}
        </button>

        {status ? <span className="text-sm font-medium text-emerald-700">{status}</span> : null}
        {error ? <span className="text-sm font-medium text-red-600">{error}</span> : null}
      </div>

      {apiKey ? (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-600">API Key</div>
              <div className="mt-1 break-all font-mono text-sm text-slate-900">{apiKey}</div>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Copy
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
