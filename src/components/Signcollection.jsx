import React from "react";
import { motion } from "framer-motion";
import 'react-lazy-load-image-component/src/effects/blur.css';

const images = [
    "image/sc2.webp",
    "image/sc6.webp",
    "image/sc1.webp",
    "image/sc7.webp",
    "image/sc5.webp",
    "image/sc3.webp",
    "image/sc4.webp"
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

                    // Only show the center image on small devices
                    const showOnMobile = index === centerIndex;

                    // Height map
                    const heightMap = {
                        0: "600px",
                        1: "550px",
                        2: "500px",
                        3: "440px",
                    };
                    const cardHeight = heightMap[distance] || "350px";

                    // Rounded corners
                    const roundingClass = index < centerIndex 
                        ? "rounded-l-xl rounded-r-none" 
                        : index > centerIndex 
                            ? "rounded-r-xl rounded-l-none" 
                            : "rounded-3xl";

                    return (
                        <motion.div
                            key={index}
                            className={`relative overflow-visible shadow-xl transition-all duration-500 shrink-0 ${roundingClass} ${!showOnMobile ? "hidden sm:flex" : ""}`}
                            style={{
                                width: index === centerIndex ? "350px" : "150px",
                                height: cardHeight,
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: distance * 0.4,
                            }}
                        >
                            <img
                                src={src}
                                alt={`model-${index}`}
                                className={`w-full h-full object-cover transform transition duration-500 hover:-translate-y-1 hover:scale-102 ${roundingClass}`}
                                loading="lazy"
                            />

                            {index === centerIndex && (
                                <motion.div
                                    className="absolute -bottom-10 left-1/2 -translate-x-1/2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.2 }}
                                >
                                    <div className="w-20 h-20 rounded-full bg-orange-500 border-[6px] border-white flex justify-center items-center">
                                        <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                                            <span className="text-orange-500 font-bold text-3xl leading-none mb-1">+</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
