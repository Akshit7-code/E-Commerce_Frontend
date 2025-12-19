import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const images = [
  { id: 1, image: "image/footer1.webp" },
  { id: 2, image: "image/footer2.webp" },
  { id: 3, image: "image/footer3.webp" },
  { id: 4, image: "image/footer4.webp" },
  { id: 5, image: "image/footer5.webp" },
  { id: 6, image: "image/footer6.webp" },
];


const Footer = () => {
  return (
    <footer className="bg-neutral-900 buttonclass text-gray-300 pt-20 pb-6 text-sm">

      {/* MAIN GRID: 4 SECTIONS */}
      <div className="max-w-[1500px] mx-auto px-10 md:px-28 grid grid-cols-1 md:grid-cols-4 gap-16 pb-16">

        {/* ============ LEFT SIDE (COMPANY + SOCIAL) ============ */}
        <div>
          <h1 className="text-white font-bold text-2xl mb-6 tracking-wide">
            FashionX
          </h1>

          <p className="text-gray-400 leading-relaxed mb-10">
            FashionX brings you the latest trends with premium quality and
            unmatched comfort. Stay stylish, stay unique.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram, FaPinterestP, FaTwitter].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex justify-center items-center bg-neutral-800 cursor-pointer hover:bg-neutral-700"
                >
                  <Icon />
                </div>
              )
            )}
          </div>
        </div>

        {/* ============ INFORMATION SECTION ============ */}
        <div>
          <h2 className="text-white font-semibold text-xl mb-6 tracking-wide">
            INFORMATION
          </h2>

          <ul className="space-y-3 leading-relaxed">
            <li className="hover:text-white cursor-pointer">My Account</li>
            <li className="hover:text-white cursor-pointer">Order History</li>
            <li className="hover:text-white cursor-pointer">Wishlist</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Private Policy</li>
            <li className="hover:text-white cursor-pointer">Site Map</li>
          </ul>
        </div>

        {/* ============ INSTAGRAM GALLERY ============ */}
        <div>
          <h2 className="text-white font-semibold text-xl mb-10 tracking-wide">
            INSTAGRAM
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {images.map((item) => (
              <div key={item.id} className="w-full h-20 bg-neutral-700">
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* ============ CONTACT US SECTION ============ */}
        <div>
          <h2 className="text-white font-semibold text-xl mb-10 tracking-wide">
            CONTACT US
          </h2>

          <div className="flex items-start gap-4 mb-6">
            <span className="w-10 h-10 bg-neutral-800 flex items-center justify-center">
              <FiMapPin className="text-lg" />
            </span>
            <p className="leading-relaxed">Address: Your address goes here</p>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <span className="w-10 h-10 bg-neutral-800 flex items-center justify-center">
              <FiMail className="text-lg" />
            </span>
            <div className="leading-relaxed">
              <p>demo@example.com</p>
              <p>info@example.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-10 h-10 bg-neutral-800 flex items-center justify-center">
              <FiPhone className="text-lg" />
            </span>
            <div className="leading-relaxed">
              <p>01234567890</p>
              <p>01234567890</p>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 text-xs border-t border-neutral-700 pt-4">
        © {new Date().getFullYear()} FashionX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
