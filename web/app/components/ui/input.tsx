"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-xl border border-slate-200 bg-white px-4 py-3
              text-sm text-slate-900 placeholder-slate-400
              transition-all duration-300
              focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20
              disabled:cursor-not-allowed disabled:opacity-50
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Select = forwardRef<
  HTMLSelectElement,
  InputHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }
>(({ label, error, className = "", children, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>}
      <select
        ref={ref}
        className={`
            w-full rounded-xl border border-slate-200 bg-white px-4 py-3
            text-sm text-slate-900
            transition-all duration-300
            focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${className}
          `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Select.displayName = "Select";
