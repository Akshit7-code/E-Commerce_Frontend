import React from "react";

export default function Pagination({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="flex justify-center mt-10">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 mx-1 hover:bg-gray-800 hover:text-white cursor-pointer duration-300 ${
            currentPage === i + 1
              ? "bg-gray-800 text-white border border-gray-300"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
