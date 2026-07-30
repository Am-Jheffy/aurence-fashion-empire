import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Brand } from "@/lib/mockData";
import { shopCategories } from "@/lib/mockData";

const easeCouture = [0.16, 1, 0.3, 1] as const;

interface BrandCardProps {
  brand: Brand;
  index?: number;
  /**
   * "scroll" (default): compact card, animates in once when scrolled into
   * view — used in the homepage "Top Brands" teaser.
   * "layout": richer card with a hover crossfade, tags, and a "View
   * Atelier" reveal. Always-mounted entrance + Framer `layout` + `exit`,
   * meant to sit inside an <AnimatePresence> in the filterable directory
   * so cards reflow smoothly when the list changes.
   */
  variant?: "scroll" | "layout";
}

export function BrandCard({ brand, index = 0, variant = "scroll" }: BrandCardProps) {
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
        transition={{ duration: 0.5, ease: easeCouture, delay: index * 0.05 }}
      >
        <Link
          to={`/brands/${brand.slug}`}
          className="group relative flex aspect-3/4 flex-col items-center justify-center rounded-lg border border-champagne/15 bg-obsidian-soft/60 px-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone-soft/80"
        >
          {brand.isNew && (
            <span className="eyebrow absolute left-3 top-3 rounded-full bg-champagne px-2 py-0.5 text-[9px] text-obsidian">
              New
            </span>
          )}
          <span className="font-display text-lg text-bone transition-colors group-hover:text-champagne sm:text-xl light:text-ink">
            {brand.name}
          </span>
          <span className="eyebrow mt-2 text-[10px] text-bone/45 light:text-ink/45">
            {brand.tagline}
          </span>
        </Link>
      </motion.div>
    );
  }

  const categoryLabels = brand.categories
    .map((slug) => shopCategories.find((c) => c.slug === slug)?.label)
    .filter((label): label is string => Boolean(label))
    .slice(0, 2);

  return (
    <motion.div
      {...entranceProps}
      transition={{ duration: 0.4, ease: easeCouture }}
    >
      <Link
        to={`/brands/${brand.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-champagne/15 bg-obsidian-soft/60 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone-soft/80"
      >
        {brand.isNew && (
          <span className="eyebrow absolute left-3 top-3 z-10 rounded-full bg-champagne px-2 py-0.5 text-[9px] text-obsidian">
            New
          </span>
        )}

        {/* Crossfade zone: monogram <-> signature pieces preview */}
        <div className="relative flex min-h-40 flex-1 items-center justify-center px-4 py-6">
          <AnimatePresence mode="wait" initial={false}>
            {hovered && brand.signaturePieces?.length ? (
              <motion.div
                key="pieces"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <span className="eyebrow text-champagne">Signature Pieces</span>
                <ul className="mt-3 space-y-1.5">
                  {brand.signaturePieces.slice(0, 3).map((piece) => (
                    <li
                      key={piece}
                      className="text-xs text-bone/70 light:text-ink/70"
                    >
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
                className="flex h-16 w-16 items-center justify-center rounded-full bg-bordeaux"
              >
                <span className="font-display text-2xl italic text-champagne">
                  {brand.name.charAt(0)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Persistent identity zone */}
        <div className="border-t border-champagne/10 px-4 py-4">
          <span className="font-display text-lg text-bone transition-colors group-hover:text-champagne light:text-ink">
            {brand.name}
          </span>
          <p className="mt-1 text-xs text-bone/50 light:text-ink/50">
            {brand.tagline}
          </p>

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
            View Atelier →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
