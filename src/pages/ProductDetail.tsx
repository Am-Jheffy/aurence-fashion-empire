import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { brands, featuredDesigners, products, shopCategories, type Review } from "@/lib/mockData";
import { colorSwatch } from "@/lib/colorSwatches";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/ui/ProductCard";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const [colorIndex, setColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const [sessionReviews, setSessionReviews] = useState<Review[]>(product?.reviews ?? []);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newAuthor, setNewAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Reset all local UI state when navigating between products — the route
  // doesn't remount the component just because :id changed.
  useEffect(() => {
    setColorIndex(0);
    setSelectedSize(null);
    setQuantity(1);
    setSaved(false);
    setJustAdded(false);
    setSessionReviews(product?.reviews ?? []);
    setShowAllReviews(false);
    setNewRating(0);
    setNewAuthor("");
    setNewComment("");
    setReviewSubmitted(false);
  }, [id, product?.reviews]);

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-obsidian px-6 pt-24 text-center light:bg-bone">
        <p className="font-display text-2xl text-bone light:text-ink">Product not found</p>
        <Link to="/shop" className="eyebrow text-champagne">← Back to Shop</Link>
      </div>
    );
  }

  const brand = product.brandSlug ? brands.find((b) => b.slug === product.brandSlug) : undefined;
  const designer = product.designerSlug
    ? featuredDesigners.find((d) => d.slug === product.designerSlug)
    : undefined;
  const category = shopCategories.find((c) => c.slug === product.category);
  const selectedColor = product.colors[colorIndex];
  const needsSize = Boolean(product.sizes?.length);
  const canAddToCart = !needsSize || Boolean(selectedSize);

  const averageRating =
    sessionReviews.length > 0
      ? sessionReviews.reduce((sum, r) => sum + r.rating, 0) / sessionReviews.length
      : 0;
  const visibleReviews = showAllReviews ? sessionReviews : sessionReviews.slice(0, 3);

  const similarItems = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleToggleSave(e: React.MouseEvent) {
    e.preventDefault();
    // TODO: wire to a real saved-items store once accounts exist. Local
    // component state only — not persisted, same as ProductCard's Save.
    setSaved((prev) => !prev);
  }

  function handleAddToCart() {
    // TODO: wire to CartContext once it exists. Cosmetic feedback only.
    if (!canAddToCart) return;
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

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
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-10 lg:pt-36">
        <nav className="eyebrow text-bone/40 light:text-ink/40">
          <Link to="/" className="transition-colors hover:text-champagne">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="transition-colors hover:text-champagne">Shop</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/shop/${category.slug}`} className="transition-colors hover:text-champagne">
                {category.label}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-champagne">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery — thumbnails are the real color variants, doubling as
              the color selector, rather than staged product photography
              we don't have. */}
          <div>
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: easeCouture }}
              className="relative flex aspect-square items-center justify-center rounded-lg border border-champagne/15 light:border-champagne/20"
              style={{ backgroundColor: `${colorSwatch(selectedColor)}22` }}
            >
              <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
                {product.isNew && (
                  <span className="eyebrow rounded-full bg-champagne px-2.5 py-1 text-[10px] text-obsidian">
                    New
                  </span>
                )}
                {product.topSeller && (
                  <span className="eyebrow rounded-full bg-bordeaux-bright px-2.5 py-1 text-[10px] text-bone">
                    Top Seller
                  </span>
                )}
              </div>
              <span className="font-display flex h-28 w-28 items-center justify-center rounded-full border-2 border-champagne/40 bg-bordeaux text-4xl italic text-champagne">
                {category?.glyph ?? product.category.charAt(0).toUpperCase()}
              </span>
            </motion.div>

            {product.colors.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setColorIndex(i)}
                    title={color}
                    aria-label={`View in ${color}`}
                    aria-pressed={i === colorIndex}
                    className={`h-14 w-14 rounded-md border-2 transition-colors ${
                      i === colorIndex ? "border-champagne" : "border-champagne/20 hover:border-champagne/50"
                    }`}
                    style={{ backgroundColor: colorSwatch(color) }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {brand && (
              <Link
                to={`/brands/${brand.slug}`}
                className="eyebrow text-champagne transition-colors hover:text-champagne-soft"
              >
                {brand.name}
              </Link>
            )}
            {designer && (
              <Link
                to={`/designers/${designer.slug}`}
                className="eyebrow text-champagne transition-colors hover:text-champagne-soft"
              >
                {designer.name}
              </Link>
            )}
            <h1 className="font-display mt-2 text-3xl text-bone sm:text-4xl light:text-ink">
              {product.name}
            </h1>

            {sessionReviews.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <StarRating rating={averageRating} />
                <span className="text-sm text-bone/60 light:text-ink/60">
                  {averageRating.toFixed(1)} ({sessionReviews.length} review{sessionReviews.length === 1 ? "" : "s"})
                </span>
              </div>
            )}

            <p className="font-display mt-4 text-2xl text-champagne">${product.price}</p>

            {product.description && (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/70 light:text-ink/70">
                {product.description}
              </p>
            )}

            <div className="mt-6">
              <span className="eyebrow text-bone/50 light:text-ink/50">
                Color: <span className="text-bone/80 light:text-ink/80">{selectedColor}</span>
              </span>
            </div>

            {needsSize && (
              <div className="mt-5">
                <span className="eyebrow text-bone/50 light:text-ink/50">Size</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes!.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`eyebrow rounded-md border px-3.5 py-2 transition-colors ${
                        selectedSize === size
                          ? "border-champagne bg-champagne text-obsidian"
                          : "border-champagne/25 text-bone/70 hover:border-champagne/50 light:text-ink/70"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="mt-2 text-xs text-bone/40 light:text-ink/40">Please select a size.</p>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <span className="eyebrow text-bone/50 light:text-ink/50">Quantity</span>
              <div className="flex items-center rounded-md border border-champagne/25">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-1.5 text-bone/70 transition-colors hover:text-champagne light:text-ink/70"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm text-bone light:text-ink">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-1.5 text-bone/70 transition-colors hover:text-champagne light:text-ink/70"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="rounded-full bg-bordeaux px-7 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright disabled:cursor-not-allowed disabled:opacity-50"
              >
                {justAdded ? "Added ✓" : `Add ${quantity > 1 ? `${quantity} ` : ""}to Cart`}
              </button>
              <button
                type="button"
                onClick={handleToggleSave}
                aria-pressed={saved}
                className={`eyebrow flex items-center gap-1.5 rounded-full border px-5 py-3 transition-colors ${
                  saved
                    ? "border-champagne bg-champagne text-obsidian"
                    : "border-champagne/30 text-bone/60 hover:border-champagne/60 light:text-ink/60"
                }`}
              >
                {saved ? "♥ Saved" : "♡ Save"}
              </button>
            </div>
            <p className="mt-3 text-xs text-bone/35 light:text-ink/35">
              Cart and saved items aren't persisted anywhere yet — this is UI-only until accounts and a real cart exist.
            </p>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="border-t border-champagne/10 bg-obsidian-soft light:bg-bone-soft">
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
                  className="rounded-lg border border-champagne/15 bg-obsidian/60 p-5 light:bg-bone/80"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-sm text-bone light:text-ink">{review.author}</span>
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

          <form
            onSubmit={handleSubmitReview}
            className="mt-12 flex flex-col gap-4 rounded-lg border border-champagne/15 bg-obsidian/60 p-6 light:bg-bone/80"
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
                placeholder={`What did you think of the ${product.name}?`}
                rows={3}
                className="resize-none rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-sm text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none light:bg-bone light:text-ink light:placeholder:text-ink/35"
              />
            </label>

            {reviewSubmitted && <p className="text-sm text-champagne">Thanks for your review!</p>}

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
      </div>

      {/* Similar items */}
      {similarItems.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="eyebrow text-champagne">You Might Also Like</p>
          <h2 className="font-display mt-2 text-2xl text-bone sm:text-3xl light:text-ink">
            More in {category?.label ?? "this category"}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {similarItems.map((item, i) => (
              <ProductCard key={item.id} product={item} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
