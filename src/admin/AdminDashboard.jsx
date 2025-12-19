// AdminLayout.jsx
import { useState } from 'react';
import AddProductPage from './AddProductPage';
import ProductsPage from './ProductsPage';
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("addProduct");
  const [editProductId, setEditProductId] = useState(null);
  const navigate = useNavigate();

  const openProducts = () => setActivePage("products");
  const openAdd = () => setActivePage("addProduct");
  const openEdit = (id) => {
    setEditProductId(id);
    setActivePage("editProduct");
  };

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      {/* FIXED SIDEBAR */}
      <aside className="
        w-64 
        bg-white 
        fixed left-0 top-0 h-full 
        border-r border-gray-200
        flex flex-col justify-between
      ">

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Admin Dashboard
          </h2>

          <nav className="space-y-1">

            <button
              onClick={openAdd}
              className={`
                w-full text-left px-3 py-2 text-sm font-medium 
                border-l-4 transition
                ${activePage === "addProduct" 
                  ? "border-black bg-gray-100 text-gray-900"
                  : "border-transparent text-gray-700 hover:bg-gray-100"}
              `}
            >
              Add Product
            </button>

            <button
              onClick={openProducts}
              className={`
                w-full text-left px-3 py-2 text-sm font-medium
                border-l-4 transition
                ${activePage === "products" 
                  ? "border-black bg-gray-100 text-gray-900"
                  : "border-transparent text-gray-700 hover:bg-gray-100"}
              `}
            >
              Products
            </button>

          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="
              w-full py-2 text-sm font-semibold
              bg-red-600 text-white
              hover:bg-red-700
              transition
            "
          >
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">

        {activePage === "addProduct" && (
          <AddProductPage onCreated={openProducts} />
        )}

        {activePage === "products" && (
          <ProductsPage onEdit={openEdit} />
        )}

        {activePage === "editProduct" && (
          <EditProduct id={editProductId} onSaved={() => setActivePage("products")} />
        )}

      </main>
    </div>
  );
}
