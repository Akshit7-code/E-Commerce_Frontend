import React from "react";

export default function FashionSplitSection() {
    return (
        <section className="w-full py-0 buttonclass">
            <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-0">

                {/* LEFT TEXT SECTION */}
                <div
                    className="
        relative
        w-full max-w-none
        col-span-1 md:col-span-2
        h-[420px] sm:h-[520px] md:h-[650px]
        px-4 sm:px-8 md:px-16
        flex flex-col justify-center
        text-white
      "
                    style={{
                        backgroundImage: `url('image/bannerimg3.webp')`,
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-neutral-900/90 z-0"></div>

                    {/* Content */}
                    <div className="relative z-10 w-full px-4 py-6 sm:px-8 sm:py-10 md:px-16 md:py-0">

                        <h2 className="text-xs sm:text-sm tracking-[4px] sm:tracking-[8px] uppercase text-gray-300">
                            Fashion That Speaks
                        </h2>

                        <h1 className="mt-2 font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            Be{" "}
                            <span className="overlayclass text-transparent" style={{ WebkitTextStroke: "1px white" }}>
                                Unforgettable
                            </span>
                        </h1>

                        <h3 className="mt-4 font-semibold text-lg sm:text-2xl md:text-3xl text-gray-200">
                            Style isn’t just worn — it’s experienced.
                        </h3>

                        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-200 max-w-full sm:max-w-xl md:max-w-2xl leading-relaxed">
                            Our latest collection blends luxury with comfort.
                            Designed for dreamers, believers, and trendsetters — because your presence should be impossible to ignore.
                        </p>

                        <button className="mt-8 sm:mt-10 px-8 sm:px-12 md:px-14 py-2.5 sm:py-3 text-sm sm:text-base border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 tracking-wide nav-link cursor-pointer">
                            Discover Now
                        </button>

                    </div>

                </div>


                {/* RIGHT IMAGE BOX (Smaller section) */}
                <div className="overflow-hidden h-[650px]">
                    <img
                        src="image/bannerimg.webp"
                        alt="fashion main"
                        className="w-full h-full object-cover hover:scale-110 duration-700"
                        loading="lazy"
                    />
                </div>

                {/* OVERLAY IMAGE (SHIFTED TOWARD CONTENT AREA) */}
                <div className="z-10 absolute top-1/2 left-[63%] -translate-x-1/2 hidden md:block -translate-y-1/2 border p-2 border-gray-300">
                    <img
                        src="image/bannerimg2.webp"
                        alt="feature fashion"
                        className="
      w-[280px] h-[380px] object-cover
      shadow-2xl
    "
                        loading="lazy"
                    />
                </div>

            </div>
        </section>
    );
}
