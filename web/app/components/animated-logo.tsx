"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AnimatedLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "gradient";
  showSubtitle?: boolean;
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  xs: { text: 16, subtitle: 8, icon: 20, iconPadding: 4 },
  sm: { text: 20, subtitle: 10, icon: 24, iconPadding: 5 },
  md: { text: 24, subtitle: 11, icon: 28, iconPadding: 6 },
  lg: { text: 32, subtitle: 12, icon: 36, iconPadding: 8 },
  xl: { text: 40, subtitle: 14, icon: 44, iconPadding: 10 },
};

const FULL_TEXT = "CarbonCAM";

export default function AnimatedLogo({
  size = "md",
  variant = "gradient",
  showSubtitle = false,
  className = "",
  animated = true,
}: AnimatedLogoProps) {
  const sizes = sizeMap[size];
  const [displayText, setDisplayText] = useState(FULL_TEXT);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const cursorRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);

  // Cursor blink effect
  useEffect(() => {
    if (!animated) return;
    cursorRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => {
      if (cursorRef.current) clearInterval(cursorRef.current);
    };
  }, [animated]);

  const typewriterAnimation = useCallback(() => {
    if (isAnimating || !animated) return;
    setIsAnimating(true);

    let currentIndex = FULL_TEXT.length;
    const deleteSpeed = 60;
    const typeSpeed = 100;
    const pauseAfterDelete = 200;
    const pauseBeforeStart = 100;

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    animationRef.current = setTimeout(() => {
      const deleteChar = () => {
        if (currentIndex > 0) {
          currentIndex--;
          setDisplayText(FULL_TEXT.slice(0, currentIndex));
          animationRef.current = setTimeout(deleteChar, deleteSpeed);
        } else {
          animationRef.current = setTimeout(() => {
            const typeChar = () => {
              if (currentIndex < FULL_TEXT.length) {
                currentIndex++;
                setDisplayText(FULL_TEXT.slice(0, currentIndex));
                animationRef.current = setTimeout(typeChar, typeSpeed);
              } else {
                setIsAnimating(false);
              }
            };
            typeChar();
          }, pauseAfterDelete);
        }
      };
      deleteChar();
    }, pauseBeforeStart);
  }, [isAnimating, animated]);

  // Initial animation on mount - only once
  useEffect(() => {
    if (!animated || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    const t = setTimeout(typewriterAnimation, 800);
    return () => {
      clearTimeout(t);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getColors = () => {
    if (variant === "dark") {
      return { carbon: "#1e293b", cam: "#1e293b", icon: "#059669" };
    }
    if (variant === "light") {
      return { carbon: "#ffffff", cam: "#ffffff", icon: "#10b981" };
    }
    // gradient variant
    return { carbon: "#374151", cam: "#0d9488", icon: "#059669" };
  };

  const colors = getColors();

  // Split text into "Carbon" and "CAM" parts
  const carbonPart = displayText.slice(0, Math.min(6, displayText.length));
  const camPart = displayText.length > 6 ? displayText.slice(6) : "";

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      onMouseEnter={animated ? typewriterAnimation : undefined}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-lg transition-transform duration-300 hover:scale-105"
        style={{
          width: sizes.icon,
          height: sizes.icon,
          padding: sizes.iconPadding,
          background: `linear-gradient(135deg, ${colors.icon} 0%, #0d9488 100%)`,
          boxShadow: "0 2px 8px rgba(5, 150, 105, 0.3)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full text-white"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Leaf icon representing carbon/sustainability */}
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.08 2.4 7.58 5.84 9.19" />
          <path d="M22 12c0-4.08-2.4-7.58-5.84-9.19" />
          <path d="M12 22c5.5 0 10-4.5 10-10" />
          <path d="M2 12c0 5.5 4.5 10 10 10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      </div>

      {/* Text */}
      <div className="relative">
        <div
          className="flex items-center font-bold tracking-tight select-none"
          style={{
            fontSize: `${sizes.text}px`,
            fontFamily:
              "var(--font-maven), var(--font-inter), system-ui, -apple-system, sans-serif",
            minWidth: animated ? `${sizes.text * 4.5}px` : "auto",
            lineHeight: 1.2,
          }}
        >
          {/* Carbon part */}
          <span style={{ color: colors.carbon }}>{carbonPart}</span>
          {/* CAM part */}
          <span style={{ color: colors.cam, fontWeight: 800 }}>{camPart}</span>
          {/* Cursor - only show when animated and animating */}
          {animated && (
            <span
              className="inline-block ml-0.5"
              style={{
                width: "2px",
                height: `${sizes.text * 0.75}px`,
                backgroundColor: colors.cam,
                opacity: isAnimating && showCursor ? 1 : 0,
                transition: "opacity 0.1s",
                marginBottom: `-${sizes.text * 0.05}px`,
              }}
            />
          )}
        </div>

        {showSubtitle && (
          <div
            style={{
              fontSize: `${sizes.subtitle}px`,
              color: variant === "light" ? "rgba(255, 255, 255, 0.7)" : "#64748b",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginTop: "1px",
            }}
          >
            Carbon Footprint Calculator
          </div>
        )}
      </div>
    </div>
  );
}
