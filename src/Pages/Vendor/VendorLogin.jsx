import React, { useState } from "react";
import Navbar from "../../Components/Home/Navbar/Navbar";
import Footer from "../../Components/Home/Footer/Footer";
import { useVendor } from "../../Context/VendorProvider";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
  const { loginVendor } = useVendor();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    const ok = loginVendor(email.trim());
    if (ok) {
      navigate("/vendor/dashboard");
    } else {
      setError("Vendor not found. Use a registered vendor email.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-[#F8FFF9] px-6 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-[#224F34] font-poppins mb-4 text-center">
            Vendor Login
          </h1>
          <p className="text-[#267D49] font-poppins text-sm mb-8 text-center">
            Login to manage your products and view analytics.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#224F34] font-poppins mb-2">
                Vendor Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="modern.threads@beshopy.com"
                className="w-full px-4 py-3 border-2 border-[#224F34] rounded-md outline-none font-poppins focus:border-[#1a3d28]"
              />
              {error && (
                <p className="text-red-600 text-sm font-poppins mt-1">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#224F34] text-white font-poppins font-semibold py-3 rounded-md hover:bg-[#1a3d28] transition-all shadow-md hover:shadow-lg"
            >
              Login as Vendor
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorLogin;

