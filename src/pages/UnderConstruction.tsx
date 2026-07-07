import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { StitchLine } from "@/components/ui/StitchLine";

const easeCouture = [0.16, 1, 0.3, 1] as const;

/** Turns a path like "/dressing-room" into "Dressing Room". */
function labelFromPath(path: string) {
  const segment = path.split("/").filter(Boolean).pop() ?? "";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function UnderConstruction() {
  const location = useLocation();
  const label = labelFromPath(location.pathname) || "This Page";

  return (
    <section className="relative flex min-h-[calc(100vh-1px)] items-center justify-center overflow-hidden bg-obsidian px-6 pt-24 light:bg-bone">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux/20 blur-[130px]"
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: easeCouture }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-bordeaux shadow-[0_0_60px_-10px_rgba(110,15,26,0.6)]"
        >
          <span className="font-display text-4xl italic text-champagne">A</span>
        </motion.div>

        <StitchLine
          orientation="horizontal"
          className="mt-8 w-40 text-champagne/50"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="eyebrow mt-8 text-champagne"
        >
          Being Tailored
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display mt-4 text-4xl text-bone sm:text-5xl light:text-ink"
        >
          {label}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 max-w-sm text-sm leading-relaxed text-bone/60 light:text-ink/60"
        >
          Our ateliers are still fitting this room to the house. Return soon
          — or head back to explore what's already open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9"
        >
          <Link
            to="/"
            className="rounded-full bg-bordeaux px-7 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
          >
            Return to the House
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
