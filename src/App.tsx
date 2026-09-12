import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { WaitlistModalProvider } from "@/context/WaitlistModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WaitlistModal } from "@/components/ui/WaitlistModal";
import { Home } from "@/pages/Home";
import { BrandsDirectory } from "@/pages/BrandsDirectory";
import { BrandDetail } from "@/pages/BrandDetail";
import { Shop } from "@/pages/Shop";
import { ShopCategory } from "@/pages/ShopCategory";
import { ProductDetail } from "@/pages/ProductDetail";
import { DesignerDetail } from "@/pages/DesignerDetail";
import { DesignersDirectory } from "@/pages/DesignersDirectory";
import { Auth } from "@/pages/Auth";
// import { DressingRoom } from "@/pages/DressingRoom";
import { UnderConstruction } from "@/pages/UnderConstruction";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Give the new page a tick to render before measuring its position —
      // the target section may not exist in the DOM yet on the same frame
      // the route changes.
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

/** Routes that render full-bleed, without the global Header/Footer. */
const NO_CHROME_PATHS = ["/login", "/signup", "/reset-password"];

function App() {
  const location = useLocation();
  const hideChrome = NO_CHROME_PATHS.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <WaitlistModalProvider>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col">
              {!hideChrome && <Header />}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/brands" element={<BrandsDirectory />} />
                  <Route path="/brands/:slug" element={<BrandDetail />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/:category" element={<ShopCategory />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/designers" element={<DesignersDirectory />} />
                  <Route path="/designers/:slug" element={<DesignerDetail />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/signup" element={<Auth />} />
                  <Route path="/reset-password" element={<Auth />} />
                  {/* <Route path="/dressing-room" element={<DressingRoom />} /> */}
                  <Route path="*" element={<UnderConstruction />} />
                </Routes>
              </main>
              {!hideChrome && <Footer />}
            </div>
            <WaitlistModal />
          </WaitlistModalProvider>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;