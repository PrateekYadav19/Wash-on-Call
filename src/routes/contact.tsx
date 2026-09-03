import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/site-shell";
import { Reveal } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact WashOnCall — Support & Partnerships" },
      {
        name: "description",
        content:
          "Reach the WashOnCall team for booking support, partnership enquiries, press or corporate fleet washing across India.",
      },
      { property: "og:title", content: "Contact WashOnCall" },
      { property: "og:description", content: "Support, partnerships, fleet enquiries and press." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Talk to us</h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Booking issue, partnership, fleet contract or press — pick a lane and we'll route you to
            the right person.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_20rem]">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent", { description: "We reply within 2 working hours." });
              }}
              className="space-y-4 rounded-3xl border border-border bg-card/50 p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" required />
                <Field label="Email" type="email" required />
                <Field label="Phone" type="tel" />
                <label className="block rounded-2xl border border-border bg-secondary/30 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Topic</span>
                  <select className="mt-1 w-full bg-transparent text-sm outline-none [&>option]:bg-card">
                    {["Booking support", "Partnership", "Corporate fleet", "Press"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block rounded-2xl border border-border bg-secondary/30 px-4 py-3">
                <span className="text-xs text-muted-foreground">Message</span>
                <textarea
                  rows={5}
                  required
                  className="mt-1 w-full resize-none bg-transparent text-sm outline-none"
                />
              </label>
              <button className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
                Send message
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            {[
              { icon: Phone, t: "Support line", d: "1800 200 4321 · 7am–11pm daily" },
              { icon: Mail, t: "Email", d: "support@washoncall.in\npartners@washoncall.in" },
              { icon: MapPin, t: "Office", d: "Level 4, Tower C, Cyber Hub, DLF Phase 2, Gurugram 122008" },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-border bg-card/50 p-6">
                <c.icon size={17} className="text-primary" />
                <p className="mt-4 font-medium">{c.t}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block rounded-2xl border border-border bg-secondary/30 px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full bg-transparent text-sm outline-none" />
    </label>
  );
}
