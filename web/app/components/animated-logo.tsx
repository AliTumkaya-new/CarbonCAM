"use client";

import { CSSProperties } from "react";

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

  const textStyles: CSSProperties = {
    fontSize: `${sizes.text}px`,
    fontWeight: 900,
    background:
      variant === "dark"
        ? "#fff"
        : variant === "light"
          ? "linear-gradient(135deg, #fff 0%, #f0fdf4 100%)"
          : "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    WebkitBackgroundClip: variant === "gradient" || variant === "light" ? "text" : undefined,
    WebkitTextFillColor: variant === "gradient" || variant === "light" ? "transparent" : undefined,
    backgroundClip: variant === "gradient" || variant === "light" ? "text" : undefined,
    letterSpacing: "-0.03em",
    fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    textShadow: variant === "light" ? "0 2px 10px rgba(255, 255, 255, 0.1)" : undefined,
    color: variant === "dark" ? "#fff" : undefined,
  };

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

      {/* Animated Text */}
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={textStyles}>Carb</span>
          {/* Animated "o" - The Eye */}
          <div
            className="relative inline-flex items-center justify-center mx-0.5"
            style={{ width: `${sizes.text * 0.7}px`, height: `${sizes.text}px` }}
          >
            {/* Eye Open (Circle) */}
            <svg
              viewBox="0 0 24 24"
              className="absolute eye-open"
              style={{ width: `${sizes.text * 0.65}px`, height: `${sizes.text * 0.65}px` }}
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                fill={variant === "dark" ? "#fff" : variant === "light" ? "#fff" : "#0f172a"}
                opacity={variant === "gradient" || variant === "light" ? 0.9 : 1}
              />
            </svg>

            {/* Eye Closed (Curved Line) - Winking */}
            <svg
              viewBox="0 0 24 24"
              className="absolute eye-closed"
              style={{ width: `${sizes.text * 0.65}px`, height: `${sizes.text * 0.65}px` }}
            >
              <path
                d="M 5 12 Q 12 18 19 12"
                fill="none"
                stroke={variant === "dark" ? "#fff" : variant === "light" ? "#fff" : "#0f172a"}
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={variant === "gradient" || variant === "light" ? 0.9 : 1}
              />
            </svg>

            {/* Camera Shutter Effect (Optional Enhancement) */}
            <svg
              viewBox="0 0 24 24"
              className="absolute camera-shutter"
              style={{ width: `${sizes.text * 0.65}px`, height: `${sizes.text * 0.65}px` }}
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke={variant === "dark" ? "#fff" : variant === "light" ? "#fff" : "#10b981"}
                strokeWidth="2"
                strokeDasharray="56.5"
                strokeDashoffset="0"
                opacity="0.4"
              />
            </svg>
          </div>
          <span style={textStyles}>nCAM</span>
        </div>
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

        /* Eye Blink Animation - Logitech Style */
        .eye-open {
          animation: blinkOpen 4s ease-in-out infinite;
        }

        .eye-closed {
          animation: blinkClosed 4s ease-in-out infinite;
          opacity: 0;
        }

        /* Camera Shutter Animation */
        .camera-shutter {
          animation: shutterSpin 4s ease-in-out infinite;
        }

        @keyframes blinkOpen {
          0%,
          44%,
          56%,
          100% {
            opacity: ${variant === "gradient" || variant === "light" ? 0.9 : 1};
            transform: scale(1);
          }
          48%,
          52% {
            opacity: 0;
            transform: scale(0.8);
          }
        }

        @keyframes blinkClosed {
          0%,
          44%,
          56%,
          100% {
            opacity: 0;
            transform: scaleY(0.3);
          }
          48%,
          52% {
            opacity: ${variant === "gradient" || variant === "light" ? 0.9 : 1};
            transform: scaleY(1);
          }
        }

        @keyframes shutterSpin {
          0%,
          44%,
          56%,
          100% {
            stroke-dashoffset: 0;
            opacity: 0.4;
          }
          48%,
          52% {
            stroke-dashoffset: 56.5;
            opacity: 0.8;
            transform: rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}
