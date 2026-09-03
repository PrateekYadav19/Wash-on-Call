import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Car, Home, Plus } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/site-shell";
import { Pill, Reveal } from "@/components/site/primitives";
import { BOOKINGS, getPackage, getProvider, inr } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Bookings, Vehicles & Addresses | WashOnCall" },
      {
        name: "description",
        content:
          "View your doorstep wash bookings, saved vehicles and addresses, and track live jobs from one place.",
      },
      { property: "og:title", content: "My Account — WashOnCall" },
      { property: "og:description", content: "Your bookings, vehicles and saved addresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

const TABS = ["Bookings", "Vehicles", "Addresses"] as const;

function Account() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Bookings");

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Account</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Hi, Prateek</h1>
          <p className="mt-2 text-sm text-muted-foreground">+91 98765 43210 · Gold member</p>
        </Reveal>

        <div className="mt-10 flex gap-2 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative px-4 py-3 text-sm transition-colors",
                tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
              {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Bookings" && (
            <div className="grid gap-4">
              {BOOKINGS.map((b) => {
                const p = getProvider(b.providerId)!;
                return (
                  <div
                    key={b.id}
                    className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-border bg-card/50 p-5 backdrop-blur"
                  >
                    <div className="flex items-center gap-4">
                      <img src={p.cover} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                      <div>
                        <p className="text-sm font-medium">
                          {p.name} · {getPackage(b.packageId)?.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {b.id} · {b.vehicle} · {b.date}, {b.slot}
                        </p>
                        <Pill
                          tone={b.status === "Completed" ? "default" : "cyan"}
                          className="mt-2"
                        >
                          {b.status}
                        </Pill>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-semibold">{inr(b.amount)}</span>
                      <Link
                        to="/track/$bookingId"
                        params={{ bookingId: b.id }}
                        className="rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary"
                      >
                        {b.status === "Completed" ? "View details" : "Track"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "Vehicles" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Hyundai Creta", "SUV", "HR 26 DK 8055"],
                ["Honda City", "Sedan", "DL 3C AB 1102"],
                ["Royal Enfield Classic", "Bike", "HR 26 CX 4410"],
              ].map(([n, t, no]) => (
                <div key={no} className="rounded-3xl border border-border bg-card/50 p-6">
                  <Car size={18} className="text-primary" />
                  <p className="mt-4 font-medium">{n}</p>
                  <p className="text-xs text-muted-foreground">
                    {t} · {no}
                  </p>
                </div>
              ))}
              <button
                onClick={() => toast("Add vehicle form")}
                className="flex min-h-[9rem] items-center justify-center gap-2 rounded-3xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50"
              >
                <Plus size={15} /> Add vehicle
              </button>
            </div>
          )}

          {tab === "Addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Home", "B-42, Sushant Lok Phase 1, Gurugram 122002"],
                ["Office", "Tower C, Cyber Hub, DLF Phase 2, Gurugram 122008"],
              ].map(([l, a]) => (
                <div key={l} className="rounded-3xl border border-border bg-card/50 p-6">
                  <Home size={18} className="text-primary" />
                  <p className="mt-4 font-medium">{l}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a}</p>
                </div>
              ))}
              <button
                onClick={() => toast("Add address form")}
                className="flex min-h-[9rem] items-center justify-center gap-2 rounded-3xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50"
              >
                <Plus size={15} /> Add address
              </button>
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
