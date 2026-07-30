/**
 * PLACEHOLDER DATA — every brand, designer, and image reference below is
 * fictional/mock content standing in for the real thing. Swap these out
 * (and wire them to a real data source) before this ships:
 *   - Brand names, logos, cover images, and stories in `brands`
 *   - Designer names, headshots, and specialties in `featuredDesigners`
 *   - Category cover images in `shopCategories` (currently glyph-only, no images)
 */

import type { AudienceType } from "@/lib/waitlist";

export interface Brand {
  name: string;
  slug: string;
  tagline: string;
  /** Category slugs this brand carries — matches ShopCategory.slug. */
  categories: string[];
  story: string;
  /** Shown in the homepage "Top Brands" preview. */
  featured?: boolean;
  /** Shown with a "New" badge, and sortable by newest. */
  isNew?: boolean;
  /**
   * A few named pieces shown in the brand card's hover preview, standing
   * in for real product photography until a catalog exists.
   */
  signaturePieces?: string[];
}

export const brands: Brand[] = [
  {
    name: "Vellamor",
    slug: "vellamor",
    tagline: "Bridal & Eveningwear",
    categories: ["gowns", "wedding-attire"],
    story:
      "Vellamor has spent two decades perfecting the aisle-worthy silhouette — hand-draped tulle, corseted bodices, and eveningwear built for the moments that matter most.",
    signaturePieces: ["Silk Charmeuse Gown", "Corseted Ballgown", "Cathedral Veil"],
    featured: true,
  },
  {
    name: "Noire & Co.",
    slug: "noire-and-co",
    tagline: "Ready-to-Wear",
    categories: ["coats", "gowns"],
    story:
      "Noire & Co. builds a considered, seasonless wardrobe — tailored coats and easy eveningwear meant to be worn for years, not one occasion.",
    signaturePieces: ["Wool Trench Coat", "Bias-Cut Slip Dress", "Structured Blazer"],
    featured: true,
  },
  {
    name: "Isabeau Atelier",
    slug: "isabeau-atelier",
    tagline: "Couture Gowns",
    categories: ["gowns", "wedding-attire"],
    story:
      "Every Isabeau Atelier gown begins as a hand sketch and ends in a fitting room — small-batch couture for women who want something no one else is wearing.",
    signaturePieces: ["Hand-Beaded Gown", "Draped Cape Dress", "Embroidered Bodice"],
    featured: true,
  },
  {
    name: "Rousseau Maison",
    slug: "rousseau-maison",
    tagline: "Leather & Bags",
    categories: ["bags"],
    story:
      "Rousseau Maison works exclusively in full-grain leather, finished by hand in small runs — structured bags meant to age well and last decades.",
    signaturePieces: ["Structured Tote", "Top-Handle Satchel", "Leather Clutch"],
    featured: true,
  },
  {
    name: "Thessaly",
    slug: "thessaly",
    tagline: "Fine Jewelry",
    categories: ["jewelry", "watches"],
    story:
      "Thessaly designs fine jewelry and watches around uncommon stone cuts and heirloom-grade metalwork, made to be passed down rather than replaced.",
    featured: true,
    signaturePieces: ["Emerald Drop Earrings", "Signet Ring", "Two-Tone Watch"],
    isNew: true,
  },
  {
    name: "Kavir House",
    slug: "kavir-house",
    tagline: "Ankara & Print",
    categories: ["ankara"],
    story:
      "Kavir House works directly with West African textile mills, turning bold wax-print fabric into contemporary silhouettes that don't dilute the print.",
    signaturePieces: ["Wax-Print Wrap Dress", "Ankara Blazer", "Head Wrap Set"],
    featured: true,
  },
  {
    name: "Solenne & Vale",
    slug: "solenne-and-vale",
    tagline: "Footwear",
    categories: ["shoes"],
    story:
      "Solenne & Vale builds footwear around comfort first — hand-lasted heels and flats that are engineered to be worn all night, not just photographed.",
    signaturePieces: ["Hand-Lasted Pumps", "Block-Heel Sandal", "Leather Loafer"],
    isNew: true,
  },
  {
    name: "Marchetti Casa",
    slug: "marchetti-casa",
    tagline: "Contemporary Ready-to-Wear",
    categories: ["coats", "gowns"],
    story:
      "Marchetti Casa is an Italian ready-to-wear house built around precise tailoring and a restrained, monochrome palette.",
    signaturePieces: ["Wool Overcoat", "Monochrome Midi Dress", "Tailored Trouser"],
  },
  {
    name: "Noor Textiles",
    slug: "noor-textiles",
    tagline: "Print & Textile Design",
    categories: ["ankara"],
    story:
      "Noor Textiles designs original prints in-house before a single garment is cut — every pattern in their collection is exclusive to the house.",
    signaturePieces: ["Original Print Kaftan", "Textile Wrap Skirt", "Print Headscarf"],
    isNew: true,
  },
];

export interface ShopCategory {
  label: string;
  slug: string;
  /** Single-letter or short glyph shown in the tile (no imagery yet). */
  glyph: string;
}

export const shopCategories: ShopCategory[] = [
  { label: "Gowns", slug: "gowns", glyph: "G" },
  { label: "Shoes", slug: "shoes", glyph: "S" },
  { label: "Bags", slug: "bags", glyph: "B" },
  { label: "Jewelry", slug: "jewelry", glyph: "J" },
  { label: "Watches", slug: "watches", glyph: "W" },
  { label: "Ankara", slug: "ankara", glyph: "A" },
  { label: "Coats", slug: "coats", glyph: "C" },
  { label: "Wedding Attire", slug: "wedding-attire", glyph: "V" },
];

export interface Designer {
  name: string;
  slug: string;
  specialty: string;
  initials: string;
}

export const featuredDesigners: Designer[] = [
  { name: "Adaeze Obi", slug: "adaeze-obi", specialty: "Bridal Couture", initials: "AO" },
  { name: "Lior Ben-David", slug: "lior-ben-david", specialty: "Tailored Suiting", initials: "LB" },
  { name: "Camille Deschamps", slug: "camille-deschamps", specialty: "Eveningwear", initials: "CD" },
  { name: "Ngozi Umeh", slug: "ngozi-umeh", specialty: "Ankara & Print", initials: "NU" },
];

export interface PartnerType {
  label: string;
  path: string;
  description: string;
  audienceType: AudienceType;
}

export const partnerTypes: PartnerType[] = [
  {
    label: "Brands",
    path: "/partners/brands",
    description: "List your collections and reach a curated audience.",
    audienceType: "Brand",
  },
  {
    label: "Designers",
    path: "/partners/designers",
    description: "Take bookings and bespoke commissions through Aurence.",
    audienceType: "Designer",
  },
  {
    label: "Logistics",
    path: "/partners/logistics",
    description: "Handle fulfillment and delivery across our network.",
    audienceType: "Logistics",
  },
  {
    label: "Advertising",
    path: "/partners/advertising",
    description: "Put your campaigns in front of ready-to-buy shoppers.",
    audienceType: "Advertising",
  },
];
