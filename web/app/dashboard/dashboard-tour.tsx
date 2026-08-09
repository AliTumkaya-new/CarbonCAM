"use client";

import { useEffect } from "react";
import { driver, type DriveStep } from "driver.js";

const TOUR_KEY = "carboncam_onboarding_dashboard_v1";

export default function DashboardTour(props: { enabled?: boolean }) {
  const enabled = props.enabled ?? true;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    try {
      if (localStorage.getItem(TOUR_KEY) === "1") return;
    } catch {
      return;
    }

    const steps: DriveStep[] = [
      {
        element: '[data-tour="new-calculation"]',
        popover: {
          description: "Buradan ilk karbon hesabınızı yapın.",
        },
      },
      {
        element: '[data-tour="machines-tab"]',
        popover: {
          description: "Fabrikanızdaki tezgahları buradan tanımlayın.",
        },
      },
      {
        element: '[data-tour="balance"]',
        popover: {
          description: "Kalan haklarınızı buradan takip edin.",
        },
      },
    ].filter((s) => {
      try {
        return typeof s.element === "string" && document.querySelector(s.element);
      } catch {
        return false;
      }
    });

    if (steps.length === 0) return;

    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {
      // ignore
    }

    const d = driver({
      steps,
      overlayOpacity: 0.75,
      stagePadding: 8,
      showProgress: false,
      nextBtnText: "İleri",
      prevBtnText: "Geri",
      doneBtnText: "Bitti",
    });

    d.drive();

    return () => {
      try {
        d.destroy();
      } catch {
        // ignore
      }
    };
  }, [enabled]);

  return null;
}
