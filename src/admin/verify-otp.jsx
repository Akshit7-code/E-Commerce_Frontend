import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Redirect if user comes directly without email
  useEffect(() => {
    const email = localStorage.getItem("adminEmail");
    if (!email) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      alert("Please enter 4-digit OTP");
      return;
    }

    const email = localStorage.getItem("adminEmail");
    if (!email) {
      alert("Something went wrong. Try again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP verified successfully");
        navigate("/admin/UpdateCredentials");

      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Server error! Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 max-w-md w-full text-center">

        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Verify OTP
        </h2>

        <p className="text-gray-600 mb-8 text-sm">
          Enter the 4-digit code sent to your email
        </p>

        {/* OTP Input */}
        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
          className="
          w-full text-center border border-gray-300 
          rounded-lg py-3 text-2xl tracking-widest 
          mb-6 focus:outline-none focus:ring-2 
          focus:ring-black focus:border-black
          placeholder-gray-400
        "
          placeholder="• • • •"
        />

        {/* Button */}
        <button
          onClick={handleVerify}
          className="
          w-full bg-black text-white py-3 rounded-lg font-semibold 
          hover:bg-gray-900 transition-all duration-200 
          active:scale-[0.98]
        "
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
