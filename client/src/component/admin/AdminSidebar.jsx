import {NavLink,Link} from "react-router-dom";
import {LayoutDashboard,Package,ShoppingBag,Tag} from "lucide-react";


const AdminSidebar = () => {

const active = "flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold text-sm md:text-base";
const normal = "flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 text-sm md:text-base";


  return (
    <aside className="w-56 md:w-64 bg-white border-r min-h-screen p-4 md:p-5"> 
        <h2 className="text-xl md:text-2xl font-extrabold text-indigo-600 mb-8 md:mb-10">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
            <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-3 text-sm md:text-base text-slate-600 hover:bg-slate-50 rounded-lg">
          <LayoutDashboard size={18} />
          Profile
        </Link>
               <NavLink to="/admin" end className={({ isActive }) => isActive ? active : normal}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={({ isActive }) => isActive ? active : normal}>
          <Package size={18} />
          Products
        </NavLink>

        <NavLink to="/admin/categories" className={({ isActive }) => isActive ? active : normal}>
          <Tag size={18} />
          Categories
        </NavLink>

        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? active : normal}>
          <ShoppingBag size={18} />
          Orders
        </NavLink>
        </nav>
    </aside>
  )
}

export default AdminSidebar
