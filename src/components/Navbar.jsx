import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);


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
    // { name: "Collection", path: "/collection" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-50
  w-[94%] max-w-7xl transition-all duration-300
  flex items-center justify-between
  px-4 md:px-8 py-3 md:py-4 rounded-full overflow-hidden
  ${active
            ? "bg-white/70 shadow-xl backdrop-blur-xl text-black"
            : "bg-transparent text-white"
          }`}
      >
        {/* LOGO */}
        <h1 className="font-bold text-xl md:text-2xl tracking-wide cursor-pointer">
          FashionX
        </h1>

        {/* DESKTOP MENU */}
        <nav className="hidden md:block">
          <ul className="flex gap-10 text-sm font-medium">
            {navLinks.map((item, index) => (
              <li key={index} className="relative group">
                <Link to={item.path}>{item.name}</Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* SEARCH (Desktop only) */}
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className={`absolute right-10 top-1/2 -translate-y-1/2 h-9 px-3 rounded-full text-sm transition-all duration-300
          ${searchOpen ? "opacity-100 w-56" : "opacity-0 w-0 pointer-events-none"
                }
          ${active
                  ? "bg-white border border-gray-300 text-black"
                  : "bg-white/20 border border-white/40 text-white placeholder-white"
                }`}
            />

            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2">
              <FiSearch size={20} />
            </button>
          </div>

          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2"
          >
            <HiOutlineShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
  className="md:hidden p-2 relative z-50"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
</button>

        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40
  w-[94%] rounded-2xl p-6 transition-all duration-300
  md:hidden
  ${menuOpen
            ? "opacity-100 scale-100 bg-white shadow-xl"
            : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full mb-4 px-4 py-2 border rounded-full text-sm"
        />

        {/* Links */}
        <ul className="flex flex-col gap-4 text-sm font-medium">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}
