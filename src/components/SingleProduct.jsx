import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./HeroSectionMenWomen";

export default function SingleProduct() {
    const { type, id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("type=",type, "id=",id);

    // user selections
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/product/${type}/${id}`);
                const data = await res.json();
                setProduct(data);
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
                title="Product Details"
                background="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1170&auto=format&fit=crop"
                page="Product"
            />

            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* IMAGE */}
                    <div className="relative group">
                        <img
                            src={product.images?.[0] || "https://via.placeholder.com/500"}
                            alt={product.name}
                            className="w-full h-[500px] object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                            <p className="mt-4 text-gray-600">{product.description}</p>

                            {/* Price */}
                            <div className="mt-6 flex items-center gap-4">
                                {product.salePrice ? (
                                    <>
                                        <span className="text-3xl font-bold text-gray-900">₹{product.salePrice}</span>
                                        <span className="text-gray-400 line-through text-lg">₹{product.originalPrice}</span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-gray-900">₹{product.originalPrice}</span>
                                )}
                            </div>

                            {/* Stock */}
                            <p className={`mt-2 text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                                {product.stock > 0 ? `In stock: ${product.stock}` : "Out of Stock"}
                            </p>

                            {/* Colors */}
                            {product.colors?.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Colors:</h3>
                                    <div className="flex gap-2">
                                        {product.colors.map((color, index) => (
                                            <span
                                                key={index}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full border cursor-pointer ${
                                                    selectedColor === color ? "ring-2 ring-black" : ""
                                                }`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                title={color}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes?.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Sizes:</h3>
                                    <div className="flex gap-2">
                                        {product.sizes.map((size, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-3 py-1 border rounded-md text-sm transition ${
                                                    selectedSize === size
                                                        ? "bg-black text-white"
                                                        : "hover:bg-gray-100"
                                                }`}
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
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-20 border px-3 py-1 rounded-md"
                                />
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
                            >
                                Add to Cart
                            </button>

                            <button className="flex-1 border border-gray-300 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition">
                                Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
