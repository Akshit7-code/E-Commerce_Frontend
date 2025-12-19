import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";


export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("admin", data.token);
      navigate("/admin/dashboard");
    } else {
      alert("Wrong username or password");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h1>

        <div className="mb-4">
          <label className="text-gray-700 font-medium">Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-black"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-2">
          <label className="text-gray-700 font-medium">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-black"
              placeholder="Enter password"
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <FiEyeOff size={22} />      // password hidden → show eye to reveal
              ) : ( 
                <FiEye size={22} />   // password visible → show crossed eye to hide
              )}
            </button>

          </div>
        </div>


        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <Link
            to="/admin/forgot-password"
            className="text-sm font-medium text-black hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          © {new Date().getFullYear()} Admin Panel
        </p>
      </div>
    </div>
  );
}
