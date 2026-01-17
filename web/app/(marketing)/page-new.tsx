"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Clean & Minimal */}
      <section className="container mx-auto px-4 py-32">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <Badge variant="outline" className="mx-auto">
            ISO 14067 Certified
          </Badge>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Calculate Carbon Footprint for{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Manufacturing
            </span>
          </h1>

          <p className="text-xl text-muted-foreground">
            Measure, track, and reduce emissions from your CNC machining operations. Professional
            carbon accounting for modern manufacturers.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Features Grid - Minimal Cards */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold">Everything you need</h2>
            <p className="mt-4 text-muted-foreground">
              Professional carbon accounting for manufacturing teams
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Accurate Calculations</h3>
              <p className="text-sm text-muted-foreground">
                Physics-based models using actual machine power consumption and material properties
              </p>
            </Card>

            <Card className="border-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Multi-organization support with role-based access and team management
              </p>
            </Card>

            <Card className="border-border p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Custom Library</h3>
              <p className="text-sm text-muted-foreground">
                Add your own machines and materials for precise company-specific calculations
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="border-border bg-gradient-to-br from-emerald-50 to-background p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to reduce emissions?</h2>
          <p className="mb-8 text-muted-foreground">
            Start measuring your manufacturing carbon footprint today
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2026 CarbonCAM. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
