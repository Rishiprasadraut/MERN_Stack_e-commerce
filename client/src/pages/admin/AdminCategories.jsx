import React, { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "../../api/categoryApi";
import AdminSidebar from "../../component/admin/AdminSidebar";
import { Plus, Trash2, Tag, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCreating(true);
    setError("");
    try {
      await createCategory(newCategoryName.trim());
      setNewCategoryName("");
      setSuccess("Category created successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      setSuccess("Category deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Category Management</h1>
            <p className="text-slate-500">Create and manage product categories</p>
          </div>

          {/* Create Category Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-indigo-600" />
              Add New Category
            </h2>
            <form onSubmit={handleCreateCategory} className="flex gap-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={creating || !newCategoryName.trim()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {creating ? (
                  <><Loader2 size={18} className="animate-spin" /> Creating...</>
                ) : (
                  <><Plus size={18} /> Add Category</>
                )}
              </button>
            </form>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
              <CheckCircle2 size={20} />
              <span className="font-medium">{success}</span>
            </div>
          )}

          {/* Categories List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Tag size={20} className="text-indigo-600" />
                All Categories ({categories.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto" />
                <p className="text-slate-500 mt-4">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="p-12 text-center">
                <Tag size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No categories found. Create your first category above!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <Tag size={18} className="text-indigo-600" />
                      </div>
                      <span className="font-semibold text-slate-900">{category.name}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCategories;
