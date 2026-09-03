import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, ShieldCheck, Droplets, MessageSquare } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal, SectionHead } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help, Safety & FAQs — WashOnCall" },
      {
        name: "description",
        content:
          "Answers on doorstep wash timings, water usage, safety checks, payments and rewash guarantees, plus ways to reach support.",
      },
      { property: "og:title", content: "Help, Safety & FAQs — WashOnCall" },
      {
        property: "og:description",
        content: "Everything about doorstep washes: safety, water use, payments and guarantees.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Help,
});

const FAQ: [string, string][] = [
  ["Do you need water and electricity from me?", "No. Every washer arrives with a 40-litre tank, a battery-powered pressure unit and their own foam kit. If you'd like to provide a tap, we'll use it and reduce the price by ₹30."],
  ["How much water does a doorstep wash use?", "Around 12–15 litres per car versus 120+ litres at a traditional wash bay, thanks to low-flow foam and microfibre techniques."],
  ["Is the wash safe for my paint?", "Yes. Partners use pH-neutral snow foam, a two-bucket method and microfibre-only contact. No brushes, no recycled cloth, no swirl marks."],
  ["Can I book for a basement or stilt parking?", "Absolutely — most washes happen in basements. Just note the parking level and slot number in the address field."],
  ["What if I'm not home?", "Share the OTP with your building guard or family member. You'll receive before/after photos on completion either way."],
  ["Which payment methods do you support?", "UPI, credit and debit cards, and netbanking via Razorpay. Cash is not accepted to keep washers safe."],
  ["What if I'm unhappy with the wash?", "Raise it within 24 hours from your booking page. We arrange a free rewash, or refund the package amount if a rewash isn't possible."],
  ["Do you wash bikes and luxury cars?", "Yes. Pricing adjusts by vehicle class, and luxury vehicles are routed only to partners certified for premium paintwork."],
];

function Help() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Support</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Help & safety</h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Real humans, 7am to 11pm, every day. Most answers are right here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Verified washers", d: "Aadhaar, police verification and in-person training for every washer on the platform." },
            { icon: Droplets, t: "Eco by design", d: "Low-water foam wash, biodegradable chemicals and zero runoff into storm drains." },
            { icon: LifeBuoy, t: "24h rewash promise", d: "Not happy? Flag it within a day and we make it right, free." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-border bg-card/50 p-6">
                <c.icon size={18} className="text-primary" />
                <h2 className="mt-4 font-semibold">{c.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_20rem]">
          <div>
            <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
            <Accordion type="single" collapsible className="mt-8">
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
          <aside className="h-fit rounded-3xl border border-border bg-card/60 p-6 backdrop-blur lg:sticky lg:top-24">
            <MessageSquare size={18} className="text-primary" />
            <h2 className="mt-4 font-display text-lg font-semibold">Still stuck?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Chat with support or write to us — we reply within 2 hours on working days.
            </p>
            <Link
              to="/contact"
              className="mt-6 block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Contact support
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              support@washoncall.in · 1800 200 4321
            </p>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
