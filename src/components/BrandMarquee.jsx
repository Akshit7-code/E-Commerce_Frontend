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
  const brandImages = ["image/z1.webp", "image/z2.png", "image/z3.webp", "image/z4.png", "image/z5.png", "image/z7.png"];

  return (
   <section className="relative w-full overflow-hidden bg-white py-8 sm:py-14">
  {/* Light overlay */}
  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>

  {/* SLIDER — LEFT TO RIGHT */}
  <div
    ref={marqueeRef1}
    className="flex gap-10 sm:gap-20 whitespace-nowrap animate-marquee"
    onMouseEnter={() => handleMouseEnter(marqueeRef1)}
    onMouseLeave={() => handleMouseLeave(marqueeRef1)}
  >
    {[...brandImages, ...brandImages].map((img, index) => (
      <div key={index} className="flex items-center justify-center min-w-[120px] sm:min-w-[180px]">
        <img
          src={`/${img}`}
          alt="brand"
          loading="lazy"
          className="h-[60px] sm:h-[100px] w-auto object-contain opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300"
        />
      </div>
    ))}
  </div>

  {/* SLIDER — RIGHT TO LEFT */}
  <div
    ref={marqueeRef2}
    className="flex gap-10 sm:gap-20 whitespace-nowrap animate-marquee-reverse mt-6 sm:mt-10"
    onMouseEnter={() => handleMouseEnter(marqueeRef2)}
    onMouseLeave={() => handleMouseLeave(marqueeRef2)}
  >
    {[...brandImages, ...brandImages].map((img, index) => (
      <div key={index} className="flex items-center justify-center min-w-[120px] sm:min-w-[180px]">
        <img
          src={`/${img}`}
          alt="brand"
          className="h-[60px] sm:h-[100px] w-auto object-contain opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300"
        />
      </div>
    ))}
  </div>
</section>

  );
}
