"use client";

import { CountUp, FadeInOnScroll, StaggerChildren } from "@/app/components/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Check,
  Factory,
  Globe,
  Leaf,
  Library,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: Calculator,
      title: "Precise Calculations",
      description:
        "Physics-based models using actual machine power consumption, material properties, and cutting parameters for ISO 14067 compliant results.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Multi-organization support with role-based access control. Invite team members and manage permissions seamlessly.",
    },
    {
      icon: Library,
      title: "Custom Asset Library",
      description:
        "Add your own machines and materials. Build a company-specific database for consistent, accurate calculations.",
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description:
        "Instant carbon footprint results. Batch process multiple parts and compare different manufacturing scenarios.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "SOC 2 compliant infrastructure. Your manufacturing data stays private with end-to-end encryption.",
    },
    {
      icon: BarChart3,
      title: "Detailed Reports",
      description:
        "Export comprehensive reports for sustainability audits, customer requests, and regulatory compliance.",
    },
  ];

  const stats = [
    { value: 500, suffix: "+", label: "Manufacturers" },
    { value: 2, suffix: "M+", label: "Parts Analyzed" },
    { value: 15, suffix: "%", label: "Avg. Emission Reduction" },
    { value: 99.9, suffix: "%", label: "Uptime" },
  ];

  const testimonials = [
    {
      quote:
        "CarbonCAM transformed how we track emissions. We reduced our carbon footprint by 23% in the first year.",
      author: "Sarah Chen",
      role: "Sustainability Director",
      company: "Precision Parts Co.",
    },
    {
      quote:
        "The accuracy of the calculations and ease of use made it simple to get our entire team onboard.",
      author: "Michael Torres",
      role: "Operations Manager",
      company: "TechMach Industries",
    },
    {
      quote:
        "Finally, a tool built by engineers who understand manufacturing. The custom library feature is a game-changer.",
      author: "Dr. Emma Wilson",
      role: "Chief Engineer",
      company: "GreenTech Manufacturing",
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <FadeInOnScroll>
              <Badge
                variant="outline"
                className="mx-auto px-4 py-2 text-sm font-medium border-emerald-500/30 bg-emerald-500/5"
              >
                <Leaf className="w-4 h-4 mr-2 text-emerald-500" />
                ISO 14067 Certified Carbon Accounting
              </Badge>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                Calculate Carbon
                <br />
                <span className="relative">
                  <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Footprint
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 4 150 4 298 10"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="300" y2="0">
                        <stop stopColor="#059669" />
                        <stop offset="1" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The professional carbon accounting platform for CNC machining operations. Measure,
                track, and reduce emissions with engineering precision.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  <Link href="/sign-up">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 hover:bg-accent"
                >
                  <Link href="/dashboard">View Live Demo</Link>
                </Button>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.4}>
              <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 md:text-5xl">
                    <CountUp end={stat.value} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInOnScroll>
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4">
                <Zap className="w-3 h-3 mr-1" /> Features
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Everything you need for
                <br />
                <span className="text-emerald-600">carbon accounting</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional tools designed by manufacturing engineers, built for sustainability
                teams.
              </p>
            </div>
          </FadeInOnScroll>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <Card className="group relative overflow-hidden border-border p-8 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5">
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 transition-transform group-hover:scale-110">
                      <feature.icon className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </FadeInOnScroll>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <FadeInOnScroll>
              <div className="mb-16 text-center">
                <Badge variant="outline" className="mb-4">
                  <Factory className="w-3 h-3 mr-1" /> How It Works
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Three steps to
                  <br />
                  <span className="text-emerald-600">carbon clarity</span>
                </h2>
              </div>
            </FadeInOnScroll>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Input Part Data",
                  description:
                    "Enter material type, dimensions, and machining parameters. Upload CAD files or use our intuitive form.",
                  icon: Calculator,
                },
                {
                  step: "02",
                  title: "Select Machine & Energy",
                  description:
                    "Choose from our verified machine database or add your own. Set your local electricity carbon intensity.",
                  icon: Factory,
                },
                {
                  step: "03",
                  title: "Get Results",
                  description:
                    "Receive detailed breakdown of emissions by source. Export reports and track progress over time.",
                  icon: BarChart3,
                },
              ].map((item, index) => (
                <FadeInOnScroll key={index} delay={index * 0.15}>
                  <div className="relative">
                    <div className="text-8xl font-bold text-emerald-500/10 absolute -top-4 -left-2">
                      {item.step}
                    </div>
                    <div className="relative pt-12">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInOnScroll>
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4">
                <Users className="w-3 h-3 mr-1" /> Testimonials
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Trusted by leading
                <br />
                <span className="text-emerald-600">manufacturers</span>
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <Card className="p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 grow italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold">
                        {testimonial.author[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <FadeInOnScroll>
          <Card className="relative overflow-hidden border-emerald-500/20 bg-linear-to-br from-emerald-600 to-emerald-700 p-12 text-center text-white md:p-16">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative">
              <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
                Ready to reduce your
                <br />
                manufacturing emissions?
              </h2>
              <p className="mb-8 text-lg text-emerald-100 max-w-2xl mx-auto">
                Join hundreds of manufacturers already using CarbonCAM to track and reduce their
                carbon footprint.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6"
                >
                  <Link href="/sign-up">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </div>
          </Card>
        </FadeInOnScroll>
      </section>
    </main>
  );
}
