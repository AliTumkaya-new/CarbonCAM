"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Tab = "machines" | "materials";

type CustomMachine = {
  id: string;
  name: string;
  brand: string | null;
  standby_power_kw: number;
  max_power_kw: number;
  efficiency_percent: number;
};

type CustomMaterial = {
  id: string;
  name: string;
  kc_value: number;
  density: number;
};

function numberOr(value: string, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function AssetLibrary() {
  const [tab, setTab] = useState<Tab>("machines");

  const [machines, setMachines] = useState<CustomMachine[]>([]);
  const [materials, setMaterials] = useState<CustomMaterial[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingMachineId, setEditingMachineId] = useState<string | null>(null);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);

  const machineBeingEdited = useMemo(
    () => machines.find((m) => m.id === editingMachineId) ?? null,
    [machines, editingMachineId],
  );

  const materialBeingEdited = useMemo(
    () => materials.find((m) => m.id === editingMaterialId) ?? null,
    [materials, editingMaterialId],
  );

  const [machineForm, setMachineForm] = useState({
    name: "",
    brand: "",
    standby_power_kw: "0",
    max_power_kw: "0",
    efficiency_percent: "85",
  });

  const [materialForm, setMaterialForm] = useState({
    name: "",
    kc_value: "2400",
    density: "7850",
  });

  const refresh = useCallback(async (activeTab: Tab) => {
    setError(null);
    setLoading(true);
    try {
      if (activeTab === "machines") {
        const res = await fetch("/api/library/machines", { cache: "no-store" });
        const data = (await res.json()) as unknown;
        if (!res.ok) throw new Error(extractDetail(data) ?? "Makine listesi alınamadı.");
        setMachines(Array.isArray(data) ? (data as CustomMachine[]) : []);
      } else {
        const res = await fetch("/api/library/materials", { cache: "no-store" });
        const data = (await res.json()) as unknown;
        if (!res.ok) throw new Error(extractDetail(data) ?? "Malzeme listesi alınamadı.");
        setMaterials(Array.isArray(data) ? (data as CustomMaterial[]) : []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(tab);
  }, [tab, refresh]);

  useEffect(() => {
    if (machineBeingEdited) {
      setMachineForm({
        name: machineBeingEdited.name,
        brand: machineBeingEdited.brand ?? "",
        standby_power_kw: String(machineBeingEdited.standby_power_kw),
        max_power_kw: String(machineBeingEdited.max_power_kw),
        efficiency_percent: String(machineBeingEdited.efficiency_percent),
      });
    }
  }, [machineBeingEdited]);

  useEffect(() => {
    if (materialBeingEdited) {
      setMaterialForm({
        name: materialBeingEdited.name,
        kc_value: String(materialBeingEdited.kc_value),
        density: String(materialBeingEdited.density),
      });
    }
  }, [materialBeingEdited]);

  function extractDetail(value: unknown) {
    if (typeof value === "object" && value !== null && "detail" in value) {
      return String((value as { detail?: unknown }).detail);
    }
    return null;
  }

  function resetMachineForm() {
    setEditingMachineId(null);
    setMachineForm({ name: "", brand: "", standby_power_kw: "0", max_power_kw: "0", efficiency_percent: "85" });
  }

  function resetMaterialForm() {
    setEditingMaterialId(null);
    setMaterialForm({ name: "", kc_value: "2400", density: "7850" });
  }

  async function saveMachine() {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name: machineForm.name.trim(),
        brand: machineForm.brand.trim() || undefined,
        standby_power_kw: numberOr(machineForm.standby_power_kw, 0),
        max_power_kw: numberOr(machineForm.max_power_kw, 0),
        efficiency_percent: numberOr(machineForm.efficiency_percent, 85),
      };

      if (!payload.name) throw new Error("Makine adı zorunlu.");

      const res = editingMachineId
        ? await fetch(`/api/library/machines/${editingMachineId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/library/machines", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Kaydetme başarısız.");

      resetMachineForm();
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMachine(id: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/library/machines/${id}`, { method: "DELETE" });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Silme başarısız.");

      if (editingMachineId === id) resetMachineForm();
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function saveMaterial() {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name: materialForm.name.trim(),
        kc_value: numberOr(materialForm.kc_value, 0),
        density: numberOr(materialForm.density, 0),
      };

      if (!payload.name) throw new Error("Malzeme adı zorunlu.");
      if (payload.kc_value <= 0) throw new Error("k_c (kc_value) 0'dan büyük olmalı.");
      if (payload.density <= 0) throw new Error("Yoğunluk 0'dan büyük olmalı.");

      const res = editingMaterialId
        ? await fetch(`/api/library/materials/${editingMaterialId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/library/materials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Kaydetme başarısız.");

      resetMaterialForm();
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMaterial(id: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/library/materials/${id}`, { method: "DELETE" });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Silme başarısız.");

      if (editingMaterialId === id) resetMaterialForm();
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Library</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">Asset Library</h1>
        <p className="mt-2 text-sm text-slate-600">
          Firmanıza özel makineleri ve malzemeleri yönetin (CRUD).
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setTab("machines");
              setEditingMaterialId(null);
            }}
            className={
              tab === "machines"
                ? "rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800"
                : "rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            }
          >
            Machines
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("materials");
              setEditingMachineId(null);
            }}
            className={
              tab === "materials"
                ? "rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800"
                : "rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            }
          >
            Materials
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
          {error}
        </div>
      ) : null}

      {tab === "machines" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Custom Machines</h2>
              <p className="mt-1 text-sm text-slate-500">Yeni makine ekleyin, düzenleyin veya silin.</p>
            </div>
            <button
              type="button"
              onClick={resetMachineForm}
              className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Yeni Makine Ekle
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Makine Adı</label>
              <input
                value={machineForm.name}
                onChange={(e) => setMachineForm((s) => ({ ...s, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Marka</label>
              <input
                value={machineForm.brand}
                onChange={(e) => setMachineForm((s) => ({ ...s, brand: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Standby Gücü (kW)</label>
              <input
                inputMode="decimal"
                value={machineForm.standby_power_kw}
                onChange={(e) => setMachineForm((s) => ({ ...s, standby_power_kw: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Max Güç (kW)</label>
              <input
                inputMode="decimal"
                value={machineForm.max_power_kw}
                onChange={(e) => setMachineForm((s) => ({ ...s, max_power_kw: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Verim (%)</label>
              <input
                inputMode="decimal"
                value={machineForm.efficiency_percent}
                onChange={(e) => setMachineForm((s) => ({ ...s, efficiency_percent: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => void saveMachine()}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-emerald-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50"
              >
                {editingMachineId ? "Kaydet" : "Ekle"}
              </button>
              {editingMachineId ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetMachineForm}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
                >
                  İptal
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3">Makine</th>
                  <th className="px-4 py-3">Standby (kW)</th>
                  <th className="px-4 py-3">Max (kW)</th>
                  <th className="px-4 py-3">Verim (%)</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {machines.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{m.name}</div>
                      <div className="text-xs text-slate-500">{m.brand ?? ""}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{m.standby_power_kw}</td>
                    <td className="px-4 py-3 text-slate-700">{m.max_power_kw}</td>
                    <td className="px-4 py-3 text-slate-700">{m.efficiency_percent}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => setEditingMachineId(m.id)}
                          className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => void deleteMachine(m.id)}
                          className="inline-flex h-9 items-center rounded-xl border border-orange-200 bg-white px-3 text-sm font-semibold text-orange-700 shadow-sm transition-colors hover:bg-orange-50 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {machines.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                      {loading ? "Yükleniyor..." : "Henüz özel makine yok."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Custom Materials</h2>
              <p className="mt-1 text-sm text-slate-500">Yeni alaşım ekleyin, düzenleyin veya silin.</p>
            </div>
            <button
              type="button"
              onClick={resetMaterialForm}
              className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Yeni Malzeme Ekle
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Malzeme Adı</label>
              <input
                value={materialForm.name}
                onChange={(e) => setMaterialForm((s) => ({ ...s, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Özgül Kesme Enerjisi (k_c)</label>
              <input
                inputMode="decimal"
                value={materialForm.kc_value}
                onChange={(e) => setMaterialForm((s) => ({ ...s, kc_value: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Yoğunluk</label>
              <input
                inputMode="decimal"
                value={materialForm.density}
                onChange={(e) => setMaterialForm((s) => ({ ...s, density: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => void saveMaterial()}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-emerald-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50"
              >
                {editingMaterialId ? "Kaydet" : "Ekle"}
              </button>
              {editingMaterialId ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetMaterialForm}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
                >
                  İptal
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3">Malzeme</th>
                  <th className="px-4 py-3">k_c</th>
                  <th className="px-4 py-3">Yoğunluk</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {materials.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{m.name}</td>
                    <td className="px-4 py-3 text-slate-700">{m.kc_value}</td>
                    <td className="px-4 py-3 text-slate-700">{m.density}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => setEditingMaterialId(m.id)}
                          className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => void deleteMaterial(m.id)}
                          className="inline-flex h-9 items-center rounded-xl border border-orange-200 bg-white px-3 text-sm font-semibold text-orange-700 shadow-sm transition-colors hover:bg-orange-50 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-500">
                      {loading ? "Yükleniyor..." : "Henüz özel malzeme yok."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
