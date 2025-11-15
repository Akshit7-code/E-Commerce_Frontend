import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

const products = {
  tshirts: ["sc1.jpg", "sc2.jpg", "sc3.jpg", "sc3.jpg", "sc5.jpg", "sc1.jpg"],
  jeans: ["sc1.jpg", "sc2.jpg", "sc3.jpg", "sc1.jpg", "sc2.jpg", "sc3.jpg"],
  sweatshirt: ["sc3.jpg", "sc4.jpg", "sc3.jpg", "sc4.jpg", "sc2.jpg", "sc1.jpg"],
  jackets: ["sc1.jpg", "sc2.jpg", "sc3.jpg", "sc4.jpg", "sc2.jpg", "sc4.jpg"],
  shoes: ["sc1.jpg", "sc2.jpg", "sc3.jpg", "sc4.jpg", "sc1.jpg", "sc2.jpg"],
};

const shapes = ["d-shape", "u-shape", "round-shape", "c-shape"];

export default function FashionSection() {
  const [activeTab, setActiveTab] = useState("tshirts");
  const tabs = ["tshirts", "jeans", "sweatshirt", "jackets", "shoes"];

  return (
    <div className="bg-[#1f1f20] buttonclass">
      <div className="max-w-7xl mx-auto py-16 text-white">

        {/* Headings */}
        <p className="font-semibold mb-2 tracking-wide uppercase text-gray-300 text-center">
          Trending Collections
        </p>
        <h2 className="text-4xl font-bold mb-4 tracking-wide text-center text-white">
          Explore Fashion That Fits Your Style
        </h2>
        <p className="text-gray-300 text-center mb-10">
          Check out our latest products and stay ahead with trendy looks.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-4 mb-10 flex-wrap nav-link">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer w-32 h-10 flex items-center justify-center rounded-full border text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white text-black border-white"
                  : "bg-[#1f1f20] text-gray-400 border-gray-300 hover:bg-white hover:text-black hover:border-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          loop={true}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          key={activeTab}
        >
          {products[activeTab].map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col justify-start items-start mt-6">
                {/* Shape Image */}
                <div
                  className={`overflow-hidden ${shapes[idx % shapes.length]}`}
                  style={{
                    height: "350px",
                    width: "300px",
                    backgroundColor: "#272728",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product details left-aligned */}
                <div className="mt-3 text-left px-2">
                  <h3 className="text-lg font-semibold text-white">Product {idx + 1}</h3>
                  <p className="text-gray-400 font-medium">$ {((idx + 1) * 25).toFixed(2)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-16">
          <button className="cursor-pointer swiper-prev nav-link w-12 h-12 flex items-center justify-center border border-gray-400 text-gray-300 hover:text-white hover:border-white hover:bg-gray-700 transition">
            <FaArrowLeft size={16} />
          </button>
          <button className="cursor-pointer swiper-next w-12 h-12 nav-link flex items-center justify-center border border-gray-400 text-gray-300 hover:text-white hover:border-white hover:bg-gray-700 transition">
            <FaArrowRight size={16} />
          </button>
        </div>

        {/* Shape Styles */}
        <style>
          {`
            .d-shape { border-radius: 15px 200px 200px 15px / 15px 200px 200px 15px; }
            .u-shape { border-radius: 15px 15px 200px 200px / 15px 15px 200px 200px; }
            .c-shape { border-radius: 200px 200px 15px 15px; }
            .round-shape { border-radius: 200px 15px 15px 200px / 200px 15px 15px 200px; }
          `}
        </style>
      </div>
    </div>
  );
}
