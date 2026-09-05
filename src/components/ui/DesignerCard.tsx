import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Designer } from "@/lib/mockData";
import { shopCategories } from "@/lib/mockData";

const easeCouture = [0.16, 1, 0.3, 1] as const;

interface DesignerCardProps {
  designer: Designer;
  index?: number;
  /**
   * "scroll" (default): compact card, animates in once when scrolled into
   * view — used in the homepage teaser. Unchanged from before.
   * "layout": richer card for the Designers directory — ring-bordered
   * avatar (vs. a brand's solid-fill monogram, a deliberate visual
   * differentiator), hover crossfade to Notable Work, specialty tags, and
   * a "View Profile" reveal. Framer `layout` + `exit` for smooth reflow
   * inside an <AnimatePresence> when the directory's filters change.
   */
  variant?: "scroll" | "layout";
}

export function DesignerCard({ designer, index = 0, variant = "scroll" }: DesignerCardProps) {
  const [hovered, setHovered] = useState(false);
  const isRich = variant === "layout";

  const entranceProps = isRich
    ? {
        layout: true,
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96 },
      }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  if (!isRich) {
    return (
      <motion.div
        {...entranceProps}
        transition={{ duration: 0.5, ease: easeCouture, delay: index * 0.08 }}
      >
        <Link
          to={`/designers/${designer.slug}`}
          className="group flex flex-col items-center rounded-lg border border-champagne/15 bg-obsidian-soft/60 px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone-soft/80"
        >
          <span className="font-display flex h-16 w-16 items-center justify-center rounded-full bg-bordeaux text-xl italic text-champagne">
            {designer.initials}
          </span>
          <span className="font-display mt-4 text-lg text-bone light:text-ink">
            {designer.name}
          </span>
          <span className="eyebrow mt-1 text-[10px] text-bone/45 light:text-ink/45">
            {designer.specialty}
          </span>
          <span className="eyebrow mt-4 text-champagne opacity-0 transition-opacity group-hover:opacity-100">
            Book Appointment
          </span>
        </Link>
      </motion.div>
    );
  }

  const categoryLabels = (designer.categories ?? [])
    .map((slug) => shopCategories.find((c) => c.slug === slug)?.label)
    .filter((label): label is string => Boolean(label));

  return (
    <motion.div {...entranceProps} transition={{ duration: 0.4, ease: easeCouture }}>
      <Link
        to={`/designers/${designer.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-champagne/15 bg-obsidian-soft/60 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone-soft/80"
      >
        <div className="relative flex min-h-40 flex-1 items-center justify-center px-4 py-6">
          <AnimatePresence mode="wait" initial={false}>
            {hovered && designer.notableWork?.length ? (
              <motion.div
                key="work"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <span className="eyebrow text-champagne">Notable Work</span>
                <ul className="mt-3 space-y-1.5">
                  {designer.notableWork.slice(0, 3).map((piece) => (
                    <li key={piece} className="text-xs text-bone/70 light:text-ink/70">
                      {piece}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="face"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-champagne/40 bg-bordeaux"
              >
                <span className="font-display text-2xl italic text-champagne">
                  {designer.initials}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-champagne/10 px-4 py-4">
          <span className="font-display text-lg text-bone transition-colors group-hover:text-champagne light:text-ink">
            {designer.name}
          </span>
          <p className="mt-1 text-xs text-bone/50 light:text-ink/50">{designer.specialty}</p>

          {categoryLabels.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="eyebrow rounded-full border border-champagne/20 px-2 py-0.5 text-[9px] text-bone/55 light:text-ink/55"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <span className="eyebrow mt-3 block text-champagne opacity-0 transition-opacity group-hover:opacity-100">
            View Profile →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
