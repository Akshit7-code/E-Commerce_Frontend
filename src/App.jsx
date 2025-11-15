import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FashionSlider from "./components/FashionSlider";
import Signcollection from "./components/Signcollection";
import Categories from "./components/Categories";
import FashionSection from "./components/FashionSection";
import CursorFollower from "./components/CursorFollower";
import CategoryHighlights from "./components/CategoryHighlights";
import DealOfTheDay from "./components/DealOfTheDay";
import Testimonials from "./components/Testimonial";
import BrandMarquee from "./components/BrandMarquee";
import FullWidthFashionSection from "./components/FullWidthFashionSection";
import Footer from "./components/footer";
// import AddProduct from "./components/AddProduct";
import MensClothes from "./pages/MensProduct";
import WomensClothes from "./pages/Women";
import ContactPage from "./pages/ContactPage";
import Collection from "./pages/Collection";
import SingleProduct from "./components/SingleProduct";
import CartPage from "./pages/Cart";

export default function App() {
  return (
    <>
      {/* ✅ Common Components (Visible on all pages) */}
      <Navbar />
      <CursorFollower />

      {/* ✅ Page Routes */}
      <Routes>
        {/* 🏠 Home Route */}
        <Route
          path="/"
          element={
            <>
              <FashionSlider />
              <Categories />
              <FashionSection />
              <Signcollection />
              <BrandMarquee />
              <FullWidthFashionSection />
              <DealOfTheDay />
              <Testimonials />
            </>
          }
        />

        {/* 🧍‍♂️ Men’s Products Page */}
        <Route path="/Men" element={<MensClothes />} />
        <Route path="/Women" element={<WomensClothes />} />
        <Route path="/Collection" element={<Collection />} />

        <Route path="/product/:type/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />


        {/* 🛠️ Admin / Add Product Page */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}
