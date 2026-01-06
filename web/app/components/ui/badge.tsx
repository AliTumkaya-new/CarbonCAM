"use client";

import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", size = "md", className = "", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all duration-300";

    const variants = {
      default: "bg-slate-100 text-slate-700 border border-slate-200",
      success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      warning: "bg-orange-100 text-orange-700 border border-orange-200",
      danger: "bg-red-100 text-red-700 border border-red-200",
      info: "bg-blue-100 text-blue-700 border border-blue-200",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export const GradientBadge = forwardRef<
  HTMLSpanElement,
  Omit<BadgeProps, "variant"> & { gradient?: string }
>(
  (
    { children, gradient = "from-emerald-500 to-teal-500", size = "md", className = "", ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold text-white shadow-lg transition-all duration-300";

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} bg-gradient-to-r ${gradient} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientBadge.displayName = "GradientBadge";
