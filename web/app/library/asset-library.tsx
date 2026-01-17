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
    [machines, editingMachineId]
  );

  const materialBeingEdited = useMemo(
    () => materials.find((m) => m.id === editingMaterialId) ?? null,
    [materials, editingMaterialId]
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
    setMachineForm({
      name: "",
      brand: "",
      standby_power_kw: "0",
      max_power_kw: "0",
      efficiency_percent: "85",
    });
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
    <div className="space-y-8">
      {/* Modern Header with Glassmorphism */}
      <header
        className="glass-card"
        style={{
          padding: "48px 40px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.1)",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="premium-badge" style={{ marginBottom: "20px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <span>Library</span>
        </div>
        <h1
          className="gradient-text"
          style={{
            fontSize: "48px",
            fontWeight: 900,
            marginBottom: "12px",
            letterSpacing: "-0.03em",
          }}
        >
          Asset Library
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
          Firmanıza özel makineleri ve malzemeleri yönetin (CRUD).
        </p>
      </header>

      {/* Premium Tab Selector */}
      <div
        className="glass-card"
        style={{
          padding: "8px",
          borderRadius: "20px",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards",
        }}
      >
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setTab("machines");
              setEditingMaterialId(null);
            }}
            className={
              tab === "machines"
                ? "flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300"
                : "flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-50"
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Machines
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("materials");
              setEditingMachineId(null);
            }}
            className={
              tab === "materials"
                ? "flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300"
                : "flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-50"
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              Materials
            </div>
          </button>
        </div>
      </div>

      {error ? (
        <div
          className="glass-card"
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%)",
            border: "1px solid rgba(251, 146, 60, 0.2)",
            animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#ea580c" }}>{error}</span>
          </div>
        </div>
      ) : null}

      {tab === "machines" ? (
        <section
          className="glass-card card-hover"
          style={{
            padding: "40px",
            borderRadius: "24px",
            animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards",
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: "32px" }}>
            <div>
              <h2
                style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}
              >
                Custom Machines
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                Yeni makine ekleyin, düzenleyin veya silin.
              </p>
            </div>
            <button
              type="button"
              onClick={resetMachineForm}
              className="btn-gradient"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "44px",
                padding: "0 24px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Yeni Makine Ekle
            </button>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Makine Adı
              </label>
              <input
                value={machineForm.name}
                onChange={(e) => setMachineForm((s) => ({ ...s, name: e.target.value }))}
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Marka
              </label>
              <input
                value={machineForm.brand}
                onChange={(e) => setMachineForm((s) => ({ ...s, brand: e.target.value }))}
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Standby Gücü (kW)
              </label>
              <input
                inputMode="decimal"
                value={machineForm.standby_power_kw}
                onChange={(e) =>
                  setMachineForm((s) => ({ ...s, standby_power_kw: e.target.value }))
                }
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Max Güç (kW)
              </label>
              <input
                inputMode="decimal"
                value={machineForm.max_power_kw}
                onChange={(e) => setMachineForm((s) => ({ ...s, max_power_kw: e.target.value }))}
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Verim (%)
              </label>
              <input
                inputMode="decimal"
                value={machineForm.efficiency_percent}
                onChange={(e) =>
                  setMachineForm((s) => ({ ...s, efficiency_percent: e.target.value }))
                }
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div className="flex items-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => void saveMachine()}
                className="btn-gradient"
                style={{
                  flex: 1,
                  height: "48px",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: "12px",
                }}
              >
                {editingMachineId ? "Kaydet" : "Ekle"}
              </button>
              {editingMachineId ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetMachineForm}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "48px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    backgroundColor: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#475569",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                  }}
                >
                  İptal
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/60">
            <table className="w-full text-left text-sm">
              <thead style={{ backgroundColor: "#f8fafc" }}>
                <tr>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Makine
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Standby (kW)
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Max (kW)
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Verim (%)
                  </th>
                  <th style={{ padding: "16px 20px" }} />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {machines.map((m) => (
                  <tr
                    key={m.id}
                    style={{ transition: "background-color 0.2s" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "2px",
                        }}
                      >
                        {m.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{m.brand ?? ""}</div>
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {m.standby_power_kw}
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {m.max_power_kw}
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {m.efficiency_percent}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => setEditingMachineId(m.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            height: "36px",
                            padding: "0 16px",
                            borderRadius: "10px",
                            border: "1px solid rgba(226, 232, 240, 0.8)",
                            backgroundColor: "#fff",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#475569",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                            e.currentTarget.style.borderColor = "#cbd5e1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => void deleteMachine(m.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            height: "36px",
                            padding: "0 16px",
                            borderRadius: "10px",
                            border: "1px solid rgba(251, 146, 60, 0.3)",
                            backgroundColor: "#fff",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#ea580c",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff7ed";
                            e.currentTarget.style.borderColor = "#fb923c";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.3)";
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {machines.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: "48px 20px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#94a3b8",
                      }}
                    >
                      {loading ? "Yükleniyor..." : "Henüz özel makine yok."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section
          className="glass-card card-hover"
          style={{
            padding: "40px",
            borderRadius: "24px",
            animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards",
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: "32px" }}>
            <div>
              <h2
                style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}
              >
                Custom Materials
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                Yeni alaşım ekleyin, düzenleyin veya silin.
              </p>
            </div>
            <button
              type="button"
              onClick={resetMaterialForm}
              className="btn-gradient"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "44px",
                padding: "0 24px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Yeni Malzeme Ekle
            </button>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Malzeme Adı
              </label>
              <input
                value={materialForm.name}
                onChange={(e) => setMaterialForm((s) => ({ ...s, name: e.target.value }))}
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Özgül Kesme Enerjisi (k_c)
              </label>
              <input
                inputMode="decimal"
                value={materialForm.kc_value}
                onChange={(e) => setMaterialForm((s) => ({ ...s, kc_value: e.target.value }))}
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                Yoğunluk
              </label>
              <input
                inputMode="decimal"
                value={materialForm.density}
                onChange={(e) => setMaterialForm((s) => ({ ...s, density: e.target.value }))}
                className="input-focus"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0f172a",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
            <div className="flex items-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => void saveMaterial()}
                className="btn-gradient"
                style={{
                  flex: 1,
                  height: "48px",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: "12px",
                }}
              >
                {editingMaterialId ? "Kaydet" : "Ekle"}
              </button>
              {editingMaterialId ? (
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetMaterialForm}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "48px",
                    padding: "0 20px",
                    borderRadius: "12px",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    backgroundColor: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#475569",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                  }}
                >
                  İptal
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/60">
            <table className="w-full text-left text-sm">
              <thead style={{ backgroundColor: "#f8fafc" }}>
                <tr>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Malzeme
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    k_c
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Yoğunluk
                  </th>
                  <th style={{ padding: "16px 20px" }} />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {materials.map((m) => (
                  <tr
                    key={m.id}
                    style={{ transition: "background-color 0.2s" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {m.name}
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {m.kc_value}
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {m.density}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => setEditingMaterialId(m.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            height: "36px",
                            padding: "0 16px",
                            borderRadius: "10px",
                            border: "1px solid rgba(226, 232, 240, 0.8)",
                            backgroundColor: "#fff",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#475569",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                            e.currentTarget.style.borderColor = "#cbd5e1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => void deleteMaterial(m.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            height: "36px",
                            padding: "0 16px",
                            borderRadius: "10px",
                            border: "1px solid rgba(251, 146, 60, 0.3)",
                            backgroundColor: "#fff",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#ea580c",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff7ed";
                            e.currentTarget.style.borderColor = "#fb923c";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.3)";
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {materials.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: "48px 20px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#94a3b8",
                      }}
                    >
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
