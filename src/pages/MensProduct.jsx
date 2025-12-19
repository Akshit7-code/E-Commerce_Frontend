import React, { useEffect, useState } from "react";
import ProductsGrid from "../components/ProductsGrid";
import SidebarFilter from "../components/SidebarFilter";
import Pagination from "../components/Pagination";
import HeroSection from "../components/HeroSectionMenWomen";

export default function MensClothes() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 3 rows × 3 columns
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-backend-675w.onrender.com/api/MenProduct"
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

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <HeroSection title="Men’s Fashion Made" background="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" page="Men" />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Men’s Collection
            </h1>
            <p className="text-gray-500">
              Explore the latest trends in men’s fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 px-6">
            {/* Sidebar filter */}
            <div className="col-span-1 hidden lg:block">
              <SidebarFilter products={products} setFilteredProducts={setFilteredProducts} />
            </div>

            {/* Products area */}
            <div className="col-span-3 w-full px-2 sm:px-4 md:px-6">
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
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
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
