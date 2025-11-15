import React from "react";
import { Link } from "react-router-dom";
const categories = [
  {
    name: "Men",
    subText: "New arrivals for men.",
    image: "collection3.webp",
    link: "/products?category=men",
  },
  {
    name: "Women",
    subText: "Trending fashion for women.",
    image: "collection1.webp",
    link: "/products?category=women",
  },
  {
    name: "Accessories",
    subText: "Premium accessories collection.",
    image: "collection2.webp",
    link: "/products?category=accessories",
  },
  {
    name: "Kids",
    subText: "Stylish + comfy wear for kids.",
    image: "collection1.webp",
    link: "/products?category=kids",
  },
];

export default function CategoryHighlights() {
  return (
    <>
   
    <section className="w-full py-16 px-6 md:px-24 bg-[#f8f8f8]">
      {/* <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12 tracking-wide">
        Category Highlights
      </h2> */}

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => navigate(category.link)}
            className="
              buttonclass
              group relative overflow-hidden
              shadow-[0_4px_15px_rgba(0,0,0,0.12)]
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              transition-shadow duration-500
              bg-white
              cursor-pointer
            "
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay (bottom to top animation) */}
            <div
              className="
                absolute inset-0 bg-linear-to-t from-black to-transparent
                translate-y-full group-hover:translate-y-0
                transition-transform duration-700 ease-out
              "
            ></div>

            {/* Category Title */}
            <h3
              className="
                absolute bottom-12 left-1/2 -translate-x-1/2
                text-xl font-semibold text-white uppercase tracking-wider
                opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-700
              "
            >
              {category.name}
            </h3>

            {/* Sub Text */}
            {/* <p
              className="
                absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-gray-200
                opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-700
              "
            >
              {category.subText}
            </p> */}
          </button>
        ))}
      </div>
    </section>
    </>
  );
}
