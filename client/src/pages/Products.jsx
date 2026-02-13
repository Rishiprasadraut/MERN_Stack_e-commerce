import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/productApi";
import ProductCard from "../component/ProductCard";
import { getCategories } from "../api/categoryApi";
import { Filter, SlidersHorizontal, X, ChevronRight, Search } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Responsive UI States
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(["All", ...data.map(cat => cat.name)]);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when search param changes
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({ search: urlSearch });
        setProducts(data.products || data);
        setFilteredProducts(data.products || data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category?.name === selectedCategory || p.category === selectedCategory);
    }
    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);
    setFilteredProducts(result);
  }, [selectedCategory, sortBy, products]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  // Sidebar Content Component (Reusable for Desktop & Mobile)
  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Filter size={16} className="text-indigo-600" />
          Browse Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsFilterOpen(false); // Close drawer on mobile after selection
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all group ${
                selectedCategory === cat 
                ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100" 
                : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
              <ChevronRight size={14} className={`${selectedCategory === cat ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`} />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-400 text-xs font-bold mb-1">Limited Offer</p>
          <h4 className="font-bold text-lg mb-4">Summer Sale 2026</h4>
          <button className="text-xs bg-white text-slate-900 px-4 py-2 rounded-lg font-bold">
            Explore
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />
      </div>
    </div>
  );

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 animate-pulse">
      <div className="h-12 bg-slate-200 w-64 mb-10 rounded-2xl" />
      <div className="flex gap-10">
        <div className="hidden md:block w-64 h-96 bg-slate-100 rounded-3xl" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[...Array(6)].map((_, i) => <div key={i} className="aspect-3/4 bg-slate-100 rounded-3xl" />)}
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 font-medium">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* MOBILE FILTER DRAWER OVERLAY */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 z-[110] transition-opacity duration-300 md:hidden ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsFilterOpen(false)}
      />
      
      {/* MOBILE FILTER DRAWER */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-xs sm:max-w-sm bg-white z-[120] p-6 shadow-2xl transition-transform duration-300 md:hidden overflow-y-auto ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-slate-50 rounded-full"><X size={20}/></button>
        </div>
        <FilterContent />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900">Shop</h1>
              <p className="text-slate-500 text-sm md:text-base mt-1">
                {searchParams.get("search") 
                  ? `Results for "${searchParams.get("search")}" (${filteredProducts.length})` 
                  : `Showing ${filteredProducts.length} items`}
              </p>
            </div>
            {/* MOBILE FILTER TRIGGER */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center justify-center sm:justify-start gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm w-full sm:w-auto"
            >
              <Filter size={18} /> Filters
            </button>
          </div>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-full sm:flex-1 flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none px-3 text-sm"
              />
              {searchQuery && (
                <button type="button" onClick={clearSearch} className="p-1 hover:bg-slate-100 rounded-full">
                  <X size={16} className="text-slate-400" />
                </button>
              )}
            </div>
            <button 
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors w-full sm:w-auto text-center"
            >
              Search
            </button>
          </form>

          {/* SORTING BAR */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white p-2 md:p-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="hidden md:flex gap-2 pl-2">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort By:</span>
            </div>
            <div className="relative w-full md:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-40 md:w-48 appearance-none bg-slate-50 md:bg-white border-none md:border md:border-slate-200 pl-4 pr-10 py-2 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-600 outline-none"
              >
                <option value="newest">Latest Arrivals</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <SlidersHorizontal size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-28">
              <FilterContent />
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-4xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No matches found.</p>
                <button 
                  onClick={() => {setSelectedCategory("All"); setSortBy("newest");}} 
                  className="mt-4 text-indigo-600 font-black hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
