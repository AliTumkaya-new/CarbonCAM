"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex">
      {/* Video Background - Right Side */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/docs/vid/signup-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-emerald-900/40" />

        {/* Content on video */}
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Uretimde Surdurulebilirlik
            <br />
            <span className="text-emerald-400">Artik Olculebilir</span>
          </h2>
          <p className="text-lg text-white/70 max-w-md">
            CNC ve imalat sureclerinizin karbon ayak izini dakikalar icinde hesaplayin.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12 bg-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-bold">
            <span className="text-slate-800">Carbon</span>
            <span className="text-emerald-600">CAM</span>
          </span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Hesap Olusturun</h1>
          <p className="text-slate-500">Karbon ayak izi hesaplamaya baslayin</p>
        </div>

        {/* Clerk Sign Up */}
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-emerald-600 hover:bg-emerald-700 text-sm font-medium h-11 rounded-lg shadow-none",
              card: "shadow-none border-0 p-0 bg-transparent",
              rootBox: "w-full max-w-sm",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm h-11 rounded-lg",
              formFieldLabel: "text-sm font-medium text-slate-700 mb-1",
              formFieldInput:
                "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-11 text-sm",
              footerActionLink: "text-emerald-600 hover:text-emerald-700 font-medium",
              identityPreviewEditButton: "text-emerald-600 hover:text-emerald-700",
              formResendCodeLink: "text-emerald-600 hover:text-emerald-700",
              otpCodeFieldInput: "border-slate-200 focus:border-emerald-500 rounded-lg",
              dividerLine: "bg-slate-200",
              dividerText: "text-slate-400 text-xs",
              footer: "hidden",
            },
            variables: {
              colorPrimary: "#059669",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-500">
          Zaten hesabiniz var mi?{" "}
          <Link href="/sign-in" className="text-emerald-600 font-medium hover:underline">
            Giris Yapin
          </Link>
        </p>
      </div>
    </div>
  );
}
