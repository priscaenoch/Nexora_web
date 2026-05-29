'use client';

import React, { useState } from "react";
import { Wallet, Rocket, HeartHandshake, Zap, LayoutList, LayoutGrid } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="w-7 h-7 text-primary" />,
    step: "01",
    title: "Connect Wallet",
    description:
      "Link your Stellar wallet (Freighter, Albedo, or Lobstr) to authenticate and enable on-chain transactions.",
  },
  {
    icon: <Rocket className="w-7 h-7 text-primary" />,
    step: "02",
    title: "Launch Campaign",
    description:
      "Create a verified fundraising campaign with your goal, story, and milestones — live on the Stellar blockchain.",
  },
  {
    icon: <HeartHandshake className="w-7 h-7 text-primary" />,
    step: "03",
    title: "Receive Donations",
    description:
      "Donors contribute XLM or Stellar assets directly to your campaign wallet with full on-chain transparency.",
  },
  {
    icon: <Zap className="w-7 h-7 text-primary" />,
    step: "04",
    title: "Automated Release",
    description:
      "Funds are released automatically via smart contracts when milestones are met — no intermediaries needed.",
  },
];

export default function HowItWorks() {
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-14 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Four simple steps to make a transparent, verifiable impact.
            </p>
          </div>

          {/* Layout toggle */}
          <div
            className="flex items-center gap-1 self-center sm:self-auto bg-muted rounded-lg p-1"
            role="group"
            aria-label="Toggle layout"
          >
            <button
              onClick={() => setLayout("horizontal")}
              aria-pressed={layout === "horizontal"}
              aria-label="Grid layout"
              className={`p-2 rounded-md transition-colors ${
                layout === "horizontal"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("vertical")}
              aria-pressed={layout === "vertical"}
              aria-label="List layout"
              className={`p-2 rounded-md transition-colors ${
                layout === "vertical"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Steps */}
        {layout === "horizontal" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, idx) => (
              <div key={s.step} className="flex flex-col items-center text-center gap-4 relative">
                {/* Connector line between steps (desktop) */}
                {idx < steps.length - 1 && (
                  <span
                    className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-background border border-border rounded-full w-6 h-6 flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-5 p-5 rounded-2xl border border-border bg-card hover:shadow-sm transition-shadow"
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-background border border-border rounded-full w-6 h-6 flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
