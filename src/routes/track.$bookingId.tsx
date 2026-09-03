import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Phone, MessageSquare, ShieldCheck, XCircle, CalendarClock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/site-shell";
import { BeforeAfter, Pill, Stars } from "@/components/site/primitives";
import {
  AFTER_IMG,
  BEFORE_IMG,
  BOOKINGS,
  TRACK_STEPS,
  getPackage,
  getProvider,
  inr,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track/$bookingId")({
  head: ({ params }) => ({
    meta: [
      { title: `Track booking ${params.bookingId} — WashOnCall` },
      {
        name: "description",
        content:
          "Live status of your doorstep vehicle wash: washer ETA, OTP handoff, wash progress and before/after photos.",
      },
      { property: "og:title", content: "Live wash tracking — WashOnCall" },
      {
        property: "og:description",
        content: "Follow your washer from assignment to completed wash in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const { bookingId } = Route.useParams();
  const booking = BOOKINGS.find((b) => b.id === bookingId) ?? BOOKINGS[0];
  const provider = getProvider(booking.providerId)!;
  const pkg = getPackage(booking.packageId)!;
  const current = TRACK_STEPS.indexOf(booking.status);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Live tracking</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{booking.id}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {pkg.name} · {booking.vehicle} · {booking.date}, {booking.slot}
            </p>
          </div>
          <Pill tone="cyan">Payment successful · {inr(booking.amount)}</Pill>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="rounded-3xl border border-border bg-card/50 p-7 backdrop-blur">
            <ol className="relative space-y-8 pl-8">
              <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border" />
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: `${(current / (TRACK_STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-[7px] top-2 w-px bg-primary"
              />
              {TRACK_STEPS.map((s, i) => {
                const done = i < current;
                const now = i === current;
                return (
                  <li key={s} className="relative">
                    <span
                      className={cn(
                        "absolute -left-8 top-1 grid h-4 w-4 place-items-center rounded-full border",
                        done && "border-primary bg-primary",
                        now && "border-primary bg-background",
                        !done && !now && "border-border bg-background",
                      )}
                    >
                      {now && (
                        <motion.span
                          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          className="absolute h-4 w-4 rounded-full bg-primary/50"
                        />
                      )}
                      {now && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </span>
                    <p className={cn("text-sm font-medium", !done && !now && "text-muted-foreground")}>
                      {s}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {i === 0 && "Order placed and payment captured."}
                      {i === 1 && `${booking.washer.name} assigned to your booking.`}
                      {i === 2 && "Washer on the way · ETA 12 min."}
                      {i === 3 && "Share your OTP with the washer to begin."}
                      {i === 4 && "Foam, rinse and finish in progress."}
                      {i === 5 && "Before/after photos uploaded. Rate your wash."}
                    </p>

                    {i === 2 && now && (
                      <div className="relative mt-4 h-40 overflow-hidden rounded-2xl border border-border bg-navy/40">
                        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:36px_36px]" />
                        <motion.span
                          animate={{ left: ["12%", "72%"], top: ["70%", "28%"] }}
                          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                          className="absolute h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_var(--color-primary)]"
                        />
                        <span className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur">
                          ETA 12 min
                        </span>
                      </div>
                    )}

                    {i === 3 && (now || done) && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="Enter 4-digit OTP"
                          inputMode="numeric"
                          className="w-44 rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm tracking-[0.4em] outline-none"
                        />
                        <button
                          onClick={() => {
                            if (otp === booking.otp) {
                              setVerified(true);
                              toast.success("OTP verified — wash starting");
                            } else toast.error("Incorrect OTP");
                          }}
                          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                        >
                          {verified ? "Verified" : "Verify"}
                        </button>
                        <span className="text-xs text-muted-foreground">Demo OTP: {booking.otp}</span>
                      </div>
                    )}

                    {i === 5 && (done || now) && (
                      <div className="mt-4">
                        <BeforeAfter before={BEFORE_IMG} after={AFTER_IMG} />
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="text-sm">Rate this wash</span>
                          <Stars rating={5} size={18} />
                          <button
                            onClick={() => toast.success("Thanks for rating!")}
                            className="rounded-full border border-border px-4 py-1.5 text-xs"
                          >
                            Submit review
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Your washer</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 font-display text-lg text-primary">
                  {booking.washer.name[0]}
                </span>
                <div>
                  <p className="text-sm font-medium">{booking.washer.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Stars rating={booking.washer.rating} size={11} /> {booking.washer.rating} ·{" "}
                    {booking.washer.trips} washes
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm hover:bg-secondary">
                  <Phone size={14} /> Call
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm hover:bg-secondary">
                  <MessageSquare size={14} /> Chat
                </button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck size={13} className="text-primary" /> Background verified · Police
                cleared
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur text-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Booking</p>
              <p className="mt-4 font-medium">{provider.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{booking.address}</p>
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => toast("Reschedule flow opened")}
                  className="inline-flex w-full items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm hover:bg-secondary"
                >
                  <CalendarClock size={14} /> Reschedule
                </button>
                <button
                  onClick={() => toast.error("Cancellation requested")}
                  className="inline-flex w-full items-center gap-2 rounded-xl border border-destructive/40 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10"
                >
                  <XCircle size={14} /> Cancel booking
                </button>
              </div>
            </div>

            <Link
              to="/account"
              className="block rounded-3xl border border-border px-6 py-4 text-center text-sm hover:bg-secondary"
            >
              All my bookings
            </Link>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
