import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { getCart } from "../api/cartApi";
import {
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🔥 SEARCH STATE
  const [search, setSearch] = useState("");

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const cart = await getCart();
        const count =
          cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };
    if (user) fetchCartCount();
  }, [user]);

  // 🔥 SEARCH HANDLER
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setSearch("");
    setIsMenuOpen(false);
  };

  const logoutHandler = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  if (!user) return null;

  const activeLink =
    "text-indigo-600 font-bold flex items-center gap-2 relative after:content-[''] after:absolute after:-bottom-[19px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600";
  const normalLink =
    "text-slate-600 hover:text-indigo-600 font-medium transition-all flex items-center gap-2";

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-2"
          : "bg-white py-4"
      } border-b border-slate-100 px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <ShoppingBag className="text-white size-5" />
            </div>
            <span className="text-xl font-black text-slate-900 hidden sm:block">
              Byte<span className="text-indigo-600">Bazaar</span>
            </span>
          </NavLink>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex gap-8 items-center text-sm">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Shop</NavLink>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Orders</NavLink>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* 🔍 SEARCH (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1.5">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-2 text-sm w-40"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* CART */}
          <NavLink
            to="/cart"
            className="relative p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* USER */}
          <div className="hidden md:flex items-center gap-3">
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
              {user.name.split(" ")[0]} <ChevronDown size={14} />
            </p>

            {user.role === "ADMIN" && (
              <NavLink
                to="/admin"
                className="p-2 bg-amber-50 text-amber-600 rounded-lg"
              >
                <LayoutDashboard size={18} />
              </NavLink>
            )}

            <button
              onClick={logoutHandler}
              className="p-2 text-slate-400 hover:text-red-500"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 bg-slate-50 rounded-xl"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 top-[60px] bg-white z-[90] lg:hidden transition-all ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* 🔍 MOBILE SEARCH */}
          <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-3 text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          <NavLink to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</NavLink>
          <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</NavLink>

          <button
            onClick={logoutHandler}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
