import React from "react";
import { HiChevronDoubleRight, HiChevronRight } from "react-icons/hi";

export default function Breadcrumb({ categories = "", productName = "" }) {
  return (
    <nav className="text-gray-600 text-sm sm:text-base mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 sm:gap-2">
        {/* Home */}
        <li>
          <a href="/" className="hover:text-black transition-colors">
            Home
          </a>
        </li>

        {/* Type / Category */}
        {categories && (
          <li className="flex items-center">
            <HiChevronDoubleRight className="mx-1 sm:mx-2 text-gray-400" />
            <a
              href="#"
              className="hover:text-black transition-colors truncate max-w-[120px] sm:max-w-[200px]"
            >
              {categories}
            </a>
          </li>
        )}

        {/* Product Name */}
        {productName && (
          <li className="flex items-center">
            <HiChevronRight className="mx-1 sm:mx-2 text-gray-400" />
            <span className="text-gray-800 font-medium truncate max-w-[150px] sm:max-w-[250px]">
              {productName}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
