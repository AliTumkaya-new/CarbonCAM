"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Results</h1>
        <p className="text-muted-foreground">View calculation outputs and reports</p>
      </div>

      <Card>
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center p-12">
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

          <h2 className="mb-2 text-2xl font-semibold">No results yet</h2>
          <p className="mb-8 text-center text-muted-foreground">
            Calculation results and reports will appear here
          </p>

          <div className="flex gap-4">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="mb-1 text-3xl font-bold text-emerald-600">0</p>
              <p className="text-sm text-muted-foreground">Reports</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="mb-1 text-3xl font-bold text-emerald-600">0</p>
              <p className="text-sm text-muted-foreground">Calculations</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="mb-1 text-3xl font-bold text-emerald-600">0kg</p>
              <p className="text-sm text-muted-foreground">CO₂</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
