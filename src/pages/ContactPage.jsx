import React from "react";
import HeroSection from "../components/HeroSectionMenWomen";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Reach Out to Us Anytime"
        page="Contact"
        background="https://images.unsplash.com/photo-1627489105008-063e31b2dbcd?w=1600&auto=format&fit=crop&q=80"
      />

      {/* Full Width Background */}
      <div
        className="w-full relative"
        style={{
          backgroundImage: "url('/leaveIma.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="flex flex-col items-center p-6 border bg-white border-gray-300 rounded-xl transition-all duration-500 hover:bg-[#1F1F20] hover:text-white cursor-pointer">
              <FiPhone size={32} className="mb-3" />
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="mt-1">+91 98765 43210</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center p-6 border bg-white border-gray-300 rounded-xl transition-all duration-500 hover:bg-[#1F1F20] hover:text-white cursor-pointer">
              <FiMail size={32} className="mb-3" />
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="mt-1">support@fashionstore.com</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center p-6 border bg-white border-gray-300 rounded-xl transition-all duration-500 hover:bg-[#1F1F20] hover:text-white cursor-pointer">
              <FiMapPin size={32} className="mb-3" />
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="mt-1">Mumbai, Maharashtra</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/70 shadow-xl rounded-2xl p-10 border border-gray-300">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Send Us a Message
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2 flex flex-col">
                <label className="mb-1 font-medium">Your Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1F1F20] text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
