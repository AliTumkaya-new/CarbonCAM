"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";

type Calculation = {
  id: string;
  machine_name: string;
  material_name: string;
  initial_weight_kg: number;
  final_weight_kg: number;
  process_time_minutes: number;
  total_energy_kwh: number;
  total_carbon_kg: number;
  carbon_intensity: number;
  created_at: string;
};

type Summary = {
  total: number;
  totalCarbon: number;
  totalEnergy: number;
};

type MonthlyStats = {
  currentMonth: { carbon: number; energy: number; count: number };
  previousMonth: { carbon: number; energy: number; count: number };
  trends: { carbon: number; energy: number; count: number };
};

// Icons
const TrendUpIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  </svg>
);

const TrendDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
    />
  </svg>
);

export default function Page() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: 0, totalCarbon: 0, totalEnergy: 0 });
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    currentMonth: { carbon: 0, energy: 0, count: 0 },
    previousMonth: { carbon: 0, energy: 0, count: 0 },
    trends: { carbon: 0, energy: 0, count: 0 },
  });
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch("/api/results", { cache: "no-store" });
      const data = await res.json();
      setCalculations(data.calculations || []);
      setSummary(data.summary || { total: 0, totalCarbon: 0, totalEnergy: 0 });
      setMonthlyStats(
        data.monthlyStats || {
          currentMonth: { carbon: 0, energy: 0, count: 0 },
          previousMonth: { carbon: 0, energy: 0, count: 0 },
          trends: { carbon: 0, energy: 0, count: 0 },
        }
      );
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Format trend display
  const formatTrend = (value: number) => {
    if (value === 0) return "0%";
    return value > 0 ? `+${value}%` : `${value}%`;
  };

  // For carbon/energy, lower is better (negative = good)
  const isTrendPositive = (value: number, lowerIsBetter: boolean = false) => {
    if (value === 0) return true;
    if (lowerIsBetter) return value <= 0;
    return value >= 0;
  };

  useEffect(() => {
    void fetchResults();
  }, [fetchResults]);

  const deleteCalculation = async (id: string) => {
    try {
      await fetch(`/api/results?id=${id}`, { method: "DELETE" });
      await fetchResults();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportCSV = () => {
    if (calculations.length === 0) return;

    const headers = [
      "Tarih",
      "Makine",
      "Malzeme",
      "Başlangıç (kg)",
      "Bitiş (kg)",
      "Süre (dk)",
      "Enerji (kWh)",
      "Karbon (kg CO₂)",
    ];

    const rows = calculations.map((c) => [
      formatDate(c.created_at),
      c.machine_name,
      c.material_name,
      c.initial_weight_kg.toFixed(2),
      c.final_weight_kg.toFixed(2),
      c.process_time_minutes.toFixed(0),
      c.total_energy_kwh.toFixed(4),
      c.total_carbon_kg.toFixed(4),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `carboncam-results-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Sonuçlar</h1>
          <p className="text-muted-foreground">Hesaplama geçmişi ve raporlarınız</p>
        </div>
        {calculations.length > 0 && (
          <Button onClick={exportCSV} variant="outline">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            CSV İndir
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 dark:border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Hesaplama</CardTitle>
            <svg
              className="h-4 w-4 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">işlem kaydedildi</p>
              {monthlyStats.trends.count !== 0 && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    isTrendPositive(monthlyStats.trends.count, false)
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {monthlyStats.trends.count > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  {formatTrend(monthlyStats.trends.count)} bu ay
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 dark:border-amber-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Enerji</CardTitle>
            <svg
              className="h-4 w-4 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalEnergy.toFixed(2)} kWh</div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">enerji tüketildi</p>
              {monthlyStats.trends.energy !== 0 && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    isTrendPositive(monthlyStats.trends.energy, true)
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {monthlyStats.trends.energy < 0 ? <TrendDownIcon /> : <TrendUpIcon />}
                  {formatTrend(monthlyStats.trends.energy)} bu ay
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Karbon</CardTitle>
            <svg
              className="h-4 w-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {summary.totalCarbon.toFixed(2)} kg
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">CO₂ emisyonu</p>
              {monthlyStats.trends.carbon !== 0 && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    isTrendPositive(monthlyStats.trends.carbon, true)
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {monthlyStats.trends.carbon < 0 ? <TrendDownIcon /> : <TrendUpIcon />}
                  {formatTrend(monthlyStats.trends.carbon)} bu ay
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      {calculations.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Hesaplama Geçmişi</CardTitle>
            <CardDescription>Son 100 hesaplama sonucu</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Makine</TableHead>
                  <TableHead>Malzeme</TableHead>
                  <TableHead className="text-right">Malzeme (kg)</TableHead>
                  <TableHead className="text-right">Süre</TableHead>
                  <TableHead className="text-right">Enerji</TableHead>
                  <TableHead className="text-right">CO₂</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculations.map((calc) => (
                  <TableRow key={calc.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(calc.created_at)}
                    </TableCell>
                    <TableCell className="font-medium">{calc.machine_name}</TableCell>
                    <TableCell>{calc.material_name}</TableCell>
                    <TableCell className="text-right">
                      {calc.initial_weight_kg.toFixed(1)} → {calc.final_weight_kg.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">{calc.process_time_minutes} dk</TableCell>
                    <TableCell className="text-right">
                      {calc.total_energy_kwh.toFixed(3)} kWh
                    </TableCell>
                    <TableCell className="text-right font-medium text-emerald-600">
                      {calc.total_carbon_kg.toFixed(4)} kg
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCalculation(calc.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-12">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-10 w-10 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h2 className="mb-2 text-2xl font-semibold">Henüz sonuç yok</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Dashboard'dan hesaplama yaparak sonuçlarınızı burada görebilirsiniz
            </p>

            <Button asChild>
              <a href="/dashboard">Dashboard'a Git</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
