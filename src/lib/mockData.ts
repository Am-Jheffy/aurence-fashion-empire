/**
 * PLACEHOLDER DATA — every brand, product, designer, review, and image
 * reference below is fictional/mock content standing in for the real
 * thing. Swap these out (and wire them to a real data source) before this
 * ships:
 *   - Brand names, logos, cover images, and stories in `brands`
 *   - Product names, prices, and photos in `products` (currently glyph/color
 *     swatch placeholders, no images)
 *   - Designer names, headshots, bios, and notable work in `featuredDesigners`
 *   - Reviewer names and comments in each brand's `reviews`
 */

import type { AudienceType } from "@/lib/waitlist";

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  /** Human-readable, e.g. "March 2026" — not meant to be parsed. */
  date: string;
}

export interface Brand {
  name: string;
  slug: string;
  tagline: string;
  /** Category slugs this brand carries — matches ShopCategory.slug. */
  categories: string[];
  story: string;
  /** Shown in the homepage "Top Brands" preview. */
  featured?: boolean;
  /** Shown with a "New" badge, and filterable via "New Arrivals". */
  isNew?: boolean;
  /**
   * A few named pieces shown in the brand card's hover preview, standing
   * in for real product photography until a catalog exists. Also used to
   * seed `products` below.
   */
  signaturePieces?: string[];
  /** When the brand joined Aurence, shown on the brand detail page. */
  dateJoined: string;
  /**
   * Baseline mock "liked by" count — does NOT include the current
   * browser's own favorite (that's added live from useFavoriteBrands so
   * the number updates immediately when you click the heart).
   */
  likedByCount: number;
  /** Customer reviews shown on the brand detail page. Average rating is
   *  computed live from this array rather than stored separately. */
  reviews: Review[];
}

export const brands: Brand[] = [
  {
    name: "Vellamor",
    slug: "vellamor",
    tagline: "Bridal & Eveningwear",
    categories: ["gowns", "wedding-attire", "wigs"],
    story:
      "Vellamor has spent two decades perfecting the aisle-worthy silhouette — hand-draped tulle, corseted bodices, and eveningwear built for the moments that matter most.",
    featured: true,
    signaturePieces: ["Silk Charmeuse Gown", "Corseted Ballgown", "Bridal Hair Piece"],
    dateJoined: "June 2022",
    likedByCount: 482,
    reviews: [
      { id: "vellamor-r1", author: "Amara K.", rating: 5, comment: "The ballgown fit like it was made for me — the fitting notes really came through.", date: "March 2026" },
      { id: "vellamor-r2", author: "Priya S.", rating: 5, comment: "Ordered the hair piece for my wedding. Beautifully made, arrived earlier than expected.", date: "January 2026" },
      { id: "vellamor-r3", author: "Chloe B.", rating: 4, comment: "Gorgeous gown, sizing ran slightly small so go up if you're between sizes.", date: "November 2025" },
    ],
  },
  {
    name: "Noire & Co.",
    slug: "noire-and-co",
    tagline: "Ready-to-Wear",
    categories: ["coats", "gowns"],
    story:
      "Noire & Co. builds a considered, seasonless wardrobe — tailored coats and easy eveningwear meant to be worn for years, not one occasion.",
    featured: true,
    signaturePieces: ["Wool Trench Coat", "Bias-Cut Slip Dress", "Structured Blazer"],
    dateJoined: "August 2022",
    likedByCount: 310,
    reviews: [
      { id: "noire-r1", author: "Jordan T.", rating: 5, comment: "The trench has become my everyday coat. Holds up well and the fit is exactly true to size.", date: "February 2026" },
      { id: "noire-r2", author: "Derek M.", rating: 4, comment: "Blazer is sharp, wish it came in more colors.", date: "December 2025" },
      { id: "noire-r3", author: "Leah R.", rating: 5, comment: "Slip dress drapes beautifully, doesn't cling in the wrong places.", date: "October 2025" },
    ],
  },
  {
    name: "Isabeau Atelier",
    slug: "isabeau-atelier",
    tagline: "Couture Gowns",
    categories: ["gowns", "wedding-attire"],
    story:
      "Every Isabeau Atelier gown begins as a hand sketch and ends in a fitting room — small-batch couture for women who want something no one else is wearing.",
    featured: true,
    signaturePieces: ["Hand-Beaded Gown", "Draped Cape Dress", "Embroidered Bodice"],
    dateJoined: "January 2023",
    likedByCount: 275,
    reviews: [
      { id: "isabeau-r1", author: "Fatima N.", rating: 5, comment: "The beadwork on my gown was even more detailed in person. Worth every fitting.", date: "March 2026" },
      { id: "isabeau-r2", author: "Grace L.", rating: 5, comment: "Cape dress got more compliments than anything else I've worn this year.", date: "January 2026" },
      { id: "isabeau-r3", author: "Miriam H.", rating: 4, comment: "Beautiful craftsmanship, took a bit longer to arrive than quoted.", date: "September 2025" },
    ],
  },
  {
    name: "Rousseau Maison",
    slug: "rousseau-maison",
    tagline: "Leather & Bags",
    categories: ["bags"],
    story:
      "Rousseau Maison works exclusively in full-grain leather, finished by hand in small runs — structured bags meant to age well and last decades.",
    featured: true,
    signaturePieces: ["Structured Tote", "Top-Handle Satchel", "Leather Clutch"],
    dateJoined: "March 2023",
    likedByCount: 198,
    reviews: [
      { id: "rousseau-r1", author: "Ines F.", rating: 5, comment: "Three years in and my tote still looks new. The leather only gets better.", date: "February 2026" },
      { id: "rousseau-r2", author: "Samuel D.", rating: 4, comment: "Satchel is stunning, a little stiff at first but breaks in nicely.", date: "November 2025" },
      { id: "rousseau-r3", author: "Ngozi A.", rating: 5, comment: "The clutch is the perfect size — fits everything I need without being bulky.", date: "August 2025" },
    ],
  },
  {
    name: "Thessaly",
    slug: "thessaly",
    tagline: "Fine Jewelry",
    categories: ["jewelry", "watches"],
    story:
      "Thessaly designs fine jewelry and watches around uncommon stone cuts and heirloom-grade metalwork, made to be passed down rather than replaced.",
    featured: true,
    isNew: true,
    signaturePieces: ["Emerald Drop Earrings", "Signet Ring", "Two-Tone Watch"],
    dateJoined: "November 2025",
    likedByCount: 64,
    reviews: [
      { id: "thessaly-r1", author: "Tobenna E.", rating: 5, comment: "The watch feels substantial without being heavy. Exactly what I wanted.", date: "March 2026" },
      { id: "thessaly-r2", author: "Kwame B.", rating: 5, comment: "Bought the signet ring as a gift — packaging and the ring itself were both excellent.", date: "February 2026" },
      { id: "thessaly-r3", author: "Ines F.", rating: 4, comment: "Earrings are gorgeous, slightly heavier than I expected for daily wear.", date: "January 2026" },
    ],
  },
  {
    name: "Kavir House",
    slug: "kavir-house",
    tagline: "Ankara & Print",
    categories: ["ankara"],
    story:
      "Kavir House works directly with West African textile mills, turning bold wax-print fabric into contemporary silhouettes that don't dilute the print.",
    featured: true,
    signaturePieces: ["Wax-Print Wrap Dress", "Ankara Blazer", "Head Wrap Set"],
    dateJoined: "May 2023",
    likedByCount: 356,
    reviews: [
      { id: "kavir-r1", author: "Ngozi A.", rating: 5, comment: "The wrap dress print is even richer in person. Gets stopped-on-the-street compliments.", date: "March 2026" },
      { id: "kavir-r2", author: "Wale O.", rating: 5, comment: "Ankara blazer is a statement piece, fits true to size.", date: "December 2025" },
      { id: "kavir-r3", author: "Amara K.", rating: 4, comment: "Head wrap set is beautiful, wish it came with styling instructions.", date: "October 2025" },
    ],
  },
  {
    name: "Solenne & Vale",
    slug: "solenne-and-vale",
    tagline: "Footwear",
    categories: ["shoes"],
    story:
      "Solenne & Vale builds footwear around comfort first — hand-lasted heels and flats that are engineered to be worn all night, not just photographed.",
    isNew: true,
    signaturePieces: ["Hand-Lasted Pumps", "Block-Heel Sandal", "Leather Loafer"],
    dateJoined: "September 2025",
    likedByCount: 41,
    reviews: [
      { id: "solenne-r1", author: "Chloe B.", rating: 5, comment: "Wore the pumps for an 8-hour event, no complaints. Genuinely comfortable.", date: "February 2026" },
      { id: "solenne-r2", author: "Leah R.", rating: 4, comment: "Sandals run slightly narrow, otherwise lovely.", date: "January 2026" },
      { id: "solenne-r3", author: "Priya S.", rating: 5, comment: "The loafers are my new go-to. Great arch support.", date: "December 2025" },
    ],
  },
  {
    name: "Marchetti Casa",
    slug: "marchetti-casa",
    tagline: "Contemporary Ready-to-Wear",
    categories: ["coats", "gowns"],
    story:
      "Marchetti Casa is an Italian ready-to-wear house built around precise tailoring and a restrained, monochrome palette.",
    signaturePieces: ["Wool Overcoat", "Monochrome Midi Dress", "Tailored Trouser"],
    dateJoined: "July 2023",
    likedByCount: 152,
    reviews: [
      { id: "marchetti-r1", author: "Derek M.", rating: 5, comment: "The overcoat tailoring is genuinely excellent — fits sharper than pieces twice the price.", date: "March 2026" },
      { id: "marchetti-r2", author: "Jordan T.", rating: 4, comment: "Midi dress is lovely, runs a touch long for my height.", date: "November 2025" },
      { id: "marchetti-r3", author: "Samuel D.", rating: 5, comment: "Trousers are the best-fitting pair I own.", date: "September 2025" },
    ],
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
    dateJoined: "October 2025",
    likedByCount: 37,
    reviews: [
      { id: "noor-r1", author: "Fatima N.", rating: 5, comment: "The kaftan print is unlike anything else I've seen — genuinely one of a kind.", date: "February 2026" },
      { id: "noor-r2", author: "Grace L.", rating: 4, comment: "Wrap skirt is beautiful, fabric is a little lighter than I expected.", date: "January 2026" },
      { id: "noor-r3", author: "Miriam H.", rating: 5, comment: "Headscarf quality is excellent, colors haven't faded after several washes.", date: "December 2025" },
    ],
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
    dateJoined: "December 2025",
    likedByCount: 29,
    reviews: [
      { id: "belle-r1", author: "Ngozi A.", rating: 5, comment: "The lace front is the most natural-looking unit I've worn. Customization made the difference.", date: "March 2026" },
      { id: "belle-r2", author: "Amara K.", rating: 5, comment: "Silk press bundle held its style for over two weeks.", date: "February 2026" },
      { id: "belle-r3", author: "Chloe B.", rating: 4, comment: "Beautiful hair piece, shipping took a little longer than expected.", date: "January 2026" },
    ],
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
  { label: "Wigs", slug: "wigs", glyph: "H" },
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
  /** Shown as a "Top Seller" badge on product cards. */
  topSeller?: boolean;
  description?: string;
  /**
   * Omitted entirely for products that don't need sizing (bags, jewelry
   * apart from rings, watches, headscarves, etc.) — the size selector on
   * the product page only renders "where necessary".
   */
  sizes?: string[];
  /**
   * Only populated for a handful of products so far (the topSeller ones,
   * one per brand) — real marketplaces don't have even review coverage
   * across every listing either. Products without reviews show an empty
   * state and a working submission form, same as ones that do.
   */
  reviews?: Review[];
}

/**
 * Seeded from each brand's `signaturePieces` for continuity with what's
 * already shown in the brand cards' hover preview — same product names,
 * now with a price/color/category attached so they're filterable.
 */
export const products: Product[] = [
  // Vellamor
  {
    id: "vellamor-silk-charmeuse-gown", name: "Silk Charmeuse Gown", brandSlug: "vellamor", category: "gowns", price: 890, colors: ["Ivory", "Blush"], topSeller: true,
    description: "A fluid, bias-cut gown in liquid silk charmeuse, finished with a hand-rolled hem. Cut to skim rather than cling, with a low back for evening wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { id: "vellamor-gown-r1", author: "Sophia R.", rating: 5, comment: "The silk drapes beautifully, didn't need any alterations.", date: "February 2026" },
      { id: "vellamor-gown-r2", author: "Amara K.", rating: 5, comment: "Fits true to size and photographs even better in person.", date: "December 2025" },
    ],
  },
  {
    id: "vellamor-corseted-ballgown", name: "Corseted Ballgown", brandSlug: "vellamor", category: "wedding-attire", price: 1450, colors: ["White", "Ivory"],
    description: "A structured corset bodice paired with a full tulle skirt, boned by hand for a fitted waist without discomfort. Built for the aisle, not just the photos.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "vellamor-bridal-hair-piece", name: "Bridal Hair Piece", brandSlug: "vellamor", category: "wigs", price: 210, colors: ["Blonde", "Brunette"],
    description: "A delicate floral and pearl hairpiece designed to pair with an updo or half-up style. Lightweight enough to wear through a full reception.",
  },

  // Noire & Co.
  {
    id: "noire-wool-trench-coat", name: "Wool Trench Coat", brandSlug: "noire-and-co", category: "coats", price: 620, colors: ["Black", "Camel"], topSeller: true,
    description: "A double-breasted trench in heavyweight wool gabardine, cut with a dropped shoulder for an easy, unstructured fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { id: "noire-coat-r1", author: "Jordan T.", rating: 5, comment: "Warm without being bulky, great for layering.", date: "January 2026" },
      { id: "noire-coat-r2", author: "Marcus P.", rating: 4, comment: "Great coat, sleeves ran slightly long for me.", date: "November 2025" },
    ],
  },
  {
    id: "noire-bias-cut-slip-dress", name: "Bias-Cut Slip Dress", brandSlug: "noire-and-co", category: "gowns", price: 340, colors: ["Black", "Emerald"],
    description: "Cut on the bias from a weighted matte satin, this slip dress moves with the body rather than against it.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "noire-structured-blazer", name: "Structured Blazer", brandSlug: "noire-and-co", category: "coats", price: 480, colors: ["Black", "Ivory"],
    description: "A single-button blazer with a sharp shoulder line, built from a stretch wool blend that holds its shape through a full day.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  // Isabeau Atelier
  {
    id: "isabeau-hand-beaded-gown", name: "Hand-Beaded Gown", brandSlug: "isabeau-atelier", category: "wedding-attire", price: 2100, colors: ["Ivory"], topSeller: true,
    description: "Every bead on this gown is sewn by hand, taking upward of sixty hours per piece. No two are ever exactly alike.",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { id: "isabeau-gown-r1", author: "Fatima N.", rating: 5, comment: "Every bead was intact on arrival, packaging was excellent.", date: "March 2026" },
      { id: "isabeau-gown-r2", author: "Grace L.", rating: 5, comment: "Worth the wait — the detailing is incredible.", date: "January 2026" },
    ],
  },
  {
    id: "isabeau-draped-cape-dress", name: "Draped Cape Dress", brandSlug: "isabeau-atelier", category: "gowns", price: 780, colors: ["Burgundy", "Black"],
    description: "A column dress with a detachable draped cape, so the same piece can move from ceremony to reception.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "isabeau-embroidered-bodice", name: "Embroidered Bodice Gown", brandSlug: "isabeau-atelier", category: "gowns", price: 650, colors: ["Champagne", "Ivory"],
    description: "Hand-embroidered bodice over a silk organza skirt, finished with an internal corset for structure without a visible seam.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  // Rousseau Maison
  {
    id: "rousseau-structured-tote", name: "Structured Tote", brandSlug: "rousseau-maison", category: "bags", price: 420, colors: ["Cognac", "Black"], topSeller: true,
    description: "Full-grain leather tote with a reinforced base and hand-stitched handles, built to carry weight without losing shape.",
    reviews: [
      { id: "rousseau-tote-r1", author: "Ines F.", rating: 5, comment: "Holds a laptop and still has room to spare.", date: "February 2026" },
      { id: "rousseau-tote-r2", author: "Deborah K.", rating: 4, comment: "Beautiful leather, a bit heavy when fully packed.", date: "October 2025" },
    ],
  },
  {
    id: "rousseau-top-handle-satchel", name: "Top-Handle Satchel", brandSlug: "rousseau-maison", category: "bags", price: 380, colors: ["Black", "Burgundy"],
    description: "A structured satchel with a single top handle and a detachable strap, finished with brass hardware that ages with the leather.",
  },
  {
    id: "rousseau-leather-clutch", name: "Leather Clutch", brandSlug: "rousseau-maison", category: "bags", price: 240, colors: ["Cognac", "Black", "Ivory"],
    description: "A compact envelope clutch in vegetable-tanned leather, lined in suede with room for the essentials and nothing more.",
  },

  // Thessaly
  {
    id: "thessaly-emerald-drop-earrings", name: "Emerald Drop Earrings", brandSlug: "thessaly", category: "jewelry", price: 890, colors: ["Gold"], isNew: true,
    description: "Emerald-cut stones set in eighteen-karat gold, finished with a secure lever-back closure for all-night wear.",
  },
  {
    id: "thessaly-signet-ring", name: "Signet Ring", brandSlug: "thessaly", category: "jewelry", price: 310, colors: ["Gold", "Silver"], isNew: true,
    description: "A hand-engraved signet in solid gold, sized to order and finished with a slightly domed face.",
    sizes: ["5", "6", "7", "8", "9"],
  },
  {
    id: "thessaly-two-tone-watch", name: "Two-Tone Watch", brandSlug: "thessaly", category: "watches", price: 1200, colors: ["Gold/Silver"], isNew: true, topSeller: true,
    description: "A two-tone stainless and gold watch with a sapphire crystal face, water-resistant to 50 meters.",
    reviews: [
      { id: "thessaly-watch-r1", author: "Tobenna E.", rating: 5, comment: "Keeps perfect time and the two-tone finish is versatile.", date: "March 2026" },
      { id: "thessaly-watch-r2", author: "Kwame B.", rating: 5, comment: "Feels substantial on the wrist without being heavy.", date: "February 2026" },
    ],
  },

  // Kavir House
  {
    id: "kavir-wax-print-wrap-dress", name: "Wax-Print Wrap Dress", brandSlug: "kavir-house", category: "ankara", price: 180, colors: ["Multicolor"], topSeller: true,
    description: "A wrap silhouette cut from authentic wax-print cotton, sourced directly from West African textile mills.",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { id: "kavir-dress-r1", author: "Ngozi A.", rating: 5, comment: "Print is richer in person, wrap tie holds all day.", date: "March 2026" },
      { id: "kavir-dress-r2", author: "Wale O.", rating: 4, comment: "Lovely dress, runs slightly big.", date: "December 2025" },
    ],
  },
  {
    id: "kavir-ankara-blazer", name: "Ankara Blazer", brandSlug: "kavir-house", category: "ankara", price: 260, colors: ["Multicolor"],
    description: "A structured blazer cut from bold wax-print cotton, lined in a complementary solid for a clean finish.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "kavir-head-wrap-set", name: "Head Wrap Set", brandSlug: "kavir-house", category: "ankara", price: 85, colors: ["Multicolor"],
    description: "A pre-tied head wrap set in coordinating wax prints, ready to wear without any styling required.",
  },

  // Solenne & Vale
  {
    id: "solenne-hand-lasted-pumps", name: "Hand-Lasted Pumps", brandSlug: "solenne-and-vale", category: "shoes", price: 340, colors: ["Black", "Nude"], isNew: true, topSeller: true,
    description: "Hand-lasted pumps with a cushioned insole and a block heel built for standing, not just sitting.",
    sizes: ["6", "7", "8", "9", "10"],
    reviews: [
      { id: "solenne-pumps-r1", author: "Chloe B.", rating: 5, comment: "Wore these for 8 hours straight, zero discomfort.", date: "February 2026" },
      { id: "solenne-pumps-r2", author: "Priya S.", rating: 5, comment: "Best heels I own for actually walking in.", date: "January 2026" },
    ],
  },
  {
    id: "solenne-block-heel-sandal", name: "Block-Heel Sandal", brandSlug: "solenne-and-vale", category: "shoes", price: 290, colors: ["Tan", "Black"], isNew: true,
    description: "An ankle-strap sandal on a stable block heel, finished in a soft nappa leather that molds to the foot.",
    sizes: ["6", "7", "8", "9", "10"],
  },
  {
    id: "solenne-leather-loafer", name: "Leather Loafer", brandSlug: "solenne-and-vale", category: "shoes", price: 260, colors: ["Black", "Burgundy"], isNew: true,
    description: "A penny loafer built on a supportive arch, finished in a supple leather that breaks in within a few wears.",
    sizes: ["6", "7", "8", "9", "10"],
  },

  // Marchetti Casa
  {
    id: "marchetti-wool-overcoat", name: "Wool Overcoat", brandSlug: "marchetti-casa", category: "coats", price: 720, colors: ["Charcoal", "Camel"], topSeller: true,
    description: "A single-breasted overcoat in Italian wool, cut with a clean silhouette and minimal detailing.",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { id: "marchetti-coat-r1", author: "Derek M.", rating: 5, comment: "Tailoring is sharp, fabric feels genuinely luxurious.", date: "March 2026" },
      { id: "marchetti-coat-r2", author: "Samuel D.", rating: 4, comment: "Great coat, runs slightly large in the shoulders.", date: "December 2025" },
    ],
  },
  {
    id: "marchetti-monochrome-midi-dress", name: "Monochrome Midi Dress", brandSlug: "marchetti-casa", category: "gowns", price: 410, colors: ["Black", "Ivory"],
    description: "A midi-length dress in a single tone, cut with a subtle A-line for ease of movement.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "marchetti-tailored-trouser", name: "Tailored Trouser", brandSlug: "marchetti-casa", category: "coats", price: 260, colors: ["Charcoal", "Black"],
    description: "A high-waisted, straight-leg trouser cut from a wool-blend twill, finished with a clean front seam.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  // Noor Textiles
  {
    id: "noor-original-print-kaftan", name: "Original Print Kaftan", brandSlug: "noor-textiles", category: "ankara", price: 220, colors: ["Multicolor"], isNew: true, topSeller: true,
    description: "A relaxed kaftan cut from an exclusive in-house print, designed to move easily from day to evening.",
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { id: "noor-kaftan-r1", author: "Fatima N.", rating: 5, comment: "Print is exclusive and the fabric breathes well.", date: "February 2026" },
      { id: "noor-kaftan-r2", author: "Grace L.", rating: 4, comment: "Beautiful piece, lighter weight than I expected.", date: "January 2026" },
    ],
  },
  {
    id: "noor-textile-wrap-skirt", name: "Textile Wrap Skirt", brandSlug: "noor-textiles", category: "ankara", price: 150, colors: ["Multicolor"], isNew: true,
    description: "A wrap skirt in an original textile print, finished with a self-tie waist for an adjustable fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "noor-print-headscarf", name: "Print Headscarf", brandSlug: "noor-textiles", category: "ankara", price: 60, colors: ["Multicolor"], isNew: true,
    description: "A lightweight silk-blend headscarf in an exclusive print, finished with hand-rolled edges.",
  },

  // Belle Couronne
  {
    id: "belle-lace-front-wig", name: "Lace Front Human Hair Wig", brandSlug: "belle-couronne", category: "wigs", price: 380, colors: ["Black", "Brunette", "Blonde"], isNew: true, topSeller: true,
    description: "A hand-tied lace front unit in 100% human hair, customized to match face shape and preferred install method.",
    sizes: ["S", "M", "L"],
    reviews: [
      { id: "belle-wig-r1", author: "Ngozi A.", rating: 5, comment: "Most natural hairline I've had from a unit this price.", date: "March 2026" },
      { id: "belle-wig-r2", author: "Amara K.", rating: 5, comment: "Customization made all the difference, install was seamless.", date: "February 2026" },
    ],
  },
  {
    id: "belle-silk-press-bundle-set", name: "Silk Press Bundle Set", brandSlug: "belle-couronne", category: "wigs", price: 150, colors: ["Black", "Brunette"], isNew: true,
    description: "A three-bundle set of silk-pressed human hair, pre-conditioned and ready to install.",
  },
  {
    id: "belle-bridal-hair-piece", name: "Bridal Hair Piece", brandSlug: "belle-couronne", category: "wigs", price: 95, colors: ["Blonde", "Brunette"], isNew: true,
    description: "A delicate bridal hair accent designed to pair with any of Belle Couronne's units or a natural style.",
  },
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
  { label: "Brands", path: "/partners/brands", description: "List your collections and reach a curated audience.", audienceType: "Brand" },
  { label: "Designers", path: "/partners/designers", description: "Take bookings and bespoke commissions through Aurence.", audienceType: "Designer" },
  { label: "Logistics", path: "/partners/logistics", description: "Handle fulfillment and delivery across our network.", audienceType: "Logistics" },
  { label: "Advertising", path: "/partners/advertising", description: "Put your campaigns in front of ready-to-buy shoppers.", audienceType: "Advertising" },
];
