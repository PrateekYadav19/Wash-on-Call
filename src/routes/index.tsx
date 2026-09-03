import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  CalendarClock,
  Car,
  Droplets,
  Leaf,
  Locate,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Headphones,
  Check,
} from "lucide-react";
import { useRef, useState } from "react";
import { SiteShell } from "@/components/site/site-shell";
import {
  BeforeAfter,
  Counter,
  Pill,
  Reveal,
  SectionHead,
  Stagger,
  StaggerItem,
  Stars,
} from "@/components/site/primitives";
import { ProviderCard } from "@/components/site/provider-card";
import {
  ADDONS,
  AFTER_IMG,
  BEFORE_IMG,
  CITIES,
  HERO_IMG,
  PACKAGES,
  PROVIDERS,
  REVIEWS,
  VEHICLES,
  inr,
  type VehicleType,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WashOnCall — Doorstep Car & Bike Wash, Booked in 60 Seconds" },
      {
        name: "description",
        content:
          "Compare verified doorstep vehicle wash companies near you in Delhi NCR, Mumbai, Bengaluru, Pune and Jaipur. Transparent pricing, live tracking, secure payments.",
      },
      { property: "og:title", content: "WashOnCall — Doorstep Car & Bike Wash" },
      {
        property: "og:description",
        content:
          "Premium doorstep vehicle washing marketplace. Compare partners, book a slot, track your washer live.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [vehicle, setVehicle] = useState<VehicleType>("Hatchback");

  return (
    <section ref={ref} className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Glossy dark car with water droplets after a premium wash"
          className="h-[115%] w-full object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-navy/60 blur-[140px]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-sheen" />

      <motion.div
        style={{ y: y2, opacity }}
        className="relative mx-auto flex max-w-[1280px] flex-col justify-center px-5 pb-24 pt-20 sm:px-8 md:pt-28"
      >
        <Reveal>
          <Pill tone="cyan" className="mb-6 w-fit">
            <Sparkles size={12} /> Live in {CITIES.length} metros
          </Pill>
        </Reveal>
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl md:text-7xl"
        >
          Doorstep Vehicle Wash.
          <br />
          <span className="text-gradient">Premium. On Time.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Compare verified washing companies near you, book a slot and pay securely — all in under
          60 seconds. The washer comes to your address with their own water and equipment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 w-full max-w-3xl rounded-3xl border border-border bg-card/60 p-3 shadow-glow backdrop-blur-xl"
        >
          <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_auto]">
            <label className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3">
              <MapPin size={16} className="shrink-0 text-primary" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter address or pincode"
                aria-label="Your location"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                aria-label="Detect my location"
                onClick={() => setLocation("Sushant Lok Phase 1, Gurugram 122002")}
                className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
              >
                <Locate size={15} />
              </button>
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3">
              <Car size={16} className="shrink-0 text-primary" />
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value as VehicleType)}
                aria-label="Vehicle type"
                className="w-full bg-transparent text-sm outline-none [&>option]:bg-card"
              >
                {VEHICLES.map((v) => (
                  <option key={v.type}>{v.type}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => navigate({ to: "/book", search: { vehicle } })}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              Find Washers
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-y-0 -left-1/2 w-1/4 bg-white/40 blur-md animate-sheen" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-primary" /> Background-verified washers
          </span>
          <span className="flex items-center gap-2">
            <Leaf size={14} className="text-primary" /> Water-saving eco wash
          </span>
          <span className="flex items-center gap-2">
            <Wallet size={14} className="text-primary" /> Secure Razorpay payments
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { label: "Average rating", value: 4.8, decimals: 1, suffix: "" },
    { label: "Washes delivered", value: 182000, suffix: "+" },
    { label: "Verified partners", value: 640, suffix: "+" },
    { label: "Cities served", value: 5, suffix: "" },
  ];
  return (
    <section className="border-y border-border bg-graphite/40">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
            <p className="font-display text-3xl font-semibold sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: MapPin, title: "Share your location", text: "Detect via GPS or enter your pincode and full address." },
    { icon: Star, title: "Compare & choose", text: "Price, rating, experience and distance — side by side." },
    { icon: Droplets, title: "We wash at your door", text: "Live tracking, OTP handoff, before/after photos." },
  ];
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <SectionHead eyebrow="How it works" title="Three steps. Sixty seconds." />
      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-9 hidden h-px origin-left bg-gradient-to-r from-primary/60 via-primary/25 to-transparent md:block"
        />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12} className="relative">
            <div className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border border-primary/25 bg-card">
              <s.icon className="text-primary" size={22} />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Step {i + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: ShieldCheck, t: "Verified partners", d: "KYC, GST and insurance checked before onboarding." },
    { icon: Sparkles, t: "Trained washers", d: "Microfibre-only contact, pH-neutral foam, no swirl marks." },
    { icon: Leaf, t: "Water-saving eco wash", d: "Under 15 litres per car versus 120+ at a station." },
    { icon: Locate, t: "Live tracking", d: "Washer ETA, OTP handoff and photo proof at every step." },
    { icon: Wallet, t: "Secure payments", d: "UPI, cards and netbanking via Razorpay. Instant refunds." },
    { icon: Headphones, t: "Real support", d: "Human help 7am–11pm, rewash guarantee within 24 hours." },
  ];
  return (
    <section className="border-y border-border bg-graphite/30">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
        <SectionHead eyebrow="Why WashOnCall" title="Built for people who care about their car." />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <StaggerItem key={i.t}>
              <div className="group h-full rounded-3xl border border-border bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-lift">
                <i.icon className="text-primary transition-transform duration-300 group-hover:scale-110" size={20} />
                <h3 className="mt-5 text-base font-semibold">{i.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeaturedProviders() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Top partners"
          title="Detailing studios near you."
          sub="Every partner is verified, rated by real customers and priced transparently."
        />
        <Reveal>
          <Link
            to="/providers"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:bg-secondary"
          >
            Browse all providers
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
        {PROVIDERS.slice(0, 6).map((p) => (
          <div key={p.id} className="w-[19rem] shrink-0 snap-start">
            <ProviderCard provider={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="border-y border-border bg-graphite/30">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
        <SectionHead
          eyebrow="Packages"
          title="Priced for the car, not the postcode."
          sub="Prices shown for a hatchback. Sedans, SUVs and luxury vehicles are adjusted automatically."
        />
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-4 sm:grid-cols-2">
          {PACKAGES.map((p) => (
            <StaggerItem key={p.id}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                  p.popular ? "border-primary/50" : "border-border",
                )}
              >
                {p.popular && (
                  <Pill tone="gold" className="mb-4 w-fit">
                    Most booked
                  </Pill>
                )}
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                <p className="mt-5 font-display text-3xl font-semibold">
                  {inr(p.price)}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    · {p.duration}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  search={{ pkg: p.id }}
                  className="mt-7 rounded-full border border-primary/40 bg-primary/10 px-4 py-2.5 text-center text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Book {p.name}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 flex flex-wrap gap-2">
          {ADDONS.map((a) => (
            <Pill key={a.id}>
              {a.name} · {inr(a.price)}
            </Pill>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHead
          eyebrow="Results"
          title="Drag to see the difference."
          sub="Two-bucket wash, clay decontamination and a gloss sealant. No brushes, no swirl marks — ever."
        />
        <Reveal delay={0.1}>
          <BeforeAfter before={BEFORE_IMG} after={AFTER_IMG} />
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const list = REVIEWS.slice(0, 10);
  return (
    <section className="overflow-hidden border-y border-border bg-graphite/30 py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHead eyebrow="Customers" title="Loved across five cities." center />
      </div>
      <div className="relative mt-14">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {[...list, ...list].map((r, i) => (
            <figure
              key={i}
              className="w-[22rem] shrink-0 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted-foreground"> · {r.vehicle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerBand() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-navy via-card to-graphite p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
          <div className="relative max-w-xl">
            <Pill tone="gold" className="mb-5">
              For washing companies
            </Pill>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Own a car wash business? Get more bookings.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join 640+ partners filling idle hours with doorstep jobs. You keep 80% of every
              booking — we handle demand, payments and support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/partners"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Partner with us
              </Link>
              <Link
                to="/partners/dashboard"
                className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:bg-secondary"
              >
                See partner dashboard
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function AppBand() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <Pill tone="cyan" className="mb-5">
            Coming soon
          </Pill>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Your car care, in your pocket.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Schedule recurring washes, save vehicles and addresses, and track your washer live.
            Android and iOS apps launching this quarter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["App Store", "Google Play"].map((s) => (
              <span
                key={s}
                className="rounded-2xl border border-border px-6 py-3 text-sm text-muted-foreground"
              >
                {s} · soon
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl hairline">
            <img
              src={AFTER_IMG}
              alt="Freshly detailed car with mirror-gloss paint"
              loading="lazy"
              className="h-full w-full object-cover animate-floaty"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur">
              <CalendarClock size={16} className="text-primary" />
              <p className="text-sm">Next wash · Sunday, 9:00 AM</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <SiteShell>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <WhyUs />
      <FeaturedProviders />
      <Packages />
      <Results />
      <Testimonials />
      <PartnerBand />
      <AppBand />
    </SiteShell>
  );
}
