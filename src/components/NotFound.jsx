import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-300 px-5">
      {/* Animated Ghost */}
      <div className="relative">
        <div className="w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center animate-float">
          <span className="text-7xl">👻</span>
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/10 rounded-full blur-xl animate-shadow"></div>
      </div>

      {/* Heading */}
      <h1 className="mt-10 text-6xl font-bold text-gray-800">404</h1>

      <p className="text-gray-600 mt-3 text-lg text-center">
        Oops! The page you're looking for doesn’t exist.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
      >
        Go Back Home
      </Link>

      {/* Extra small fun text */}
      <p className="mt-4 text-sm text-gray-500 italic">
        Maybe the page ran away... 👀
      </p>
    </div>
  );
}
