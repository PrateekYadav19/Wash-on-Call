import { Link } from "@tanstack/react-router";
import { MapPin, Clock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Pill, Stars } from "./primitives";
import { inr, type Provider } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProviderCard({
  provider,
  compact,
  action,
  selected,
}: {
  provider: Provider;
  compact?: boolean;
  action?: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card/60 backdrop-blur transition-shadow duration-300 hover:shadow-lift",
        selected ? "border-primary/70" : "border-border",
      )}
    >
      <div className={cn("relative overflow-hidden", compact ? "h-32" : "h-44")}>
        <img
          src={provider.cover}
          alt={`${provider.name} vehicle detailing work`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {provider.badges.slice(0, 2).map((b) => (
            <Pill key={b} tone={b === "Top Rated" ? "gold" : b === "Verified" ? "cyan" : "default"}>
              {b === "Verified" && <ShieldCheck size={11} />}
              {b}
            </Pill>
          ))}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-semibold leading-tight">{provider.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{provider.area}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">from</p>
            <p className="font-display text-lg font-semibold text-primary">
              {inr(provider.startingPrice)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Stars rating={provider.rating} size={12} />
            <span className="text-foreground">{provider.rating}</span>({provider.reviews})
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> {provider.distanceKm} km
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {provider.years} yrs
          </span>
        </div>
        {!compact && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {provider.services.slice(0, 3).map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 pt-2">
          {action ?? (
            <>
              <Link
                to="/providers/$id"
                params={{ id: provider.id }}
                className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm transition-colors hover:bg-secondary"
              >
                View profile
              </Link>
              <Link
                to="/book"
                search={{ provider: provider.id }}
                className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Book
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
