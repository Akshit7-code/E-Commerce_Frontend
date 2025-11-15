import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection({ title, background,page }) {
  const words = title.split(" ");
  const lastWord = words.pop();        // Last word
  const firstPart = words.join(" ");   // Remaining words

  return (
    <div
      className="buttonclass w-full h-[50vh] flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url("${background}")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Heading */}
      <h1 className="relative z-10 mt-16 text-2xl md:text-4xl font-bold text-white text-center leading-tight">
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
      <div className="relative z-10 mt-6 text-white text-sm md:text-base">
        <Link to="/" className="opacity-70 hover:opacity-100 nav-link">
          Home
        </Link>{" "}
        → <span className="opacity-100">{page}</span>
      </div>
    </div>
  );
}
