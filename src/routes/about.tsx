import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Counter, Pill, Reveal, SectionHead } from "@/components/site/primitives";
import { AFTER_IMG, CITIES } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WashOnCall — India's Doorstep Wash Marketplace" },
      {
        name: "description",
        content:
          "WashOnCall connects vehicle owners with verified washing companies across five Indian metros, with transparent pricing and water-saving washes.",
      },
      { property: "og:title", content: "About WashOnCall" },
      {
        property: "og:description",
        content: "Why we built a doorstep vehicle wash marketplace for India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
        <Reveal>
          <Pill tone="cyan" className="mb-6">
            Our story
          </Pill>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Car care shouldn't cost you a Sunday.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            WashOnCall started in a Gurugram basement in 2024, after our founders spent three hours
            queueing at a wash bay. Today we route thousands of doorstep jobs a week to independent
            washing companies who own the craft — while we handle demand, payments and trust.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <img
            src={AFTER_IMG}
            alt="Detailer finishing a glossy car panel"
            className="aspect-[21/9] w-full rounded-3xl object-cover"
          />
        </Reveal>

        <div className="mt-16 grid gap-8 border-y border-border py-12 sm:grid-cols-4">
          {[
            { v: 182000, s: "+", l: "Washes delivered" },
            { v: 640, s: "+", l: "Partner companies" },
            { v: 2100, s: "+", l: "Trained washers" },
            { v: 21, s: "M+", l: "Litres of water saved" },
          ].map((k, i) => (
            <Reveal key={k.l} delay={i * 0.07}>
              <p className="font-display text-3xl font-semibold">
                <Counter to={k.v} suffix={k.s} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {k.l}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <SectionHead
            eyebrow="What we believe"
            title="Marketplace, not middleman."
            sub="Partners set their own prices and keep 80% of every booking. We compete on demand and trust, not on squeezing the people doing the work."
          />
          <div className="space-y-6">
            {[
              ["Transparent by default", "Every checkout shows the provider payout and our platform fee. No hidden charges, ever."],
              ["Water is the point", "A doorstep foam wash uses roughly an eighth of the water a wash bay does. That's the whole reason this model works for Indian cities."],
              ["Local operators win", `We're live across ${CITIES.join(", ")} and expanding only where we can support partners properly.`],
            ].map(([h, p]) => (
              <Reveal key={h}>
                <h3 className="font-display text-lg font-semibold">{h}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <Link
                to="/partners"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Become a partner
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
