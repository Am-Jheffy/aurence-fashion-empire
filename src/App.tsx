import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { WaitlistModalProvider } from "@/context/WaitlistModalContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WaitlistModal } from "@/components/ui/WaitlistModal";
import { Home } from "@/pages/Home";
import { BrandsDirectory } from "@/pages/BrandsDirectory";
import { BrandDetail } from "@/pages/BrandDetail";
import { Shop } from "@/pages/Shop";
import { ShopCategory } from "@/pages/ShopCategory";
import { DesignerDetail } from "@/pages/DesignerDetail";
import { UnderConstruction } from "@/pages/UnderConstruction";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <WaitlistModalProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/brands" element={<BrandsDirectory />} />
              <Route path="/brands/:slug" element={<BrandDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<ShopCategory />} />
              <Route path="/designers/:slug" element={<DesignerDetail />} />
              {/* Every other route is scaffolded for the future and
                  shows the couture "Under Construction" placeholder
                  until its real page is built. */}
              <Route path="*" element={<UnderConstruction />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <WaitlistModal />
      </WaitlistModalProvider>
    </ThemeProvider>
  );
}

export default App;
