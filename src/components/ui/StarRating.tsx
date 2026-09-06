interface StarRatingProps {
  /** Can be fractional in display mode (e.g. 4.6) — rounds to the nearest star. */
  rating: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ rating, size = "sm", interactive = false, onChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const starSize = size === "sm" ? "text-sm" : "text-xl";

  return (
    <div className={`flex items-center gap-0.5 ${starSize}`}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            aria-label={interactive ? `Rate ${star} star${star > 1 ? "s" : ""}` : undefined}
            className={`${interactive ? "cursor-pointer" : "cursor-default"} ${
              filled ? "text-champagne" : "text-bone/25 light:text-ink/20"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
