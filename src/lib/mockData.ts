/**
 * PLACEHOLDER DATA — every brand, designer, and image reference below is
 * fictional/mock content standing in for the real thing. Swap these out
 * (and wire them to a real data source) before this ships:
 *   - Brand names, logos, and cover images in `topBrands`
 *   - Designer names, headshots, and specialties in `featuredDesigners`
 *   - Category cover images in `shopCategories` (currently glyph-only, no images)
 */

export interface Brand {
  name: string;
  slug: string;
  tagline: string;
}

export const topBrands: Brand[] = [
  { name: "Vellamor", slug: "vellamor", tagline: "Bridal & Eveningwear" },
  { name: "Noire & Co.", slug: "noire-and-co", tagline: "Ready-to-Wear" },
  { name: "Isabeau Atelier", slug: "isabeau-atelier", tagline: "Couture Gowns" },
  { name: "Rousseau Maison", slug: "rousseau-maison", tagline: "Leather & Bags" },
  { name: "Thessaly", slug: "thessaly", tagline: "Fine Jewelry" },
  { name: "Kavir House", slug: "kavir-house", tagline: "Ankara & Print" },
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

import type { AudienceType } from "@/lib/waitlist";

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