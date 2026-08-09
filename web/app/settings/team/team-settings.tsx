"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";

type OrgMembership = {
  public_user_data?: { identifier?: string; first_name?: string | null; last_name?: string | null; image_url?: string };
  role?: string;
  user_id?: string;
};

type OrgInvitation = {
  id?: string;
  email_address?: string;
  role?: string;
  created_at?: number;
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
  const [info, setInfo] = useState<string | null>(null);

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
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch("/api/team/members", { cache: "no-store" });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Takım bilgisi alınamadı.");

      const membershipsItems =
        typeof data === "object" && data !== null && "memberships" in data
          ? (data as { memberships: { data?: OrgMembership[] } }).memberships?.data ?? []
          : [];
      const invitationsItems =
        typeof data === "object" && data !== null && "invitations" in data
          ? (data as { invitations: { data?: OrgInvitation[] } }).invitations?.data ?? []
          : [];

      setMemberships(membershipsItems);
      setInvitations(invitationsItems);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function invite() {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: inviteRole }),
      });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Davet gönderilemedi.");

      setEmail("");
      setInfo("Davet gönderildi.");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(targetUserId: string, role: string) {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch("/api/team/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, role }),
      });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Rol güncellenemedi.");

      setInfo("Rol güncellendi.");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function removeMember(targetUserId: string) {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/team/members/${targetUserId}`, { method: "DELETE" });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(extractDetail(data) ?? "Üye kaldırılamadı.");

      setInfo("Üye kaldırıldı.");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Beklenmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  if (!clerkEnabled) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Settings</p>
        <h1 className="mt-2 text-lg font-semibold text-slate-900">Team</h1>
        <p className="mt-2 text-sm text-slate-600">Clerk yapılandırılmadığı için takım yönetimi devre dışı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Settings</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">Team</h1>
        <p className="mt-2 text-sm text-slate-600">Üye davet edin, rollerini yönetin.</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Active Organization</div>
            <div className="mt-1 text-xs text-slate-500">Takım işlemleri için bir organizasyon seçin.</div>
          </div>
          <OrganizationSwitcher />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
          {error}
        </div>
      ) : null}

      {info ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {info}
        </div>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Invite member</h2>
            <p className="mt-1 text-sm text-slate-500">E-mail ile davet gönderin.</p>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => void invite()}
            className="inline-flex h-10 items-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            Invite Member
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Rol</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Members</h2>
            <p className="mt-1 text-sm text-slate-500">Mevcut üyeler ve rolleri.</p>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => void refresh()}
            className="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {memberships.map((m) => {
                const userId = m.user_id ?? "";
                const name =
                  [m.public_user_data?.first_name, m.public_user_data?.last_name].filter(Boolean).join(" ") ||
                  m.public_user_data?.identifier ||
                  userId;

                return (
                  <tr key={userId} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{name}</div>
                      <div className="text-xs text-slate-500">{m.public_user_data?.identifier ?? ""}</div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={m.role ?? "org:member"}
                        disabled={loading || !userId}
                        onChange={(e) => void changeRole(userId, e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          disabled={loading || !userId}
                          onClick={() => void removeMember(userId)}
                          className="inline-flex h-9 items-center rounded-xl border border-orange-200 bg-white px-3 text-sm font-semibold text-orange-700 shadow-sm transition-colors hover:bg-orange-50 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {memberships.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-sm text-slate-500">
                    {loading ? "Yükleniyor..." : "Üye yok veya yetkiniz yok."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Pending invitations</h3>
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invitations.map((inv) => (
                  <tr key={inv.id ?? inv.email_address} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{inv.email_address}</td>
                    <td className="px-4 py-3 text-slate-700">{inv.role}</td>
                  </tr>
                ))}
                {invitations.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-6 text-center text-sm text-slate-500">
                      {loading ? "Yükleniyor..." : "Bekleyen davet yok."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
