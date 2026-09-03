import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Car,
  Locate,
  MapPin,
  ShieldCheck,
  Sparkles,
  Ticket,
  CircleAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/site-shell";
import { Pill, Stars } from "@/components/site/primitives";
import { ProviderCard } from "@/components/site/provider-card";
import {
  ADDONS,
  GST_RATE,
  PACKAGES,
  PLATFORM_COMMISSION,
  PROVIDERS,
  SLOTS,
  VEHICLES,
  getPackage,
  getProvider,
  inr,
  priceFor,
  type VehicleType,
} from "@/lib/data";
import { cn } from "@/lib/utils";

type Search = { provider?: string; pkg?: string; vehicle?: VehicleType };

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof search["provider"] === "string") out.provider = search["provider"];
    if (typeof search["pkg"] === "string") out.pkg = search["pkg"];
    if (typeof search["vehicle"] === "string") out.vehicle = search["vehicle"] as VehicleType;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Book a Doorstep Wash — WashOnCall" },
      {
        name: "description",
        content:
          "Book a doorstep car or bike wash in six guided steps: location, vehicle, provider, package, slot and secure payment.",
      },
      { property: "og:title", content: "Book a Doorstep Wash — WashOnCall" },
      {
        property: "og:description",
        content: "Six guided steps from address to confirmed doorstep wash booking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const STEPS = ["Location", "Vehicle", "Provider", "Package", "Slot", "Checkout", "Done"];

const DATES = Array.from({ length: 6 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    key: d.toISOString().slice(0, 10),
    label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" }),
    sub: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  };
});

function BookPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(search.provider || search.pkg ? 1 : 0);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [vehicle, setVehicle] = useState<VehicleType>(search.vehicle ?? "Hatchback");
  const [providerId, setProviderId] = useState<string | undefined>(search.provider);
  const [pkgId, setPkgId] = useState<string>(search.pkg ?? "foam");
  const [addons, setAddons] = useState<string[]>([]);
  const [date, setDate] = useState(DATES[0]!.key);
  const [slot, setSlot] = useState<string>("");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);
  const [paying, setPaying] = useState(false);
  const bookingId = useMemo(() => "WOC-" + Math.floor(40000 + Math.random() * 9999), []);

  const provider = providerId ? getProvider(providerId) : undefined;
  const pkg = getPackage(pkgId)!;
  const base = priceFor(pkg.price, vehicle);
  const addonTotal = addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
  const subtotal = base + addonTotal;
  const discount = Math.round(subtotal * applied);
  const taxes = Math.round((subtotal - discount) * GST_RATE);
  const total = subtotal - discount + taxes;
  const platformFee = Math.round((subtotal - discount) * PLATFORM_COMMISSION);
  const payout = subtotal - discount - platformFee;

  const nearby = useMemo(
    () => PROVIDERS.slice().sort((a, b) => a.distanceKm - b.distanceKm),
    [],
  );

  const canNext =
    (step === 0 && address.trim().length > 4 && pincode.trim().length === 6) ||
    step === 1 ||
    (step === 2 && !!providerId) ||
    step === 3 ||
    (step === 4 && !!slot) ||
    step === 5;

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setStep(6);
      toast.success("Payment successful", { description: `Booking ${bookingId} confirmed.` });
    }, 1600);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Booking</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            {step === 6 ? "You're all set." : "Book your doorstep wash"}
          </h1>
        </header>

        <div className="mb-10">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "transition-colors",
                  i === step ? "text-primary" : i < step ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {i + 1}. {s}
              </span>
            ))}
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <Card title="Where should we come?">
                    <div className="grid gap-3">
                      <button
                        onClick={() => {
                          setAddress("B-42, Sushant Lok Phase 1, Gurugram");
                          setPincode("122002");
                          toast.success("Location detected");
                        }}
                        className="flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary"
                      >
                        <Locate size={14} /> Use my current location
                      </button>
                      <Field label="Full address">
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={3}
                          placeholder="Flat / house no, building, street, landmark"
                          className="w-full resize-none bg-transparent text-sm outline-none"
                        />
                      </Field>
                      <Field label="Pincode">
                        <input
                          value={pincode}
                          maxLength={6}
                          inputMode="numeric"
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                          placeholder="122002"
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </Field>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={13} /> Washers carry their own water, power and equipment.
                      </p>
                    </div>
                  </Card>
                )}

                {step === 1 && (
                  <Card title="Which vehicle?">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {VEHICLES.map((v) => (
                        <button
                          key={v.type}
                          onClick={() => setVehicle(v.type)}
                          className={cn(
                            "rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1",
                            vehicle === v.type
                              ? "border-primary/70 bg-primary/10"
                              : "border-border bg-secondary/30",
                          )}
                        >
                          <Car size={18} className="text-primary" />
                          <p className="mt-4 font-medium">{v.type}</p>
                          <p className="text-xs text-muted-foreground">{v.note}</p>
                          <p className="mt-3 text-sm text-primary">
                            from {inr(priceFor(349, v.type))}
                          </p>
                        </button>
                      ))}
                    </div>
                  </Card>
                )}

                {step === 2 && (
                  <Card title={`Providers near ${pincode || "you"}`}>
                    {nearby.length === 0 ? (
                      <Empty />
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {nearby.slice(0, 6).map((p) => (
                          <ProviderCard
                            key={p.id}
                            provider={p}
                            compact
                            selected={providerId === p.id}
                            action={
                              <button
                                onClick={() => setProviderId(p.id)}
                                className={cn(
                                  "w-full rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                  providerId === p.id
                                    ? "bg-primary text-primary-foreground"
                                    : "border border-border hover:bg-secondary",
                                )}
                              >
                                {providerId === p.id ? "Selected" : "Select provider"}
                              </button>
                            }
                          />
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                {step === 3 && (
                  <Card title="Pick a package">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PACKAGES.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setPkgId(p.id)}
                          className={cn(
                            "rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1",
                            pkgId === p.id ? "border-primary/70 bg-primary/10" : "border-border bg-secondary/30",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-display font-semibold">{p.name}</p>
                            <p className="text-primary">{inr(priceFor(p.price, vehicle))}</p>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{p.blurb}</p>
                          <p className="mt-3 text-xs text-muted-foreground">{p.duration}</p>
                        </button>
                      ))}
                    </div>
                    <h3 className="mt-8 text-sm font-semibold">Add-ons</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ADDONS.map((a) => {
                        const on = addons.includes(a.id);
                        return (
                          <button
                            key={a.id}
                            onClick={() =>
                              setAddons((v) => (on ? v.filter((x) => x !== a.id) : [...v, a.id]))
                            }
                            className={cn(
                              "rounded-full border px-4 py-2 text-xs transition-colors",
                              on
                                ? "border-primary/60 bg-primary/15 text-primary"
                                : "border-border text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {a.name} · {inr(a.price)}
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                )}

                {step === 4 && (
                  <Card title="Choose date & time">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {DATES.map((d) => (
                        <button
                          key={d.key}
                          onClick={() => setDate(d.key)}
                          className={cn(
                            "w-24 shrink-0 rounded-2xl border px-3 py-4 text-center transition-colors",
                            date === d.key ? "border-primary/70 bg-primary/10" : "border-border",
                          )}
                        >
                          <p className="text-sm font-medium">{d.label}</p>
                          <p className="text-xs text-muted-foreground">{d.sub}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {SLOTS.map((s, i) => {
                        const unavailable = i % 5 === 3;
                        return (
                          <button
                            key={s}
                            disabled={unavailable}
                            onClick={() => setSlot(s)}
                            className={cn(
                              "rounded-xl border px-3 py-3 text-sm transition-colors",
                              unavailable && "cursor-not-allowed border-border/60 text-muted-foreground/40 line-through",
                              slot === s && !unavailable
                                ? "border-primary/70 bg-primary/10 text-primary"
                                : !unavailable && "border-border hover:bg-secondary",
                            )}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <CircleAlert size={13} /> Struck-out slots are already booked for this partner.
                    </p>
                  </Card>
                )}

                {step === 5 && (
                  <Card title="Checkout">
                    <div className="space-y-3 text-sm">
                      <Row l={`${pkg.name} · ${vehicle}`} r={inr(base)} />
                      {addons.map((id) => {
                        const a = ADDONS.find((x) => x.id === id)!;
                        return <Row key={id} l={a.name} r={inr(a.price)} muted />;
                      })}
                      {discount > 0 && <Row l="Coupon discount" r={`− ${inr(discount)}`} accent />}
                      <Row l="Taxes & fees (GST 18%)" r={inr(taxes)} muted />
                      <div className="border-t border-border pt-3">
                        <Row l="Total payable" r={inr(total)} bold />
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border px-4 py-3">
                        <Ticket size={15} className="text-primary" />
                        <input
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                          placeholder="Coupon code (try SHINE10)"
                          className="w-full bg-transparent text-sm outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (coupon === "SHINE10") {
                            setApplied(0.1);
                            toast.success("SHINE10 applied — 10% off");
                          } else {
                            setApplied(0);
                            toast.error("Invalid coupon code");
                          }
                        }}
                        className="rounded-xl border border-border px-5 text-sm hover:bg-secondary"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
                      <p className="mb-2 font-medium text-foreground">Where your money goes</p>
                      <div className="flex justify-between">
                        <span>Provider payout</span>
                        <span>{inr(payout)}</span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span>Platform fee ({PLATFORM_COMMISSION * 100}%)</span>
                        <span>{inr(platformFee)}</span>
                      </div>
                    </div>

                    <button
                      onClick={pay}
                      disabled={paying}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
                    >
                      {paying ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Contacting Razorpay…
                        </>
                      ) : (
                        <>Pay {inr(total)} securely</>
                      )}
                    </button>
                    <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck size={13} /> UPI · Cards · Netbanking, powered by Razorpay
                    </p>
                  </Card>
                )}

                {step === 6 && (
                  <Card title="Booking confirmed">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-primary/40 bg-primary/10"
                    >
                      <Check className="text-primary" size={34} />
                    </motion.div>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                      Booking ID
                    </p>
                    <p className="text-center font-display text-2xl font-semibold">{bookingId}</p>
                    <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Provider</span>
                        <span>{provider?.name ?? nearby[0]!.name}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground">Package</span>
                        <span>
                          {pkg.name} · {vehicle}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground">Slot</span>
                        <span>{slot || "4:00 PM"}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground">Paid</span>
                        <span>{inr(total)}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/track/$bookingId"
                        params={{ bookingId: "WOC-48213" }}
                        className="flex-1 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground"
                      >
                        Track booking
                      </Link>
                      <Link
                        to="/account"
                        className="flex-1 rounded-full border border-border px-6 py-3 text-center text-sm"
                      >
                        My bookings
                      </Link>
                    </div>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>

            {step < 6 && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:bg-secondary disabled:opacity-40"
                >
                  <ArrowLeft size={15} /> Back
                </button>
                {step < 5 && (
                  <button
                    onClick={next}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-40"
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                )}
              </div>
            )}
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Summary</p>
              {provider ? (
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={provider.cover}
                    alt=""
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{provider.name}</p>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Stars rating={provider.rating} size={11} /> {provider.rating}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">No provider selected yet.</p>
              )}
              <div className="mt-5 space-y-2 text-sm">
                <Row l="Vehicle" r={vehicle} muted />
                <Row l="Package" r={pkg.name} muted />
                <Row l="Add-ons" r={addons.length ? `${addons.length} added` : "None"} muted />
                <Row l="Slot" r={slot || "Not chosen"} muted />
                <div className="border-t border-border pt-2">
                  <Row l="Estimated total" r={inr(total)} bold />
                </div>
              </div>
              <Pill tone="cyan" className="mt-5">
                <Sparkles size={11} /> Free rewash within 24h
              </Pill>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur sm:p-8">
      <h2 className="mb-6 font-display text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-2xl border border-border bg-secondary/30 px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Row({
  l,
  r,
  muted,
  bold,
  accent,
}: {
  l: string;
  r: string;
  muted?: boolean;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn(muted && "text-muted-foreground", accent && "text-primary")}>{l}</span>
      <span className={cn(bold && "font-display text-lg font-semibold", accent && "text-primary")}>
        {r}
      </span>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      <p className="font-medium">No partners cover this pincode yet</p>
      <p className="mt-2 text-sm text-muted-foreground">
        We're expanding fast. Leave your pincode and we'll notify you at launch.
      </p>
    </div>
  );
}
