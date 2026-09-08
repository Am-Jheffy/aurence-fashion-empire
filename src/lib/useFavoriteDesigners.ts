import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aurence-favorite-designers";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Favorite designers, persisted to localStorage until real accounts
 * exist — same pattern as useFavoriteBrands, kept as a separate hook
 * (rather than a generalized one) since it's cheap to duplicate and
 * keeps each domain's storage key obvious.
 */
export function useFavoriteDesigners() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
