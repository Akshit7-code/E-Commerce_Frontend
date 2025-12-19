import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function UpdateCredentials() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Prevent direct access
  useEffect(() => {
    const email = localStorage.getItem("adminEmail");
    if (!email) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleUpdate = async () => {
    if (!newUsername || !newPassword || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/update-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Credentials updated successfully!");

        localStorage.removeItem("adminEmail");
        navigate("/admin/login");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 max-w-md w-full">

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Update Credentials
        </h2>

        {/* Username */}
        <label className="block text-gray-700 font-medium mb-2">New Username</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-6
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter new username"
        />

        {/* New Password */}
        <label className="block text-gray-700 font-medium mb-2">New Password</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-3 px-4
                       focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter new password"
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-3 px-4
                       focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Re-enter password"
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {!showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>

        {/* Button */}
        <button
          onClick={handleUpdate}
          className="cursor-pointer w-full bg-black text-white py-3 rounded-lg font-semibold
                     hover:bg-gray-900 active:scale-[0.98] transition-all"
        >
          Update Credentials
        </button>
      </div>
    </div>
  );
}
