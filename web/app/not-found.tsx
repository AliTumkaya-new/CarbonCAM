"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import AnimatedLogo from "@/app/components/animated-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <AnimatedLogo size="lg" variant="gradient" animated={true} />
        </div>

        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[150px] font-black text-slate-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Sayfa Bulunamadı
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          Ana sayfaya dönüp tekrar deneyebilirsiniz.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            <Home className="w-5 h-5" />
            Ana Sayfa
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </button>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-slate-400">
          Yardıma mı ihtiyacınız var?{" "}
          <Link
            href="/help"
            className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
          >
            Destek Merkezi
          </Link>
        </p>
      </div>
    </div>
  );
}
