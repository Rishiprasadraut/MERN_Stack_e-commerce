import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";
import { LayoutDashboard, Calendar, CreditCard, ChevronDown, ArrowLeft } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const handlerStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((st) => (st._id === id ? { ...st, orderStatus: status } : st))
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Shipped": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  // Valid status transitions
  const getValidStatuses = (currentStatus) => {
    const transitions = {
      Pending: ["Pending", "Shipped", "Cancelled"],
      Shipped: ["Shipped", "Delivered", "Cancelled"],
      Delivered: ["Delivered"],
      Cancelled: ["Cancelled"],
    };
    return transitions[currentStatus] || [currentStatus];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1f5f9] gap-4">
        <p className="text-red-500 font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="text-indigo-600 font-bold hover:underline">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] py-6 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* BACK BUTTON & HEADER */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors mb-4 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200 hidden min-[400px]:block">
                <LayoutDashboard size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Manage Orders</h1>
                <p className="text-slate-500 text-sm font-medium">Logistics & Order Fulfillment</p>
              </div>
            </div>
            
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center self-start sm:self-auto">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Live Orders</p>
                <p className="text-xl font-black text-indigo-600 text-center">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ORDERS CONTAINER */}
        <div className="bg-white rounded-2xl md:rounded-4xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Details</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                          {order.user?.email?.[0].toUpperCase() || "U"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 truncate max-w-[180px]">{order.user?.email}</span>
                          <span className="text-[11px] text-slate-400 font-medium">#{order._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1 text-slate-500 text-xs">
                        <div className="flex items-center gap-2 font-medium"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                        <div className="flex items-center gap-2"><CreditCard size={14} /> {order.paymentMethod}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-lg font-black text-slate-900">₹{order.totalPrice.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="relative inline-block w-40">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handlerStatusChange(order._id, e.target.value)}
                          disabled={order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"}
                          className={`appearance-none w-full px-4 py-2.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-60 ${getStatusColor(order.orderStatus)}`}
                        >
                          {[order.orderStatus, ...getValidStatuses(order.orderStatus)].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="lg:hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div key={order._id} className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                      {order.user?.email?.[0].toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 truncate max-w-[140px]">{order.user?.email}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">ID: #{order._id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-slate-900">₹{order.totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-slate-50 px-1">
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold">
                    <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold">
                    <CreditCard size={14} /> {order.paymentMethod}
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handlerStatusChange(order._id, e.target.value)}
                    disabled={order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"}
                    className={`appearance-none w-full px-4 py-3.5 rounded-xl border text-sm font-bold focus:outline-none transition-all ${getStatusColor(order.orderStatus)} ${(order.orderStatus === "Delivered" || order.orderStatus === "Cancelled") ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {[order.orderStatus, ...getValidStatuses(order.orderStatus)].map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {orders.length === 0 && (
            <div className="py-24 text-center">
              <div className="inline-block p-4 bg-slate-50 rounded-full mb-4">
                <LayoutDashboard size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium">No orders found in the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;