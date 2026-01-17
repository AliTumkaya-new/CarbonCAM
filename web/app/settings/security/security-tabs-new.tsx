"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

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
  return d.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function SecurityTabs() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div>
        <Badge variant="outline" className="mb-2">
          SETTINGS
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="mt-2 text-muted-foreground">ISO denetimleri için işlem kayıtları.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Makine kütüphanesi ve takım işlemleri.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-muted-foreground">Yükleniyor…</p>}

          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-sm text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <svg
                  className="h-6 w-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium">Kayıt bulunamadı</p>
              <p className="mt-1 text-sm text-muted-foreground">Henüz aktivite kaydı yok</p>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.actor}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.ip_address || "—"}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {formatTime(item.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
