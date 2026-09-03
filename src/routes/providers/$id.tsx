import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, MapPin, Repeat, ShieldCheck, Briefcase, Check } from "lucide-react";
import { useState } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { BeforeAfter, Pill, Reveal, SectionHead, Stars } from "@/components/site/primitives";
import {
  AFTER_IMG,
  BEFORE_IMG,
  PACKAGES,
  REVIEWS,
  SLOTS,
  getProvider,
  inr,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/providers/$id")({
  loader: ({ params }) => {
    const provider = getProvider(params.id);
    if (!provider) throw notFound();
    return provider;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Partner"} — Doorstep Wash Partner | WashOnCall` },
      {
        name: "description",
        content: `${loaderData?.name} in ${loaderData?.area}: ${loaderData?.rating}★ rated, ${loaderData?.years} years experience, doorstep vehicle washing from ${loaderData ? inr(loaderData.startingPrice) : ""}.`,
      },
      { property: "og:title", content: `${loaderData?.name ?? "Partner"} — WashOnCall` },
      {
        property: "og:description",
        content: `Book ${loaderData?.name} for a doorstep vehicle wash at your address.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData?.cover
        ? [
            { property: "og:image", content: loaderData.cover },
            { name: "twitter:image", content: loaderData.cover },
          ]
        : []),
    ],
  }),
  component: ProviderProfile,
});

function ProviderProfile() {
  const p = Route.useLoaderData();
  const reviews = REVIEWS.filter((r) => r.providerId === p.id).concat(REVIEWS.slice(0, 6));
  const [filter, setFilter] = useState(0);
  const shown = filter ? reviews.filter((r) => r.rating === filter) : reviews;

  const breakdown = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    pct: s === 5 ? 72 : s === 4 ? 19 : s === 3 ? 6 : s === 2 ? 2 : 1,
  }));

  return (
    <SiteShell>
      <section className="relative h-[24rem] overflow-hidden">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={p.cover}
          alt={`${p.name} detailing studio`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1280px] px-5 pb-10 sm:px-8">
            <div className="flex flex-wrap gap-2">
              {p.badges.map((b) => (
                <Pill key={b} tone={b === "Top Rated" ? "gold" : "cyan"}>
                  {b}
                </Pill>
              ))}
            </div>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{p.name}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Stars rating={p.rating} size={13} /> {p.rating} ({p.reviews} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> {p.area}, {p.city} · {p.distanceKm} km away
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8">
        <div className="grid gap-5 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Briefcase, l: "Jobs completed", v: p.jobs.toLocaleString("en-IN") },
            { icon: Clock, l: "Years experience", v: `${p.years} yrs` },
            { icon: ShieldCheck, l: "Avg response", v: `${p.responseMins} min` },
            { icon: Repeat, l: "Repeat customers", v: `${p.repeatPct}%` },
            { icon: MapPin, l: "Starting price", v: inr(p.startingPrice) },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <s.icon size={16} className="text-primary" />
              <p className="mt-3 font-display text-xl font-semibold">{s.v}</p>
              <p className="text-xs text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-20">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">About this partner</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{p.about}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.services.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </Reveal>

            <div>
              <SectionHead eyebrow="Packages" title="Services & pricing" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {PACKAGES.map((k) => (
                  <Reveal key={k.id}>
                    <div className="h-full rounded-3xl border border-border bg-card/50 p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-semibold">{k.name}</h3>
                        <p className="text-primary">{inr(k.price)}</p>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{k.blurb}</p>
                      <ul className="mt-4 space-y-2">
                        {k.includes.slice(0, 3).map((i) => (
                          <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                            <Check size={13} className="mt-0.5 text-primary" /> {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHead eyebrow="Gallery" title="Recent work" />
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {p.gallery.map((g, i) => (
                  <Reveal key={g} delay={i * 0.06}>
                    <img
                      src={g}
                      alt={`${p.name} completed wash ${i + 1}`}
                      loading="lazy"
                      className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </Reveal>
                ))}
              </div>
              <Reveal className="mt-6">
                <BeforeAfter before={BEFORE_IMG} after={AFTER_IMG} />
              </Reveal>
            </div>

            <div>
              <SectionHead eyebrow="Reviews" title={`${p.rating} out of 5`} />
              <div className="mt-8 grid gap-8 sm:grid-cols-[16rem_1fr]">
                <div className="space-y-2">
                  {breakdown.map((b) => (
                    <div key={b.star} className="flex items-center gap-3 text-xs">
                      <span className="w-8 text-muted-foreground">{b.star}★</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                          className="block h-full bg-primary"
                        />
                      </span>
                      <span className="w-8 text-right text-muted-foreground">{b.pct}%</span>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {[0, 5, 4, 3].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs",
                          filter === f
                            ? "border-primary/60 bg-primary/15 text-primary"
                            : "border-border text-muted-foreground",
                        )}
                      >
                        {f === 0 ? "All" : `${f} star`}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {shown.slice(0, 6).map((r) => (
                    <div key={r.id + r.name} className="rounded-2xl border border-border bg-card/40 p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{r.name}</p>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <Stars rating={r.rating} size={12} />
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                    </div>
                  ))}
                  {shown.length === 0 && (
                    <p className="text-sm text-muted-foreground">No reviews with this rating yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Next availability
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {SLOTS.slice(0, 6).map((s, i) => (
                  <span
                    key={s}
                    className={cn(
                      "rounded-xl border px-2 py-2 text-center text-xs",
                      i === 2 ? "border-border/50 text-muted-foreground/40 line-through" : "border-border",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <Link
                to="/book"
                search={{ provider: p.id }}
                className="mt-6 block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Book with this partner
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free cancellation up to 2 hours before
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-border glass lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-xs text-muted-foreground">from {inr(p.startingPrice)}</p>
          </div>
          <Link
            to="/book"
            search={{ provider: p.id }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Book now
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
