/**
 * Maps the literal color names already used in product data (e.g. "Black",
 * "Ivory") to an approximate hex value for the small swatch dots on
 * product cards. This is not a stand-in for product photography — it's
 * just rendering the color name itself, honestly. Names with no sensible
 * single swatch (e.g. "Multicolor") fall back to a neutral dot.
 */
const colorSwatchMap: Record<string, string> = {
  Black: "#1a1210",
  White: "#ffffff",
  Ivory: "#f7f1ec",
  Blush: "#e8c4c4",
  Emerald: "#0b6e4f",
  Burgundy: "#6e0f1a",
  Camel: "#c19a6b",
  Cognac: "#9a4b28",
  Charcoal: "#36454f",
  Gold: "#c9a227",
  Silver: "#c0c0c0",
  "Gold/Silver": "#c9a227",
  Champagne: "#e0c05a",
  Blonde: "#e6c288",
  Brunette: "#4a2c1d",
  Nude: "#e3bfa0",
  Tan: "#d2b48c",
};

const FALLBACK_SWATCH = "#8a8a8a";

export function colorSwatch(colorName: string): string {
  return colorSwatchMap[colorName] ?? FALLBACK_SWATCH;
}
