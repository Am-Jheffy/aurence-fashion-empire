import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { brands, products, shopCategories } from "@/lib/mockData";
import { ProductCard } from "@/components/ui/ProductCard";

const easeCouture = [0.16, 1, 0.3, 1] as const;

type PriceBand = "under-200" | "200-500" | "500-plus";

const priceBands: { value: PriceBand; label: string; test: (price: number) => boolean }[] = [
  { value: "under-200", label: "Under $200", test: (p) => p < 200 },
  { value: "200-500", label: "$200 – $500", test: (p) => p >= 200 && p <= 500 },
  { value: "500-plus", label: "$500+", test: (p) => p > 500 },
];

function chipClass(active: boolean) {
  return `eyebrow rounded-full border px-3 py-1.5 transition-colors ${
    active
      ? "border-champagne bg-champagne text-obsidian"
      : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
  }`;
}

/**
 * Same screen whether arriving from a brand page's category tag
 * (?brand=slug preset) or the Shop landing page's "View All" (no preset) —
 * filter state lives entirely in the URL, so it's just a different
 * starting point into the same component.
 */
export function ShopCategory() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = shopCategories.find((c) => c.slug === categorySlug);
  const activeBrand = searchParams.get("brand");
  const activeColor = searchParams.get("color");
  const activePrice = searchParams.get("price") as PriceBand | null;

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === categorySlug),
    [categorySlug],
  );

  const availableBrands = useMemo(() => {
    const slugs = new Set(categoryProducts.map((p) => p.brandSlug));
    return brands.filter((b) => slugs.has(b.slug));
  }, [categoryProducts]);

  const availableColors = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [categoryProducts]);

  const filtered = useMemo(() => {
    return categoryProducts.filter((p) => {
      if (activeBrand && p.brandSlug !== activeBrand) return false;
      if (activeColor && !p.colors.includes(activeColor)) return false;
      if (activePrice) {
        const band = priceBands.find((b) => b.value === activePrice);
        if (band && !band.test(p.price)) return false;
      }
      return true;
    });
  }, [categoryProducts, activeBrand, activeColor, activePrice]);

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  if (!category) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-obsidian px-6 pt-24 text-center light:bg-bone">
        <p className="font-display text-2xl text-bone light:text-ink">Category not found</p>
        <Link to="/shop" className="eyebrow text-champagne">← Back to Shop</Link>
      </div>
    );
  }

  const activeBrandName = activeBrand
    ? brands.find((b) => b.slug === activeBrand)?.name
    : null;

  return (
    <div className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="transition-colors hover:text-champagne">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">{category.label}</span>
        </nav>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="font-display mt-6 text-4xl text-bone sm:text-5xl light:text-ink"
        >
          {category.label}
        </motion.h1>

        {activeBrandName && (
          <p className="mt-3 text-sm text-bone/60 light:text-ink/60">
            Filtered by <span className="text-champagne">{activeBrandName}</span>
            {" — "}
            <button
              type="button"
              onClick={() => updateParam("brand", null)}
              className="underline underline-offset-2 hover:text-champagne"
            >
              clear
            </button>
          </p>
        )}
      </div>

      {/* Sticky filter bar — brand / color / price, all URL-backed */}
      <div className="sticky top-16 z-40 border-b border-champagne/10 bg-obsidian/95 px-6 py-4 backdrop-blur-md light:bg-bone/95 lg:top-18 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          {availableBrands.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-1 text-bone/50 light:text-ink/50">Brand</span>
              <button type="button" onClick={() => updateParam("brand", null)} className={chipClass(!activeBrand)}>
                All
              </button>
              {availableBrands.map((b) => (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => updateParam("brand", b.slug)}
                  className={chipClass(activeBrand === b.slug)}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}

          {availableColors.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-1 text-bone/50 light:text-ink/50">Color</span>
              <button type="button" onClick={() => updateParam("color", null)} className={chipClass(!activeColor)}>
                All
              </button>
              {availableColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateParam("color", c)}
                  className={chipClass(activeColor === c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1 text-bone/50 light:text-ink/50">Price</span>
            <button type="button" onClick={() => updateParam("price", null)} className={chipClass(!activePrice)}>
              All
            </button>
            {priceBands.map((b) => (
              <button
                key={b.value}
                type="button"
                onClick={() => updateParam("price", b.value)}
                className={chipClass(activePrice === b.value)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10 lg:pb-28">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-bone/50 light:text-ink/50">
            No items match these filters.
          </p>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
