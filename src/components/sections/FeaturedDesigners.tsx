import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredDesigners } from "@/lib/mockData";
import { DesignerCard } from "@/components/ui/DesignerCard";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function FeaturedDesigners() {
  return (
    <section className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeCouture }}
              className="eyebrow text-champagne"
            >
              Bespoke & Made-to-Measure
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
              className="font-display mt-3 text-3xl text-bone sm:text-4xl light:text-ink"
            >
              Book a designer of your own.
            </motion.h2>
          </div>
          <Link
            to="/designers"
            className="eyebrow border-b border-champagne/50 pb-1 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
          >
            View All Designers
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDesigners.map((designer, i) => (
            <DesignerCard key={designer.slug} designer={designer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
