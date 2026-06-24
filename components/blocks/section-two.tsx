"use client";

import { TiltCard } from "@/components/site/tilt-card";
import { Database, Cloud, Shield, Settings } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionTwo() {
  return (
    <section
      id="services"
      className={cn(
        "bg-base text-foreground relative z-20",
        "py-16 sm:py-24 md:py-32 px-4 md:px-8",
        "border-y border-line"
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Who We Are / Overview */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <p className="text-xs font-brand uppercase tracking-[0.2em] text-brand">What We Do</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink font-display">
              Engineering resilience for mission-critical systems.
            </h2>
            <p className="text-lg text-ink-secondary leading-relaxed font-normal">
              MetaSoft is a specialized enterprise IT services provider. We deliver proactive database administration, systems engineering, and consulting to ensure critical infrastructure uptime.
            </p>
            <p className="text-sm leading-relaxed text-ink-secondary">
              With over two decades of engineering experience, our team helps organizations reduce operational risks, optimize databases, and transition legacy structures securely to private and public cloud platforms. We focus on technical precision and systems uptime.
            </p>
          </div>
          
          {/* Right Column: 4 Services Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TiltCard delay={0.1} className="h-full">
              <div className="flex flex-col h-full gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">Database Administration</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  24/7 database monitoring, performance tuning, and disaster recovery planning for Oracle and SQL Server.
                </p>
              </div>
            </TiltCard>
            
            <TiltCard delay={0.2} className="h-full">
              <div className="flex flex-col h-full gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Cloud className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">Oracle EBS &amp; Fusion</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Lifecycle support, instance cloning, database patching, and cloud migration for Oracle EBS and Fusion applications.
                </p>
              </div>
            </TiltCard>

            <TiltCard delay={0.3} className="h-full">
              <div className="flex flex-col h-full gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">Cloud Transformation</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Structured database and systems migrations to public and private clouds designed to minimize business disruption.
                </p>
              </div>
            </TiltCard>

            <TiltCard delay={0.4} className="h-full">
              <div className="flex flex-col h-full gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">Systems Administration</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Design, virtualization, active directory integrations, and systems administration for RedHat Enterprise Linux and Windows Server.
                </p>
              </div>
            </TiltCard>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export function SectionTwoDemo() {
  return <SectionTwo />;
}
