import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brands, shopCategories } from "@/lib/mockData";
import { BrandCard } from "@/components/ui/BrandCard";
import { BrandLogoMarquee } from "@/components/ui/BrandLogoMarquee";
import { useWaitlistModal } from "@/context/WaitlistModalContext";

const easeCouture = [0.16, 1, 0.3, 1] as const;

type SortOption = "featured" | "az" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A–Z" },
  { value: "newest", label: "Newest" },
];

export function BrandsDirectory() {
  const { openModal } = useWaitlistModal();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let list = brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.trim().toLowerCase()),
    );

    if (activeCategory) {
      list = list.filter((brand) => brand.categories.includes(activeCategory));
    }

    const sorted = [...list];
    if (sort === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "newest") {
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [search, activeCategory, sort]);

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
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Partnership CTA — glassmorphism, exclusive tone */}
      <div className="relative overflow-hidden bg-obsidian py-24 light:bg-bone">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux/25 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="relative mx-auto max-w-2xl rounded-2xl border border-champagne/20 bg-obsidian-soft/40 px-8 py-14 text-center backdrop-blur-xl light:bg-bone-soft/50"
        >
          <p className="eyebrow text-champagne">By Invitation &amp; Application</p>
          <h2 className="font-display mt-4 text-3xl text-bone sm:text-4xl light:text-ink">
            Don't see your brand here?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-bone/60 light:text-ink/60">
            Aurence carries a curated roster of houses. Apply and our team
            will follow up personally.
          </p>
          <button
            type="button"
            onClick={() => openModal("Brand")}
            className="mt-8 rounded-full bg-bordeaux px-8 py-3.5 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
          >
            Apply to Join
          </button>
        </motion.div>
      </div>
    </div>
  );
}
