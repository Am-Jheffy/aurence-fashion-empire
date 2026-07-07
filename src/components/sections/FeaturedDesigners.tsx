import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredDesigners } from "@/lib/mockData";

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
            <motion.div
              key={designer.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCouture, delay: i * 0.08 }}
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
          ))}
        </div>
      </div>
    </section>
  );
}