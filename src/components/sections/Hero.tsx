import { motion } from "framer-motion";
import { StitchLine } from "@/components/ui/StitchLine";
import { atelierCategories } from "@/lib/navigation";
import { useWaitlistModal } from "@/context/WaitlistModalContext";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { openModal } = useWaitlistModal();

  return (
    <section className="relative overflow-hidden bg-obsidian light:bg-bone">
      {/* Ambient glow, restrained */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-140 w-140 rounded-full bg-bordeaux/25 blur-[140px] light:bg-bordeaux/10"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1.15fr_auto_0.85fr] lg:gap-12 lg:px-10 lg:pb-32 lg:pt-44">
        {/* Left: thesis */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCouture }}
            className="eyebrow text-champagne"
          >
            One House. Every Atelier.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCouture, delay: 0.1 }}
            className="font-display mt-6 text-[2.6rem] leading-[1.05] text-bone sm:text-6xl lg:text-[4rem] light:text-ink"
          >
            Fashion's finest,
            <br />
            <span className="italic text-champagne">under one roof.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCouture, delay: 0.2 }}
            className="mt-7 max-w-md text-base leading-relaxed text-bone/70 light:text-ink/70"
          >
            Aurence brings the world's most coveted brands into a single
            wardrobe. Curate across houses, build a look from head to toe,
            and check out once — no matter how many ateliers it came from.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCouture, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <button
              type="button"
              onClick={() => openModal("Customer")}
              className="rounded-full bg-bordeaux px-7 py-3.5 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
            >
              Enter the House
            </button>
            <button
              type="button"
              onClick={() => openModal("Brand")}
              className="eyebrow border-b border-champagne/50 pb-1 text-bone/80 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
            >
              Become a Partner Brand
            </button>
          </motion.div>

          {/* Atelier ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 max-w-lg overflow-hidden border-t border-champagne/15 pt-6"
          >
            <div className="flex whitespace-nowrap">
              <TickerTrack />
              <TickerTrack aria-hidden />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block">
          <StitchLine orientation="vertical" className="h-full text-champagne/40" delay={0.6} />
        </div>

        {/* Right: monogram seal */}
        <div className="flex items-center justify-center lg:justify-end">
          <MonogramSeal />
        </div>
      </div>
    </section>
  );
}

function TickerTrack(props: { "aria-hidden"?: boolean }) {
  return (
    <motion.div
      {...props}
      animate={{ x: ["0%", "-100%"] }}
      transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      className="flex shrink-0 gap-8 pr-8"
    >
      {atelierCategories.map((category, i) => (
        <span key={i} className="eyebrow text-bone/45 light:text-ink/40">
          {category}
        </span>
      ))}
    </motion.div>
  );
}

function MonogramSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: easeCouture, delay: 0.35 }}
      className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72"
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-champagne/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </motion.svg>

      <div className="flex h-[85%] w-[85%] items-center justify-center rounded-full bg-bordeaux shadow-[0_0_60px_-10px_rgba(110,15,26,0.6)]">
        <span className="font-display text-6xl italic text-champagne sm:text-7xl">
          A
        </span>
      </div>
    </motion.div>
  );
}