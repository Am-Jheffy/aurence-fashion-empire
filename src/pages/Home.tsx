import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturedBrands } from "@/components/sections/FeaturedBrands";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { FeaturedDesigners } from "@/components/sections/FeaturedDesigners";
import { PartnerCTA } from "@/components/sections/PartnerCTA";

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedBrands />
      <ShopByCategory />
      <FeaturedDesigners />
      <PartnerCTA />
    </>
  );
}