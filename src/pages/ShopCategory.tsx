import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { brands, products, shopCategories } from "@/lib/mockData";
import { ProductCard } from "@/components/ui/ProductCard";

const easeCouture = [0.16, 1, 0.3, 1] as const;

type PriceBand = "under-200" | "200-500" | "500-plus";
type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const priceBands: { value: PriceBand; label: string; test: (price: number) => boolean }[] = [
  { value: "under-200", label: "Under $200", test: (p) => p < 200 },
  { value: "200-500", label: "$200 – $500", test: (p) => p >= 200 && p <= 500 },
  { value: "500-plus", label: "$500+", test: (p) => p > 500 },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

/** Multi-select filters (brand, color, price) are stored comma-separated,
 *  e.g. ?brand=vellamor,thessaly — a single preset value (from a brand
 *  page's category tag) is just a one-element list, so both entry points
 *  parse the same way. */
function parseListParam(searchParams: URLSearchParams, key: string): string[] {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function chipClass(active: boolean) {
  return `eyebrow rounded-full border px-3 py-1.5 transition-colors ${
    active
      ? "border-champagne bg-champagne text-obsidian"
      : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
  }`;
}

/**
 * The Main Shopping View — one screen, two entry points:
 *   /shop/gowns                    Shop landing "View All Gowns" — no preset
 *   /shop/gowns?brand=vellamor     a brand page's category tag — brand preset
 * All filter state (brand, color, price, new-only, search text, sort)
 * lives in the URL, so both are just different starting points into the
 * same component, and any filtered view is shareable/bookmarkable.
 * Switching the category dropdown resets filters — brand/color/price
 * facets from one category don't reliably carry meaning into another.
 */
export function ShopCategory() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = shopCategories.find((c) => c.slug === categorySlug);

  const activeBrands = parseListParam(searchParams, "brand");
  const activeColors = parseListParam(searchParams, "color");
  const activePrices = parseListParam(searchParams, "price") as PriceBand[];
  const onlyNew = searchParams.get("new") === "1";
  const searchText = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") as SortOption) ?? "featured";

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
    const list = categoryProducts.filter((p) => {
      if (activeBrands.length > 0 && !activeBrands.includes(p.brandSlug)) return false;
      if (activeColors.length > 0 && !p.colors.some((c) => activeColors.includes(c))) return false;
      if (activePrices.length > 0) {
        const matchesAnyBand = activePrices.some((bandValue) => {
          const band = priceBands.find((b) => b.value === bandValue);
          return band ? band.test(p.price) : false;
        });
        if (!matchesAnyBand) return false;
      }
      if (onlyNew && !p.isNew) return false;
      if (searchText.trim() && !p.name.toLowerCase().includes(searchText.trim().toLowerCase())) {
        return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "newest") sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return sorted;
  }, [categoryProducts, activeBrands, activeColors, activePrices, onlyNew, searchText, sort]);

  function updateParams(mutator: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(searchParams);
    mutator(next);
    setSearchParams(next);
  }

  function toggleBrand(slug: string) {
    updateParams((next) => {
      const list = toggleInList(activeBrands, slug);
      if (list.length > 0) next.set("brand", list.join(",")); else next.delete("brand");
    });
  }

  function toggleColor(color: string) {
    updateParams((next) => {
      const list = toggleInList(activeColors, color);
      if (list.length > 0) next.set("color", list.join(",")); else next.delete("color");
    });
  }

  function togglePrice(value: PriceBand) {
    updateParams((next) => {
      const list = toggleInList(activePrices, value);
      if (list.length > 0) next.set("price", list.join(",")); else next.delete("price");
    });
  }

  function toggleNew() {
    updateParams((next) => {
      if (onlyNew) next.delete("new"); else next.set("new", "1");
    });
  }

  function handleCategoryChange(newSlug: string) {
    navigate(`/shop/${newSlug}`);
  }

  function clearAllFilters() {
    setSearchParams(new URLSearchParams());
  }

  const activeFilterCount =
    activeBrands.length +
    activeColors.length +
    activePrices.length +
    (onlyNew ? 1 : 0) +
    (searchText.trim() ? 1 : 0);

  if (!category) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-obsidian px-6 pt-24 text-center light:bg-bone">
        <p className="font-display text-2xl text-bone light:text-ink">Category not found</p>
        <Link to="/shop" className="eyebrow text-champagne">← Back to Shop</Link>
      </div>
    );
  }

  const filterPanel = (
    <div className="flex flex-col gap-8">
      {availableBrands.length > 0 && (
        <div>
          <p className="eyebrow text-bone/50 light:text-ink/50">Brand</p>
          <div className="mt-3 flex flex-col gap-2">
            {availableBrands.map((b) => (
              <label
                key={b.slug}
                className="flex items-center gap-2.5 text-sm text-bone/75 light:text-ink/75"
              >
                <input
                  type="checkbox"
                  checked={activeBrands.includes(b.slug)}
                  onChange={() => toggleBrand(b.slug)}
                  className="h-4 w-4 rounded border-champagne/40 accent-bordeaux"
                />
                {b.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {availableColors.length > 0 && (
        <div>
          <p className="eyebrow text-bone/50 light:text-ink/50">Color</p>
          <div className="mt-3 flex flex-col gap-2">
            {availableColors.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2.5 text-sm text-bone/75 light:text-ink/75"
              >
                <input
                  type="checkbox"
                  checked={activeColors.includes(c)}
                  onChange={() => toggleColor(c)}
                  className="h-4 w-4 rounded border-champagne/40 accent-bordeaux"
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow text-bone/50 light:text-ink/50">Price</p>
        <div className="mt-3 flex flex-col gap-2">
          {priceBands.map((band) => (
            <label
              key={band.value}
              className="flex items-center gap-2.5 text-sm text-bone/75 light:text-ink/75"
            >
              <input
                type="checkbox"
                checked={activePrices.includes(band.value)}
                onChange={() => togglePrice(band.value)}
                className="h-4 w-4 rounded border-champagne/40 accent-bordeaux"
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2.5 text-sm text-bone/75 light:text-ink/75">
          <input
            type="checkbox"
            checked={onlyNew}
            onChange={toggleNew}
            className="h-4 w-4 rounded border-champagne/40 accent-bordeaux"
          />
          New Arrivals only
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="eyebrow self-start text-champagne underline underline-offset-2"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-28 lg:px-10 lg:pt-36">
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
      </div>

      {/* Search bar: category dropdown + free-text search + sort */}
      <div className="sticky top-16 z-40 border-b border-champagne/10 bg-obsidian/95 px-6 py-4 backdrop-blur-md light:bg-bone/95 lg:top-18 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-stretch overflow-hidden rounded-md border border-champagne/25 bg-obsidian-soft light:bg-bone-soft sm:max-w-xl">
            <select
              value={category.slug}
              onChange={(e) => handleCategoryChange(e.target.value)}
              aria-label="Category"
              className="border-r border-champagne/20 bg-transparent px-3 py-2.5 text-sm text-bone focus:outline-none light:text-ink"
            >
              {shopCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                updateParams((next) => {
                  if (e.target.value) next.set("q", e.target.value);
                  else next.delete("q");
                })
              }
              placeholder={`Search ${category.label.toLowerCase()}...`}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:outline-none light:text-ink light:placeholder:text-ink/40"
            />
          </div>

          <label className="flex items-center gap-3 text-sm">
            <span className="eyebrow text-bone/50 light:text-ink/50">Sort</span>
            <select
              value={sort}
              onChange={(e) =>
                updateParams((next) => {
                  if (e.target.value === "featured") next.delete("sort");
                  else next.set("sort", e.target.value);
                })
              }
              className="rounded-md border border-champagne/25 bg-obsidian-soft px-3 py-2 text-sm text-bone focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {activeFilterCount > 0 && (
          <div className="mx-auto mt-3 flex max-w-7xl flex-wrap items-center gap-2">
            {activeBrands.map((slug) => {
              const b = brands.find((x) => x.slug === slug);
              if (!b) return null;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => toggleBrand(slug)}
                  className={chipClass(true)}
                >
                  {b.name} ✕
                </button>
              );
            })}
            {activeColors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleColor(c)}
                className={chipClass(true)}
              >
                {c} ✕
              </button>
            ))}
            {activePrices.map((v) => {
              const band = priceBands.find((b) => b.value === v);
              if (!band) return null;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => togglePrice(v)}
                  className={chipClass(true)}
                >
                  {band.label} ✕
                </button>
              );
            })}
            {onlyNew && (
              <button type="button" onClick={toggleNew} className={chipClass(true)}>
                New Arrivals ✕
              </button>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="eyebrow text-bone/50 underline underline-offset-2 hover:text-champagne light:text-ink/50"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:px-10 lg:py-14">
        {/* Mobile filter accordion — native <details>, no extra JS state needed */}
        <details className="mb-6 rounded-md border border-champagne/15 bg-obsidian-soft/60 px-4 py-3 light:bg-bone-soft/80 lg:hidden">
          <summary className="eyebrow cursor-pointer text-bone/75 light:text-ink/75">
            Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
          </summary>
          <div className="mt-5">{filterPanel}</div>
        </details>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">{filterPanel}</aside>

        <div>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-bone/50 light:text-ink/50">
              No items match these filters.
            </p>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} variant="shopping" />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
