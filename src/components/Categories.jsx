import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "New Arrivals",
    desc: "Discover the latest trends and styles",
    img: "image/sc4.webp",
  },
  {
    title: "Outerwear",
    desc: "Stay warm and stylish with our outerwear collection",
    img: "image/bannerofcate3.webp",
  },
  {
    title: "Accessories",
    desc: "Complete your look with our trendy accessories",
    img: "image/bannerofcate2.webp",
  },
  {
    title: "Clothing",
    desc: "Explore our diverse range of clothing options",
    img: "image/main-banner2.webp",
  },
];
const Categories = () => {
  return (
    <div className="bg-white py-24 hidden lg:block">
      <div className="max-w-7xl mx-auto">
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">
          OUR CATEGORIES
        </h2> */}

        {/* Custom grid with 35%-65% layout */}
        <div className="grid grid-cols-[35%_65%] gap-4">
          {/* LEFT LARGE IMAGE (no overlay) */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}         // before scroll
            whileInView={{ opacity: 1, y: 0 }}      // when in view
            transition={{ duration: 1 }}          // smooth animation
            viewport={{ once: true }}
            className="relative overflow-hidden group">
            <img
              src={categories[0].img}
              alt={categories[0].title}
              className="w-full h-[660px] object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
            {/* Removed bg-black/30 */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 items-start">
              <h3 className="text-white text-xl font-semibold">
                {categories[0].title}
              </h3>
              <p className="text-white text-sm italic opacity-90 line-clamp-3 mb-4">
                {categories[0].desc}
              </p>
              <div>
                <Link to="/women" className="cursor-pointer px-4 py-1.5 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                  View Collection
                </Link>
              </div>
            </div>
          </motion.div>

          {/* RIGHT GRID (with subtle overlay) */}
          <div className="grid grid-rows-2 gap-4">
            {/* TOP WIDE IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}         // before scroll
              whileInView={{ opacity: 1, y: 0 }}      // when in view
              transition={{ duration: 1 }}          // smooth animation
              viewport={{ once: true }}
              className="relative overflow-hidden group">
              <img
                src={categories[1].img}
                alt={categories[1].title}
                className="w-full h-[322px] object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5 items-start">
                <h3 className="text-white text-xl font-semibold">
                  {categories[0].title}
                </h3>
                <p className="text-white text-sm italic opacity-90 line-clamp-3 mb-4">
                  {categories[0].desc}
                </p>
                <div>
                  <Link to="/men" className="px-4 py-1.5 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                    View Collection
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM TWO IMAGES */}
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(2).map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}         // before scroll
                  whileInView={{ opacity: 1, y: 0 }}      // when in view
                  transition={{ duration: 1 }}          // smooth animation
                  viewport={{ once: true }}
                  key={index}
                  className="relative overflow-hidden group"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[322px] object-cover rounded-2xl transform group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0  flex flex-col justify-end p-5 items-start">
                    <h3 className="text-white text-xl font-semibold ">
                      {categories[0].title}
                    </h3>
                    <p className="text-white text-sm italic opacity-90 line-clamp-3 mb-4">
                      {categories[0].desc}
                    </p>
                    <div>
                      <Link to="/women" className="px-4 py-1.5 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                        View Collection
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;