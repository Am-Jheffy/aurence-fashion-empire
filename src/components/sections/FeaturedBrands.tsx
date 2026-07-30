import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brands } from "@/lib/mockData";
import { BrandCard } from "@/components/ui/BrandCard";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function FeaturedBrands() {
  const featured = brands.filter((brand) => brand.featured);

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
              The Houses We Carry
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
              className="font-display mt-3 text-3xl text-bone sm:text-4xl light:text-ink"
            >
              Top brands, one address.
            </motion.h2>
          </div>
          <Link
            to="/brands"
            className="eyebrow border-b border-champagne/50 pb-1 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
          >
            View All Brands
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
