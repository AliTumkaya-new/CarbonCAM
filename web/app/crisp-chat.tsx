"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

declare global {
  interface Window {
    $crisp?: Array<unknown>;
    CRISP_WEBSITE_ID?: string;
  }
}

export default function CrispChat() {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  return <CrispChatWithoutClerk websiteId={websiteId} />;
}

type CrispUser = {
  primaryEmailAddress?: { emailAddress?: string | null } | null;
  fullName?: string | null;
} | null;

type CrispOrganization = {
  name?: string | null;
} | null;

function CrispChatImpl({
  websiteId,
  user,
  userLoaded,
  organization,
  orgLoaded,
}: {
  websiteId?: string;
  user: CrispUser;
  userLoaded: boolean;
  organization: CrispOrganization;
  orgLoaded: boolean;
}) {
  // 1) Load Crisp script once (only on client).
  useEffect(() => {
    if (!websiteId) {
      console.warn("⚠️  Crisp Chat: NEXT_PUBLIC_CRISP_WEBSITE_ID not configured");
      return;
    }

    window.$crisp = window.$crisp ?? [];
    window.CRISP_WEBSITE_ID = websiteId;

    const alreadyLoaded = Boolean(document.getElementById("crisp-chat-script"));
    if (alreadyLoaded) return;

    const script = document.createElement("script");
    script.id = "crisp-chat-script";
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
  }, [websiteId]);

  // 2) When user/org info is available, push metadata to Crisp.
  useEffect(() => {
    if (!websiteId) return;
    if (!userLoaded) return;
    if (!user) return;

    const email = user.primaryEmailAddress?.emailAddress ?? undefined;
    const fullName = user.fullName ?? undefined;
    const companyName = orgLoaded ? organization?.name ?? undefined : undefined;

    const crisp = window.$crisp;
    if (!crisp) return;

    if (email) crisp.push(["set", "user:email", [email]]);
    if (fullName) crisp.push(["set", "user:nickname", [fullName]]);
    if (companyName) crisp.push(["set", "user:company", [companyName]]);
  }, [websiteId, userLoaded, user, orgLoaded, organization]);

  return null;
}

export function CrispChatWithClerk({ websiteId }: { websiteId?: string }) {
  const { user, isLoaded } = useUser();
  const { organization, isLoaded: orgLoaded } = useOrganization();

  return (
    <CrispChatImpl
      websiteId={websiteId}
      user={user ?? null}
      userLoaded={isLoaded}
      organization={organization ?? null}
      orgLoaded={orgLoaded}
    />
  );
}

export function CrispChatWithoutClerk({ websiteId }: { websiteId?: string }) {
  return (
    <CrispChatImpl
      websiteId={websiteId}
      user={null}
      userLoaded={true}
      organization={null}
      orgLoaded={true}
    />
  );
}
