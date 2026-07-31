import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aurence-favorite-brands";

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
 * Favorite brands, persisted to localStorage until real accounts exist.
 * Deliberately just an array of brand slugs — the same shape a future
 * account-favorites API can seed from at signup (see README's "Pre-launch
 * waitlist" section for the same swap-later pattern applied elsewhere).
 */
export function useFavoriteBrands() {
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
