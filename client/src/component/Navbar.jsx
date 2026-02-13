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
  const [search, setSearch] = useState("");

  /* ================= Scroll Effect ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Cart Count ================= */
  useEffect(() => {
    if (!user) return;

    let ignore = false;

    const fetchCartCount = async () => {
      try {
        const cart = await getCart();
        if (!ignore) {
          const count =
            cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
          setCartCount(count);
        }
      } catch {
        setCartCount(0);
      }
    };

    fetchCartCount();
    return () => (ignore = true);
  }, [user]);

  /* ================= Close Menu on Desktop ================= */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e) => {
      if (e.matches) setIsMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  /* ================= Lock Body Scroll ================= */
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  if (!user) return null;

  /* ================= Handlers ================= */
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

  const activeLink =
    "relative text-indigo-600 font-bold flex items-center gap-2 after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-indigo-600";

  const normalLink =
    "text-slate-600 hover:text-indigo-600 font-medium transition-all flex items-center gap-2";

  /* ================= JSX ================= */
  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-2"
          : "bg-white py-3 md:py-4"
      } border-b border-slate-100 px-3 md:px-4 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 md:gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-8">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg shadow-indigo-200">
              <ShoppingBag className="text-white size-4 md:size-5" />
            </div>
            <span className="text-base md:text-xl font-black text-slate-900 hidden min-[400px]:block">
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
        <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
          {/* SEARCH DESKTOP */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1.5">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-2 text-sm w-28 sm:w-32 lg:w-44"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* CART */}
          <NavLink
            to="/cart"
            className="relative p-1.5 md:p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full"
          >
            <ShoppingCart size={20} className="md:w-[22px] md:h-[22px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:top-0 md:right-0 bg-indigo-600 text-white text-[9px] md:text-[10px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
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
              <NavLink to="/admin" className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <LayoutDashboard size={18} />
              </NavLink>
            )}

            <button onClick={logoutHandler} className="p-2 text-slate-400 hover:text-red-500">
              <LogOut size={18} />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="lg:hidden p-1.5 md:p-2 bg-slate-50 rounded-lg md:rounded-xl"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-slate-900/40 z-[85] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-[95] w-full max-w-xs sm:max-w-sm lg:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white border-l border-slate-100 shadow-2xl p-5 md:p-6 flex flex-col space-y-4 overflow-y-auto">
          
          {/* SEARCH */}
          <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 mb-2">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-3 text-sm w-full text-slate-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* LINKS */}
          <nav className="flex flex-col space-y-1">
            {[
              { name: "Home", to: "/" },
              { name: "Products", to: "/products" },
              { name: "Orders", to: "/orders" },
              { name: "Cart", to: "/cart" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3.5 md:py-4 rounded-xl text-base md:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* LOGOUT */}
          <div className="pt-6 mt-auto">
            <button
              onClick={logoutHandler}
              className="w-full py-3.5 md:py-4 bg-red-50 text-red-600 rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
