import { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSidebar";
import StatCard from "../../component/admin/StatCard";
import { Package, ShoppingBag, Users, IndianRupee, Menu, X } from "lucide-react";
import { getAdminStats } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats");
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <h2 className="text-xl font-bold animate-pulse text-slate-600">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="flex bg-[#f8fafc] min-h-screen relative">
      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar - Controlled by state on mobile, visible on desktop */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <AdminSidebar />
      </aside>

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
          <h1 className="font-bold text-slate-800">Admin Panel</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="p-4 md:p-8 lg:p-10">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 text-sm md:text-base">Welcome back, Admin.</p>
          </header>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard title="Total Products" value={stats?.totalProducts} icon={Package} />
            <StatCard title="Total Orders" value={stats?.totalOrders} icon={ShoppingBag} />
            <StatCard title="Total Users" value={stats?.totalUsers} icon={Users} />
            <StatCard title="Revenue" value={`₹ ${stats?.revenue?.toLocaleString()}`} icon={IndianRupee} />
          </div>

          <div className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
              Admin Actions
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Manage products, orders, and users from the sidebar. You can monitor real-time 
              sales data and update inventory status here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;