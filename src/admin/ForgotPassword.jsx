import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleEmail = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }
         setLoading(true);

        const res = await fetch("http://localhost:5000/api/admin/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        setLoading(false);

        if (data.success) {
            localStorage.setItem("adminEmail", data.eamil);
            navigate("/admin/verify-otp");
        } else {
            alert(data.message || "Email not found");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                            Forgot Password?
                        </h1>

                        <p className="text-gray-600 text-center mb-5">
                            Enter your registered email and we will send you OTP to your Email.
                        </p>

                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            placeholder="Enter email"
                        />

                        <button
                            onClick={handleEmail}
                            disabled={loading}
                            className={`cursor-pointer w-full mt-5 bg-black text-white py-3 rounded-lg text-lg font-semibold transition 
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Send OTP"
                            )}
                        </button>


                        <Link
                            to="/admin"
                            className="block text-center mt-4 text-sm text-gray-700 hover:underline"
                        >
                            ← Back to Login
                        </Link>
            </div>
        </div>
    );
}
