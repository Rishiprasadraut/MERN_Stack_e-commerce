import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, addReview } from "../../api/productApi";
import { addToCart } from "../../api/cartApi";
import { AuthContext } from "../../context/AuthContext";
import { 
  ShoppingCart, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  User
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  
  // Review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000); // Hide success after 3s
    } catch (err) {
      console.error("Cart error", err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      setReviewError("Please write a comment");
      return;
    }
    
    setReviewLoading(true);
    setReviewError("");
    
    try {
      await addReview(id, { rating: reviewRating, comment: reviewComment });
      setReviewSuccess(true);
      setReviewComment("");
      setReviewRating(5);
      // Refresh product to show new review
      const data = await getProductById(id);
      setProduct(data);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <AlertCircle size={48} className="text-red-500" />
      <h3 className="text-xl font-bold">{error}</h3>
      <Link to="/" className="text-indigo-600 font-semibold hover:underline">Back to Shop</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb / Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="relative group">
            <div className="sticky top-28 bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
              <img 
                src={product.image || 'https://via.placeholder.com/600'} 
                alt={product.name} 
                className="w-full h-full object-center object-cover aspect-square hover:scale-105 transition-transform duration-700"
              />
              {product.countInStock === 0 && (
                <div className="absolute top-6 left-6 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Sold Out
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold">
                  <Star size={14} fill="currentColor" />
                  {product.averageReviews || 0}
                </div>
                <span className="text-slate-400 text-sm font-medium border-l border-slate-200 pl-2">{product.numReviews || 0} Reviews</span>
              </div>
              
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-3xl font-black text-indigo-600 mb-6">
                ₹{product.price.toLocaleString()}
              </p>
              
              <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed mb-8">
                {product.description}
              </div>
            </div>

            {/* ACTION CARD */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Availability</span>
                <span className={`text-sm font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.countInStock > 0 ? `In Stock (${product.countInStock} units)` : 'Out of Stock'}
                </span>
              </div>

              <button 
                disabled={product.countInStock === 0}
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-xl ${
                  added 
                    ? 'bg-green-600 text-white shadow-green-100' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 disabled:bg-slate-300 disabled:shadow-none'
                }`}
              >
                {added ? (
                  <> <CheckCircle2 size={22} /> Added to Cart </>
                ) : (
                  <> <ShoppingCart size={22} /> {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"} </>
                )}
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                  <Truck size={16} className="text-indigo-600" /> Free Delivery
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                  <RotateCcw size={16} className="text-indigo-600" /> 30-Day Returns
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tighter col-span-2">
                  <ShieldCheck size={16} className="text-indigo-600" /> 2-Year Manufacturer Warranty
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-16 border-t border-slate-100 pt-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Customer Reviews</h2>
          
          {/* Review Form - Only show if user is logged in */}
          {user ? (
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={`transition-colors ${star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={4}
                    placeholder="Share your experience with this product..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>
                
                {reviewError && (
                  <p className="text-red-500 text-sm font-medium">{reviewError}</p>
                )}
                
                {reviewSuccess && (
                  <p className="text-green-600 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 size={16} /> Review submitted successfully!
                  </p>
                )}
                
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  {reviewLoading ? (
                    <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                  ) : (
                    <><Send size={18} /> Submit Review</>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-center">
              <p className="text-slate-600">
                <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log in</Link> to write a review
              </p>
            </div>
          )}
          
          {/* Existing Reviews List */}
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="bg-white border border-slate-100 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User size={20} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-slate-900">{review.name || "Anonymous"}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm">{review.comment}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;