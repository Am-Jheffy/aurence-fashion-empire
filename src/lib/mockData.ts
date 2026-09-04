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
    categories: ["gowns", "wedding-attire", "wigs"],
    story:
      "Vellamor has spent two decades perfecting the aisle-worthy silhouette — hand-draped tulle, corseted bodices, and eveningwear built for the moments that matter most.",
    signaturePieces: ["Silk Charmeuse Gown", "Corseted Ballgown", "Bridal Hair Piece"],
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
  {
    name: "Belle Couronne",
    slug: "belle-couronne",
    tagline: "Wigs & Hair",
    categories: ["wigs"],
    story:
      "Belle Couronne hand-ties every unit from ethically sourced human hair, cut and customized to match face shape and install method before it ships.",
    signaturePieces: ["Lace Front Human Hair Wig", "Silk Press Bundle Set", "Bridal Hair Piece"],
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
  { label: "Wigs", slug: "wigs", glyph: "W" },
  { label: "Shoes", slug: "shoes", glyph: "S" },
  { label: "Bags", slug: "bags", glyph: "B" },
  { label: "Jewelry", slug: "jewelry", glyph: "J" },
  // { label: "Watches", slug: "watches", glyph: "W" },
  { label: "Ankara", slug: "ankara", glyph: "A" },
  { label: "Coats", slug: "coats", glyph: "C" },
  { label: "Wedding Attire", slug: "wedding-attire", glyph: "V" },
];

export interface Product {
  id: string;
  name: string;
  brandSlug: string;
  /** Matches ShopCategory.slug. */
  category: string;
  /** Whole-dollar placeholder price. */
  price: number;
  colors: string[];
  isNew?: boolean;
}

/**
 * Seeded from each brand's `signaturePieces` for continuity with what's
 * already shown in the brand cards' hover preview — same product names,
 * now with a price/color/category attached so they're filterable.
 */
export const products: Product[] = [
  // Vellamor
  { id: "vellamor-silk-charmeuse-gown", name: "Silk Charmeuse Gown", brandSlug: "vellamor", category: "gowns", price: 890, colors: ["Ivory", "Blush"] },
  { id: "vellamor-corseted-ballgown", name: "Corseted Ballgown", brandSlug: "vellamor", category: "wedding-attire", price: 1450, colors: ["White", "Ivory"] },
  { id: "vellamor-bridal-hair-piece", name: "Bridal Hair Piece", brandSlug: "vellamor", category: "wigs", price: 210, colors: ["Blonde", "Brunette"] },

  // Noire & Co.
  { id: "noire-wool-trench-coat", name: "Wool Trench Coat", brandSlug: "noire-and-co", category: "coats", price: 620, colors: ["Black", "Camel"] },
  { id: "noire-bias-cut-slip-dress", name: "Bias-Cut Slip Dress", brandSlug: "noire-and-co", category: "gowns", price: 340, colors: ["Black", "Emerald"] },
  { id: "noire-structured-blazer", name: "Structured Blazer", brandSlug: "noire-and-co", category: "coats", price: 480, colors: ["Black", "Ivory"] },

  // Isabeau Atelier
  { id: "isabeau-hand-beaded-gown", name: "Hand-Beaded Gown", brandSlug: "isabeau-atelier", category: "wedding-attire", price: 2100, colors: ["Ivory"] },
  { id: "isabeau-draped-cape-dress", name: "Draped Cape Dress", brandSlug: "isabeau-atelier", category: "gowns", price: 780, colors: ["Burgundy", "Black"] },
  { id: "isabeau-embroidered-bodice", name: "Embroidered Bodice Gown", brandSlug: "isabeau-atelier", category: "gowns", price: 650, colors: ["Champagne", "Ivory"] },

  // Rousseau Maison
  { id: "rousseau-structured-tote", name: "Structured Tote", brandSlug: "rousseau-maison", category: "bags", price: 420, colors: ["Cognac", "Black"] },
  { id: "rousseau-top-handle-satchel", name: "Top-Handle Satchel", brandSlug: "rousseau-maison", category: "bags", price: 380, colors: ["Black", "Burgundy"] },
  { id: "rousseau-leather-clutch", name: "Leather Clutch", brandSlug: "rousseau-maison", category: "bags", price: 240, colors: ["Cognac", "Black", "Ivory"] },

  // Thessaly
  { id: "thessaly-emerald-drop-earrings", name: "Emerald Drop Earrings", brandSlug: "thessaly", category: "jewelry", price: 890, colors: ["Gold"], isNew: true },
  { id: "thessaly-signet-ring", name: "Signet Ring", brandSlug: "thessaly", category: "jewelry", price: 310, colors: ["Gold", "Silver"], isNew: true },
  { id: "thessaly-two-tone-watch", name: "Two-Tone Watch", brandSlug: "thessaly", category: "watches", price: 1200, colors: ["Gold/Silver"], isNew: true },

  // Kavir House
  { id: "kavir-wax-print-wrap-dress", name: "Wax-Print Wrap Dress", brandSlug: "kavir-house", category: "ankara", price: 180, colors: ["Multicolor"] },
  { id: "kavir-ankara-blazer", name: "Ankara Blazer", brandSlug: "kavir-house", category: "ankara", price: 260, colors: ["Multicolor"] },
  { id: "kavir-head-wrap-set", name: "Head Wrap Set", brandSlug: "kavir-house", category: "ankara", price: 85, colors: ["Multicolor"] },

  // Solenne & Vale
  { id: "solenne-hand-lasted-pumps", name: "Hand-Lasted Pumps", brandSlug: "solenne-and-vale", category: "shoes", price: 340, colors: ["Black", "Nude"], isNew: true },
  { id: "solenne-block-heel-sandal", name: "Block-Heel Sandal", brandSlug: "solenne-and-vale", category: "shoes", price: 290, colors: ["Tan", "Black"], isNew: true },
  { id: "solenne-leather-loafer", name: "Leather Loafer", brandSlug: "solenne-and-vale", category: "shoes", price: 260, colors: ["Black", "Burgundy"], isNew: true },

  // Marchetti Casa
  { id: "marchetti-wool-overcoat", name: "Wool Overcoat", brandSlug: "marchetti-casa", category: "coats", price: 720, colors: ["Charcoal", "Camel"] },
  { id: "marchetti-monochrome-midi-dress", name: "Monochrome Midi Dress", brandSlug: "marchetti-casa", category: "gowns", price: 410, colors: ["Black", "Ivory"] },
  { id: "marchetti-tailored-trouser", name: "Tailored Trouser", brandSlug: "marchetti-casa", category: "coats", price: 260, colors: ["Charcoal", "Black"] },

  // Noor Textiles
  { id: "noor-original-print-kaftan", name: "Original Print Kaftan", brandSlug: "noor-textiles", category: "ankara", price: 220, colors: ["Multicolor"], isNew: true },
  { id: "noor-textile-wrap-skirt", name: "Textile Wrap Skirt", brandSlug: "noor-textiles", category: "ankara", price: 150, colors: ["Multicolor"], isNew: true },
  { id: "noor-print-headscarf", name: "Print Headscarf", brandSlug: "noor-textiles", category: "ankara", price: 60, colors: ["Multicolor"], isNew: true },

  // Belle Couronne
  { id: "belle-lace-front-wig", name: "Lace Front Human Hair Wig", brandSlug: "belle-couronne", category: "wigs", price: 380, colors: ["Black", "Brunette", "Blonde"], isNew: true },
  { id: "belle-silk-press-bundle-set", name: "Silk Press Bundle Set", brandSlug: "belle-couronne", category: "wigs", price: 150, colors: ["Black", "Brunette"], isNew: true },
  { id: "belle-bridal-hair-piece", name: "Bridal Hair Piece", brandSlug: "belle-couronne", category: "wigs", price: 95, colors: ["Blonde", "Brunette"], isNew: true },
];

export interface Designer {
  name: string;
  slug: string;
  specialty: string;
  initials: string;
  bio: string;
  /** A few named pieces shown on the designer's profile page. */
  notableWork?: string[];
  /**
   * Category slugs this designer specializes in — matches
   * ShopCategory.slug. Rendered as links to /shop/:category on the
   * profile page. Note: "suiting" doesn't have a matching shop category
   * yet, so Lior is loosely tagged under "coats" until one exists.
   */
  categories?: string[];
}

export const featuredDesigners: Designer[] = [
  {
    name: "Adaeze Obi",
    slug: "adaeze-obi",
    specialty: "Bridal Couture",
    initials: "AO",
    bio: "Adaeze has spent twelve years shaping bridal silhouettes by hand — every gown starts with a single fitting and a conversation about how the day should feel, not just look.",
    notableWork: ["Cathedral Lace Gown", "Convertible Two-Piece Bridal Set", "Hand-Beaded Bridal Cape"],
    categories: ["gowns", "wedding-attire"],
  },
  {
    name: "Lior Ben-David",
    slug: "lior-ben-david",
    specialty: "Tailored Suiting",
    initials: "LB",
    bio: "Lior trained on Savile Row before opening his own atelier, building suits around how a client actually moves rather than how they stand still for a fitting.",
    notableWork: ["Three-Piece Wool Suit", "Double-Breasted Evening Jacket", "Made-to-Measure Waistcoat"],
    categories: ["coats"],
  },
  {
    name: "Camille Deschamps",
    slug: "camille-deschamps",
    specialty: "Eveningwear",
    initials: "CD",
    bio: "Camille designs for the specific hour after sunset — draped eveningwear built to move under low light, informed by her years designing for the stage before fashion.",
    notableWork: ["Silk Draped Column Gown", "Structured Cape Gown", "Beaded Evening Blouse"],
    categories: ["gowns"],
  },
  {
    name: "Ngozi Umeh",
    slug: "ngozi-umeh",
    specialty: "Ankara & Print",
    initials: "NU",
    bio: "Ngozi works exclusively in commissioned print combinations, designing one-of-one pieces that never repeat a fabric pairing twice.",
    notableWork: ["Custom Ankara Gown", "Print-Blocked Two-Piece Set", "Commissioned Head Wrap"],
    categories: ["ankara"],
  },
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
