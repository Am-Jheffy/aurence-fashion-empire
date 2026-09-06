import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { brands, products, shopCategories, type Review } from "@/lib/mockData";
import { StitchLine } from "@/components/ui/StitchLine";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/ui/ProductCard";
import { useWaitlistModal } from "@/context/WaitlistModalContext";
import { useFavoriteBrands } from "@/lib/useFavoriteBrands";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function BrandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { openModal } = useWaitlistModal();
  const { isFavorite, toggleFavorite } = useFavoriteBrands();
  const brand = brands.find((b) => b.slug === slug);

  // Reviews live in local state seeded from the brand's mock data, so a
  // submitted review appears immediately — but this resets on reload and
  // does NOT persist anywhere. Real persistence needs a backend; this is
  // just enough to demo the full interaction.
  const [sessionReviews, setSessionReviews] = useState<Review[]>(brand?.reviews ?? []);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newAuthor, setNewAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    setSessionReviews(brand?.reviews ?? []);
    setShowAllReviews(false);
    setNewRating(0);
    setNewAuthor("");
    setNewComment("");
    setReviewSubmitted(false);
  }, [slug, brand?.reviews]);

  if (!brand) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-obsidian px-6 pt-24 text-center light:bg-bone">
        <p className="font-display text-2xl text-bone light:text-ink">Brand not found</p>
        <Link to="/brands" className="eyebrow text-champagne">
          ← Back to All Brands
        </Link>
      </div>
    );
  }

  const categoryTags = brand.categories
    .map((catSlug) => shopCategories.find((c) => c.slug === catSlug))
    .filter((c): c is (typeof shopCategories)[number] => Boolean(c));

  const brandProducts = products.filter((p) => p.brandSlug === brand.slug);
  const categoriesWithProducts = brand.categories
    .map((catSlug) => ({
      category: shopCategories.find((c) => c.slug === catSlug),
      items: brandProducts.filter((p) => p.category === catSlug),
    }))
    .filter((entry) => entry.category && entry.items.length > 0);

  const averageRating =
    sessionReviews.length > 0
      ? sessionReviews.reduce((sum, r) => sum + r.rating, 0) / sessionReviews.length
      : 0;
  const likedByDisplay = brand.likedByCount + (isFavorite(brand.slug) ? 1 : 0);
  const visibleReviews = showAllReviews ? sessionReviews : sessionReviews.slice(0, 3);

  const stats = [
    {
      label: "Rating",
      value: (
        <div className="flex items-center justify-center gap-1.5">
          <StarRating rating={averageRating} />
          <span>{sessionReviews.length > 0 ? averageRating.toFixed(1) : "—"}</span>
        </div>
      ),
    },
    { label: "Reviews", value: sessionReviews.length },
    { label: "Joined", value: brand.dateJoined },
    { label: "Liked By", value: likedByDisplay },
    { label: "Goods Listed", value: brandProducts.length },
  ];

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim()) return;

    const review: Review = {
      id: `session-${Date.now()}`,
      author: newAuthor.trim() || "Anonymous",
      rating: newRating,
      comment: newComment.trim(),
      date: "Just now",
    };
    setSessionReviews((prev) => [review, ...prev]);
    setNewRating(0);
    setNewAuthor("");
    setNewComment("");
    setReviewSubmitted(true);
    window.setTimeout(() => setReviewSubmitted(false), 2500);
  }

  return (
    <div className="bg-obsidian light:bg-bone">
      {/* Hero */}
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-28 lg:px-10 lg:pt-36">
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

          {categoryTags.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {categoryTags.map((category) => (
                <Link
                  key={category.slug}
                  to={`/shop/${category.slug}?brand=${brand.slug}`}
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
            {brand.story}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openModal("Customer")}
              className="rounded-full bg-bordeaux px-6 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
            >
              Notify Me When the Catalog Opens
            </button>
            <button
              type="button"
              onClick={() =>
                openModal("Customer", `I'd like to request a custom piece from ${brand.name}.`)
              }
              className="eyebrow rounded-full border border-champagne/30 px-5 py-3 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
            >
              Request Customization
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(brand.slug)}
              aria-pressed={isFavorite(brand.slug)}
              className={`eyebrow flex items-center gap-1.5 rounded-full border px-5 py-3 transition-colors ${
                isFavorite(brand.slug)
                  ? "border-champagne bg-champagne text-obsidian"
                  : "border-champagne/30 text-bone/60 hover:border-champagne/60 light:text-ink/60"
              }`}
            >
              {isFavorite(brand.slug) ? "♥ Favorited" : "♡ Favorite"}
            </button>
            <button
              type="button"
              disabled
              title="Available once you have an Aurence account, so messages can be tracked from your Dressing Room"
              className="eyebrow flex cursor-not-allowed items-center gap-1.5 rounded-full border border-champagne/15 px-5 py-3 text-bone/35 light:text-ink/35"
            >
              ✉ Message Brand
            </button>
          </div>
        </div>
      </div>

      {/* Stats / analytics bar */}
      <div className="border-y border-champagne/10 bg-obsidian-soft light:bg-bone-soft">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-5 lg:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-lg text-bone light:text-ink">{stat.value}</div>
              <p className="eyebrow mt-1.5 text-[10px] text-bone/45 light:text-ink/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Item rows, grouped by category, each linking to the Main Shopping View */}
      {categoriesWithProducts.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          {categoriesWithProducts.map(({ category, items }) => (
            <section key={category!.slug} className="mb-14 last:mb-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-champagne/30 text-sm italic text-champagne">
                    {category!.glyph}
                  </span>
                  <h2 className="font-display text-xl text-bone sm:text-2xl light:text-ink">
                    {category!.label}
                  </h2>
                </div>
                <Link
                  to={`/shop/${category!.slug}?brand=${brand.slug}`}
                  className="eyebrow border-b border-champagne/50 pb-1 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
                >
                  View All {category!.label}
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6">
        <StitchLine orientation="horizontal" className="text-champagne/20" />
      </div>

      {/* Ratings & Reviews */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="text-center">
          <p className="eyebrow text-champagne">Ratings &amp; Reviews</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <StarRating rating={averageRating} size="md" />
            <span className="font-display text-xl text-bone light:text-ink">
              {sessionReviews.length > 0 ? averageRating.toFixed(1) : "No ratings yet"}
            </span>
          </div>
          <p className="mt-1 text-xs text-bone/45 light:text-ink/45">
            Based on {sessionReviews.length} review{sessionReviews.length === 1 ? "" : "s"}
          </p>
        </div>

        {sessionReviews.length > 0 && (
          <div className="mt-10 flex flex-col gap-5">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border border-champagne/15 bg-obsidian-soft/60 p-5 light:bg-bone-soft/80"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-sm text-bone light:text-ink">
                    {review.author}
                  </span>
                  <span className="text-xs text-bone/40 light:text-ink/40">{review.date}</span>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-2 text-sm leading-relaxed text-bone/70 light:text-ink/70">
                  {review.comment}
                </p>
              </div>
            ))}

            {sessionReviews.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllReviews((prev) => !prev)}
                className="eyebrow self-center text-champagne underline underline-offset-2"
              >
                {showAllReviews ? "Show Less" : `View All ${sessionReviews.length} Reviews`}
              </button>
            )}
          </div>
        )}

        {/* Submission form — session-only, see the component-level note above */}
        <form
          onSubmit={handleSubmitReview}
          className="mt-12 flex flex-col gap-4 rounded-lg border border-champagne/15 bg-obsidian-soft/60 p-6 light:bg-bone-soft/80"
        >
          <p className="eyebrow text-champagne">Leave a Rating &amp; Review</p>

          <div>
            <span className="eyebrow text-bone/60 light:text-ink/60">Your Rating</span>
            <div className="mt-1.5">
              <StarRating rating={newRating} size="md" interactive onChange={setNewRating} />
            </div>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="eyebrow text-bone/60 light:text-ink/60">
              Name <span className="normal-case tracking-normal text-bone/35 light:text-ink/35">(optional)</span>
            </span>
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Your name"
              className="rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone light:text-ink light:placeholder:text-ink/35"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="eyebrow text-bone/60 light:text-ink/60">Comment</span>
            <textarea
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={`What did you think of ${brand.name}?`}
              rows={3}
              className="resize-none rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone light:text-ink light:placeholder:text-ink/35"
            />
          </label>

          {reviewSubmitted && (
            <p className="text-sm text-champagne">Thanks for your review!</p>
          )}

          <button
            type="submit"
            disabled={newRating === 0}
            className="self-start rounded-full bg-bordeaux px-6 py-2.5 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Review
          </button>
          <p className="text-xs text-bone/35 light:text-ink/35">
            Reviews shown here are for this browsing session only — they aren't saved yet.
          </p>
        </form>
      </div>

      {/* Closing summary CTA */}
      <section className="relative w-full overflow-hidden bg-linear-to-br from-obsidian via-bordeaux/40 to-obsidian light:from-bone light:via-bordeaux/10 light:to-bone">
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-5%", "5%", "-5%"] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bordeaux-bright/30 blur-[160px]"
        />

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-10 lg:py-28">
          <p className="eyebrow text-champagne">In Summary</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCouture }}
            className="font-display mt-5 text-3xl text-bone sm:text-5xl light:text-ink"
          >
            Loved by {likedByDisplay} shopper{likedByDisplay === 1 ? "" : "s"}
            {sessionReviews.length > 0 ? `, rated ${averageRating.toFixed(1)} stars` : ""}.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-bone/70 light:text-ink/70">
            {brand.name} lists {brandProducts.length} piece{brandProducts.length === 1 ? "" : "s"}{" "}
            across {categoryTags.length} categor{categoryTags.length === 1 ? "y" : "ies"} on
            Aurence, with the full catalog opening soon.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openModal("Customer")}
              className="rounded-full bg-bordeaux px-8 py-3.5 text-sm font-semibold text-bone transition-all duration-300 hover:scale-105 hover:bg-bordeaux-bright"
            >
              Notify Me When It Opens
            </button>
            <Link
              to="/brands"
              className="eyebrow border-b border-champagne/50 pb-1 text-bone/70 transition-colors hover:border-champagne hover:text-champagne light:text-ink/70"
            >
              Explore More Brands
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
