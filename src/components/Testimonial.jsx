import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Akshit Thakur",
    date: "Jan 10, 2024",
    role: "Founder — PixelWave Studio",
    message:
      "This platform has transformed the way I work. Their efficiency and support helped me.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Priya Sharma",
    date: "Feb 03, 2024",
    role: "Marketing Specialist",
    message:
      "The team is professional and always ready to help. I am impressed with their dedication.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Rohan Verma",
    date: "Mar 12, 2024",
    role: "Business Owner",
    message:
      "My business growth skyrocketed thanks to this service. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Jonathan Deo",
    date: "Jun 15, 2024",
    role: "Designer | Freelancer",
    message:
      "I have tried many platforms, but this one stands out. Clean, simple and powerful.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Aditi Mishra",
    date: "Aug 20, 2024",
    role: "Content Writer",
    message:
      "Amazing support & top-quality service. Loved working with them.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Rahul Singh",
    date: "Sep 01, 2024",
    role: "Entrepreneur",
    message: "Highly recommended — worth every penny!",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];

export default function TestimonialCircleSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handleAvatarClick = (index) => setActive(index);

  return (
    <>
      {/* Top SVG Wave */}
     
      <section
        className="w-full py-16 pt-28 px-6 flex flex-col items-center relative"
        style={{
          backgroundImage: "url('image/backgroundimage.webp')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >

 <div className="z-10 absolute -top-10 left-0 w-full overflow-hidden leading-none -rotate-180">
        <svg
          className="w-full h-[80px] md:h-[120px] hidden lg:block"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 217"
        >
          <g fillRule="evenodd" transform="matrix(-1 0 0 1 1920 0)">
            <path
              d="M0,57.46875 C203.364583,135.217754 494.835938,156.564108 874.414062,121.507813 C1192.61198,-13.9827666 1541.14063,-35.3291208 1920,57.46875 L1920,207 L0,207 L0,57.46875 Z"
              opacity=".2"
              fill="#171717"
            ></path>
            <path
              d="M0,79 C292.46875,165.453125 612.46875,165.453125 960,79 C1307.53125,-7.453125 1627.53125,-7.453125 1920,79 L1920,207 L0,207 L0,79 Z"
              opacity=".2"
              fill="#171717"
            ></path>
            <path
              d="M0,89 C288.713542,146.786458 608.713542,146.786458 960,89 C1311.28646,31.2135417 1631.28646,31.2135417 1920,89 L1920,217 L0,217 L0,89 Z"
              fill="white"
            ></path>
          </g>
        </svg>
      </div>

        {/* White overlay */}
        <div className="absolute inset-0 bg-white opacity-70"></div>      {/* Heading Section */}
        <div className="text-center z-10 px-4 sm:px-6 md:px-0">

          <p className="font-semibold mb-2 uppercase tracking-[2px] sm:tracking-wide text-sm sm:text-base" style={{ color: "#1F1F20" }}>
            Customer Stories
          </p>

          <h2 className="font-bold mb-3 tracking-wide text-2xl sm:text-3xl md:text-4xl" style={{ color: "#1F1F20" }}>
            What Our Clients Say About Us
          </h2>

          <p className="mb-8 sm:mb-10 text-sm sm:text-base" style={{ color: "#1F1F20" }}>
            — real experiences, real results.
          </p>

        </div>


        <div className="flex flex-col md:flex-row items-center justify-center gap-30 w-full">

          {/* LEFT SLIDER BOX — FIXED DIMENSIONS + CLEAN STRUCTURE */}
          <div className="w-full max-w-xl flex flex-col items-start">
            <div className="relative bg-white/30 border border-gray-200 shadow-xl px-10 py-6 rounded-3xl h-[280px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 50 }}        // fade + translate
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute top-0 left-0 w-full h-full p-8"
                >
                  {/* Top area - User info */}
                  <div className="flex items-center gap-5 mb-6">
                    <img
                      src={testimonials[active].avatar}
                      className="w-18 h-18 rounded-full border-[4px] border-indigo-600 shadow-xl"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{testimonials[active].name}</h3>
                      <p className="text-[#1F1F20] font-semibold">{testimonials[active].role}</p>
                      <p className="text-[#1F1F20] text-sm">{testimonials[active].date}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 leading-relaxed text-lg italic mb-6">
                    “{testimonials[active].message}”
                  </p>

                  {/* Rating Section */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-xl" />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-start justify-center gap-4 mt-8 z-10 pl-2 nav-link">
              <button
                onClick={prevSlide}
                className="duration-500 opacity-70 hover:opacity-100 cursor-pointer px-2 py-2 text-2xl border border-[#1F1F20] text-[#1F1F20] rounded-full hover:bg-[#1F1F20] hover:text-white transition"
              >
                <FaAngleLeft />

              </button>

              <button
                onClick={nextSlide}
                className="duraction-500 cursor-pointer px-2 text-2xl opacity-70 hover:opacity-100 py-2 border border-[#1F1F20] text-[#1F1F20] rounded-full hover:bg-[#1F1F20] hover:text-white transition"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE CIRCLE AVATARS (UNCHANGED) */}
        <div className="relative w-[460px] h-[460px] flex items-center justify-center hidden sm:flex">
            <img
              src={testimonials[active].avatar}
              className="w-44 h-44 rounded-full border-[8px] border-white shadow-2xl z-20 object-cover"
              loading="lazy"
            />

            {testimonials.map((item, index) => {
              const angle = (360 / testimonials.length) * index;
              return (
                <img
                  key={index}
                  src={item.avatar}
                  onClick={() => handleAvatarClick(index)}
                  className={`absolute w-25 h-25 rounded-full border-[6px] object-cover cursor-pointer transition-all duration-300 ${active === index ? "scale-110 border-indigo-500" : "border-white"
                    }`}
                  style={{
                    transform: `rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`,
                  }}
                  loading="lazy"
                />
              );
            })}
          </div>

        </div>
      </section>
    </>

  );
}
