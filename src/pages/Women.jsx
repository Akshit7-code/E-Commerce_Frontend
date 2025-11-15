import React, { useEffect, useState } from "react";
import ProductsGrid from "../components/ProductsGrid";
import SidebarFilter from "../components/SidebarFilter";
import Pagination from "../components/Pagination";
import HeroSection from "../components/HeroSectionMenWomen";

export default function WomensClothes() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/WomenProduct"
        );
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <HeroSection
        title="Women’s Fashion Collection"
        page="Women"
        background="https://images.unsplash.com/photo-1627489105008-063e31b2dbcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Women’s Collection
            </h1>
            <p className="text-gray-500">
              Discover the latest styles in women’s fashion.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">

            <div className="col-span-1">
              <SidebarFilter
                products={products}
                setFilteredProducts={setFilteredProducts}
              />
            </div>

            <div className="col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-20">
                  No products available.
                </div>
              ) : (
                <>
                  <ProductsGrid products={currentProducts} />

                  <Pagination
                    totalProducts={filteredProducts.length}
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
