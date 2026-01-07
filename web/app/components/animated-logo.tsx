"use client";

import { CSSProperties, useState } from "react";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "gradient";
  showSubtitle?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 32, text: 18, subtitle: 10 },
  md: { icon: 40, text: 22, subtitle: 11 },
  lg: { icon: 48, text: 28, subtitle: 12 },
  xl: { icon: 52, text: 32, subtitle: 13 },
};

export default function AnimatedLogo({
  size = "md",
  variant = "gradient",
  showSubtitle = false,
  className = "",
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sizes = sizeMap[size];

  const iconStyles: CSSProperties = {
    width: `${sizes.icon}px`,
    height: `${sizes.icon}px`,
    background:
      variant === "light"
        ? "rgba(255, 255, 255, 0.15)"
        : "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    borderRadius: size === "sm" ? "8px" : size === "md" ? "10px" : size === "lg" ? "12px" : "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      variant === "light"
        ? "0 10px 30px -4px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(255,255,255,0.1)"
        : "0 4px 12px rgba(16, 185, 129, 0.3)",
    transition: "all 0.3s ease",
    border: variant === "light" ? "2px solid rgba(255, 255, 255, 0.15)" : "none",
  };

  // Stroke color based on variant
  const strokeColor = variant === "dark" ? "#fff" : variant === "light" ? "#fff" : "#10b981";

  // Fill color based on variant
  const fillColor = variant === "dark" ? "#fff" : variant === "light" ? "#fff" : "#0f172a";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Animated Icon */}
      <div style={iconStyles} className="logo-icon-hover">
        <svg
          width={sizes.icon * 0.55}
          height={sizes.icon * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* SVG Text with Stroke Animation */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <svg
          width={sizes.text * 9}
          height={sizes.text * 1.5}
          viewBox="0 0 400 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
          </defs>

          <text
            x="0"
            y="42"
            fontSize={sizes.text * 1.5}
            fontWeight="900"
            fontFamily="'Inter', -apple-system, system-ui, sans-serif"
            letterSpacing="-1"
            className="logo-text"
            fill={
              variant === "dark"
                ? "#fff"
                : variant === "light"
                  ? "url(#lightGradient)"
                  : "url(#textGradient)"
            }
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              fillOpacity: isHovered ? 0 : 1,
              strokeOpacity: isHovered ? 1 : 0,
              strokeDasharray: 600,
              strokeDashoffset: isHovered ? 0 : 600,
              transition: "all 1.2s cubic-bezier(0.47, 0, 0.745, 0.715)",
            }}
          >
            CarbonCAM
          </text>
        </svg>

        {showSubtitle && (
          <div
            style={{
              fontSize: `${sizes.subtitle}px`,
              color:
                variant === "dark" || variant === "light" ? "rgba(255, 255, 255, 0.7)" : "#64748b",
              fontWeight: 600,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            Industrial Platform
          </div>
        )}
      </div>

      <style jsx>{`
        .logo-icon-hover:hover {
          transform: scale(1.08) rotate(-5deg);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
}
