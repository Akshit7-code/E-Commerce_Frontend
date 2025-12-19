import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Navbar from "./Navbar";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
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
      src: "image/banner2.webp",
      main: "Autumn Collection",
      sub: "New Trends 2025",
      button: "Shop Now",
    },
    {
      src: "image/banner5.webp",
      main: "Summer Vibes",
      sub: "Fresh & Stylish",
      button: "Explore",
    },
    {
      src: "image/banner3.webp",
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

        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center z-30 text-center px-4 sm:px-6 md:px-8 py-4 sm:py-0">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
            Where Fashion Meets <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}><br/>Fearless</span>
          </h1>

          <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 drop-shadow-md max-w-full sm:max-w-2xl">
            Discover the latest trends in fashion, handpicked for the modern wardrobe.
            Step into elegance, comfort, and statement pieces that turn heads.
          </p>

          <button className="bg-white text-black nav-link font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-neutral-800 cursor-pointer hover:text-white transition-all duration-500 shadow-lg text-sm sm:text-base">
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
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
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

                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-6 md:px-20 text-center"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Styles */}
        <style>{`
    /* Zoom-out animation for image */
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

    /* Default Swiper Pagination */
    .swiper-pagination-bullet {
      background-color: rgba(255, 255, 255, 0.2); 
      opacity: 1;
      width: 12px;      /* increase bullet width */
    height: 12px;  
    }
    .swiper-pagination-bullet-active {
      background-color: #ffffff; /* white active */
      width:12px;     
    height: 12px;  
    }
  `}</style>
      </div>

      <section className="w-full bg-white pt-8 pb-8 sm:pt-20 sm:pb-8">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10"
          >
            {uspData.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 sm:p-8 hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200"
              >
                <div className="flex justify-center text-black mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


    </>
  );
}
