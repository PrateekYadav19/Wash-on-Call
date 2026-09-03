import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowUpRight, BadgeIndianRupee, CalendarCheck, Star } from "lucide-react";
import { useState } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { Counter, Pill, Reveal, Stars } from "@/components/site/primitives";
import { BOOKINGS, PACKAGES, inr } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partners/dashboard")({
  head: () => ({
    meta: [
      { title: "Partner Dashboard — WashOnCall" },
      {
        name: "description",
        content:
          "Manage incoming doorstep wash jobs, assign washers, track today's schedule, earnings and payouts.",
      },
      { property: "og:title", content: "Partner Dashboard — WashOnCall" },
      {
        property: "og:description",
        content: "Incoming jobs, washer assignment, earnings and payout history in one view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const EARNINGS = [42, 58, 51, 74, 66, 92, 81, 104, 96, 118, 108, 132];
const WASHERS = ["Suresh K.", "Imran S.", "Deepak Y.", "Manoj P."];

function Dashboard() {
  const [requests, setRequests] = useState(BOOKINGS.slice(0, 3));

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Partner console</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Lustre Auto Spa</h1>
          </div>
          <Pill tone="gold">Top Rated partner · Gurugram</Pill>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarCheck, l: "Jobs today", v: 14, s: "" },
            { icon: BadgeIndianRupee, l: "Earnings this week", v: 86400, s: "", prefix: "₹" },
            { icon: Star, l: "Rating", v: 4.8, s: "", d: 1 },
            { icon: ArrowUpRight, l: "Acceptance rate", v: 96, s: "%" },
          ].map((k, i) => (
            <Reveal key={k.l} delay={i * 0.06}>
              <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur">
                <k.icon size={17} className="text-primary" />
                <p className="mt-4 font-display text-2xl font-semibold">
                  <Counter to={k.v} suffix={k.s} prefix={k.prefix ?? ""} decimals={k.d ?? 0} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {k.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card/50 p-7 backdrop-blur">
            <h2 className="font-display text-lg font-semibold">Incoming job requests</h2>
            <div className="mt-5 space-y-3">
              {requests.map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/30 p-4"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {b.id} · {PACKAGES.find((p) => p.id === b.packageId)?.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {b.vehicle} · {b.slot} · {b.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-xl border border-border bg-card px-3 py-2 text-xs outline-none"
                      aria-label="Assign washer"
                    >
                      {WASHERS.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setRequests((r) => r.filter((x) => x.id !== b.id));
                        toast.success(`${b.id} accepted and assigned`);
                      }}
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setRequests((r) => r.filter((x) => x.id !== b.id));
                        toast.error(`${b.id} declined`);
                      }}
                      className="rounded-xl border border-border px-4 py-2 text-xs"
                    >
                      Decline
                    </button>
                  </div>
                </motion.div>
              ))}
              {requests.length === 0 && (
                <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No pending requests. New jobs appear here instantly.
                </p>
              )}
            </div>

            <h2 className="mt-10 font-display text-lg font-semibold">Earnings · last 12 weeks</h2>
            <div className="mt-6 flex h-44 items-end gap-2">
              {EARNINGS.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(v / 140) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
                  title={`${inr(v * 1000)}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card/50 p-7 backdrop-blur">
              <h2 className="font-display text-lg font-semibold">Today's schedule</h2>
              <div className="mt-5 space-y-3">
                {["9:00 AM", "11:00 AM", "1:00 PM", "4:00 PM", "6:00 PM"].map((t, i) => (
                  <div key={t} className="flex items-center gap-4 text-sm">
                    <span className="w-20 text-muted-foreground">{t}</span>
                    <span
                      className={cn(
                        "flex-1 rounded-xl border px-3 py-2 text-xs",
                        i % 3 === 2
                          ? "border-dashed border-border text-muted-foreground"
                          : "border-primary/30 bg-primary/10",
                      )}
                    >
                      {i % 3 === 2 ? "Open slot" : `${WASHERS[i % 4]} · ${["SUV", "Sedan", "Bike"][i % 3]} foam wash`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/50 p-7 backdrop-blur">
              <h2 className="font-display text-lg font-semibold">Payout history</h2>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  ["Tue, 25 Aug", 64200],
                  ["Tue, 18 Aug", 58900],
                  ["Tue, 11 Aug", 71300],
                ].map(([d, a]) => (
                  <div key={d as string} className="flex justify-between">
                    <span className="text-muted-foreground">{d}</span>
                    <span>{inr(a as number)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Customer rating
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Stars rating={4.8} size={16} /> <span className="text-sm">4.8 · 512 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
