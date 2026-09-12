import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const easeCouture = [0.16, 1, 0.3, 1] as const;

type Mode = "login" | "signup" | "reset";

const modeFromPath: Record<string, Mode> = {
  "/login": "login",
  "/signup": "signup",
  "/reset-password": "reset",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Stylized brand slides standing in for a real photography slider — there
 * is no fashion photography in this project yet (see mockData.ts's
 * placeholder-data note). Swap these for real editorial images later;
 * same auto-advancing layout works either way.
 */
const slides = [
  { eyebrow: "One House. Every Atelier.", headline: "Fashion's finest, under one roof." },
  { eyebrow: "Bespoke & Made-to-Measure", headline: "Book a designer of your own." },
  { eyebrow: "The Houses We Carry", headline: "Every brand, one address." },
];

function FingerprintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 11a2 2 0 0 1 2 2c0 3-1 5-2 7" strokeLinecap="round" />
      <path d="M8 12a4 4 0 0 1 8 0c0 3.5-1 6-2 8" strokeLinecap="round" />
      <path d="M5 10a7 7 0 0 1 14 0c0 4-1 7-2.5 10" strokeLinecap="round" />
      <path d="M15 4.5A9 9 0 0 0 3 13c0 2 .3 3.5 1 5" strokeLinecap="round" />
    </svg>
  );
}

export function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const mode = modeFromPath[location.pathname] ?? "login";

  const [slideIndex, setSlideIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetSent, setResetSent] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/dressing-room";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  // Reset form state when switching modes.
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setResetSent(false);
  }, [mode]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (mode === "signup" && !name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email.";

    if (mode !== "reset") {
      if (!password) next.password = "Please enter a password.";
      else if (password.length < 8) next.password = "Password must be at least 8 characters.";
    }
    if (mode === "signup") {
      if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
      else if (confirmPassword !== password) next.confirmPassword = "Passwords don't match.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    if (mode === "reset") {
      // No backend/email exists yet — this only simulates the confirmation
      // screen a real reset flow would show.
      setResetSent(true);
      return;
    }

    login(email.trim(), mode === "signup" ? name.trim() : undefined);
    navigate(from, { replace: true });
  }

  function handleStubAuth(source: string) {
    // Social/biometric login is not really wired to anything — no OAuth
    // provider or WebAuthn backend exists. This simulates a successful
    // login so the flow can be reviewed end-to-end.
    login(`${source.toLowerCase()}-user@example.com`, `${source} User`);
    navigate(from, { replace: true });
  }

  return (
    <div className="grid min-h-screen bg-obsidian light:bg-bone lg:grid-cols-2">

      {/* Left: stylized slider (not real photography — see note above) */}
      <div className="relative hidden overflow-hidden bg-linear-to-br from-obsidian via-bordeaux/30 to-obsidian lg:block">
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-5%", "5%", "-5%"] }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux-bright/25 blur-[160px]"
        />

        <div className="relative flex h-full flex-col items-center justify-center px-16 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: easeCouture }}
            >
              <p className="eyebrow text-champagne">{slides[slideIndex].eyebrow}</p>
              <h2 className="font-display mt-5 text-4xl text-bone">
                {slides[slideIndex].headline}
              </h2>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlideIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === slideIndex ? "w-6 bg-champagne" : "w-1.5 bg-champagne/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-10 lg:py-10">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.14em] text-bone light:text-ink sm:text-2xl">
            AURENCE
          </span>
          <span className="font-display text-[10px] italic tracking-[0.2em] text-champagne sm:text-xs">
            Fashion Empire
          </span>
        </Link>
            <ThemeToggle />
          </div>

          <div className="mt-8 flex gap-7 border-b border-champagne/15">
            <Link
              to="/login"
              className={`eyebrow pb-3 ${mode === "login" ? "border-b-2 border-champagne text-champagne" : "text-bone/50 light:text-ink/50"}`}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className={`eyebrow pb-3 ${mode === "signup" ? "border-b-2 border-champagne text-champagne" : "text-bone/50 light:text-ink/50"}`}
            >
              Sign Up
            </Link>
            <Link
              to="/reset-password"
              className={`eyebrow pb-3 ${mode === "reset" ? "border-b-2 border-champagne text-champagne" : "text-bone/50 light:text-ink/50"}`}
            >
              Reset Password
            </Link>
          </div>

          {mode === "reset" && resetSent ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-lg border border-champagne/20 bg-obsidian-soft/60 p-5 text-sm text-bone/70 light:bg-bone-soft/80 light:text-ink/70"
            >
              If an account exists for {email}, a reset link has been sent. (No email actually
              goes out yet — there's no backend for this.)
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
              {mode === "signup" && (
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="eyebrow text-bone/60 light:text-ink/60">Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="rounded-md border border-champagne/25 bg-obsidian-soft px-3.5 py-2 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink light:placeholder:text-ink/35"
                  />
                  {errors.name && <span className="text-xs text-champagne">{errors.name}</span>}
                </label>
              )}

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="eyebrow text-bone/60 light:text-ink/60">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-md border border-champagne/25 bg-obsidian-soft px-3.5 py-2 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink light:placeholder:text-ink/35"
                />
                {errors.email && <span className="text-xs text-champagne">{errors.email}</span>}
              </label>

              {mode !== "reset" && (
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="eyebrow text-bone/60 light:text-ink/60">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="rounded-md border border-champagne/25 bg-obsidian-soft px-3.5 py-2 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink light:placeholder:text-ink/35"
                  />
                  {errors.password && (
                    <span className="text-xs text-champagne">{errors.password}</span>
                  )}
                </label>
              )}

              {mode === "signup" && (
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="eyebrow text-bone/60 light:text-ink/60">Confirm Password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="rounded-md border border-champagne/25 bg-obsidian-soft px-3.5 py-2 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink light:placeholder:text-ink/35"
                  />
                  {errors.confirmPassword && (
                    <span className="text-xs text-champagne">{errors.confirmPassword}</span>
                  )}
                </label>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <Link to="/reset-password" className="text-xs text-bone/50 hover:text-champagne light:text-ink/50">
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="mt-6 rounded-full bg-bordeaux px-6 py-2.5 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
              >
                {mode === "login" ? "Log In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
              </button>
            </form>
          )}

          {mode !== "reset" && (
            <>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px flex-1 bg-champagne/15" />
                <span className="eyebrow text-bone/35 light:text-ink/35">Or continue with</span>
                <span className="h-px flex-1 bg-champagne/15" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Google", "Facebook", "Apple"].map((provider) => (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => handleStubAuth(provider)}
                    title={`Continue with ${provider} (demo — no real OAuth connected)`}
                    className="eyebrow rounded-md border border-champagne/25 py-2.5 text-[10px] text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70 cursor-pointer"
                  >
                    {provider}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleStubAuth("Fingerprint")}
                title="Sign in with fingerprint (demo — no real biometric check)"
                className="eyebrow mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-champagne/25 py-2.5 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70 cursor-pointer"
              >
                <FingerprintIcon />
                Sign in with Fingerprint
              </button>
            </>
          )}

          <p className="mt-8 text-xs text-bone/35 light:text-ink/35">
            This is a demo login — there's no real backend yet. Any valid-looking email and an
            8+ character password will work.
          </p>
        </div>
      </div>
    </div>
  );
}