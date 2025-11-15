import React, { useState, useEffect } from "react";

export default function SidebarFilter({ products, setFilteredProducts }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Extract unique categories, sizes, and colors
  const categories = [...new Set(products.map((p) => p.category))];
  const sizes = [...new Set(products.flatMap((p) => p.sizes || []))];
  const colors = [
    ...new Set(
      products
        .flatMap((p) => p.colors || [])
        .map((c) => c.trim().toLowerCase()) // remove spaces + normalize
    ),
  ];



  // Apply filters
  const handleFilter = () => {
    let filtered = [...products];
    if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedSize) filtered = filtered.filter(p => (p.sizes || []).includes(selectedSize));
    if (selectedColor) filtered = filtered.filter(p => (p.colors || []).includes(selectedColor));
    filtered = filtered.filter(p => p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1]);
    setFilteredProducts(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSelectedColor("");
    setPriceRange([0, 10000]);
    setFilteredProducts(products);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-70 space-y-10">

      {/* PRICE */}
      <div>
        <h3 className="text-sm font-bold tracking-wide text-gray-700">PRICE</h3>
        <div className="w-10 h-[2px] bg-gray-300 mt-1 mb-4"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 text-sm">${priceRange[0]}</span>
          <span className="text-gray-600 text-sm">${priceRange[1]}</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm hover:border-black transition"
          />
          <span className="text-gray-500 text-sm">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm hover:border-black transition"
          />
        </div>
      </div>

      {/* COLOR */}
      <div>
        <h3 className="text-sm font-bold tracking-wide text-gray-700">COLOR</h3>
        <div className="w-10 h-[2px] bg-gray-300 mt-1 mb-4"></div>

        <div className="grid grid-cols-6 gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() =>
                setSelectedColor(selectedColor === color ? "" : color)
              }
              style={{ backgroundColor: color }}
              className={`
          w-7 h-7 rounded-md border 
          transition-all duration-200 
          hover:scale-110 hover:shadow-md
          active:scale-95
          ${selectedColor === color ? "ring-2 ring-black" : "border-gray-300"}
        `}
            ></button>
          ))}
        </div>
      </div>


      {/* SIZE OPTIONS */}
      <div>
        <h3 className="text-sm font-bold tracking-wide text-gray-700">SIZE OPTION</h3>
        <div className="w-10 h-[2px] bg-gray-300 mt-1 mb-4"></div>

        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                setSelectedSize(selectedSize === size ? "" : size)
              }
              className={`
          px-4 py-2 text-sm border rounded-md
          transition-all duration-200 
          hover:border-black hover:bg-gray-100 hover:shadow-sm
          active:scale-95
          ${selectedSize === size ? "bg-black text-white border-black shadow" : "border-gray-300"}
        `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>


      {/* CATEGORY */}
      <div>
        <h3 className="text-sm font-bold tracking-wide text-gray-700">CATEGORY</h3>
        <div className="w-10 h-[2px] bg-gray-300 mt-1 mb-4"></div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm hover:border-black transition focus:ring-0"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleFilter}
          className="flex-1 bg-gray-900 text-white text-sm py-2 rounded 
      hover:bg-black transition"
        >
          Filter
        </button>

        <button
          onClick={clearFilters}
          className="flex-1 border border-gray-300 text-sm py-2 rounded 
      hover:bg-gray-100 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
