"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin text-emerald-600 ${sizes[size]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function LoadingOverlay({ message = "Yükleniyor..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="rounded-2xl bg-white p-8 shadow-2xl">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-sm font-medium text-slate-700">{message}</p>
      </div>
    </div>
  );
}

export function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-emerald-600"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-emerald-600"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-emerald-600"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}
