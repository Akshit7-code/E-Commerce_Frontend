import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`cursor-pointer fixed bottom-5 right-5
         p-3 shadow-xl transition-all duration-300 
        flex items-center justify-center z-50

        /* Light mode style */
        bg-white/70 text-black border border-black/10 backdrop-blur-md

        /* Dark mode style */
        dark:bg-black/60 dark:text-white dark:border-white/20 dark:backdrop-blur-lg

        /* Hover effects */
        hover:scale-110 hover:shadow-2xl 
        active:scale-95

        /* Visibility */
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <FiArrowUp className="text-xl" />
    </button>
  );
}
