

import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { set } from "mongoose";
import { useEffect } from "react";

export default function AdminAddProduct() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    salePrice: "",
    description: "",
    category: "",
    stock: "",
    images: [], // final array for MongoDB: [main, g1, g2, g3, g4]
    colors: [],
    sizes: [],
  });

  // Main image
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");

  // Gallery images (max 4)
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);

  // Dragging index (for reordering)
  const [dragIndex, setDragIndex] = useState(null);

  const [addingProduct, setAddingProduct] = useState(false);


  // -----------------------------
  // HANDLE TEXT INPUT
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  setTimeout(() => {
    setTimeoutId(TimeoutId - 1);
    if (TimeoutId < 0) setTimeoutId(0);
  }, 1000);


  // -----------------------------
  // MAIN IMAGE UPLOAD (single)
  // -----------------------------
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setMainImage(file);
    setMainPreview(url);
  };


  // -----------------------------
  // GALLERY IMAGE UPLOAD (multiple)
  // -----------------------------
  const handleGalleryUpload = (e) => {
    let files = Array.from(e.target.files);

    // allow only max 4
    files = files.slice(0, 4);

    const previews = files.map((file) => URL.createObjectURL(file));

    setGalleryImages(files);
    setGalleryPreview(previews);
  };


  // -----------------------------
  // DRAG & DROP REORDERING
  // -----------------------------
  const handleDragStart = (e, index) => {
    setDragIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    const previewTemp = [...galleryPreview];
    const fileTemp = [...galleryImages];

    const draggedPreview = previewTemp[dragIndex];
    const draggedFile = fileTemp[dragIndex];

    // remove dragged
    previewTemp.splice(dragIndex, 1);
    fileTemp.splice(dragIndex, 1);

    // insert at new index
    previewTemp.splice(index, 0, draggedPreview);
    fileTemp.splice(index, 0, draggedFile);

    setGalleryPreview(previewTemp);
    setGalleryImages(fileTemp);
  };


  // -----------------------------
  // REMOVE a gallery image
  // -----------------------------
  const removeGalleryImage = (index) => {
    setGalleryPreview(galleryPreview.filter((_, i) => i !== index));
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };


  // -----------------------------
  // SUBMIT FORM
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingProduct(true);

    try {
      const data = new FormData();

      // TEXT DATA
      data.append("name", formData.name);
      data.append("originalPrice", formData.originalPrice);
      data.append("salePrice", formData.salePrice);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("colors", JSON.stringify(formData.colors));
      data.append("sizes", JSON.stringify(formData.sizes));

      // MAIN IMAGE (FILE)
      if (mainImage) {
        data.append("mainImage", mainImage);
      }

      // GALLERY IMAGES (FILES, ORDER PRESERVED)
      galleryImages.forEach((file) => {
        data.append("images", file);
      });

      const res = await axios.post(
        "http://localhost:5000/api/productAdd",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // RESET FORM
      setFormData({
        name: "",
        originalPrice: "",
        salePrice: "",
        description: "",
        category: "",
        stock: "",
        images: [],
        colors: [],
        sizes: [],
      });

      setMainImage(null);
      setMainPreview("");
      setGalleryImages([]);
      setGalleryPreview([]);
      setAddingProduct(false);
      alert("✅ Product added successfully");
    } catch (error) {
      console.error(error);
      setAddingProduct(false);
      alert("❌ Failed to add product");
    }
  };





  return (
    <div className="min-h-screen flex">

      {
        addingProduct && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">

              {/* Spinner */}
              <div className="w-16 h-16 border-6 border-gray-700 border-t-white rounded-full animate-spin"></div>

              {/* Text */}
              <p className="text-white font-medium text-lg">Adding Product Please Wait ...</p>

            </div>
          </div>

        )
      }

      {/* MAIN AREA */}
      <main className="flex-1 bg-transparent">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Card: Product Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Product Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Original Price</label>
                <input
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Enter original price"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Sale Price</label>
                <input
                  name="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Enter sale price"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Men's Clothing">Men's Clothing</option>
                  <option value="Women's Clothing">Women's Clothing</option>
                </select>
              </div>


              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Stock Quantity</label>
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Available stock"
                />
              </div>


              {/* COLORS */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Colors</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={formData.colorInput || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, colorInput: e.target.value })
                    }
                    placeholder="Add color"
                    className="flex-1 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newColor = formData.colorInput?.trim();
                      if (newColor && !formData.colors.includes(newColor)) {
                        setFormData({
                          ...formData,
                          colors: [...formData.colors, newColor],
                          colorInput: "",
                        });
                      }
                    }}
                    className="bg-black text-white px-6 py-1 rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.colors.map((color, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => {
                          const newColors = formData.colors.filter((_, idx) => idx !== i);
                          setFormData({ ...formData, colors: newColors });
                        }}
                        className="text-gray-500 hover:text-red-500 font-bold text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* SIZES */}
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-sm font-medium text-gray-600">Sizes</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={formData.sizeInput || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sizeInput: e.target.value })
                    }
                    placeholder="Add size"
                    className="flex-1 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSize = formData.sizeInput?.trim();
                      if (newSize && !formData.sizes.includes(newSize)) {
                        setFormData({
                          ...formData,
                          sizes: [...formData.sizes, newSize],
                          sizeInput: "",
                        });
                      }
                    }}
                    className="bg-black text-white px-6 py-1 rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.sizes.map((size, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => {
                          const newSizes = formData.sizes.filter((_, idx) => idx !== i);
                          setFormData({ ...formData, sizes: newSizes });
                        }}
                        className="text-gray-500 hover:text-red-500 font-bold text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>


              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 p-3 h-32 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Write a short description..."
                />
              </div>
            </div>
          </div>

          {/* Card: Main Image */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Main Image
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:bg-gray-100 transition">
              <span className="text-gray-600 text-sm font-medium">
                Click to upload main image
              </span>
              <input type="file" accept="image/*" hidden onChange={handleMainImageUpload} />
            </label>

            {mainPreview && (
              <div className="mt-6">
                <img
                  src={mainPreview}
                  className="w-40 h-40 rounded-xl object-cover shadow"
                />
              </div>
            )}
          </div>



          {/* Card: Gallery Images */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Gallery Images (Max 4)
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:bg-gray-100 transition">
              <span className="text-gray-600 text-sm font-medium">
                Select multiple images
              </span>
              <input type="file" multiple accept="image/*" hidden onChange={handleGalleryUpload} />
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {galleryPreview.map((img, index) => (
                <div
                  key={index}
                  className="relative group"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <img
                    src={img}
                    className="rounded-xl h-32 w-full object-cover shadow-sm"
                  />

                  <button
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
          >
            Add Product
          </button>
        </form>

      </main>
    </div>
  );

}

