import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { Logo } from "@/components/site/site-shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — WashOnCall" },
      {
        name: "description",
        content: "Sign in to WashOnCall with your mobile number and OTP to manage bookings, vehicles and addresses.",
      },
      { property: "og:title", content: "Login — WashOnCall" },
      { property: "og:description", content: "Sign in with your mobile number and OTP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const submitOtp = (code: string): void => {
    if (code.length === 4) {
      toast.success("Signed in");
      navigate({ to: "/account" });
    }
  };

  return (
    <SiteShell>
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-md flex-col justify-center px-5 py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl"
        >
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold">
            {stage === "phone" ? "Sign in or create account" : "Verify your number"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {stage === "phone"
              ? "We'll send a one-time password to your mobile."
              : `Enter the 4-digit code sent to +91 ${phone}. Demo code: any 4 digits.`}
          </p>

          <AnimatePresence mode="wait">
            {stage === "phone" ? (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (phone.length !== 10) {
                    toast.error("Enter a valid 10-digit number");
                    return;
                  }
                  setStage("otp");
                  toast.success("OTP sent");
                }}
                className="mt-8"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-3.5">
                  <span className="text-sm text-muted-foreground">+91</span>
                  <input
                    value={phone}
                    inputMode="numeric"
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    aria-label="Mobile number"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
                <button className="mt-5 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
                  Send OTP
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                className="mt-8"
              >
                <div className="flex justify-between gap-3">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      value={v}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP digit ${i + 1}`}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, "");
                        const next = [...otp];
                        next[i] = d;
                        setOtp(next);
                        if (d && i < 3) refs.current[i + 1]?.focus();
                        submitOtp(next.join(""));
                      }}
                      className="h-16 w-full rounded-2xl border border-border bg-secondary/30 text-center font-display text-2xl outline-none focus:border-primary/60"
                    />
                  ))}
                </div>
                <button
                  onClick={() => submitOtp(otp.join(""))}
                  className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  Verify & continue
                </button>
                <button
                  onClick={() => setStage("phone")}
                  className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
                >
                  Change number
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={13} className="text-primary" /> We never share your number with
            partners.
          </p>
        </motion.div>
      </div>
    </SiteShell>
  );
}
