import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { Star } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const text = useTransform(spring, (v) =>
    prefix +
    v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix,
  );
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);
  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
    </span>
  );
}

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i <= Math.round(rating) ? "fill-gold text-gold" : "text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}

export function Pill({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "gold" | "cyan";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
        tone === "gold" && "border-gold/40 bg-gold/10 text-gold",
        tone === "cyan" && "border-primary/40 bg-primary/10 text-primary",
        tone === "default" && "border-border bg-secondary/60 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[16/9] w-full select-none overflow-hidden rounded-3xl hairline",
        className,
      )}
      onPointerMove={(e) => e.buttons === 1 && drag(e.clientX)}
      onPointerDown={(e) => drag(e.clientX)}
    >
      <img src={after} alt="Vehicle after professional wash" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="Vehicle before wash"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: ref.current?.clientWidth ?? "100%", maxWidth: "none" }}
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
          Before
        </span>
      </div>
      <span className="absolute bottom-4 right-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
        After
      </span>
      <div
        className="absolute inset-y-0 w-px bg-primary shadow-[0_0_20px_var(--color-primary)]"
        style={{ left: `${pos}%` }}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Compare before and after"
          onChange={(e) => setPos(+e.target.value)}
          className="absolute left-1/2 top-1/2 h-10 w-64 -translate-x-1/2 -translate-y-1/2 rotate-0 cursor-ew-resize opacity-0"
        />
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/60 bg-background/80 text-primary backdrop-blur">
          ⇄
        </span>
      </div>
    </div>
  );
}
