import React, { useEffect, useState } from "react";
import { getCart, updateCartQty, removeFromCart } from "../../api/cartApi";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, ShoppingBag, Minus, Plus, ArrowLeft, ShieldCheck } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQtyChange = async (productId, currentQty, delta) => {
    if (!productId) return; // Guard against null product
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    try {
      await updateCartQty(productId, newQty);
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center max-w-md">
          <div className="bg-indigo-50 p-6 rounded-full mb-6">
            <ShoppingBag size={60} className="text-indigo-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-10 flex items-center gap-3">
          Shopping Cart <span className="text-indigo-600 text-xl font-medium">({cart.items.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* LEFT: ITEM LIST */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 transition-hover hover:shadow-md">
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden">
                  <img src={item.product?.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow">
                  {item.product ? (
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{item.product.name}</h4>
                        <p className="text-indigo-600 font-bold text-xl">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product._id).then(fetchCart)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-red-500 font-medium italic">Product no longer available</p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-slate-200 rounded-xl p-1">
                      <button 
                        onClick={() => handleQtyChange(item.product?._id, item.quantity, -1)}
                        className="p-1 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Minus size={16} className="text-slate-600" />
                      </button>
                      <span className="px-4 font-bold text-slate-800">{item.quantity}</span>
                      <button 
                        onClick={() => handleQtyChange(item.product?._id, item.quantity, 1)}
                        className="p-1 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Plus size={16} className="text-slate-600" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">Subtotal: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-1 rounded-md tracking-widest">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-indigo-600">₹{cart.totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" /> Secure SSL Checkout
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="bg-slate-100/50 p-4 rounded-2xl border border-dashed border-slate-300">
              <p className="text-xs font-bold text-slate-500 mb-2 px-1">Have a promo code?</p>
              <div className="flex gap-2">
                <input type="text" className="bg-white border-none rounded-lg text-sm px-3 flex-grow focus:ring-1 focus:ring-indigo-600" placeholder="CODE2026" />
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Apply</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;