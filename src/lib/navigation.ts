export interface NavLink {
  label: string;
  path: string;
  isLive: boolean;
}

export const primaryNav: NavLink[] = [
  { label: "Shop", path: "/shop", isLive: true },
  { label: "Brands", path: "/brands", isLive: true },
  { label: "Designers", path: "/designers", isLive: true },
  { label: "Dressing Room", path: "/dressing-room", isLive: false },
];

export const footerShopLinks: NavLink[] = [
  { label: "Gowns", path: "/shop/gowns", isLive: true },
  { label: "Ankara", path: "/shop/ankara", isLive: true },
  { label: "Shoes", path: "/shop/shoes", isLive: true },
  { label: "Jewelry", path: "/shop/jewelry", isLive: true },
  { label: "Wedding Attire", path: "/shop/wedding-attire", isLive: true },
];

export const footerHouseLinks: NavLink[] = [
  { label: "About Aurence", path: "/about", isLive: false },
  { label: "Become a Partner Brand", path: "/partners", isLive: false },
  { label: "Become a Designer", path: "/designers/apply", isLive: false },
  { label: "Careers", path: "/careers", isLive: false },
];

export const socialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

/** Categories shown in the hero's slow-drifting atelier ticker. */
export const atelierCategories: string[] = [
  "GOWNS",
  "ANKARA",
  "COUTURE",
  "SHOES",
  "JEWELRY",
  "WATCHES",
  "NAILS",
  "WEDDING ATTIRE",
  "COATS",
  "ORNAMENTS",
];
