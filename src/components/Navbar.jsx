import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load cart items count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

    // Listen for cart updates
    window.addEventListener("cartUpdated", () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    });
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl
      transition-all duration-300 flex items-center justify-between px-8 py-4 rounded-full
      ${
        active
          ? "bg-white/70 shadow-xl backdrop-blur-xl text-black"
          : "bg-transparent text-white"
      }`}
    >
      {/* LOGO */}
      <h1 className="font-bold text-2xl tracking-wide cursor-pointer select-none">
        FashionX
      </h1>

      {/* MENU */}
      <nav>
        <ul className="nav-link hidden md:flex gap-10 text-sm font-medium">
          {navLinks.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer relative group transition-all"
            >
              <Link to={item.path}>{item.name}</Link>

              {/* Hover underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-5">

        {/* SEARCH BUTTON */}
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className={`absolute right-10 top-1/2 -translate-y-1/2 h-9 px-3 rounded-full border outline-none text-sm transition-all duration-300
              ${
                searchOpen
                  ? "opacity-100 w-40 md:w-56"
                  : "opacity-0 w-0 pointer-events-none"
              }
              ${
                active
                  ? "bg-white/80 border-gray-300 text-black"
                  : "bg-white/20 border-white/40 text-white placeholder-white"
              }
            `}
          />

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="cursor-pointer nav-link p-2 rounded-full transition-all"
          >
            <FiSearch
              size={20}
              className={`${active ? "text-black" : "text-white"}`}
            />
          </button>
        </div>

        {/* UPDATED CART BUTTON WITH BADGE */}
        <button
          onClick={() => navigate("/cart")}
          className="cursor-pointer nav-link relative p-2 hover:scale-110 transition"
        >
          <HiOutlineShoppingBag
            size={23}
            className={`${active ? "text-black" : "text-white"}`}
          />

          {/* Badge */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
