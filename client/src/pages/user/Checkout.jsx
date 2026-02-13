import React, { useState } from "react";
import { placeOrder } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Building2,
  ShieldCheck,
  ArrowRight,
  Truck,
  Loader2
} from "lucide-react";


const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeOrder(address);
      alert("Order Placed Successfully!");
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
            <Truck size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
          <p className="text-slate-500 mt-2">Please enter your delivery details to complete the order.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <form onSubmit={submitHandler} className="p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="text-indigo-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">Shipping Address</h2>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
              <input
                type="text"
                required
                placeholder="Flat No, Street, Landmark"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </div>

              {/* Postal Code Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Postal Code</label>
                <input
                  type="text"
                  required
                  placeholder="6-digit code"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                />
              </div>
            </div>

            {/* Country Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Country</label>
              <input
                type="text"
                required
                placeholder="e.g. India"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
              />
            </div>

            {/* Payment Info Box */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg text-indigo-600 shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-900">Payment Method: COD</p>
                <p className="text-xs text-indigo-700/70 mt-0.5">Cash on Delivery selected. No payment needed now.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] mt-4 disabled:bg-slate-400 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order (COD)
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="bg-slate-50 py-4 px-8 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              100% Secure Checkout • Verified MERN Shop
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
