"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function SentryUserContext() {
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      Sentry.setUser({ id: userId });
    } else {
      Sentry.setUser(null);
    }
  }, [userId]);

  return null;
}
