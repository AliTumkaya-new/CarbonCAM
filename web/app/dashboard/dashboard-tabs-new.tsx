"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

// Icons
const CalculatorIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

const CodeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
    />
  </svg>
);

const BoltIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
);

type Tab = "calculator" | "batch" | "api";

type CalculationResult = {
  total_carbon_kg: number;
  total_energy_kwh: number;
  processing_energy_kwh: number;
  idle_energy_kwh: number;
};

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("calculator");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [machine, setMachine] = useState("cnc_1");
  const [material, setMaterial] = useState("mat_4140");
  const [initialWeight, setInitialWeight] = useState("10");
  const [finalWeight, setFinalWeight] = useState("9.2");
  const [timeMin, setTimeMin] = useState("30");

  const tabs = [
    { id: "calculator" as Tab, label: "Calculator", icon: CalculatorIcon },
    { id: "batch" as Tab, label: "Batch Upload", icon: UploadIcon },
    { id: "api" as Tab, label: "API", icon: CodeIcon },
  ];

  async function handleCalculate() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machine_id: machine,
          material_id: material,
          initial_weight_kg: parseFloat(initialWeight),
          final_weight_kg: parseFloat(finalWeight),
          time_min: parseFloat(timeMin),
        }),
      });

      if (!response.ok) throw new Error("Calculation failed");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-base text-muted-foreground">
          Calculate carbon emissions for your manufacturing operations
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calculator Tab */}
      {activeTab === "calculator" && (
        <div className="space-y-6">
          {/* Calculator Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 space-y-1">
              <h2 className="text-lg font-semibold text-card-foreground">Quick Calculator</h2>
              <p className="text-sm text-muted-foreground">
                Calculate carbon footprint for a single machining operation
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Machine Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Machine</label>
                <select
                  value={machine}
                  onChange={(e) => setMachine(e.target.value)}
                  className="flex h-10 w-full items-center rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="cnc_1">Mazak CNC</option>
                  <option value="cnc_2">Doosan CNC</option>
                </select>
              </div>

              {/* Material Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Material</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="flex h-10 w-full items-center rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="mat_4140">Steel 4140</option>
                  <option value="mat_6061">Aluminum 6061</option>
                </select>
              </div>

              {/* Initial Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Initial Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={initialWeight}
                  onChange={(e) => setInitialWeight(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Final Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Final Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Processing Time */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Processing Time (min)</label>
                <input
                  type="number"
                  step="1"
                  value={timeMin}
                  onChange={(e) => setTimeMin(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <LeafIcon />
                  <span>Calculate Carbon Footprint</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Results Card */}
          {result && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <LeafIcon />
                </div>
                <h3 className="font-semibold text-foreground">Calculation Results</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Total Carbon */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LeafIcon />
                    <span className="text-sm">Total Carbon Emissions</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {result.total_carbon_kg.toFixed(3)}{" "}
                    <span className="text-base font-normal">kg CO₂</span>
                  </p>
                </div>

                {/* Total Energy */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BoltIcon />
                    <span className="text-sm">Total Energy</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {result.total_energy_kwh.toFixed(2)}{" "}
                    <span className="text-base font-normal">kWh</span>
                  </p>
                </div>

                {/* Processing Energy */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Processing Energy</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {result.processing_energy_kwh.toFixed(2)} kWh
                  </p>
                </div>

                {/* Idle Energy */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Idle Energy</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {result.idle_energy_kwh.toFixed(2)} kWh
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Batch Upload Tab */}
      {activeTab === "batch" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 space-y-1">
            <h2 className="text-lg font-semibold text-card-foreground">Batch Upload</h2>
            <p className="text-sm text-muted-foreground">
              Upload multiple operations via CSV for bulk calculations
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <UploadIcon />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">
              Drag and drop your CSV file here
            </p>
            <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
            <button className="mt-4 inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              Select File
            </button>
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === "api" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 space-y-1">
            <h2 className="text-lg font-semibold text-card-foreground">API Access</h2>
            <p className="text-sm text-muted-foreground">
              Integrate CarbonCAM into your systems via REST API
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">API Endpoint</p>
              <code className="block rounded bg-background p-3 font-mono text-sm text-muted-foreground">
                POST /api/calculate
              </code>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Example Request</p>
              <pre className="overflow-x-auto rounded bg-background p-3 font-mono text-xs text-muted-foreground">
                {`{
  "machine_id": "cnc_1",
  "material_id": "mat_4140",
  "initial_weight_kg": 10,
  "final_weight_kg": 9.2,
  "time_min": 30
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
