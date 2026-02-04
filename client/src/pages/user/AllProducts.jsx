import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../component/ProductCard";

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

  if (loading) return <h3>Loading Products...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SEARCH */}
      <div className="flex gap-2 mb-6">
        <input
          className="border px-3 py-2 w-full"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-black text-white px-4"
          onClick={() => fetchProducts(1)}
        >
          Search
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-8">Our Products</h2>

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => fetchProducts(i + 1)}
            className={`px-3 py-1 border ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
