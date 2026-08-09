"use client";

import { useEffect, useMemo, useState } from "react";

type ActivityItem = {
  id: string;
  actor: string;
  description: string;
  timestamp: string;
  ip_address: string | null;
};

function formatTime(ts: string) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
}

export default function SecurityTabs() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(() => "Security", []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/audit/logs", { cache: "no-store" });
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(json?.detail ?? "Activity log alınamadı");
        }
        if (!cancelled) {
          setItems(Array.isArray(json?.items) ? json.items : []);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Beklenmeyen hata");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Settings</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">ISO denetimleri için işlem kayıtları.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">Activity Log</h2>
          <p className="mt-1 text-sm text-slate-500">Makine kütüphanesi ve takım işlemleri.</p>
        </div>

        {loading ? <p className="text-sm text-slate-600">Yükleniyor…</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {items.length === 0 ? (
              <div className="p-4 text-sm text-slate-600">Kayıt bulunamadı.</div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-900">
                      {it.actor}, {it.description}
                    </div>
                    <div className="text-xs text-slate-500">{formatTime(it.timestamp)}</div>
                  </div>
                  {it.ip_address ? (
                    <div className="mt-1 text-xs text-slate-500">IP: {it.ip_address}</div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
