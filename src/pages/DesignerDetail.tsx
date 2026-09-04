import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { featuredDesigners, shopCategories } from "@/lib/mockData";
import { DesignerCard } from "@/components/ui/DesignerCard";
import { StitchLine } from "@/components/ui/StitchLine";
import { useWaitlistModal } from "@/context/WaitlistModalContext";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function DesignerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { openModal } = useWaitlistModal();
  const designer = featuredDesigners.find((d) => d.slug === slug);

  if (!designer) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-obsidian px-6 pt-24 text-center light:bg-bone">
        <p className="font-display text-2xl text-bone light:text-ink">
          Designer not found
        </p>
        <Link to="/" className="eyebrow text-champagne">
          ← Back Home
        </Link>
      </div>
    );
  }

  const categoryTags = (designer.categories ?? [])
    .map((catSlug) => shopCategories.find((c) => c.slug === catSlug))
    .filter((c): c is (typeof shopCategories)[number] => Boolean(c));

  const otherDesigners = featuredDesigners.filter((d) => d.slug !== designer.slug);

  return (
    <div className="bg-obsidian light:bg-bone">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">{designer.name}</span>
        </nav>

        <div className="mt-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: easeCouture }}
            className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-champagne/40 bg-bordeaux"
          >
            <span className="font-display text-3xl italic text-champagne">
              {designer.initials}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
            className="font-display mt-6 text-4xl text-bone sm:text-5xl light:text-ink"
          >
            {designer.name}
          </motion.h1>
          <p className="eyebrow mt-3 text-champagne">{designer.specialty}</p>

          {categoryTags.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {categoryTags.map((category) => (
                <Link
                  key={category.slug}
                  to={`/shop/${category.slug}`}
                  className="eyebrow rounded-full border border-champagne/25 px-3 py-1 text-bone/60 transition-colors hover:border-champagne hover:text-champagne light:text-ink/60"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeCouture, delay: 0.15 }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-bone/65 light:text-ink/65"
          >
            {designer.bio}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                openModal(
                  "Customer",
                  `I'd like to book a consultation with ${designer.name}.`,
                )
              }
              className="rounded-full bg-bordeaux px-7 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
            >
              Book a Consultation
            </button>
            <button
              type="button"
              disabled
              title="Available once you have an Aurence account"
              className="eyebrow flex cursor-not-allowed items-center gap-1.5 text-bone/40 light:text-ink/40"
            >
              Send Measurements
            </button>
          </div>
        </div>
      </div>

      {designer.notableWork && designer.notableWork.length > 0 && (
        <>
          <div className="mx-auto max-w-4xl px-6">
            <StitchLine orientation="horizontal" className="text-champagne/20" />
          </div>
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10">
            <p className="eyebrow text-champagne">Notable Work</p>
            <ul className="mt-6 flex flex-col items-center gap-3">
              {designer.notableWork.map((piece) => (
                <li
                  key={piece}
                  className="font-display text-lg italic text-bone light:text-ink"
                >
                  {piece}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {otherDesigners.length > 0 && (
        <div className="border-t border-champagne/10 bg-obsidian-soft light:bg-bone-soft">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <p className="eyebrow text-champagne">More Designers</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {otherDesigners.map((d, i) => (
                <DesignerCard key={d.slug} designer={d} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
