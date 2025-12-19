// import React from "react";

// export default function ProductCard({ product }) {
//   const defaultImage = "https://via.placeholder.com/400x500?text=No+Image";

//   // Placeholder: future date check logic (to be activated later)
//   const isNewProduct = false; // 👉 change to logic later: e.g., Date.now() - new Date(product.createdAt) < 7 days

//   return (
//     <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
//       {/* Product Image */}
//       <div className="relative">
//         <img
//           src={product.images?.[0] || defaultImage}
//           alt={product.name}
//           className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
//         />

//         {/* SALE / NEW Tag */}
//         {(product.salePrice || isNewProduct) && (
//           <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//             {product.salePrice ? "SALE" : "NEW"}
//           </span>
//         )}
//       </div>

//       {/* Info Section */}
//       <div className="p-4">
//         <h3 className="text-base font-medium text-gray-900 truncate">
//           {product.name}
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">{product.category}</p>

//         {/* Price Section */}
//         <div className="flex items-center gap-2 mt-2">
//           {product.salePrice ? (
//             <>
//               <span className="text-lg font-semibold text-gray-900">
//                 ₹{product.salePrice}
//               </span>
//               <span className="text-sm text-gray-400 line-through">
//                 ₹{product.originalPrice}
//               </span>
//             </>
//           ) : (
//             <span className="text-lg font-semibold text-gray-900">
//               ₹{product.originalPrice}
//             </span>
//           )}
//         </div>

//         {/* Color/Stock Info */}
//         <p className="text-sm text-gray-400 mt-1">
//           {product.colors
//             ? `${product.colors} Colors`
//             : product.stock > 0
//             ? `In Stock (${product.stock})`
//             : "Out of Stock"}
//         </p>
//       </div>
//     </div>
//   );
// }

// future new tag functinality 
// const isNewProduct = new Date() - new Date(product.createdAt) < 7 * 24 * 60 * 60 * 1000;



import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const defaultImage = "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D";
  const defaultImage2 = "image/sc7.webp";
  const isNewProduct = false; // 🔸 will activate later based on product.createdAt

  return (
    <Link to={`/product/${product.category === "Men's Clothing" ? "Men" : "Women"}/${product._id}`}>
      <div className="bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          {product.category === "Men's Clothing" ? (
            <img
              src={product.images?.[0] || defaultImage}
              alt={product.name}
              className="w-full h-[320px] object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <img
              src={product.images?.[0] || defaultImage2}
              alt={product.name}
              className="w-full h-[320px] object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
          {/* SALE / NEW Tag */}
          {(product.salePrice || isNewProduct) && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
              {product.salePrice ? "SALE" : "NEW"}
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            {product.salePrice ? (
              <>
                <span className="text-[15px] font-semibold text-gray-900">
                  ₹{product.salePrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              </>
            ) : (
              <span className="text-[15px] font-semibold text-gray-900">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Colors or Stock */}
          <p className="text-xs text-gray-500 mt-1">
            {product.colors
              ? `${product.colors} Colors`
              : product.stock > 0
                ? `${product.stock} in stock`
                : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
}
