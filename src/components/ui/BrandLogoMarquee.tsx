import { motion } from "framer-motion";
import { brands } from "@/lib/mockData";

/**
 * No real brand logo assets exist yet, so this uses styled wordmarks
 * (Fraunces italic) rather than placeholder image files — swap in actual
 * logo images per brand once available, same layout otherwise.
 */
export function BrandLogoMarquee() {
  return (
    <div className="overflow-hidden border-y border-champagne/10 py-6">
      <div className="flex whitespace-nowrap">
        <MarqueeTrack />
        <MarqueeTrack aria-hidden />
      </div>
    </div>
  );
}

function MarqueeTrack(props: { "aria-hidden"?: boolean }) {
  return (
    <motion.div
      {...props}
      animate={{ x: ["0%", "-100%"] }}
      transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {brands.map((brand, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-lg italic text-bone/40 light:text-ink/35">
            {brand.name}
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
