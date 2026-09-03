import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, Map as MapIcon, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { Pill, Reveal, Stars } from "@/components/site/primitives";
import { ProviderCard } from "@/components/site/provider-card";
import { CITIES, PROVIDERS, VEHICLES, inr, type Provider } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/providers/")({
  head: () => ({
    meta: [
      { title: "Browse Verified Wash Partners — WashOnCall" },
      {
        name: "description",
        content:
          "Filter doorstep vehicle wash companies by price, rating, distance and services. Compare up to three partners side by side.",
      },
      { property: "og:title", content: "Browse Verified Wash Partners — WashOnCall" },
      {
        property: "og:description",
        content: "Compare doorstep wash partners by price, rating, experience and distance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProvidersPage,
});

const SERVICES = [
  "Express Wash",
  "Premium Foam",
  "Interior Vacuum",
  "Ceramic Coating",
  "Deep Interior Detail",
];

function ProvidersPage() {
  const [city, setCity] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [radius, setRadius] = useState(10);
  const [topRated, setTopRated] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [service, setService] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [view, setView] = useState<"grid" | "map">("grid");
  const [compare, setCompare] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = PROVIDERS.filter(
      (p) =>
        (city === "All" || p.city === city) &&
        p.startingPrice <= maxPrice &&
        p.distanceKm <= radius &&
        (!topRated || p.rating >= 4.5) &&
        (!verifiedOnly || p.badges.includes("Verified")) &&
        (!service || p.services.includes(service)),
    );
    const by: Record<string, (a: Provider, b: Provider) => number> = {
      "Price low→high": (a, b) => a.startingPrice - b.startingPrice,
      Rating: (a, b) => b.rating - a.rating,
      Nearest: (a, b) => a.distanceKm - b.distanceKm,
      Recommended: (a, b) => b.rating * 10 - b.distanceKm - (a.rating * 10 - a.distanceKm),
    };
    return list.slice().sort(by[sort]);
  }, [city, maxPrice, radius, topRated, verifiedOnly, service, sort]);

  const toggleCompare = (id: string) =>
    setCompare((v) => (v.includes(id) ? v.filter((x) => x !== id) : v.length < 3 ? [...v, id] : v));

  const Filters = (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">City</p>
        <div className="flex flex-wrap gap-2">
          {["All", ...CITIES].map((c) => (
            <Chip key={c} on={city === c} onClick={() => setCity(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Max starting price · {inr(maxPrice)}
        </p>
        <input
          type="range"
          min={249}
          max={2500}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-[var(--color-primary)]"
          aria-label="Maximum starting price"
        />
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Distance · within {radius} km
        </p>
        <input
          type="range"
          min={1}
          max={10}
          value={radius}
          onChange={(e) => setRadius(+e.target.value)}
          className="w-full accent-[var(--color-primary)]"
          aria-label="Distance radius"
        />
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Services</p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <Chip key={s} on={service === s} onClick={() => setService(service === s ? null : s)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Vehicle</p>
        <div className="flex flex-wrap gap-2">
          {["All", ...VEHICLES.map((v) => v.type)].map((v) => (
            <Chip key={v} on={vehicle === v} onClick={() => setVehicle(v)}>
              {v}
            </Chip>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Toggle on={topRated} set={setTopRated} label="Rating 4.5 and above" />
        <Toggle on={verifiedOnly} set={setVerifiedOnly} label="Verified partners only" />
      </div>
    </div>
  );

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Marketplace</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">Washing companies near you</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {results.length} verified partners available. Compare price, rating, experience and
            distance before you book.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[17rem_1fr]">
          <aside className="hidden h-fit rounded-3xl border border-border bg-card/50 p-6 backdrop-blur lg:sticky lg:top-24 lg:block">
            {Filters}
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm lg:hidden"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
              <div className="flex items-center gap-2">
                {["Recommended", "Price low→high", "Rating", "Nearest"].map((s) => (
                  <Chip key={s} on={sort === s} onClick={() => setSort(s)}>
                    {s}
                  </Chip>
                ))}
              </div>
              <div className="ml-auto flex rounded-full border border-border p-1">
                {(["grid", "map"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    aria-label={`${v} view`}
                    className={cn(
                      "grid h-8 w-9 place-items-center rounded-full transition-colors",
                      view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {v === "grid" ? <LayoutGrid size={14} /> : <MapIcon size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {view === "map" ? (
              <div className="relative h-[34rem] overflow-hidden rounded-3xl border border-border bg-navy/40">
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px]" />
                {results.slice(0, 9).map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 220, damping: 16 }}
                    style={{ left: `${12 + ((i * 29) % 76)}%`, top: `${16 + ((i * 37) % 66)}%` }}
                    className="absolute -translate-x-1/2 rounded-full border border-primary/50 bg-card/90 px-3 py-1.5 text-xs backdrop-blur hover:border-primary"
                  >
                    {p.name.split(" ")[0]} · {inr(p.startingPrice)}
                  </motion.button>
                ))}
                <p className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                  Interactive map preview
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-16 text-center">
                <p className="font-medium">No partners match these filters</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try widening the distance radius or raising the price ceiling.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <div key={p.id} className="relative">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className={cn(
                        "absolute right-3 top-3 z-10 rounded-full border px-3 py-1 text-[11px] backdrop-blur transition-colors",
                        compare.includes(p.id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background/70 text-muted-foreground",
                      )}
                    >
                      {compare.includes(p.id) ? "Comparing" : "Compare"}
                    </button>
                    <ProviderCard provider={p} selected={compare.includes(p.id)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border glass"
          >
            <div className="mx-auto max-w-[1280px] overflow-x-auto px-5 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Comparing {compare.length} of 3</p>
                <button
                  onClick={() => setCompare([])}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X size={13} /> Clear
                </button>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {compare.map((id) => {
                  const p = PROVIDERS.find((x) => x.id === id)!;
                  return (
                    <div key={id} className="rounded-2xl border border-border bg-card/60 p-4 text-sm">
                      <p className="font-medium">{p.name}</p>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                          <Stars rating={p.rating} size={11} /> {p.rating}
                        </p>
                        <p>From {inr(p.startingPrice)}</p>
                        <p>{p.years} yrs experience · {p.distanceKm} km</p>
                        <p>{p.services.slice(0, 2).join(", ")}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.badges.slice(0, 2).map((b) => (
                          <Pill key={b}>{b}</Pill>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur lg:hidden"
            onClick={() => setFiltersOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border bg-card p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-lg font-semibold">Filters</p>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X size={18} />
                </button>
              </div>
              {Filters}
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
              >
                Show {results.length} partners
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteShell>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
        on
          ? "border-primary/60 bg-primary/15 text-primary"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Toggle({
  on,
  set,
  label,
}: {
  on: boolean;
  set: (v: boolean) => void;
  label: string;
}) {
  return (
    <button onClick={() => set(!on)} className="flex w-full items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          on ? "bg-primary" : "bg-secondary",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-background",
            on ? "left-[1.15rem]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}
