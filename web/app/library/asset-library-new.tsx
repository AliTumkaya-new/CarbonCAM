"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";

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

function extractDetail(value: unknown) {
  if (typeof value === "object" && value !== null && "detail" in value) {
    return String((value as { detail?: unknown }).detail);
  }
  return null;
}

export default function AssetLibrary() {
  const [tab, setTab] = useState<"machines" | "materials">("machines");
  const [machines, setMachines] = useState<CustomMachine[]>([]);
  const [materials, setMaterials] = useState<CustomMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingMachineId, setEditingMachineId] = useState<string | null>(null);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);

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

  const refresh = useCallback(async (activeTab: "machines" | "materials") => {
    setError(null);
    setLoading(true);
    try {
      const endpoint =
        activeTab === "machines" ? "/api/library/machines" : "/api/library/materials";
      const res = await fetch(endpoint, { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) throw new Error(extractDetail(data) ?? "Failed to fetch");

      if (activeTab === "machines") {
        setMachines(Array.isArray(data) ? data : []);
      } else {
        setMaterials(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(tab);
  }, [tab, refresh]);

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

      if (!payload.name) throw new Error("Machine name is required");

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

      if (!res.ok) throw new Error("Save failed");

      setMachineForm({
        name: "",
        brand: "",
        standby_power_kw: "0",
        max_power_kw: "0",
        efficiency_percent: "85",
      });
      setEditingMachineId(null);
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMachine(id: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/library/machines/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      if (editingMachineId === id) {
        setMachineForm({
          name: "",
          brand: "",
          standby_power_kw: "0",
          max_power_kw: "0",
          efficiency_percent: "85",
        });
        setEditingMachineId(null);
      }
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
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

      if (!payload.name) throw new Error("Material name is required");

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

      if (!res.ok) throw new Error("Save failed");

      setMaterialForm({ name: "", kc_value: "2400", density: "7850" });
      setEditingMaterialId(null);
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMaterial(id: string) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/library/materials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      if (editingMaterialId === id) {
        setMaterialForm({ name: "", kc_value: "2400", density: "7850" });
        setEditingMaterialId(null);
      }
      await refresh(tab);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Asset Library</h1>
        <p className="text-muted-foreground">
          Manage custom machines and materials for your company
        </p>
      </div>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "machines" | "materials")}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        {/* Machines Tab */}
        <TabsContent value="machines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Machine</CardTitle>
              <CardDescription>Create or edit custom CNC machines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="machine-name">Name</Label>
                  <Input
                    id="machine-name"
                    value={machineForm.name}
                    onChange={(e) => setMachineForm((s) => ({ ...s, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="machine-brand">Brand</Label>
                  <Input
                    id="machine-brand"
                    value={machineForm.brand}
                    onChange={(e) => setMachineForm((s) => ({ ...s, brand: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standby">Standby Power (kW)</Label>
                  <Input
                    id="standby"
                    type="number"
                    step="0.1"
                    value={machineForm.standby_power_kw}
                    onChange={(e) =>
                      setMachineForm((s) => ({ ...s, standby_power_kw: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Max Power (kW)</Label>
                  <Input
                    id="max"
                    type="number"
                    step="0.1"
                    value={machineForm.max_power_kw}
                    onChange={(e) =>
                      setMachineForm((s) => ({ ...s, max_power_kw: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="efficiency">Efficiency (%)</Label>
                  <Input
                    id="efficiency"
                    type="number"
                    step="1"
                    value={machineForm.efficiency_percent}
                    onChange={(e) =>
                      setMachineForm((s) => ({ ...s, efficiency_percent: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveMachine}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {editingMachineId ? "Update" : "Add"} Machine
                </Button>
                {editingMachineId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingMachineId(null);
                      setMachineForm({
                        name: "",
                        brand: "",
                        standby_power_kw: "0",
                        max_power_kw: "0",
                        efficiency_percent: "85",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Machines</CardTitle>
              <CardDescription>Your custom machine library</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Machine</TableHead>
                    <TableHead>Standby (kW)</TableHead>
                    <TableHead>Max (kW)</TableHead>
                    <TableHead>Efficiency (%)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machines.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{m.name}</p>
                          {m.brand && <p className="text-sm text-muted-foreground">{m.brand}</p>}
                        </div>
                      </TableCell>
                      <TableCell>{m.standby_power_kw}</TableCell>
                      <TableCell>{m.max_power_kw}</TableCell>
                      <TableCell>{m.efficiency_percent}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingMachineId(m.id);
                              setMachineForm({
                                name: m.name,
                                brand: m.brand ?? "",
                                standby_power_kw: String(m.standby_power_kw),
                                max_power_kw: String(m.max_power_kw),
                                efficiency_percent: String(m.efficiency_percent),
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMachine(m.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {machines.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        {loading ? "Loading..." : "No machines yet"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Material</CardTitle>
              <CardDescription>Create or edit custom materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="material-name">Name</Label>
                  <Input
                    id="material-name"
                    value={materialForm.name}
                    onChange={(e) => setMaterialForm((s) => ({ ...s, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kc">Specific Cutting Energy (k_c)</Label>
                  <Input
                    id="kc"
                    type="number"
                    step="0.1"
                    value={materialForm.kc_value}
                    onChange={(e) => setMaterialForm((s) => ({ ...s, kc_value: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="density">Density</Label>
                  <Input
                    id="density"
                    type="number"
                    step="0.1"
                    value={materialForm.density}
                    onChange={(e) => setMaterialForm((s) => ({ ...s, density: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveMaterial}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {editingMaterialId ? "Update" : "Add"} Material
                </Button>
                {editingMaterialId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingMaterialId(null);
                      setMaterialForm({ name: "", kc_value: "2400", density: "7850" });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materials</CardTitle>
              <CardDescription>Your custom material library</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>k_c</TableHead>
                    <TableHead>Density</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.kc_value}</TableCell>
                      <TableCell>{m.density}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingMaterialId(m.id);
                              setMaterialForm({
                                name: m.name,
                                kc_value: String(m.kc_value),
                                density: String(m.density),
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMaterial(m.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {materials.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        {loading ? "Loading..." : "No materials yet"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
