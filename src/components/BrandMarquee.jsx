import React, { useRef } from "react";

export default function BrandMarquee() {
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);

  const handleMouseEnter = (ref) => {
    ref.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = (ref) => {
    ref.current.style.animationPlayState = "running";
  };

  // ✅ images from public folder
  const brandImages = ["z1.png", "z2.png", "z3.png", "z4.png", "z5.png", "z7.png"];

  return (
    <section className="relative py-14 w-full overflow-hidden bg-white">
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>

      {/* SLIDER — LEFT TO RIGHT */}
      <div
        ref={marqueeRef1}
        className="flex gap-20 whitespace-nowrap animate-marquee"
        onMouseEnter={() => handleMouseEnter(marqueeRef1)}
        onMouseLeave={() => handleMouseLeave(marqueeRef1)}
      >
        {[...brandImages, ...brandImages].map((img, index) => (
          <div key={index} className="flex items-center justify-center min-w-[180px]">
            <img
              src={`/${img}`}
              alt="brand"
              className="h-[100px] w-auto object-contain opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300"
            />
        {/* <span className="text-gray-800">~◆○◆~</span>  */}
          </div>
        ))}
      </div>

      {/* SLIDER — RIGHT TO LEFT */}
      <div
        ref={marqueeRef2}
        className="flex gap-20 whitespace-nowrap animate-marquee-reverse mt-10"
        onMouseEnter={() => handleMouseEnter(marqueeRef2)}
        onMouseLeave={() => handleMouseLeave(marqueeRef2)}
      >
        {[...brandImages, ...brandImages].map((img, index) => (
          <div key={index} className="flex items-center justify-center min-w-[180px]">
            <img
              src={`/${img}`}
              alt="brand"
              className="h-[100px] w-auto object-contain opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
