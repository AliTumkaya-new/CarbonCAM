"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState, type DragEvent } from "react";

export default function BatchUploader() {
  const t = useTranslations();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFile(files[0]);
    setError("");
    setStatus(t("dashboard.batch.status.fileSelected", { filename: files[0].name }));
  }, [t]);

  const onDrop = useCallback((evt: DragEvent<HTMLLabelElement>) => {
    evt.preventDefault();
    onFileChange(evt.dataTransfer.files);
  }, [onFileChange]);

  const downloadTemplate = useCallback(async () => {
    setError("");
    setStatus(t("dashboard.batch.status.downloadingTemplate"));
    try {
      const res = await fetch("/api/batch/template", { method: "GET" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = typeof data.detail === "string" ? data.detail : t("dashboard.batch.errors.templateDownloadFailed");
        throw new Error(detail);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Template.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setStatus(t("dashboard.batch.status.templateDownloaded"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("dashboard.batch.errors.templateDownloadFailed"));
      setStatus("");
    }
  }, [t]);

  const upload = useCallback(async () => {
    if (!file) {
      setError(t("dashboard.batch.errors.selectFile"));
      return;
    }
    setIsUploading(true);
    setError("");
    setStatus(t("dashboard.batch.status.uploading"));

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/batch/process", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = typeof data.detail === "string" ? data.detail : t("dashboard.batch.errors.batchFailed");
        throw new Error(detail);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Results.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setStatus(t("dashboard.batch.status.resultsDownloaded"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("dashboard.batch.errors.batchFailed"));
      setStatus("");
    } finally {
      setIsUploading(false);
    }
  }, [file, t]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">{t("dashboard.batch.tag")}</p>
          <h2 className="text-lg font-semibold text-slate-900">{t("dashboard.batch.title")}</h2>
          <p className="text-sm text-slate-600">{t("dashboard.batch.subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={downloadTemplate}
          className="mt-3 inline-flex items-center justify-center rounded-xl border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 md:mt-0"
        >
          {t("dashboard.batch.downloadTemplate")}
        </button>
      </div>

      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="mt-6 flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50"
      >
        <div className="text-sm font-semibold text-slate-900">{t("dashboard.batch.dropzone.title")}</div>
        <div className="text-xs text-slate-500">{t("dashboard.batch.dropzone.columns")}</div>
        <div className="text-xs text-slate-500">{t("dashboard.batch.dropzone.or")}</div>
        <div className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
          {t("dashboard.batch.dropzone.chooseFile")}
        </div>
        <input
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files)}
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={isUploading}
          onClick={upload}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? t("dashboard.batch.status.processing") : t("dashboard.batch.uploadAndCalculate")}
        </button>
        {status ? <span className="text-sm font-medium text-emerald-700">{status}</span> : null}
        {error ? <span className="text-sm font-medium text-red-600">{error}</span> : null}
        {file ? <span className="text-xs text-slate-500">{t("dashboard.batch.selected", { filename: file.name })}</span> : null}
      </div>
    </section>
  );
}
