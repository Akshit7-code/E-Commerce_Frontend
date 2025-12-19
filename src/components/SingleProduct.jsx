import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./HeroSectionMenWomen";
import { FiShoppingCart } from "react-icons/fi";
import Breadcrumb from "./Breadcrum";

export default function SingleProduct() {
    const { type, id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productname, setProductName] = useState("");
    const [Type, setType] = useState("");

    // user selections
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");
    const [previewOpen, setPreviewOpen] = useState(false);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://e-commerce-backend-675w.onrender.com/api/product/${type}/${id}`);
                const data = await res.json();
                setProduct(data);
                setProductName(data.name);
                setType(data.category);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, type]);

    if (loading)
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
        );

    if (!product)
        return <div className="text-center py-20 text-gray-500">Product not found.</div>;

    // ✅ Add to Cart Handler
    const handleAddToCart = () => {
        if (!selectedSize) return alert("Please select a size");
        if (!selectedColor) return alert("Please select a color");

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const item = {
            id: product._id,
            name: product.name,
            price: product.salePrice || product.originalPrice,
            image: product.images?.[0],
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            stock: product.stock
        };

        // check if same product + same size + same color already exists
        const existingIndex = cart.findIndex(
            (p) =>
                p.id === item.id &&
                p.size === item.size &&
                p.color === item.color
        );

        if (existingIndex !== -1) {
            // update quantity
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Product added to cart!");

    };

    return (
        <>
            <HeroSection
                title="Single Product Details"
                background="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1170&auto=format&fit=crop"
                page="Product"
            />

            <div className="max-w-7xl mx-auto px-6 py-16 sm:px-0">
                <Breadcrumb categories={Type} productName={productname} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* LEFT SIDE – GALLERY + BIG IMAGE */}
                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Small Images (Gallery) */}
                        <div className="flex flex-row md:flex-col gap-4 justify-center md:justify-start order-2 md:order-1">
                            {(product.images?.length ? product.images : (
                                product.category === "Men's Clothing"
                                    ? [
                                        "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600",
                                        "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600",
                                        "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600",
                                        "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600"
                                    ]
                                    : [
                                        "/image/sc7.webp",
                                        "/image/sc7.webp",
                                        "/image/sc7.webp",
                                        "/image/sc7.webp"
                                    ]
                            )).slice(0, 5).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`thumbnail-${index}`}
                                    className="w-24 h-24 object-cover cursor-pointer transition-transform hover:scale-103"
                                />
                            ))}
                        </div>

                        {/* Big Main Image */}
                        <div className="relative flex-1 order-1 md:order-2">
                            <img
                                src={
                                    product.images?.[0] ||
                                    (product.category === "Men's Clothing"
                                        ? "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600" // default male image
                                        : "/image/sc7.webp") // default female image
                                }
                                alt={product.name}
                                className="w-full h-[500px] object-cover shadow-lg cursor-pointer transition-transform duration-500 hover:scale-103"
                                onClick={() => setPreviewOpen(true)}
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE – PRODUCT DETAILS */}
                    <div className="flex flex-col md:flex-col lg:flex-col gap-8">

                        {/* Product Info */}
                        <div className="flex flex-col gap-6">

                            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-gray-600">{product.description}</p>

                            {/* Price */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                                {product.salePrice ? (
                                    <>
                                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{product.salePrice}</span>
                                        <span className="text-gray-400 line-through text-lg">₹{product.originalPrice}</span>
                                    </>
                                ) : (
                                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{product.originalPrice}</span>
                                )}
                            </div>

                            {/* Stock */}
                            <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                                {product.stock > 0 ? `In stock: ${product.stock}` : "Out of Stock"}
                            </p>

                            {/* Colors */}
                            {product.colors?.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Colors:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map((color, index) => (
                                            <span
                                                key={index}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color ? "ring-2 ring-black" : ""}`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes?.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Sizes:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-3 py-1 border rounded-md text-sm transition ${selectedSize === size ? "bg-black text-white" : "hover:bg-gray-100"}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Quantity:</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-xl"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-4">
                            <button
                                onClick={handleAddToCart}
                                className="
        w-full py-3 rounded-xl text-lg font-semibold 
        bg-black text-white flex items-center justify-center gap-3
        shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        hover:bg-gray-900 hover:shadow-[0_6px_18px_rgba(0,0,0,0.2)]
        active:scale-[0.97]
        transition-all duration-300 
        relative overflow-hidden group cursor-pointer
      "
                            >
                                <span
                                    className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-200"
                                ></span>
                                <FiShoppingCart size={22} className="transition-transform group-hover:scale-110" />
                                Add to Cart
                            </button>
                        </div>

                    </div>

                </div>
            </div>


            {/* ---------------- TAB SECTION ---------------- */}
            <div className="max-w-7xl mx-auto mt-14">

                {/* TAB BUTTONS */}
                <div className="flex min-w-max gap-2 px-6 sm:px-0">
                    {["details", "reviews", "delivery"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`cursor-pointer px-3 py-3 sm:px-6 text-lg font-medium capitalize relative
          ${activeTab === tab ? "text-black underline-anim" : "text-gray-500"}
          hover:text-black transition`}
                        >
                            {tab === "details" && "Details"}
                            {tab === "reviews" && "Reviews"}
                            {tab === "delivery" && "Delivery & Returns"}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="m-8 fade-slide">

                    {/* DETAILS TAB */}
                    {activeTab === "details" && (
                        <div className="space-y-10">

                            {/* Product Highlights */}
                            <div className="bg-gray-50 p-6 rounded-xl border hover:shadow-md transition">
                                <h2 className="text-2xl font-bold mb-4">Product Highlights</h2>
                                <ul className="list-disc ml-6 text-gray-700 leading-7 space-y-1">
                                    <li>Premium breathable fabric</li>
                                    <li>Comfort fit suitable for daily wear</li>
                                    <li>Lightweight and ideal for all seasons</li>
                                    <li>High-quality stitching for durability</li>
                                    <li>Available in multiple stylish colors</li>
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div className="bg-gray-50 p-6 rounded-xl border hover:shadow-md transition">
                                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <p className="font-semibold text-gray-800">Material:</p>
                                        <p className="text-gray-600">Cotton & Polyester mix</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Fit:</p>
                                        <p className="text-gray-600">Regular Fit</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Care:</p>
                                        <p className="text-gray-600">Machine Wash Cold</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Origin:</p>
                                        <p className="text-gray-600">India</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* REVIEWS TAB */}
                    {activeTab === "reviews" && (
                        <div className="space-y-6">

                            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

                            {[
                                { name: "Rahul Sharma", rating: "⭐ 4.5/5", text: "Great quality and very comfortable!" },
                                { name: "Priya Verma", rating: "⭐ 4/5", text: "Color is exactly the same as shown." },
                                { name: "Aman Gupta", rating: "⭐ 5/5", text: "Premium material and perfect for daily wear." }
                            ].map((review, index) => (
                                <div key={index} className="p-5 border rounded-lg bg-gray-50 hover:shadow-md transition">
                                    <p className="font-semibold text-gray-800">{review.rating} — {review.name}</p>
                                    <p className="mt-2 text-gray-700">{review.text}</p>
                                </div>
                            ))}

                        </div>
                    )}

                    {/* DELIVERY TAB */}
                    {activeTab === "delivery" && (
                        <div className="bg-gray-50 p-6 rounded-xl border hover:shadow-md transition">
                            <h2 className="text-2xl font-bold mb-4">Delivery & Return Policy</h2>
                            <p className="text-gray-700 leading-7">
                                Standard delivery within <span className="font-semibold">4–7 business days</span>.<br /><br />
                                Easy returns available within <span className="font-semibold">7 days</span> of delivery.<br /><br />
                                Product must be unused and returned with original packaging.
                            </p>
                        </div>
                    )}

                </div>
            </div>

            {previewOpen && (
                <div
                    className="p-5 fixed inset-0 bg-black/80 bg-opacity-90 flex items-center justify-center z-[9999] cursor-pointer animate-fadeZoom"
                    onClick={() => setPreviewOpen(false)}
                >
                    <img
                        src={
                            product.images?.[0] ||
                            "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600"
                        }
                        className="max-w-full max-h-full"
                    />
                </div>
            )}

        </>
    );
}
