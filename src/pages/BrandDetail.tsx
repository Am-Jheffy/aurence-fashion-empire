import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { brands, shopCategories } from "@/lib/mockData";
import { StitchLine } from "@/components/ui/StitchLine";
import { useWaitlistModal } from "@/context/WaitlistModalContext";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function BrandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { openModal } = useWaitlistModal();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-obsidian px-6 pt-24 text-center light:bg-bone">
        <p className="font-display text-2xl text-bone light:text-ink">
          Brand not found
        </p>
        <Link to="/brands" className="eyebrow text-champagne">
          ← Back to All Brands
        </Link>
      </div>
    );
  }

  const categoryLabels = brand.categories
    .map((slug) => shopCategories.find((c) => c.slug === slug)?.label)
    .filter((label): label is string => Boolean(label));

  return (
    <div className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/brands" className="transition-colors hover:text-champagne">
            Brands
          </Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">{brand.name}</span>
        </nav>

        <div className="mt-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: easeCouture }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-bordeaux shadow-[0_0_60px_-10px_rgba(110,15,26,0.6)]"
          >
            <span className="font-display text-4xl italic text-champagne">
              {brand.name.charAt(0)}
            </span>
          </motion.div>

          {brand.isNew && (
            <span className="eyebrow mt-5 rounded-full bg-champagne px-3 py-1 text-[10px] text-obsidian">
              New to Aurence
            </span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
            className="font-display mt-6 text-4xl text-bone sm:text-5xl light:text-ink"
          >
            {brand.name}
          </motion.h1>
          <p className="eyebrow mt-3 text-champagne">{brand.tagline}</p>

          {categoryLabels.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="eyebrow rounded-full border border-champagne/25 px-3 py-1 text-bone/60 light:text-ink/60"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.15 }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-bone/65 light:text-ink/65"
          >
            {brand.story}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openModal("Customer")}
              className="rounded-full bg-bordeaux px-7 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
            >
              Notify Me When the Catalog Opens
            </button>
            <button
              type="button"
              disabled
              title="Favoriting brands opens once accounts launch"
              className="eyebrow flex cursor-not-allowed items-center gap-1.5 text-bone/40 light:text-ink/40"
            >
              ♡ Favorite
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <StitchLine orientation="horizontal" className="text-champagne/20" />
      </div>

      {/* Catalog opening soon */}
      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <p className="eyebrow text-center text-champagne">The Collection</p>
        <h2 className="font-display mt-2 text-center text-2xl text-bone light:text-ink">
          Opening Soon
        </h2>

        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="grid grid-cols-2 gap-4 opacity-30 blur-[1px] sm:grid-cols-3 lg:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 rounded-lg border border-champagne/15 bg-obsidian-soft/60 light:bg-bone-soft/80"
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span className="eyebrow rounded-full bg-bordeaux px-5 py-2 text-center text-bone shadow-lg">
              {brand.name}'s catalog is being tailored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
