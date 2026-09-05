import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredDesigners } from "@/lib/mockData";
import { DesignerCard } from "@/components/ui/DesignerCard";
import { useWaitlistModal } from "@/context/WaitlistModalContext";

const easeCouture = [0.16, 1, 0.3, 1] as const;

function SpecialtyTicker() {
  return (
    <div className="overflow-hidden border-y border-champagne/10 py-6 bg-linear-to-l from-green-950 via-indigo-950 to-red-950 light:from-green-100 light:via-indigo-100 light:to-red-100">
      <div className="flex whitespace-nowrap">
        <SpecialtyTrack />
        <SpecialtyTrack aria-hidden />
      </div>
    </div>
  );
}

function SpecialtyTrack(props: { "aria-hidden"?: boolean }) {
  return (
    <motion.div
      {...props}
      animate={{ x: ["0%", "-100%"] }}
      transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {featuredDesigners.map((designer, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="eyebrow text-bone/40 light:text-ink/35">
            {designer.specialty}
          </span>
          <span
            className="h-1 w-1 shrink-0 rounded-full bg-champagne/40"
            aria-hidden="true"
          />
        </span>
      ))}
    </motion.div>
  );
}

export function DesignersDirectory() {
  const { openModal } = useWaitlistModal();
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);

  const specialties = useMemo(
    () => Array.from(new Set(featuredDesigners.map((d) => d.specialty))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    return featuredDesigners.filter((designer) => {
      if (!designer.name.toLowerCase().includes(search.trim().toLowerCase()))
        return false;
      if (activeSpecialty && designer.specialty !== activeSpecialty)
        return false;
      return true;
    });
  }, [search, activeSpecialty]);

  return (
    <div className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">Designers</span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="eyebrow mt-8 text-champagne"
        >
          Bespoke &amp; Made-to-Measure
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
          className="font-display mt-3 text-4xl text-bone sm:text-5xl light:text-ink"
        >
          Meet Our Designers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-bone/60 light:text-ink/60"
        >
          Every piece starts with a conversation. Book a consultation directly
          with the designer whose craft fits what you're picturing.
        </motion.p>
      </div>

      <SpecialtyTicker />

      {/* Sticky search & filter bar */}
      <div className="sticky top-16 z-40 border-b border-champagne/10 bg-obsidian/95 px-6 py-4 backdrop-blur-md light:bg-bone/95 lg:top-18 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search designers..."
            className="w-full max-w-sm rounded-md border border-champagne/25 bg-obsidian-soft px-4 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink light:placeholder:text-ink/40"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSpecialty(null)}
              className={`eyebrow rounded-full border px-4 py-1.5 transition-colors ${
                activeSpecialty === null
                  ? "border-champagne bg-champagne text-obsidian"
                  : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
              }`}
            >
              All
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                type="button"
                onClick={() => setActiveSpecialty(specialty)}
                className={`eyebrow rounded-full border px-4 py-1.5 transition-colors ${
                  activeSpecialty === specialty
                    ? "border-champagne bg-champagne text-obsidian"
                    : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10 lg:pb-28">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-bone/50 light:text-ink/50">
            No designers match your search.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((designer, i) => (
                <DesignerCard
                  key={designer.slug}
                  designer={designer}
                  index={i}
                  variant="layout"
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Partnership CTA — full-bleed, mirrors Brands directory's, wording for designers */}
      <section className="relative w-full overflow-hidden bg-linear-to-br from-obsidian via-bordeaux/40 to-obsidian light:from-bone light:via-bordeaux/10 light:to-bone">
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-5%", "5%", "-5%"] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux-bright/30 blur-[160px]"
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-champagne/10 via-transparent to-transparent"
        />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-10 lg:py-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture }}
            className="eyebrow text-champagne"
          >
            By Invitation &amp; Application
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
            className="font-display mt-5 text-4xl text-bone sm:text-6xl light:text-ink"
          >
            Are you a designer?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-bone/70 light:text-ink/70"
          >
            Bring your craft to Aurence and take bookings and bespoke
            commissions through the house.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.15 }}
          >
            <button
              type="button"
              onClick={() => openModal("Designer")}
              className="mt-10 rounded-full bg-bordeaux px-10 py-4 text-base font-semibold text-bone transition-all duration-300 hover:scale-105 hover:bg-bordeaux-bright"
            >
              Apply as a Designer
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
