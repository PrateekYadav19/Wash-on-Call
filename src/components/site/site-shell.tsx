import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Moon, Sun, X, Droplets } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CITIES } from "@/lib/data";

const NAV = [
  { to: "/providers", label: "Browse Providers" },
  { to: "/partners", label: "Partner With Us" },
  { to: "/help", label: "Help" },
];

function useTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("woc-theme");
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);
  const toggle = () => {
    setLight((v) => {
      const next = !v;
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem("woc-theme", next ? "light" : "dark");
      return next;
    });
  };
  return { light, toggle };
}

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="WashOnCall home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10">
        <Droplets className="h-4.5 w-4.5 text-primary" size={18} />
        <span className="absolute inset-0 rounded-xl opacity-0 shadow-[0_0_24px_var(--color-primary)] transition-opacity duration-500 group-hover:opacity-60" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight">
        Wash<span className="text-primary">OnCall</span>
      </span>
    </Link>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { light, toggle } = useTheme();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle colour theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {light ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <Link
            to="/login"
            className="hidden rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary sm:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/book"
            className="relative hidden overflow-hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            <span className="relative z-10">Book Now</span>
            <span className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/30 blur-md animate-sheen" />
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border glass md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {[...NAV, { to: "/login", label: "Login" }, { to: "/account", label: "My account" }].map(
                (n) => (
                  <Link key={n.to} to={n.to} className="rounded-xl px-3 py-3 text-sm hover:bg-secondary">
                    {n.label}
                  </Link>
                ),
              )}
              <Link
                to="/book"
                className="mt-2 rounded-xl bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Book a wash
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: [
        { to: "/book", label: "Book a wash" },
        { to: "/providers", label: "Browse providers" },
        { to: "/track/WOC-48213", label: "Track a booking" },
        { to: "/account", label: "My account" },
      ],
    },
    {
      title: "Partners",
      links: [
        { to: "/partners", label: "Partner with us" },
        { to: "/partners/dashboard", label: "Partner dashboard" },
        { to: "/about", label: "About us" },
        { to: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Policies",
      links: [
        { to: "/terms", label: "Terms of service" },
        { to: "/privacy", label: "Privacy policy" },
        { to: "/refunds", label: "Refunds & cancellation" },
        { to: "/help", label: "Help & safety" },
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-graphite/40">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              India's doorstep vehicle-wash marketplace. Compare verified washing companies, book a
              slot, and get a showroom finish without leaving home.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              Serving {CITIES.join(" · ")}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 WashOnCall Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Payments secured by Razorpay · GSTIN 07AABCW1234F1Z5</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 pt-16"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
