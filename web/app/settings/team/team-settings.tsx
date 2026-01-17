"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";

type OrgMembership = {
  public_user_data?: {
    identifier?: string;
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string;
  };
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
          ? ((data as { memberships: { data?: OrgMembership[] } }).memberships?.data ?? [])
          : [];
      const invitationsItems =
        typeof data === "object" && data !== null && "invitations" in data
          ? ((data as { invitations: { data?: OrgInvitation[] } }).invitations?.data ?? [])
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
      <div
        className="glass-card"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "48px",
          borderRadius: "24px",
          textAlign: "center",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 24px",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="premium-badge" style={{ marginBottom: "16px", justifyContent: "center" }}>
          <span>Settings</span>
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
          Team Management Disabled
        </h1>
        <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "500px", margin: "0 auto" }}>
          Clerk yapılandırılmadığı için takım yönetimi devre dışı.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Modern Header */}
      <header
        className="glass-card"
        style={{
          padding: "48px 40px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.1)",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="premium-badge" style={{ marginBottom: "20px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </div>
        <h1
          className="gradient-text"
          style={{
            fontSize: "48px",
            fontWeight: 900,
            marginBottom: "12px",
            letterSpacing: "-0.03em",
          }}
        >
          Team
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
          Üye davet edin, rollerini yönetin.
        </p>
      </header>

      {/* Organization Switcher Card */}
      <div
        className="glass-card card-hover"
        style={{
          padding: "32px",
          borderRadius: "20px",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div
              style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}
            >
              Active Organization
            </div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Takım işlemleri için bir organizasyon seçin.
            </div>
          </div>
          <OrganizationSwitcher />
        </div>
      </div>

      {error ? (
        <div
          className="glass-card"
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%)",
            border: "1px solid rgba(251, 146, 60, 0.2)",
            animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#ea580c" }}>{error}</span>
          </div>
        </div>
      ) : null}

      {info ? (
        <div
          className="glass-card"
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#059669" }}>{info}</span>
          </div>
        </div>
      ) : null}

      <section
        className="glass-card card-hover"
        style={{
          padding: "40px",
          borderRadius: "24px",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "32px" }}>
          <div>
            <h2
              style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}
            >
              Invite Member
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b" }}>E-mail ile davet gönderin.</p>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => void invite()}
            className="btn-gradient"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "44px",
              padding: "0 24px",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Invite Member
          </button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "8px",
              }}
            >
              E-mail
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="input-focus"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0f172a",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "8px",
              }}
            >
              Rol
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="input-focus"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0f172a",
                backgroundColor: "#fff",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
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

      <section
        className="glass-card card-hover"
        style={{
          padding: "40px",
          borderRadius: "24px",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "32px" }}>
          <div>
            <h2
              style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}
            >
              Members
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b" }}>Mevcut üyeler ve rolleri.</p>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => void refresh()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "40px",
              padding: "0 20px",
              borderRadius: "12px",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              backgroundColor: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              color: "#475569",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/60">
          <table className="w-full text-left text-sm">
            <thead style={{ backgroundColor: "#f8fafc" }}>
              <tr>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  User
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Role
                </th>
                <th style={{ padding: "16px 20px" }} />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {memberships.map((m) => {
                const userId = m.user_id ?? "";
                const name =
                  [m.public_user_data?.first_name, m.public_user_data?.last_name]
                    .filter(Boolean)
                    .join(" ") ||
                  m.public_user_data?.identifier ||
                  userId;

                return (
                  <tr key={userId} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{name}</div>
                      <div className="text-xs text-slate-500">
                        {m.public_user_data?.identifier ?? ""}
                      </div>
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
