import React from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';
const images = [
    "sc2.jpg",
    "sc6.jpg",
    "sc1.jpg",
    "sc7.jpg",
    "sc5.jpg",
    "sc3.jpg",
    "sc4.jpg"
];

export default function Signcollection() {
    return (
        <section className="w-full p-16 bg-white">
            {/* Title */}
            <div className="text-center mb-10">
                 <p className="font-semibold mb-2 tracking-wide uppercase" style={{ color: "#1F1F20" }}>
      Signature Collection
    </p>
    <h2 className="text-4xl font-bold mb-4 tracking-wide" style={{ color: "#1F1F20" }}>
      Own your style with comfort and attitude
    </h2>
    <p className="mb-10" style={{ color: "#1F1F20" }}>
      — made for trendsetters.
    </p>
            </div>

            {/* Layout Container */}
            <div className="relative flex justify-center items-center gap-2 px-2 scrollbar-none">

                {images.map((src, index) => {
                    const centerIndex = Math.floor(images.length / 2);
                    const distance = Math.abs(index - centerIndex);

                    // Height logic
                    const heightMap = {
                        0: "600px", // center image (biggest)
                        1: "550px",
                        2: "500px",
                        3: "440px",
                    };

                    const cardHeight = heightMap[distance] || "380px";

                    // ✅ LEFT & RIGHT rounding logic
                    let roundingClass = "";
                    if (index < centerIndex) {
                        roundingClass = "rounded-l-xl rounded-r-none";
                    } else if (index > centerIndex) {
                        roundingClass = "rounded-r-xl rounded-l-none";
                    } else {
                        roundingClass = "rounded-3xl";
                    }

                    return (
                        <div
                            key={index}
                            className={`${roundingClass} relative overflow-visible shadow-xl transition-all duration-500 shrink-0 `}

                            style={{
                                width: index === centerIndex ? "400px" : "150px", // ✅ side smaller, center wider
                                height: cardHeight,
                            }}
                        >
                            <img
                                src={src}
                                alt={`model-${index}`}
                                effect="blur"
                                className={`w-full transform transition duration-500 hover:-translate-y-1 hover:scale-102 h-full object-cover ${roundingClass}`}
                            />

                            {index === centerIndex && (
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                    <div className="w-20 h-20 rounded-full bg-orange-500 border-[6px] border-white flex justify-center items-center">
                                        <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                                            <span className="text-orange-500 font-bold text-3xl leading-none mb-1">+</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

        </section>
    );
}
