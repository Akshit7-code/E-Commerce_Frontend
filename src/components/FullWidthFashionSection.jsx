import React from "react";

export default function FashionSplitSection() {
    return (
        <section className="w-full py-0 buttonclass">
            <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-0">

                {/* LEFT TEXT SECTION (Larger area) */}
                <div
                    className="col-span-2 relative h-[650px] px-16 flex flex-col justify-center text-white"
                    style={{
                        backgroundImage: `url('bannerimg3.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed", // <-- this makes it fixed for parallax effect
                    }}
                >
                    {/* DARK OVERLAY */}
                    <div
                        className="absolute inset-0 bg-neutral-900/90"
                        style={{ zIndex: 1 }}
                    ></div>

                    {/* CONTENT */}
                    <div className="relative z-10 pl-4">
                        <h2 className="text-sm tracking-[8px] uppercase text-gray-300 pl-1">
                            Fashion That Speaks
                        </h2>

                        <h1 className="text-7xl font-extrabold mt-2">
                            Be <span className="overlayclass text-transparent" style={{ WebkitTextStroke: "1px white" }}>Unforgettable</span>
                        </h1>

                        <h3 className="text-3xl font-semibold mt-4 text-gray-200">
                            Style isn’t just worn — it’s experienced.
                        </h3>

                        <p className="text-lg text-gray-200 mt-6 max-w-2xl leading-relaxed">
                            Our latest collection blends luxury with comfort.
                            Designed for dreamers, believers, and trendsetters —
                            because your presence should be impossible to ignore.
                        </p>

                        <button className="mt-10 w-fit px-14 py-3 border border-white rounded-full 
          hover:bg-white hover:text-black transition-all duration-300 tracking-wide nav-link cursor-pointer">
                            Discover Now
                        </button>
                    </div>
                </div>


                {/* RIGHT IMAGE BOX (Smaller section) */}
                <div className="overflow-hidden h-[650px]">
                    <img
                        src="bannerimg.jpg"
                        alt="fashion main"
                        className="w-full h-full object-cover hover:scale-110 duration-700"
                    />
                </div>

                {/* OVERLAY IMAGE (SHIFTED TOWARD CONTENT AREA) */}
                <div className="z-10 absolute top-1/2 left-[63%] -translate-x-1/2 -translate-y-1/2 border p-2 border-gray-300">
                    <img
                        src="bannerimg2.jpg"
                        alt="feature fashion"
                        className="
      w-[280px] h-[380px] object-cover
      shadow-2xl
    "
                    />
                </div>

            </div>
        </section>
    );
}
