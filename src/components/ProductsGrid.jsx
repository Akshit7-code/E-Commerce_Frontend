import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
