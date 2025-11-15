import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSectionMenWomen";

export default function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Update LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
    }, [cart]);

    // Update Quantity
    const updateQuantity = (index, qty) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = qty;
        setCart(updatedCart);
    };

    // Delete Product
    const deleteProduct = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    // Total Amount
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <HeroSection
                title="Your Shopping Cart"
                background="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1170&auto=format&fit=crop"
                page="Cart"
            />
            <div className="max-w-6xl mx-auto py-12 px-4">

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pb-12">

                        {/* Animated Image */}
                        <img
                            src="addtocart.gif"
                            alt="Empty Cart"
                            className="w-80 h-60"
                        />

                        {/* Main Heading */}
                        <h2 className="text-3xl font-semibold text-gray-800">
                            Your Cart is Empty
                        </h2>

                        {/* Subheading */}
                        <p className="text-gray-500 text-sm mt-2">
                            Looks like you haven’t added anything yet.
                        </p>

                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Product</th>
                                        <th className="py-3 px-4 text-left">Size</th>
                                        <th className="py-3 px-4 text-left">Color</th>
                                        <th className="py-3 px-4 text-left">Price</th>
                                        <th className="py-3 px-4 text-left">Quantity</th>
                                        <th className="py-3 px-4 text-left">Total</th>
                                        <th className="py-3 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-4 px-4 flex items-center gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <span className="font-medium">{item.name}</span>
                                            </td>

                                            <td className="py-4 px-4">{item.size}</td>

                                            <td className="py-4 px-4">
                                                <span
                                                    className="w-6 h-6 inline-block rounded-full border"
                                                    style={{ backgroundColor: item.color }}
                                                ></span>
                                            </td>

                                            <td className="py-4 px-4">₹{item.price}</td>

                                            <td className="py-4 px-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={item.stock}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(index, Number(e.target.value))
                                                    }
                                                    className="w-20 border py-1 px-2 rounded"
                                                />
                                            </td>

                                            <td className="py-4 px-4 font-semibold">
                                                ₹{item.price * item.quantity}
                                            </td>

                                            <td className="py-4 px-4">
                                                <button
                                                    onClick={() => deleteProduct(index)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* TOTAL */}
                            <div className="flex justify-end mt-6">
                                <div className="text-right">
                                    <p className="text-xl font-semibold">
                                        Total Amount: <span className="text-green-600">₹{totalPrice}</span>
                                    </p>
                                    <button className="mt-4 bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                </>
                )}
            </div>
        </>
    );
}
