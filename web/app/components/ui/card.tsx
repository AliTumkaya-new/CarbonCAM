"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", hover = false, className = "", ...props }, ref) => {
    const baseStyles = "rounded-2xl transition-all duration-300";

    const variants = {
      default: "border border-slate-200 bg-white shadow-lg",
      glass: "glass border border-white/20 shadow-xl",
      gradient: "bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg",
    };

    const hoverStyles = hover ? "hover:scale-105 hover:shadow-2xl cursor-pointer" : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`px-6 pb-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = "CardBody";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <h3 ref={ref} className={`text-xl font-bold text-slate-900 ${className}`} {...props}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, className = "", ...props }, ref) => {
  return (
    <p ref={ref} className={`text-sm text-slate-600 ${className}`} {...props}>
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";
