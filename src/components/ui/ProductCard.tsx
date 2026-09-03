import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/lib/mockData";
import { brands, shopCategories } from "@/lib/mockData";
import { colorSwatch } from "@/lib/colorSwatches";

const easeCouture = [0.16, 1, 0.3, 1] as const;

interface ProductCardProps {
  product: Product;
  index?: number;
  /**
   * "compact" (default): browse-only card, used on the Shop landing page
   * teasers. "shopping": adds Save + Add to Cart, used in the Main
   * Shopping View (ShopCategory). Both actions are stubbed — see the
   * handlers below — until CartContext and a real saved-items store
   * exist.
   */
  variant?: "compact" | "shopping";
}

export function ProductCard({ product, index = 0, variant = "compact" }: ProductCardProps) {
  const brand = brands.find((b) => b.slug === product.brandSlug);
  const category = shopCategories.find((c) => c.slug === product.category);
  const [saved, setSaved] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const isShopping = variant === "shopping";

  function handleToggleSave(e: React.MouseEvent) {
    e.preventDefault();
    // TODO: wire to a real saved-items store (account-backed) once auth
    // exists. For now this is local component state only — it does not
    // persist across a reload, and is intentionally not localStorage-backed
    // like brand favorites, since product-level saves should live with the
    // account from day one rather than get migrated later.
    setSaved((prev) => !prev);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    // TODO: wire to CartContext once it exists. Cosmetic feedback only.
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

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

        {isShopping && (
          <button
            type="button"
            onClick={handleToggleSave}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
            className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
              saved
                ? "border-champagne bg-champagne text-obsidian"
                : "border-champagne/30 bg-obsidian/40 text-bone/70 hover:border-champagne/60 light:bg-bone/50 light:text-ink/60"
            }`}
          >
            {saved ? "♥" : "♡"}
          </button>
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

          {isShopping && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="eyebrow mt-4 w-full rounded-full bg-bordeaux px-4 py-2.5 text-bone transition-colors hover:bg-bordeaux-bright"
            >
              {justAdded ? "Added ✓" : "Add to Cart"}
            </button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
