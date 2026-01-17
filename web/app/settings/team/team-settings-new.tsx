"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";

type OrgMembership = {
  public_user_data?: { identifier?: string; first_name?: string | null; last_name?: string | null };
  role?: string;
  user_id?: string;
};

type OrgInvitation = {
  id?: string;
  email_address?: string;
  role?: string;
};

const ROLE_OPTIONS = [
  { value: "org:admin", label: "Admin" },
  { value: "org:engineer", label: "Engineer" },
  { value: "org:operator", label: "Operator" },
] as const;

function extractDetail(value: unknown) {
  if (typeof value === "object" && value !== null && "detail" in value) {
    return String((value as { detail?: unknown }).detail);
  }
  return null;
}

export default function TeamSettings() {
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("org:engineer");
  const [memberships, setMemberships] = useState<OrgMembership[]>([]);
  const [invitations, setInvitations] = useState<OrgInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled = useMemo(() => {
    if (typeof clerkPk !== "string") return false;
    if (!clerkPk.startsWith("pk_")) return false;
    if (clerkPk.length < 20) return false;
    if (clerkPk.includes("XXXX") || clerkPk.includes("xxxxxxxx")) return false;
    return true;
  }, [clerkPk]);

  useEffect(() => {
    if (!clerkEnabled) return;
    void refresh();
  }, [clerkEnabled]);

  async function refresh() {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/team/members", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(extractDetail(data) ?? "Failed to fetch team");

      const membershipsItems = data?.memberships?.data ?? [];
      const invitationsItems = data?.invitations?.data ?? [];

      setMemberships(membershipsItems);
      setInvitations(invitationsItems);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function invite() {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: inviteRole }),
      });
      if (!res.ok) throw new Error("Invitation failed");

      setEmail("");
      setSuccess("Invitation sent successfully");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(targetUserId: string, role: string) {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/team/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, role }),
      });
      if (!res.ok) throw new Error("Role update failed");

      setSuccess("Role updated successfully");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function removeMember(targetUserId: string) {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/team/members/${targetUserId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Remove failed");

      setSuccess("Member removed successfully");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (!clerkEnabled) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="h-8 w-8 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold">Team Management Disabled</h2>
          <p className="text-center text-muted-foreground">
            Clerk is not configured. Team management features are unavailable.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">Invite members and manage roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Organization</CardTitle>
          <CardDescription>Select an organization to manage team operations</CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationSwitcher />
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <p className="text-sm text-emerald-800">{success}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Invite Member</CardTitle>
          <CardDescription>Send an invitation via email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={invite}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Send Invitation
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Members</CardTitle>
            <CardDescription>Current team members and their roles</CardDescription>
          </div>
          <Button variant="outline" onClick={() => refresh()} disabled={loading}>
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.map((m) => {
                const userId = m.user_id ?? "";
                const name =
                  [m.public_user_data?.first_name, m.public_user_data?.last_name]
                    .filter(Boolean)
                    .join(" ") ||
                  m.public_user_data?.identifier ||
                  userId;

                return (
                  <TableRow key={userId}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{name}</p>
                        {m.public_user_data?.identifier && (
                          <p className="text-sm text-muted-foreground">
                            {m.public_user_data.identifier}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={m.role ?? "org:member"}
                        disabled={loading || !userId}
                        onValueChange={(role) => void changeRole(userId, role)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_OPTIONS.map((r) => (
                            <SelectItem key={r.value} value={r.value}>
                              {r.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={loading || !userId}
                        onClick={() => void removeMember(userId)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {memberships.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    {loading ? "Loading..." : "No members or insufficient permissions"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {invitations.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-semibold">Pending Invitations</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((inv) => (
                    <TableRow key={inv.id ?? inv.email_address}>
                      <TableCell className="font-medium">{inv.email_address}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{inv.role}</Badge>
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
