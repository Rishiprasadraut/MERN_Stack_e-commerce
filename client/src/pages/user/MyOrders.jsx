import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../../api/orderApi";
import { Package, Calendar, CreditCard, XCircle, ChevronRight, PackageX } from "lucide-react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
        )
      );
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "Shipped": return "bg-purple-100 text-purple-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <PackageX size={48} className="text-red-500" />
      <h3 className="text-xl font-bold">{error}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">My Orders</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 md:py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <PackageX size={48} className="md:w-16 md:h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg md:text-xl font-bold text-slate-800">No orders yet</h3>
            <p className="text-sm md:text-base text-slate-500 mb-6">Start shopping to see your orders here.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all text-sm md:text-base"
            >
              Browse Products <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="bg-slate-50 px-4 md:px-6 py-3 md:py-4 border-b border-slate-100">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <Package size={18} className="md:w-5 md:h-5 text-indigo-600 shrink-0" />
                      <div>
                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">Order ID</p>
                        <p className="text-xs md:text-sm font-bold text-slate-700">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 pl-9 md:pl-0">
                      <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm">
                        <Calendar size={14} className="md:w-4 md:h-4" />
                        <span className="whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-start md:items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                          <Package size={20} className="md:w-6 md:h-6 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm md:text-base line-clamp-2">{item.name}</p>
                          <p className="text-xs md:text-sm text-slate-500 mt-0.5">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                        <p className="font-bold text-slate-800 text-sm md:text-base shrink-0">₹{(item.quantity * item.price).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-100">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
                      <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm order-2 md:order-1">
                        <CreditCard size={14} className="md:w-4 md:h-4" />
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="flex flex-col min-[420px]:flex-row items-start min-[420px]:items-center justify-between min-[420px]:justify-end gap-3 order-1 md:order-2">
                        <p className="text-base md:text-lg font-black text-slate-900">Total: ₹{order.totalPrice.toLocaleString()}</p>
                        {(order.orderStatus === "Pending" || order.orderStatus === "Shipped") && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-50 text-red-600 rounded-lg md:rounded-xl font-bold text-xs md:text-sm hover:bg-red-100 transition-all whitespace-nowrap"
                          >
                            <XCircle size={14} className="md:w-4 md:h-4" /> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;