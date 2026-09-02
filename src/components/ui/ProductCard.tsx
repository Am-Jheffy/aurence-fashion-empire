import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/lib/mockData";
import { brands, shopCategories } from "@/lib/mockData";
import { colorSwatch } from "@/lib/colorSwatches";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const brand = brands.find((b) => b.slug === product.brandSlug);
  const category = shopCategories.find((c) => c.slug === product.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: easeCouture, delay: index * 0.03 }}
    >
      <Link
        to={`/brands/${product.brandSlug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-champagne/15 bg-obsidian-soft/60 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone-soft/80"
      >
        {product.isNew && (
          <span className="eyebrow absolute left-3 top-3 z-10 rounded-full bg-champagne px-2 py-0.5 text-[9px] text-obsidian">
            New
          </span>
        )}

        <div className="flex aspect-square items-center justify-center">
          <span className="font-display flex h-14 w-14 items-center justify-center rounded-full border border-champagne/30 text-xl italic text-champagne transition-colors group-hover:bg-champagne group-hover:text-obsidian">
            {category?.glyph ?? product.category.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="border-t border-champagne/10 px-4 py-4">
          <p className="font-display text-base text-bone transition-colors group-hover:text-champagne light:text-ink">
            {product.name}
          </p>
          {brand && (
            <p className="mt-1 text-xs text-bone/50 light:text-ink/50">{brand.name}</p>
          )}
          <p className="eyebrow mt-2 text-champagne">${product.price}</p>

          <div className="mt-3 flex gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color}
                title={color}
                aria-label={color}
                className="h-3.5 w-3.5 rounded-full border border-champagne/30"
                style={{ backgroundColor: colorSwatch(color) }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
