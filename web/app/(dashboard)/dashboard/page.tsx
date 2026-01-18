"use client";

import { useEffect, useState } from "react";
import DashboardTabs from "../../dashboard/dashboard-tabs-new";

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

const NeutralIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
    />
  </svg>
);

const BoltIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
);

const ChartIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CpuIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
    />
  </svg>
);

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

export default function Page() {
  const [summary, setSummary] = useState<Summary>({ total: 0, totalCarbon: 0, totalEnergy: 0 });
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    currentMonth: { carbon: 0, energy: 0, count: 0 },
    previousMonth: { carbon: 0, energy: 0, count: 0 },
    trends: { carbon: 0, energy: 0, count: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/results", { cache: "no-store" });
        const data = await res.json();
        setSummary(data.summary || { total: 0, totalCarbon: 0, totalEnergy: 0 });
        setMonthlyStats(
          data.monthlyStats || {
            currentMonth: { carbon: 0, energy: 0, count: 0 },
            previousMonth: { carbon: 0, energy: 0, count: 0 },
            trends: { carbon: 0, energy: 0, count: 0 },
          }
        );
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  // Format trend display
  const formatTrend = (value: number) => {
    if (value === 0) return "0%";
    return value > 0 ? `+${value}%` : `${value}%`;
  };

  // Get trend icon based on value and whether lower is better
  const getTrendIcon = (value: number, lowerIsBetter: boolean = false) => {
    if (value === 0) return <NeutralIcon />;
    if (lowerIsBetter) {
      return value < 0 ? <TrendDownIcon /> : <TrendUpIcon />;
    }
    return value > 0 ? <TrendUpIcon /> : <TrendDownIcon />;
  };

  // Get if trend is positive (good)
  const isTrendPositive = (value: number, lowerIsBetter: boolean = false) => {
    if (value === 0) return true;
    if (lowerIsBetter) return value <= 0;
    return value >= 0;
  };

  // Format number with appropriate suffix
  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(decimals);
  };

  const stats = [
    {
      label: "Total Carbon",
      value: loading ? "--" : `${formatNumber(summary.totalCarbon)} kg`,
      subtext: "CO₂ emissions (all time)",
      icon: <LeafIcon />,
      color: "emerald",
      trend: formatTrend(monthlyStats.trends.carbon),
      trendValue: monthlyStats.trends.carbon,
      lowerIsBetter: true, // For carbon, lower is better
    },
    {
      label: "Total Energy",
      value: loading ? "--" : `${formatNumber(summary.totalEnergy)} kWh`,
      subtext: "Energy consumed (all time)",
      icon: <BoltIcon />,
      color: "amber",
      trend: formatTrend(monthlyStats.trends.energy),
      trendValue: monthlyStats.trends.energy,
      lowerIsBetter: true, // For energy, lower is better
    },
    {
      label: "Calculations",
      value: loading ? "--" : summary.total.toString(),
      subtext: "Total analyses",
      icon: <ChartIcon />,
      color: "blue",
      trend: formatTrend(monthlyStats.trends.count),
      trendValue: monthlyStats.trends.count,
      lowerIsBetter: false,
    },
    {
      label: "This Month",
      value: loading ? "--" : monthlyStats.currentMonth.count.toString(),
      subtext: `${formatNumber(monthlyStats.currentMonth.carbon, 1)} kg CO₂`,
      icon: <ClockIcon />,
      color: "purple",
      trend: formatTrend(monthlyStats.trends.count),
      trendValue: monthlyStats.trends.count,
      lowerIsBetter: false,
    },
  ];

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-100 dark:border-emerald-800/30",
      icon: "text-emerald-600 dark:text-emerald-400",
      trendPositive: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50",
      trendNegative: "text-red-600 bg-red-100 dark:bg-red-900/50",
      trendNeutral: "text-gray-600 bg-gray-100 dark:bg-gray-700/50",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-100 dark:border-amber-800/30",
      icon: "text-amber-600 dark:text-amber-400",
      trendPositive: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50",
      trendNegative: "text-red-600 bg-red-100 dark:bg-red-900/50",
      trendNeutral: "text-gray-600 bg-gray-100 dark:bg-gray-700/50",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-100 dark:border-blue-800/30",
      icon: "text-blue-600 dark:text-blue-400",
      trendPositive: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50",
      trendNegative: "text-red-600 bg-red-100 dark:bg-red-900/50",
      trendNeutral: "text-gray-600 bg-gray-100 dark:bg-gray-700/50",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-100 dark:border-purple-800/30",
      icon: "text-purple-600 dark:text-purple-400",
      trendPositive: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50",
      trendNegative: "text-red-600 bg-red-100 dark:bg-red-900/50",
      trendNeutral: "text-gray-600 bg-gray-100 dark:bg-gray-700/50",
    },
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Track your carbon footprint and energy consumption.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
            <CpuIcon />
            <span>AI-Powered Analysis</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colors = colorClasses[stat.color as keyof typeof colorClasses];
          const isPositive = isTrendPositive(stat.trendValue, stat.lowerIsBetter);
          const trendClass =
            stat.trendValue === 0
              ? colors.trendNeutral
              : isPositive
                ? colors.trendPositive
                : colors.trendNegative;

          return (
            <div
              key={stat.label}
              className={`${colors.bg} ${colors.border} border rounded-2xl p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${colors.bg}`}>
                  <span className={colors.icon}>{stat.icon}</span>
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendClass}`}
                >
                  {getTrendIcon(stat.trendValue, stat.lowerIsBetter)}
                  {stat.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Quick Start Guide</h3>
          <p className="text-emerald-100 text-sm mb-4">
            Calculate your machine&apos;s carbon footprint in 3 simple steps:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 font-bold">
                1
              </div>
              <h4 className="font-medium text-sm">Upload Photo</h4>
              <p className="text-xs text-emerald-100 mt-1">
                Take a photo of your machine or upload from gallery
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 font-bold">
                2
              </div>
              <h4 className="font-medium text-sm">AI Analysis</h4>
              <p className="text-xs text-emerald-100 mt-1">
                Our AI identifies the machine and its specifications
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 font-bold">
                3
              </div>
              <h4 className="font-medium text-sm">Get Results</h4>
              <p className="text-xs text-emerald-100 mt-1">
                View detailed carbon footprint analysis instantly
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Updates
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  AI Photo Analysis improved
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  New machine database added
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">API v2 now available</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Carbon Calculator</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Calculate emissions using manual input, AI photo analysis, or batch upload
          </p>
        </div>
        <div className="p-0">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
}
