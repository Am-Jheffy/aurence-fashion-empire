import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brands, shopCategories } from "@/lib/mockData";
import { BrandCard } from "@/components/ui/BrandCard";
import { BrandLogoMarquee } from "@/components/ui/BrandLogoMarquee";
import { useWaitlistModal } from "@/context/WaitlistModalContext";
import { useFavoriteBrands } from "@/lib/useFavoriteBrands";

const easeCouture = [0.16, 1, 0.3, 1] as const;

type SortOption = "featured" | "az" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A–Z" },
  { value: "newest", label: "Newest" },
];

export function BrandsDirectory() {
  const { openModal } = useWaitlistModal();
  const { isFavorite, toggleFavorite } = useFavoriteBrands();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let list = brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.trim().toLowerCase()),
    );

    if (activeCategory) {
      list = list.filter((brand) => brand.categories.includes(activeCategory));
    }
    if (showOnlyNew) {
      list = list.filter((brand) => brand.isNew);
    }
    if (showOnlyFavorites) {
      list = list.filter((brand) => isFavorite(brand.slug));
    }

    const sorted = [...list];
    if (sort === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "newest") {
      sorted.sort((a, b) => {
        const aIsNew = a.isNew ? 1 : 0;
        const bIsNew = b.isNew ? 1 : 0;

        if (aIsNew !== bIsNew) {
          return bIsNew - aIsNew; 
        }
        
        return a.name.localeCompare(b.name);
      });
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [search, activeCategory, showOnlyNew, showOnlyFavorites, sort, isFavorite]);

  return (
    <div className="bg-obsidian light:bg-bone">
      {/* Hero heading */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">Brands</span>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="eyebrow mt-8 text-champagne"
        >
          The Houses We Carry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
          className="font-display mt-3 text-4xl text-bone sm:text-5xl light:text-ink"
        >
          Meet Our Brands
        </motion.h1>
      </div>

      <BrandLogoMarquee />

      {/* Sticky search & filter bar */}
      <div className="sticky top-16 z-40 border-b border-champagne/10 bg-obsidian/95 px-6 py-4 backdrop-blur-md light:bg-bone/95 lg:top-18 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className="w-full max-w-sm rounded-md border border-champagne/25 bg-obsidian-soft px-4 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-champagne focus:outline-none light:bg-bone-soft light:text-ink light:placeholder:text-ink/40"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`eyebrow rounded-full border px-4 py-1.5 transition-colors ${
                activeCategory === null
                  ? "border-champagne bg-champagne text-obsidian"
                  : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
              }`}
            >
              All
            </button>

            {/* Quick filters — combine with category selection rather than replace it */}
            <button
              type="button"
              onClick={() => setShowOnlyNew((prev) => !prev)}
              aria-pressed={showOnlyNew}
              className={`eyebrow rounded-full border px-4 py-1.5 transition-colors ${
                showOnlyNew
                  ? "border-champagne bg-champagne text-obsidian"
                  : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
              }`}
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => setShowOnlyFavorites((prev) => !prev)}
              aria-pressed={showOnlyFavorites}
              className={`eyebrow rounded-full border px-4 py-1.5 transition-colors ${
                showOnlyFavorites
                  ? "border-champagne bg-champagne text-obsidian"
                  : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
              }`}
            >
              ♥ Favorites
            </button>

            <span
              aria-hidden="true"
              className="mx-1 h-4 w-px bg-champagne/20"
            />

            {shopCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={`eyebrow rounded-full border px-4 py-1.5 transition-colors ${
                  activeCategory === category.slug
                    ? "border-champagne bg-champagne text-obsidian"
                    : "border-champagne/25 text-bone/60 hover:border-champagne/50 light:text-ink/60"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-sm">
            <span className="eyebrow text-bone/50 light:text-ink/50">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
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
      </div>

      {/* Grid — Framer layout animation reflows cards smoothly on filter/sort change */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10 lg:pb-28">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-bone/50 light:text-ink/50">
            No brands match your search.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((brand, i) => (
                <BrandCard
                  key={brand.slug}
                  brand={brand}
                  index={i}
                  variant="layout"
                  isFavorite={isFavorite(brand.slug)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Partnership CTA — full-bleed, animated glow, meant to feel alive */}
      <section className="relative w-full overflow-hidden bg-linear-to-br from-obsidian via-bordeaux/40 to-obsidian light:from-bone light:via-bordeaux/10 light:to-bone">
        <motion.div
          aria-hidden="true"
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "5%", "-5%"],
          }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux-bright/30 blur-[160px]"
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-champagne/10 via-transparent to-transparent"
        />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-10 lg:py-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture }}
            className="eyebrow text-champagne"
          >
            By Invitation &amp; Application
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
            className="font-display mt-5 text-4xl text-bone sm:text-5xl light:text-ink"
          >
            Do you want your brand to be displayed here?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-bone/70 light:text-ink/70"
          >
            Aurence carries a curated roster of houses. Apply and our team
            will follow up personally.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => openModal("Brand")}
              className="mt-7 rounded-full bg-bordeaux px-10 py-3.5 text-base font-semibold text-bone transition-all duration-300 hover:scale-105 hover:bg-bordeaux-bright"
            >
              Apply to Join
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
