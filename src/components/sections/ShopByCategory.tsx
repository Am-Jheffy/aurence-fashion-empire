import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { shopCategories } from "@/lib/mockData";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function ShopByCategory() {
  return (
    <section className="bg-obsidian-soft light:bg-bone-soft">
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
              Shop by Category
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
              className="font-display mt-3 max-w-lg text-3xl text-bone sm:text-4xl light:text-ink"
            >
              Find the piece, not just the brand.
            </motion.h2>
          </div>
          <Link
            to="/shop"
            className="eyebrow border-b border-champagne/50 pb-1 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
          >
            View All Categories
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {shopCategories.map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCouture, delay: i * 0.05 }}
            >
              <Link
                to={`/shop/${category.slug}`}
                className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-lg border border-champagne/15 bg-obsidian/50 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone/70"
              >
                <span className="font-display flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 text-lg italic text-champagne transition-colors group-hover:bg-champagne group-hover:text-obsidian">
                  {category.glyph}
                </span>
                <span className="eyebrow text-bone/75 light:text-ink/75">
                  {category.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
