import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, TrendingUp, Users, Wallet } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { Counter, Pill, Reveal, SectionHead } from "@/components/site/primitives";
import { CITIES, PLATFORM_COMMISSION, inr } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/partners/")({
  head: () => ({
    meta: [
      { title: "Partner With Us — Grow Your Car Wash Business | WashOnCall" },
      {
        name: "description",
        content:
          "List your washing company on WashOnCall, fill idle hours with doorstep jobs and keep 80% of every booking. Weekly payouts, zero onboarding fee.",
      },
      { property: "og:title", content: "Partner With WashOnCall" },
      {
        property: "og:description",
        content: "Fill idle hours with doorstep bookings. Keep 80% of every job, paid weekly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

const FAQ = [
  ["What does it cost to join?", "Nothing upfront. We take a 20% platform commission per completed booking — no listing fee, no subscription."],
  ["How do payouts work?", "Weekly bank transfers every Tuesday for jobs completed in the previous week, with a downloadable statement."],
  ["Do you send us customers outside our area?", "No. You set your service radius and pincodes; we only route jobs inside it."],
  ["Do we need our own equipment?", "Yes — washers must carry water tanks, pressure/foam equipment and microfibre kits. We supply the demand and branding."],
  ["What documents are required?", "Company PAN, GST certificate, address proof and Aadhaar/police verification for each washer."],
];

function PartnersPage() {
  const [bookings, setBookings] = useState(120);
  const [ticket, setTicket] = useState(700);
  const gross = bookings * ticket;
  const net = gross * (1 - PLATFORM_COMMISSION);

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[130px]" />
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
          <Reveal>
            <Pill tone="gold" className="mb-6">
              For washing companies
            </Pill>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Your washers are idle. <span className="text-gradient">Our customers aren't.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Join 640+ partners across {CITIES.length} metros. We bring the demand, payments,
              tracking and support — you bring the shine.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Apply in 3 minutes
              </a>
              <Link
                to="/partners/dashboard"
                className="rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary"
              >
                Preview the dashboard
              </Link>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
            {[
              { icon: TrendingUp, v: 42, s: "%", l: "Average utilisation lift" },
              { icon: Wallet, v: 80, s: "%", l: "You keep per booking" },
              { icon: Users, v: 640, s: "+", l: "Partners onboard" },
            ].map((x, i) => (
              <Reveal key={x.l} delay={i * 0.08}>
                <x.icon size={18} className="text-primary" />
                <p className="mt-3 font-display text-3xl font-semibold">
                  <Counter to={x.v} suffix={x.s} />
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{x.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Earnings calculator"
              title="See what a full month looks like."
              sub="Adjust bookings and average ticket size to estimate your monthly payout after commission."
            />
            <Reveal className="mt-10 space-y-8 rounded-3xl border border-border bg-card/50 p-7">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bookings per month</span>
                  <span>{bookings}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={600}
                  step={10}
                  value={bookings}
                  onChange={(e) => setBookings(+e.target.value)}
                  className="mt-3 w-full accent-[var(--color-primary)]"
                  aria-label="Bookings per month"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average ticket size</span>
                  <span>{inr(ticket)}</span>
                </div>
                <input
                  type="range"
                  min={249}
                  max={2500}
                  step={50}
                  value={ticket}
                  onChange={(e) => setTicket(+e.target.value)}
                  className="mt-3 w-full accent-[var(--color-primary)]"
                  aria-label="Average ticket size"
                />
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross bookings value</span>
                  <span>{inr(gross)}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-muted-foreground">
                    Platform commission ({PLATFORM_COMMISSION * 100}%)
                  </span>
                  <span>− {inr(gross - net)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span>Your monthly payout</span>
                  <span className="font-display text-2xl font-semibold text-primary">
                    {inr(net)}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div id="apply">
            <SectionHead eyebrow="Onboarding" title="Apply to become a partner." />
            <Reveal className="mt-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Application received", {
                    description: "Our city team will call you within 24 hours.",
                  });
                }}
                className="space-y-4 rounded-3xl border border-border bg-card/50 p-7"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Company name" required />
                  <Input label="Contact person" required />
                  <Input label="Phone" type="tel" required />
                  <Input label="Email" type="email" required />
                  <label className="block rounded-2xl border border-border bg-secondary/30 px-4 py-3">
                    <span className="text-xs text-muted-foreground">City</span>
                    <select className="mt-1 w-full bg-transparent text-sm outline-none [&>option]:bg-card">
                      {CITIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <Input label="Team size" type="number" />
                </div>
                <Input label="Services offered" placeholder="Foam wash, interior detail, ceramic…" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {["GST certificate", "KYC / PAN"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toast("Upload placeholder")}
                      className="flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground hover:border-primary/50"
                    >
                      <Upload size={15} /> Upload {d}
                    </button>
                  ))}
                </div>
                <button className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
                  Submit application
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-graphite/30">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
          <SectionHead eyebrow="FAQ" title="Partner questions, answered." center />
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-border">
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteShell>
  );
}

function Input({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block rounded-2xl border border-border bg-secondary/30 px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full bg-transparent text-sm outline-none" />
    </label>
  );
}
