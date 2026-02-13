import { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSidebar";
import StatCard from "../../component/admin/StatCard";
import { Package, ShoppingBag, Users, IndianRupee, Menu, X, ArrowUpRight, PlusCircle } from "lucide-react";
import { getAdminStats } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Initializing Dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#fdfdfd] min-h-screen relative overflow-hidden">
      {/* 🟢 DECORATIVE BACKGROUND BLOBS */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* 📱 MOBILE SIDEBAR OVERLAY */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ⬅️ SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-[70] w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-out bg-white border-r border-slate-100`}>
        <AdminSidebar closeMobile={() => setIsSidebarOpen(false)} />
      </aside>

      {/* 🚀 MAIN CONTENT */}
      <main className="flex-1 w-full relative z-10 overflow-y-auto">
        {/* MOBILE HEADER */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Package className="text-white size-5" />
            </div>
            <h1 className="font-black text-slate-900 tracking-tight">ADMIN</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 rounded-xl text-slate-600 active:scale-95 transition-all">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Insights <span className="text-indigo-600">.</span>
              </h1>
              <p className="text-slate-500 font-medium mt-1">Real-time overview of your store's performance.</p>
            </div>
            
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                 Export Report
               </button>
               <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                 <PlusCircle size={18} /> New Product
               </button>
            </div>
          </header>

          {/* 📊 STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Products" value={stats?.totalProducts} icon={Package} color="indigo" />
            <StatCard title="Total Orders" value={stats?.totalOrders} icon={ShoppingBag} color="blue" />
            <StatCard title="Total Users" value={stats?.totalUsers} icon={Users} color="violet" />
            <StatCard title="Revenue" value={`₹${stats?.revenue?.toLocaleString()}`} icon={IndianRupee} color="emerald" />
          </div>

          {/* 🛠️ QUICK ACTIONS / TABLES AREA */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">Admin Actions</h2>
                <span className="p-2 bg-slate-50 rounded-lg text-slate-400 cursor-help"><ArrowUpRight size={18}/></span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium">
                Manage your digital ecosystem efficiently. Track shipments, monitor user activity, 
                and update your catalog inventory in real-time.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group">
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600">Product List</p>
                    <p className="text-xs text-slate-400">View and edit items</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group">
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600">Order Logs</p>
                    <p className="text-xs text-slate-400">Check fulfillment status</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Pro Tip</h3>
                    <p className="text-indigo-200 text-sm leading-relaxed">
                        Use the search bar in the product management section to filter by SKU or Category for faster editing.
                    </p>
                    <button className="mt-6 text-sm font-black underline decoration-indigo-400 underline-offset-4">Learn More</button>
                </div>
                <div className="absolute -right-4 -bottom-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;