import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Navbar from "./Navbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaShippingFast, FaExchangeAlt, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";

const uspData = [
  {
    icon: <FaShippingFast size={38} />,
    title: "Free Shipping",
    desc: "Fast & free delivery on all orders.",
  },
  {
    icon: <FaExchangeAlt size={38} />,
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days.",
  },
  {
    icon: <FaMoneyBillWave size={38} />,
    title: "COD Available",
    desc: "Pay when you receive your product.",
  },
  {
    icon: <FaShieldAlt size={38} />,
    title: "Secure Payments",
    desc: "100% safe & encrypted checkout.",
  },
];


const heroData = [
  {
    heading: "Your Main Heading 1",
    paragraph: "This is your subheading or description 1. Lorem ipsum dolor sit amet.",
  },
  {
    heading: "Your Main Heading 2",
    paragraph: "This is your subheading or description 2. Consectetur adipiscing elit.",
  },
  {
    heading: "Your Main Heading 3",
    paragraph: "This is your subheading or description 3. Sed do eiusmod tempor incididunt.",
  },
];


const CustomArrow = ({ direction, refProp }) => {
  const isPrev = direction === "prev";
  const tailAlignment = isPrev ? "mr-[-2px]" : "ml-[-2px]";
  const arrowHeadTransform = isPrev
    ? "group-hover:translate-x-1"
    : "group-hover:-translate-x-1";

  const arrowSvg = (
    <svg
      className={`w-4 h-4 text-white transition-transform duration-500 ease-in-out ${arrowHeadTransform} z-10`}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isPrev ? (
        <path
          d="M8.5 0.5L1 8L8.5 15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M1.5 0.5L9 8L1.5 15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger fade out
      setFade(false);

      // After fade-out duration, change text and fade in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % heroData.length);
        setFade(true);
      }, 500); // match this with transition duration
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const { heading, paragraph } = heroData[index];

  return (

    <div
      ref={refProp}
      className={`absolute top-1/2 ${isPrev ? "left-5" : "right-5"
        } -translate-y-1/2 z-10 flex items-center cursor-pointer group`}
    >
      {!isPrev && (
        <div
          className={`w-12 h-0.5 bg-white transition-all duration-500 ease-in-out ${tailAlignment} group-hover:w-0`}
        ></div>
      )}
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white transition-all duration-500 ease-in-out group-hover:border-dotted relative overflow-hidden">
        {arrowSvg}
      </div>
      {isPrev && (
        <div
          className={`w-12 h-0.5 bg-white transition-all duration-500 ease-in-out ${tailAlignment} group-hover:w-0`}
        ></div>
      )}
    </div>
  );
};

export default function FullScreenSlider() {
  const images = [
    {
      src: "/banner2.jpg",
      main: "Autumn Collection",
      sub: "New Trends 2025",
      button: "Shop Now",
    },
    {
      src: "/banner5.jpg",
      main: "Summer Vibes",
      sub: "Fresh & Stylish",
      button: "Explore",
    },
    {
      src: "/banner3.jpg",
      main: "Winter Fashion",
      sub: "Stay Warm, Look Cool",
      button: "Discover",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <div className="w-full h-screen relative overflow-hidden buttonclass">

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Where Fashion Meets <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Fearless</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl">
            Discover the latest trends in fashion, handpicked for the modern wardrobe.
            Step into elegance, comfort, and statement pieces that turn heads.
          </p>
          <button className="bg-white text-black nav-link font-semibold px-8 py-3 rounded-full hover:bg-neutral-800 cursor-pointer hover:text-white transition-all duration-500 shadow-lg">
            Explore Collection
          </button>
        </div>

        <div>
          <Navbar />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          loop
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          onSlideChange={() => {
            // reset image zoom animation
            const images = document.querySelectorAll(".zoom-slide");
            images.forEach((img) => {
              img.style.animation = "none";
              img.offsetHeight;
              img.style.animation = "";
            });
          }}
          className="h-full"
        >
          {images.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-screen relative overflow-hidden">
                {/* Zoom-Out Animated Image */}
                <img
                  src={slide.src}
                  alt=""
                  className="zoom-slide w-full h-full object-cover"
                />

                {/* Overlay with text */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-6 md:px-20 text-center">
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom vertical pagination container */}
        {/* <div className="custom-pagination absolute left-55 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20"></div> */}
        {/* Custom vertical pagination container */}
        <div
          className="custom-pagination"
          style={{
            position: "absolute",
            top: "60%",
            left: "150px",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
            zIndex: 20,
          }}
        ></div>

        {/* Custom Navigation */}
        {/* <CustomArrow direction="prev" refProp={prevRef} />
      <CustomArrow direction="next" refProp={nextRef} /> */}

        {/* Styles */}
        <style>{`
        /* Zoom-out animation for image (slower) */
        @keyframes zoomOut {
          0% { transform: scale(1.07); }
          100% { transform: scale(1); }
        }
        .zoom-slide {
          animation: zoomOut 1.8s ease-in-out forwards;
        }

        /* Fade animation for text */
        @keyframes fade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade {
          animation: fade 1s ease-in-out forwards;
        }

        /* Custom vertical square pagination */
        /* Custom vertical square pagination */
        .custom-pagination .swiper-pagination-bullet {
          width: 17px;
          height: 17px;
          background-color: transparent;
          border: 3px solid white;
          border-radius: 2px;
          margin: 8px 0; /* vertical spacing */
          position: relative;
        }

        /* Tail on each bullet */
        .custom-pagination .swiper-pagination-bullet::after {
          content: "";
          position: absolute;
          left: 100%; /* tail on the right */
          top: 50%;
          width: 60px;
          height: 2px;
          background-color: white;
          transform: translateY(-50%);
          border-radius: 1px;
          margin-left: 10px;
        }

      `}</style>
      </div>

      <section className="w-full pt-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {uspData.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-8 hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200"
              >
                <div className="flex justify-center text-black mb-4">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
