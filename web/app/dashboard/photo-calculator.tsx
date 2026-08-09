"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type EnergySource = "electricity" | "diesel" | "gasoline" | "natural_gas" | "unknown";

type PhotoAnalysis = {
  object_name: string;
  category: string;
  energy_source: EnergySource;
  consumption_per_hour: number;
  consumption_unit: "kWh" | "L" | "m3" | "unknown";
  confidence: number;
  identification_basis: string;
  requires_nameplate: boolean;
};

type CalculationResult = {
  durationHours: number;
  totalConsumption: number;
  totalCarbonKg: number;
  emissionFactor: number;
  consumptionUnit: string;
  factorUnit: string;
};

const SOURCE_CONFIG: Record<
  EnergySource,
  { label: string; unit: "kWh" | "L" | "m3" | "unknown"; factor: number; factorUnit: string }
> = {
  electricity: {
    label: "Elektrik",
    unit: "kWh",
    factor: 0.442,
    factorUnit: "kg CO₂e/kWh",
  },
  diesel: {
    label: "Dizel",
    unit: "L",
    factor: 2.68,
    factorUnit: "kg CO₂e/L",
  },
  gasoline: {
    label: "Benzin",
    unit: "L",
    factor: 2.31,
    factorUnit: "kg CO₂e/L",
  },
  natural_gas: {
    label: "Doğal gaz",
    unit: "m3",
    factor: 1.94,
    factorUnit: "kg CO₂e/m³",
  },
  unknown: {
    label: "Bilinmiyor",
    unit: "unknown",
    factor: 0,
    factorUnit: "—",
  },
};

function getDurationHours(start: string, end: string) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  if ([startHour, startMinute, endHour, endMinute].some((value) => !Number.isFinite(value))) {
    return 0;
  }

  const startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;
  if (endMinutes < startMinutes) endMinutes += 24 * 60;
  if (endMinutes === startMinutes) return 0;
  return (endMinutes - startMinutes) / 60;
}

async function optimizeImage(file: File) {
  const supportedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!supportedTypes.has(file.type)) {
    throw new Error("Yalnızca JPG, PNG ve WebP fotoğrafları desteklenir.");
  }

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const maxDimension = 1600;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Fotoğraf hazırlanamadı.");
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.84),
    );
    if (!blob) throw new Error("Fotoğraf sıkıştırılamadı.");
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "carboncam"}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch (error) {
    if (file.size <= 4 * 1024 * 1024) return file;
    throw error;
  }
}

function UploadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M12 16V4m0 0L7 9m5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M8.5 5.5 10 3.5h4l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function PhotoCalculator() {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PhotoAnalysis | null>(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isPreparing, setIsPreparing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const durationHours = useMemo(
    () => getDurationHours(startTime, endTime),
    [startTime, endTime],
  );

  async function analyzePhoto(selectedFile: File) {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setResult(null);

    const body = new FormData();
    body.append("file", selectedFile);

    try {
      const response = await fetch("/api/analyze-photo", { method: "POST", body });
      const payload = (await response.json()) as {
        analysis?: PhotoAnalysis;
        credits_left?: number;
        detail?: string;
      };

      if (!response.ok || !payload.analysis) {
        throw new Error(payload.detail || "Fotoğraf analiz edilemedi.");
      }

      setAnalysis(payload.analysis);
      if (typeof payload.credits_left === "number") {
        localStorage.setItem("carboncam_credits_left", String(payload.credits_left));
        window.dispatchEvent(new Event("carboncam:credits-updated"));
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Fotoğraf analiz edilemedi.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleSelectedFile(selectedFile: File | null) {
    if (!selectedFile) return;
    setIsPreparing(true);
    setError(null);
    setResult(null);

    try {
      const optimized = await optimizeImage(selectedFile);
      if (optimized.size > 4 * 1024 * 1024) {
        throw new Error("Fotoğraf çok büyük. Lütfen daha düşük çözünürlüklü bir fotoğraf seçin.");
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const nextPreviewUrl = URL.createObjectURL(optimized);
      setFile(optimized);
      setPreviewUrl(nextPreviewUrl);
      await analyzePhoto(optimized);
    } catch (caught) {
      setFile(null);
      setAnalysis(null);
      setError(caught instanceof Error ? caught.message : "Fotoğraf hazırlanamadı.");
    } finally {
      setIsPreparing(false);
    }
  }

  function updateAnalysis(patch: Partial<PhotoAnalysis>) {
    setAnalysis((current) => {
      if (!current) return current;
      const nextSource = patch.energy_source ?? current.energy_source;
      return {
        ...current,
        ...patch,
        consumption_unit:
          patch.energy_source !== undefined
            ? SOURCE_CONFIG[nextSource].unit
            : (patch.consumption_unit ?? current.consumption_unit),
      };
    });
    setResult(null);
  }

  function calculateFootprint() {
    setError(null);
    setResult(null);

    if (!analysis) {
      setError("Önce bir fotoğraf yükleyip analiz edin.");
      return;
    }
    if (analysis.energy_source === "unknown") {
      setError("Enerji kaynağını seçerek tahmini tüketimi girin.");
      return;
    }
    if (!Number.isFinite(analysis.consumption_per_hour) || analysis.consumption_per_hour <= 0) {
      setError("Saatlik tüketim sıfırdan büyük olmalıdır.");
      return;
    }
    if (durationHours <= 0) {
      setError("Başlangıç ve bitiş saatleri aynı olamaz.");
      return;
    }

    const config = SOURCE_CONFIG[analysis.energy_source];
    const totalConsumption = analysis.consumption_per_hour * durationHours;
    const nextResult: CalculationResult = {
      durationHours,
      totalConsumption,
      totalCarbonKg: totalConsumption * config.factor,
      emissionFactor: config.factor,
      consumptionUnit: config.unit,
      factorUnit: config.factorUnit,
    };
    setResult(nextResult);

    try {
      const raw = localStorage.getItem("carboncam_photo_results");
      const previous = raw ? (JSON.parse(raw) as unknown[]) : [];
      const history = Array.isArray(previous) ? previous : [];
      localStorage.setItem(
        "carboncam_photo_results",
        JSON.stringify(
          [
            {
              id: crypto.randomUUID(),
              created_at: new Date().toISOString(),
              object_name: analysis.object_name,
              category: analysis.category,
              energy_source: analysis.energy_source,
              start_time: startTime,
              end_time: endTime,
              ...nextResult,
            },
            ...history,
          ].slice(0, 30),
        ),
      );
      window.dispatchEvent(new Event("carboncam:photo-result"));
    } catch {
      // The calculation remains usable even when browser storage is unavailable.
    }
  }

  function resetPhoto() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setAnalysis(null);
    setResult(null);
    setError(null);
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }

  const confidencePercent = analysis ? Math.round(analysis.confidence * 100) : 0;
  const busy = isPreparing || isAnalyzing;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-sky-50 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                AI FOTOĞRAF ANALİZİ
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                Fotoğrafını çek, çalışma süresini gir
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                CarbonCAM nesneyi tanır, tipik enerji tüketimini tahmin eder ve seçtiğiniz çalışma aralığı için operasyonel karbon ayak izini hesaplar.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-600">
              {[
                ["1", "Fotoğraf"],
                ["2", "Süre"],
                ["3", "Sonuç"],
              ].map(([step, label]) => (
                <div key={step} className="rounded-xl border border-white bg-white/80 px-3 py-2 shadow-sm">
                  <span className="mr-1 text-emerald-600">{step}.</span>{label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-slate-100 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">1. Makine veya eşya fotoğrafı</p>
                <p className="mt-1 text-xs text-slate-500">Net, aydınlık ve mümkünse etiket bilgisi görünen bir kare kullanın.</p>
              </div>
              {file ? (
                <button type="button" onClick={resetPhoto} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                  Değiştir
                </button>
              ) : null}
            </div>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              className="hidden"
              onChange={(event) => void handleSelectedFile(event.target.files?.[0] ?? null)}
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(event) => void handleSelectedFile(event.target.files?.[0] ?? null)}
            />

            {previewUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <Image src={previewUrl} alt="Analiz edilecek fotoğraf" fill unoptimized className="object-cover" />
                {busy ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 text-white backdrop-blur-sm">
                    <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <p className="mt-3 text-sm font-bold">{isPreparing ? "Fotoğraf hazırlanıyor..." : "Yapay zekâ analiz ediyor..."}</p>
                    <p className="mt-1 text-xs text-white/70">Nesne ve enerji kaynağı belirleniyor</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => galleryInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") galleryInputRef.current?.click();
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  void handleSelectedFile(event.dataTransfer.files?.[0] ?? null);
                }}
                className={`flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50"}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                  <UploadIcon />
                </div>
                <p className="mt-4 text-base font-bold text-slate-900">Fotoğrafı buraya bırakın</p>
                <p className="mt-1 text-sm text-slate-500">veya cihazınızdan seçin</p>
                <p className="mt-3 text-xs text-slate-400">JPG, PNG veya WebP</p>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                disabled={busy}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CameraIcon /> Kamerayı aç
              </button>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                disabled={busy}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <UploadIcon /> Galeriden seç
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div>
              <p className="text-sm font-bold text-slate-900">2. Çalışma saat aralığı</p>
              <p className="mt-1 text-xs text-slate-500">Gece yarısını geçen çalışmalar otomatik olarak ertesi güne taşınır.</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Başlangıç
                <input type="time" value={startTime} onChange={(event) => { setStartTime(event.target.value); setResult(null); }} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base font-bold text-slate-950 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Bitiş
                <input type="time" value={endTime} onChange={(event) => { setEndTime(event.target.value); setResult(null); }} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base font-bold text-slate-950 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
              </label>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <span className="font-medium text-slate-500">Toplam çalışma süresi</span>
              <span className="font-bold text-slate-900">{durationHours > 0 ? `${durationHours.toFixed(2)} saat` : "—"}</span>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">AI analiz sonucu</p>
                <p className="mt-1 text-xs text-slate-500">Tahmini değerleri hesaplamadan önce düzeltebilirsiniz.</p>
              </div>
              {analysis ? (
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${confidencePercent >= 70 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  %{confidencePercent} güven
                </span>
              ) : null}
            </div>

            {analysis ? (
              <div className="mt-4 space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Tespit edilen nesne
                  <input value={analysis.object_name} onChange={(event) => updateAnalysis({ object_name: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                </label>
                <div className="grid grid-cols-[1fr_0.8fr] gap-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Enerji kaynağı
                    <select value={analysis.energy_source} onChange={(event) => updateAnalysis({ energy_source: event.target.value as EnergySource })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
                      {(Object.keys(SOURCE_CONFIG) as EnergySource[]).map((source) => <option key={source} value={source}>{SOURCE_CONFIG[source].label}</option>)}
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Saatlik tüketim
                    <div className="relative mt-1.5">
                      <input type="number" min="0" step="0.01" value={analysis.consumption_per_hour} onChange={(event) => updateAnalysis({ consumption_per_hour: Number(event.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 pr-12 text-sm font-bold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">{SOURCE_CONFIG[analysis.energy_source].unit === "unknown" ? "—" : SOURCE_CONFIG[analysis.energy_source].unit}</span>
                    </div>
                  </label>
                </div>
                <div className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs leading-5 text-sky-900">
                  <span className="font-bold">Analiz notu: </span>{analysis.identification_basis}
                  {analysis.requires_nameplate ? <span className="mt-1 block font-semibold">Daha doğru sonuç için güç etiketinin yakın fotoğrafını kullanın.</span> : null}
                </div>
                <button type="button" onClick={() => file && void analyzePhoto(file)} disabled={busy} className="text-xs font-bold text-emerald-700 hover:text-emerald-800 disabled:opacity-50">Fotoğrafı yeniden analiz et</button>
              </div>
            ) : (
              <div className="mt-4 flex min-h-36 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
                <div className="h-8 w-8 rounded-full bg-slate-200/70" />
                <p className="mt-3 text-sm font-bold text-slate-600">Analiz sonucu bekleniyor</p>
                <p className="mt-1 text-xs text-slate-400">Bir fotoğraf seçtiğinizde analiz otomatik başlar.</p>
              </div>
            )}

            {error ? (
              <div role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="button"
              data-tour="new-calculation"
              onClick={calculateFootprint}
              disabled={!analysis || busy}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {busy ? "Fotoğraf analiz ediliyor..." : "Karbon ayak izini hesapla"}
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </section>

      {result && analysis ? (
        <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/20">
                HESAPLAMA TAMAMLANDI
              </div>
              <p className="mt-4 text-sm font-medium text-slate-400">{analysis.object_name} · {startTime}–{endTime}</p>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-5xl font-black tracking-tight sm:text-6xl">{result.totalCarbonKg.toFixed(2)}</span>
                <span className="pb-2 text-base font-bold text-slate-300">kg CO₂e</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Tahmini operasyonel karbon ayak izi</p>
            </div>
            <div className="grid min-w-72 grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-semibold text-slate-400">Çalışma süresi</p>
                <p className="mt-1 text-xl font-bold">{result.durationHours.toFixed(2)} saat</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-semibold text-slate-400">Toplam tüketim</p>
                <p className="mt-1 text-xl font-bold">{result.totalConsumption.toFixed(2)} {result.consumptionUnit}</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-400">Kullanılan emisyon faktörü</span>
                  <span className="font-bold">{result.emissionFactor.toFixed(3)} {result.factorUnit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4 text-xs leading-5 text-slate-400 sm:px-8">
            Bu sonuç fotoğraftan tahmin edilen tipik tüketim değerine dayalı operasyonel emisyon hesabıdır. Resmî raporlama için cihazın güç etiketindeki gerçek tüketim değerini kullanın.
          </div>
        </section>
      ) : null}
    </div>
  );
}
