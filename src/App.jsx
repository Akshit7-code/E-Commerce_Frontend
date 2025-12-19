import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import FashionSlider from "./components/FashionSlider";
import Signcollection from "./components/Signcollection";
import Categories from "./components/Categories";
import FashionSection from "./components/FashionSection";
import CursorFollower from "./components/CursorFollower";
import DealOfTheDay from "./components/DealOfTheDay";
import Testimonials from "./components/Testimonial";
import BrandMarquee from "./components/BrandMarquee";
import FullWidthFashionSection from "./components/FullWidthFashionSection";
import Footer from "./components/footer";
import MensClothes from "./pages/MensProduct";
import WomensClothes from "./pages/Women";
import ContactPage from "./pages/ContactPage";
import Collection from "./pages/Collection";
import SingleProduct from "./components/SingleProduct";
import CartPage from "./pages/Cart";
import NotFound from "./components/NotFound";
import ScrollToTopButton from "./components/ScrollToTopButton";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/AdminProtected";
import VerifyOtp from "./admin/verify-otp";
import ForgotPassword from "./admin/ForgotPassword";
import UpdateCredentials from "./admin/UpdateCredentials";



export default function App() {
  const location = useLocation();

  // Hide navbar/footer for admin pages & not found
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/404" ||
    location.pathname === "*" ||
    location.pathname.includes("not-found");

  return (
    <>
      {/* Hide navbar only on admin & not found pages */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <CursorFollower />}

      <Routes>
        {/* 🔐 Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/verify-otp" element={<VerifyOtp />} />
        <Route path="/admin/UpdateCredentials" element={<UpdateCredentials />} />

        {/* 🔒 Protected Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🏠 Home */}
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

        {/* 🧍 Men & Women */}
        <Route path="/Men" element={<MensClothes />} />
        <Route path="/Women" element={<WomensClothes />} />
        <Route path="/Collection" element={<Collection />} />

        {/* 🛒 Single Product & Cart */}
        <Route path="/product/:type/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />

        {/* 📞 Contact */}
        <Route path="/contact" element={<ContactPage />} />

        {/* ❌ Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Hide footer on admin & not found pages */}
      {!hideLayout && <ScrollToTopButton />}
      {!hideLayout && <Footer />}
    </>
  );
}
