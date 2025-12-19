import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CursorFollower() {
  const innerRef = useRef(null);
  const outerRef = useRef(null);

  const location = useLocation();

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const speed = 0.15; // smooth lag

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // inner circle follows instantly
      innerRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    };

    const animate = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      // outer circle delayed follow
      outerRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", move);

    // Elements that cause hover grow effect
    const hoverTargets = document.querySelectorAll("a, button, .cursor-hover");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovered(true));
      el.addEventListener("mouseleave", () => setHovered(false));
    });

    // Elements where cursor should disappear (your navbar links)
    const navbarLinks = document.querySelectorAll(".nav-link");
    const buttonclass = document.querySelectorAll(".buttonclass");
    const overlayclass = document.querySelectorAll(".overlayclass");

    navbarLinks.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        innerRef.current.style.opacity = "0";
        outerRef.current.style.opacity = "0";
      });

      el.addEventListener("mouseleave", () => {
        innerRef.current.style.opacity = "1";
        outerRef.current.style.opacity = "1";
      });
    });

    buttonclass.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        innerRef.current.style.backgroundColor = "white";
        outerRef.current.style.borderColor = "white";
      });

      el.addEventListener("mouseleave", () => {
        innerRef.current.style.backgroundColor = "black";
        outerRef.current.style.borderColor = "black";
      });
    });
 
    return () => window.removeEventListener("mousemove", move);
  }, [location.pathname]);

  return (
    <>
      {/* OUTER BORDER CIRCLE */}
      <div
        ref={outerRef}
        className={`pointer-events-none fixed rounded-full border border-black z-[9999]
          transition-all duration-300 ease-out hidden lg:block
          ${hovered ? "w-16 h-16 opacity-60" : "w-12 h-12 opacity-80"}
        `}
        style={{
          translate: "-50% -50%", // keeps perfectly centered
        }}
      ></div>

      {/* INNER FILLED CIRCLE */}
      <div
        ref={innerRef}
        className={`pointer-events-none fixed rounded-full bg-black z-[9999]
          transition-all duration-200 ease-out
          ${hovered ? "w-6 h-6" : "w-4 h-4"}
        `}
        style={{
          translate: "-50% -50%", // keeps perfectly centered
        }}
      ></div>
    </>
  );
}
