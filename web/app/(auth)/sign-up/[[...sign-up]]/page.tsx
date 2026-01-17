"use client";

import AnimatedLogo from "@/app/components/animated-logo";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Check, Zap, Shield, BarChart3, Users, Leaf, Globe, Clock } from "lucide-react";

export default function SignUpPage() {
  const features = [
    {
      icon: Zap,
      title: "Anında Hesaplama",
      desc: "Parça başına CO emisyonunu saniyeler içinde hesaplayın",
    },
    {
      icon: Shield,
      title: "ISO 14067 Uyumlu",
      desc: "Uluslararası standartlara uygun raporlama",
    },
    {
      icon: BarChart3,
      title: "Detaylı Analitik",
      desc: "Makine ve malzeme bazlı karşılaştırmalı analizler",
    },
    {
      icon: Users,
      title: "Ekip Yönetimi",
      desc: "Çoklu kullanıcı ve organizasyon desteği",
    },
    {
      icon: Globe,
      title: "Global Erişim",
      desc: "Dünya genelinde güvenilir bulut altyapısı",
    },
    {
      icon: Clock,
      title: "Gerçek Zamanlı",
      desc: "Anlık güncellenen veriler ve dashboard",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-[45%] flex flex-col bg-white">
        {/* Logo Header */}
        <div className="p-6 lg:p-8">
          <Link href="/" className="inline-block transition-opacity hover:opacity-80">
            <AnimatedLogo size="sm" variant="gradient" animated={false} />
          </Link>
        </div>

        {/* Form Container - Centered */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 pb-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                Hesap Oluşturun
              </h1>
              <p className="text-slate-500 text-lg">
                Üretim süreçlerinizin karbon ayak izini ölçmeye başlayın
              </p>
            </div>

            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-emerald-600 hover:bg-emerald-700 text-sm normal-case font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 border-0 h-12 rounded-xl",
                  card: "shadow-none border-0 p-0",
                  rootBox: "w-full",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "border-slate-200 hover:bg-slate-50 hover:border-emerald-200 text-slate-700 font-medium text-sm transition-all duration-200 rounded-xl h-12",
                  socialButtonsBlockButtonText: "font-medium text-sm",
                  formFieldLabel: "text-sm font-semibold text-slate-700 mb-1.5",
                  formFieldInput:
                    "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-4 rounded-xl transition-all duration-200 h-12 text-base",
                  footerActionLink:
                    "text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors",
                  identityPreviewEditButton: "text-emerald-600 hover:text-emerald-700 font-semibold",
                  formResendCodeLink: "text-emerald-600 hover:text-emerald-700 font-semibold",
                  otpCodeFieldInput:
                    "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-4 transition-all duration-200 rounded-xl h-12",
                  dividerLine: "bg-slate-200",
                  dividerText: "text-slate-400 font-medium text-xs uppercase tracking-wider",
                  footer: "hidden",
                  footerPages: "hidden",
                  footerPagesLink: "hidden",
                  badge: "hidden",
                  footerAction: "hidden",
                  developmentModeNotice: "hidden",
                },
                variables: {
                  colorPrimary: "#059669",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "blockButton",
                  showOptionalFields: true,
                },
              }}
              fallbackRedirectUrl="/dashboard"
            />

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/sign-in"
                  className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors"
                >
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Feature Showcase with Video Background */}
      <div className="hidden lg:flex flex-1 bg-slate-900 relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/docs/vid/signup-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-900/70" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-10 lg:p-14 xl:p-16 w-full">
          {/* Header Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full backdrop-blur-sm">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Sürdürülebilir Üretim Platformu</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            Üretim Süreçlerinizin{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Karbon Ayak İzini
            </span>{" "}
            Ölçün
          </h2>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
            CarbonCAM ile CNC operasyonlarınızın çevresel etkisini analiz edin, 
            optimize edin ve profesyonel raporlar oluşturun.
          </p>

          {/* Features Grid - 2x3 */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-white/10">
            {["14 Gün Ücretsiz Deneme", "Kredi Kartı Gerekmez", "Anında Kurulum", "7/24 Destek"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global styles to hide Clerk development mode elements */}
      <style jsx global>{`
        .cl-footer,
        .cl-footerPages,
        .cl-badge,
        .cl-internal-badge,
        .cl-footerAction,
        .cl-internal-1yevfqy,
        [data-localization-key="footerPageLink__help"],
        [data-localization-key="footerPageLink__privacy"],
        [data-localization-key="footerPageLink__terms"],
        .cl-internal-b3fm6y,
        div[class*="cl-internal"][class*="badge"],
        .cl-userButtonPopoverCard__developmentMode,
        .cl-developmentMode,
        [class*="developmentMode"],
        [class*="Development mode"] {
          display: none !important;
        }
        
        /* Hide "Secured by Clerk" text */
        .cl-footerAction__signUp,
        .cl-footerAction__signIn,
        .cl-powered-by-clerk,
        a[href*="clerk.com"],
        [class*="powered"],
        [class*="secured"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
