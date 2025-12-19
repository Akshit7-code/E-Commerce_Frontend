import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection({ title, background, page }) {
  const words = title.split(" ");
  const lastWord = words.pop();        // Last word
  const firstPart = words.join(" ");   // Remaining words

  return (
    <div
      className="buttonclass w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex flex-col items-center justify-center bg-cover bg-center relative px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage: `url("${background}")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Heading */}
      <h1 className="relative z-10 mt-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight">
        {firstPart}
        <br />
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: "1px white" }}
        >
          {lastWord}
        </span>
      </h1>

      {/* Breadcrumb */}
      <div className="relative z-10 mt-4 sm:mt-6 text-white text-xs sm:text-sm md:text-base flex flex-wrap justify-center gap-1">
        <Link to="/" className="opacity-70 hover:opacity-100 nav-link">
          Home
        </Link>
        <span>→</span>
        <span className="opacity-100 truncate">{page}</span>
      </div>
    </div>
  );
}
