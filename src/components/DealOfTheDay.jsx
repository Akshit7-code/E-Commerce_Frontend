import React, { useEffect, useState } from "react";

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 22,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-3 grid-rows-4 gap-6 h-[800px]">

        {/* 1 -> Left tall image */}
        <div className="row-span-4 rounded-xl overflow-hidden shadow-xl">
          <img src="sc5.jpg" className="w-full h-full object-cover hover:scale-105 duration-700" />
        </div>

        {/* 5 -> Right tall image */}
        <div className="row-span-4 col-start-3 row-start-1 rounded-xl overflow-hidden shadow-xl">
          <img src="sc6.jpg" className="w-full h-full object-cover hover:scale-105 duration-700" />
        </div>

        {/* 2 -> Top middle small image */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img src="banner.jpg" className="w-full h-full object-cover hover:scale-105 duration-700" />
        </div>

        {/* 4 -> Middle sale content (BIGGER box) */}
        <div className="row-span-2 col-start-2 row-start-2 rounded-xl shadow-lg flex flex-col items-center justify-center bg-white text-center px-10 py-10">

          {/* ULTIMATE (with border) */}
          <h3 className="text-4xl font-extrabold tracking-widest border px-5 py-1">
            ULTIMATE
          </h3>

          {/* SALE (outlined text) */}
          <h1
            className="text-[100px] font-extrabold leading-none text-transparent"
            style={{ WebkitTextStroke: "1px black" }}
          >
            SALE
          </h1>

          <p className="text-gray-500 text-sm tracking-wide uppercase mt-2">
            Limited Time Offer
          </p>

          {/* ⏳ COUNTDOWN LIVE TIMER */}
          <div className="mt-5 flex gap-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</h2>
              <p className="text-sm text-gray-500">Hrs</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</h2>
              <p className="text-sm text-gray-500">Min</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</h2>
              <p className="text-sm text-gray-500">Sec</p>
            </div>
          </div>

          <button className="mt-6 px-8 py-3 rounded-full border border-black hover:bg-black hover:text-white duration-300">
            Shop Now
          </button>
        </div>

        {/* 3 -> Bottom middle small image */}
        <div className="col-start-2 row-start-4 rounded-xl overflow-hidden shadow-md">
          <img src="banner4.jpg" className="w-full object-top h-full object-cover hover:scale-105 duration-700" />
        </div>

      </div>
    </section>
  );
}
