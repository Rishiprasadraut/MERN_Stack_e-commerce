import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../component/ProductCard";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getProducts({
        search,
        page: pageNumber,
      });

      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <h3 className="text-red-500 font-medium">{error}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* SEARCH */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm md:text-base"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProducts(1)}
            />
          </div>

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm md:text-base"
            onClick={() => fetchProducts(1)}
          >
            Search
          </button>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Our Products</h2>

        {/* PRODUCTS */}
        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {pages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 md:mt-12">
            <button
              onClick={() => page > 1 && fetchProducts(page - 1)}
              disabled={page === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => fetchProducts(i + 1)}
                className={`px-3 md:px-4 py-2 border rounded-lg font-medium text-sm md:text-base transition-colors ${
                  page === i + 1 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => page < pages && fetchProducts(page + 1)}
              disabled={page === pages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
