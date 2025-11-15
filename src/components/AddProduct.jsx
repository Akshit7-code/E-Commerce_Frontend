import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    salePrice: "",
    description: "",
    category: "",
    stock: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // handling text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle image upload preview (local)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imgs = files.map((file) => URL.createObjectURL(file));

    setPreviewImages([...previewImages, ...imgs]);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if using Cloudinary upload later, for now, send only metadata
      const sendData = {
        ...formData,
        images: previewImages, // store url
      };

      const res = await axios.post("http://localhost:5000/api/products", sendData);
      alert("✅ Product Added Successfully!");
      console.log(res.data);

      // Reset form
      setFormData({
        name: "",
        originalPrice: "",
        salePrice: "",
        description: "",
        category: "",
        stock: "",
        images: [],
      });
      setPreviewImages([]);
    } catch (error) {
      console.log(error);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#212121] text-white p-6 hidden md:flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold tracking-wide">Admin</h2>

        <nav className="flex flex-col gap-4 mt-6">
          <button className="bg-white text-[#212121] py-3 rounded-xl font-semibold">
            ➕ Add New Product
          </button>
          <button className="border border-gray-400 py-3 rounded-xl font-medium">
            📦 All Products
          </button>
          <button className="border border-gray-400 py-3 rounded-xl font-medium">
            🧾 Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold text-[#212121] mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="name"
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#212121]"
            required
          />

          <input
            name="originalPrice"
            type="number"
            placeholder="Original Price"
            value={formData.originalPrice}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#212121]"
            required
          />

          <input
            name="salePrice"
            type="number"
            placeholder="Sale Price"
            value={formData.salePrice}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#212121]"
          />

          <input
            name="category"
            type="text"
            placeholder="Category (Men/Women/Collection)"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#212121]"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#212121]"
          />

          <textarea
            name="description"
            placeholder="Product Description..."
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded-xl h-32 outline-none focus:ring-2 focus:ring-[#212121]"
          />

          {/* image upload area */}
          <div className="col-span-1 md:col-span-2 border p-6 rounded-xl">
            <label className="flex flex-col items-center justify-center border-2 border-dashed p-10 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-200">
              <FiUpload size={32} />
              <span className="mt-2 font-medium text-[#212121]">
                Click to upload product images
              </span>
              <input type="file" multiple hidden onChange={handleImageUpload} />
            </label>

            {/* preview images */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {previewImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="rounded-xl w-full h-32 object-cover shadow-md"
                />
              ))}
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 mt-4 bg-[#212121] text-white py-4 rounded-xl text-lg font-semibold hover:bg-black transition-all"
          >
            ✅ Add Product
          </button>
        </form>
      </main>
    </div>
  );
}
