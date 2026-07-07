import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { primaryNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-champagne/15 bg-obsidian/85 backdrop-blur-md light:bg-bone/85 py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.14em] text-bone light:text-ink sm:text-2xl">
            AURENCE
          </span>
          <span className="font-display text-[10px] italic tracking-[0.2em] text-champagne sm:text-xs">
            Fashion Empire
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="eyebrow relative text-bone/80 transition-colors hover:text-champagne light:text-ink/70 light:hover:text-bordeaux"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 4 : 0,
              }}
              className="h-px w-6 bg-champagne"
            />
            <motion.span
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? -4 : 0,
              }}
              className="h-px w-6 bg-champagne"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-champagne/15 bg-obsidian light:bg-bone lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {primaryNav.map((item, i) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="eyebrow block py-3 text-bone/85 light:text-ink/80"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
