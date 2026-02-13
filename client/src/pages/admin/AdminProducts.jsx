import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  PencilLine, 
  Trash2, 
  Package, 
  AlertTriangle,
  LayoutGrid,
  ArrowLeft
} from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products/admin");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const response = await api.delete(`/products/${id}`);
        alert(response.data.message || "Product deleted successfully!");
        fetchProducts(); // Refresh the list
      } catch (err) {
        console.error("Delete error:", err);
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100 hidden min-[400px]:block">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Product Inventory</h1>
              <p className="text-slate-500 font-medium text-sm">Manage {products.length} total items</p>
            </div>
          </div>

          <Link to="/admin/products/create" className="w-full sm:w-auto">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 w-full justify-center">
              <Plus size={20} />
              Add Product
            </button>
          </Link>
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Product Details</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {!loading && products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">ID: {product._id.slice(-8).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-5">
                      {product.countInStock > 0 ? (
                        <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                          {product.countInStock} Units
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-100 flex items-center gap-1 w-fit">
                          <AlertTriangle size={12} /> Out
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/admin/products/edit/${product._id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <PencilLine size={18} />
                        </Link>
                        <button onClick={() => deleteHandler(product._id, product.name)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="lg:hidden divide-y divide-slate-100">
            {!loading && products.map((product) => (
              <div key={product._id} className="p-5 flex items-center gap-4">
                <img src={product.image} alt="" className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{product.name}</h3>
                    <span className="text-sm font-black text-slate-900">₹{product.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                          {product.countInStock} in stock
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                          Out of stock
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/admin/products/edit/${product._id}`} className="p-2 text-slate-500 bg-slate-50 rounded-lg">
                        <PencilLine size={16} />
                      </Link>
                      <button onClick={() => deleteHandler(product._id, product.name)} className="p-2 text-red-500 bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOADING & EMPTY STATES */}
          {loading && (
            <div className="py-20 flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="text-slate-500 font-medium animate-pulse">Syncing Inventory...</p>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="py-20 text-center">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;