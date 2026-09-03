import { SiteShell } from "./site-shell";
import { Reveal } from "./primitives";

export type Section = { h: string; p: string };

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  updated = "1 September 2026",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
  updated?: string;
}) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-3 text-xs text-muted-foreground">Last updated {updated}</p>
        </Reveal>
        <div className="mt-14 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.05}>
              <h2 className="font-display text-xl font-semibold">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

export const legalHead = (title: string, description: string) => () => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
