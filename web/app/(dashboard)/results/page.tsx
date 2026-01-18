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

export default function Page() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: 0, totalCarbon: 0, totalEnergy: 0 });
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch("/api/results", { cache: "no-store" });
      const data = await res.json();
      setCalculations(data.calculations || []);
      setSummary(data.summary || { total: 0, totalCarbon: 0, totalEnergy: 0 });
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Hesaplama</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
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
            <p className="text-xs text-muted-foreground">işlem kaydedildi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Enerji</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
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
            <p className="text-xs text-muted-foreground">enerji tüketildi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Karbon</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
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
            <p className="text-xs text-muted-foreground">CO₂ emisyonu</p>
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
