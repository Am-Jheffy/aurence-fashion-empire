import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { shopCategories, products } from "@/lib/mockData";
import { ProductCard } from "@/components/ui/ProductCard";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function Shop() {
  return (
    <div className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">Shop</span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="eyebrow mt-8 text-champagne"
        >
          Every Piece, Every House
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
          className="font-display mt-3 text-4xl text-bone sm:text-5xl light:text-ink"
        >
          Shop the Full Wardrobe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-bone/60 light:text-ink/60"
        >
          Browse by category across every brand at once. Open any category
          to filter by brand, color, or price.
        </motion.p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {shopCategories.map((category) => {
          const items = products
            .filter((p) => p.category === category.slug)
            .slice(0, 8);
          if (items.length === 0) return null;

          return (
            <section
              key={category.slug}
              className="border-t border-champagne/10 py-14 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-display flex h-10 w-10 items-center justify-center rounded-full border border-champagne/30 italic text-champagne">
                    {category.glyph}
                  </span>
                  <h2 className="font-display text-2xl text-bone sm:text-3xl light:text-ink">
                    {category.label}
                  </h2>
                </div>
                <Link
                  to={`/shop/${category.slug}`}
                  className="eyebrow border-b border-champagne/50 pb-1 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
                >
                  View All {category.label}
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {items.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
