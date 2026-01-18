"use client";

import AnimatedLogo from "@/app/components/animated-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Icons
const DashboardIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const ResultsIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const LibraryIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

const ReportsIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ApiIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const TeamIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SecurityIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const HelpIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
  </svg>
);

const BoltIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BellIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const ExpandIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
  </svg>
);

const CollapseIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
  </svg>
);

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  external?: boolean;
  badge?: string;
};

type MonthlyStats = {
  currentMonth: { carbon: number; energy: number; count: number };
  previousMonth: { carbon: number; energy: number; count: number };
  trends: { carbon: number; energy: number; count: number };
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    currentMonth: { carbon: 0, energy: 0, count: 0 },
    previousMonth: { carbon: 0, energy: 0, count: 0 },
    trends: { carbon: 0, energy: 0, count: 0 }
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled =
    typeof publishableKey === "string" &&
    publishableKey.startsWith("pk_") &&
    publishableKey.length >= 20 &&
    !publishableKey.includes("XXXX") &&
    !publishableKey.includes("xxxxxxxx");

  // Fetch monthly stats for sidebar
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/results", { cache: "no-store" });
        const data = await res.json();
        if (data.monthlyStats) {
          setMonthlyStats(data.monthlyStats);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Check if settings submenu should be open
  useEffect(() => {
    if (pathname.startsWith("/settings")) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  // Format number helper
  const formatNumber = (num: number, decimals: number = 1) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(decimals)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(decimals)}K`;
    return num.toFixed(decimals);
  };

  const mainNavItems: NavItem[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      description: "Overview & Calculator",
    },
    {
      href: "/results",
      label: "Results",
      icon: <ResultsIcon />,
      description: "Calculation History",
      badge: "New",
    },
    {
      href: "/library",
      label: "Asset Library",
      icon: <LibraryIcon />,
      description: "Machines & Materials",
    },
  ];

  const toolsNavItems: NavItem[] = [
    {
      href: "/dashboard?tab=api",
      label: "API Access",
      icon: <ApiIcon />,
      description: "Developer Tools",
    },
    {
      href: "/docs",
      label: "Documentation",
      icon: <ReportsIcon />,
      description: "API & Integration Docs",
      external: true,
    },
  ];

  const settingsNavItems: NavItem[] = [
    {
      href: "/settings/team",
      label: "Team Management",
      icon: <TeamIcon />,
      description: "Manage team members",
    },
    {
      href: "/settings/security",
      label: "Security",
      icon: <SecurityIcon />,
      description: "Account security",
    },
  ];

  const NavLink = ({ item, collapsed = false }: { item: NavItem; collapsed?: boolean }) => {
    const isActive = item.href === "/dashboard" 
      ? pathname === "/dashboard" || pathname === "/dashboard/"
      : pathname === item.href || pathname.startsWith(item.href + "/");
    
    const LinkContent = (
      <>
        <span className={cn(
          "flex-shrink-0 transition-colors",
          isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
        )}>
          {item.icon}
        </span>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  {item.badge}
                </span>
              )}
              {item.external && <ExternalLinkIcon />}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{item.description}</p>
          </div>
        )}
      </>
    );

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            collapsed ? "justify-center" : "",
            "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
          )}
          title={collapsed ? item.label : undefined}
        >
          {LinkContent}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          collapsed ? "justify-center" : "",
          isActive
            ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 shadow-sm border border-emerald-100 dark:from-emerald-950/50 dark:to-teal-950/50 dark:text-emerald-50 dark:border-emerald-800/50"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
        )}
        title={collapsed ? item.label : undefined}
        onClick={() => setSidebarOpen(false)}
      >
        {LinkContent}
      </Link>
    );
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Logo Section */}
      <div className={cn(
        "flex items-center border-b border-gray-200 dark:border-gray-700/50 px-4",
        collapsed ? "justify-center h-16" : "h-16 gap-3"
      )}>
        <Link href="/" className="transition-opacity hover:opacity-90">
          {collapsed ? (
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white">
              <LeafIcon />
            </div>
          ) : (
            <AnimatedLogo size="sm" variant="gradient" animated={true} />
          )}
        </Link>
      </div>

      {/* Quick Stats - Only when not collapsed */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700/50">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-3 border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <LeafIcon />
                <span className="text-xs font-medium">Carbon</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {statsLoading ? "--" : formatNumber(monthlyStats.currentMonth.carbon)}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">kg CO₂ this month</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-3 border border-amber-100 dark:border-amber-800/30">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                <BoltIcon />
                <span className="text-xs font-medium">Energy</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {statsLoading ? "--" : formatNumber(monthlyStats.currentMonth.energy)}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">kWh this month</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Navigation */}
        <div>
          {!collapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Main Menu
            </h3>
          )}
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* Tools & API */}
        <div>
          {!collapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Tools & API
            </h3>
          )}
          <div className="space-y-1">
            {toolsNavItems.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          {!collapsed ? (
            <>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-full flex items-center justify-between px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <span>Settings</span>
                <span className={cn("transition-transform duration-200", settingsOpen ? "rotate-180" : "")}>
                  <ChevronDownIcon />
                </span>
              </button>
              {settingsOpen && (
                <div className="space-y-1">
                  {settingsNavItems.map((item) => (
                    <NavLink key={item.href} item={item} collapsed={collapsed} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-1">
              <NavLink 
                item={{ href: "/settings/team", label: "Settings", icon: <SettingsIcon />, description: "Settings" }} 
                collapsed={collapsed} 
              />
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className={cn(
        "border-t border-gray-200 dark:border-gray-700/50 p-4",
        collapsed ? "flex justify-center" : ""
      )}>
        {!collapsed ? (
          <div className="space-y-3">
            {/* Help Link */}
            <Link
              href="/help"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            >
              <HelpIcon />
              <span>Help & Support</span>
            </Link>
            
            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white">
              <h4 className="font-semibold text-sm mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-emerald-100 mb-3">Get unlimited calculations and API access</p>
              <Link href="/pricing">
                <Button size="sm" variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
            title="Expand Sidebar"
          >
            <ExpandIcon />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <CloseIcon />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700/50 transition-all duration-300 shadow-sm",
          sidebarCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} />
      </aside>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
      )}>
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/50">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
              >
                <MenuIcon />
              </button>

              {/* Desktop Collapse Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <span className={cn("transition-transform duration-300", sidebarCollapsed ? "rotate-180" : "")}>
                  <CollapseIcon />
                </span>
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search machines, calculations..."
                    className="w-64 lg:w-80 pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700/50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 transition-all placeholder:text-gray-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                <BellIcon />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User */}
              {clerkEnabled ? (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Sign In
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 ring-2 ring-emerald-500/20"
                        }
                      }}
                    />
                  </SignedIn>
                </>
              ) : (
                <div className="text-sm text-muted-foreground px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
                  Auth Disabled
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 py-4 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>© 2026 CarbonCAM</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Industrial Carbon Footprint Calculator</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Terms
              </Link>
              <Link href="/help" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                Help
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
