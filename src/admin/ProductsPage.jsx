import React from "react";

export default function ProductsPage({ onEdit }) {
  const [products, setProducts] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("Men");
  const [search, setSearch] = React.useState("");

  const fetchProducts = async () => {
    const api =
      activeTab === "Men"
        ? "http://localhost:5000/api/MenProduct"
        : "http://localhost:5000/api/WomenProduct";

    const res = await fetch(api);
    const data = await res.json();
    setProducts(data);
    setFiltered(data); // default filtered list
  };

  React.useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  // SEARCH FILTER
  React.useEffect(() => {
    const s = search.toLowerCase();
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(s)
    );
    setFiltered(result);
  }, [search, products]);

  const deleteProduct = async (type, id) => {
    if (!confirm("Delete product?")) return;

    await fetch(`http://localhost:5000/api/delete-product/${type}/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  const editProduct = async (type, product) => {
    const original = prompt("Enter original amount:", product.originalPrice);
    if (original === null) return;

    const sale = prompt("Enter sale amount:", product.salePrice);
    if (sale === null) return;

    await fetch(`http://localhost:5000/api/update-price/${type}/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalPrice: Number(original),
        salePrice: Number(sale),
      }),
    });

    fetchProducts();
  };



  return (
    <div className="text-black">

      {/* Tabs */}
      {/* Tabs + Search Container */}
      <div className="flex items-center justify-between border-b border-black/40 pb-3 mb-6">

        {/* Tabs */}
        <div className="flex gap-2">
          {["Men", "Women"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearch("");
              }}
              className={`px-8 py-3 font-semibold tracking-wide text-sm 
        ${activeTab === tab ? "bg-gray-900 text-white" : "bg-gray-200 text-black"} 
        border border-black`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 px-4 py-3 border border-black bg-gray-50 
      focus:bg-white focus:ring outline-none text-sm
      text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-black bg-gray-50">

        {/* Header */}
        <div className="grid grid-cols-5 bg-gray-800 text-gray-100 text-xs font-semibold uppercase tracking-wide border-b border-black">
          <div className="p-4">Image</div>
          <div className="p-4">Name</div>
          <div className="p-4">Original</div>
          <div className="p-4">Sale</div>
          <div className="p-4 text-right pr-6">Actions</div>
        </div>

        {/* Rows */}
        {filtered.map((product, i) => (
          <div
            key={product._id}
            className={`grid grid-cols-5 text-sm 
            ${i % 2 === 0 ? "bg-white" : "bg-gray-100"} 
            border-b border-gray-300 hover:bg-gray-200 transition`}
          >
            {/* Image */}
            <div className="p-4 flex items-center">
              <img
                src={product.images?.[0] || "/placeholder.png"}
                className="w-16 h-16 object-cover border border-gray-300"
              />
            </div>

            {/* Name */}
            <div className="p-4 flex items-center font-medium text-gray-900">
              {product.name}
            </div>

            {/* Prices */}
            <div className="p-4 flex items-center text-gray-700">
              ₹{product.originalPrice}
            </div>

            <div className="p-4 flex items-center font-semibold text-gray-900">
              ₹{product.salePrice}
            </div>

            {/* Actions */}
            <div className="p-4 flex items-center justify-end gap-3 pr-6">
              <button
                onClick={() => editProduct(activeTab, product)}
                className="px-5 py-1 border border-black bg-black text-white text-xs hover:bg-white hover:text-black transition"
              >
                EDIT
              </button>


              <button
                onClick={() => deleteProduct(activeTab, product._id)}
                className="px-5 py-1 border border-red-600 bg-red-600 text-white text-xs hover:bg-white hover:text-red-600 transition"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="py-14 text-center text-gray-500 text-lg">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
