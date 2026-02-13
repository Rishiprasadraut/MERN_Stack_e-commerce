import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { PackagePlus, IndianRupee, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
        ]);

        const product = productRes.data;
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category?._id || product.category,
          countInStock: product.countInStock,
        });
        setPreview(product.image);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching product", err);
        alert("Failed to load product");
        navigate("/admin/products");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Update product details
      await api.put(`/products/${id}`, form);

      // Update image if changed
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        await api.put(`/products/${id}/image`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 text-indigo-600">
            <PackagePlus size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Product</h1>
            <p className="text-slate-500 text-sm">Update the product details below.</p>
          </div>
        </div>

        <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: MAIN DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                <input
                  name="name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                  placeholder="e.g. Premium Wireless Headphones"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea
                  name="description"
                  rows="5"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none resize-none"
                  placeholder="Tell customers about the features and benefits..."
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <div className="relative">
                    <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      name="price"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                      placeholder="0.00"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="countInStock"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                    placeholder="e.g. 50"
                    value={form.countInStock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MEDIA & CATEGORY */}
          <div className="space-y-6">
            
            {/* Image Upload Box */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Product Image</label>
              
              <div className="relative group cursor-pointer">
                {preview ? (
                  <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-indigo-200">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-bold">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400 group-hover:bg-slate-100 group-hover:border-indigo-300 transition-all">
                    <ImageIcon size={32} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload Photo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Category</label>
              <select
                name="category"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none appearance-none cursor-pointer"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
