import { useNavigate } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleBtnClick = (e) => {
    e.stopPropagation(); // Prevents triggering the card's onClick twice
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      className="group bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full" 
      onClick={handleCardClick}
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={product.image} 
          alt={product.name} 
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white/50">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-black text-slate-700">{product.averageReviews || 0}</span>
        </div>

        {/* Stock Status (Subtle Overlay) */}
        {product.countInStock <= 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* CONTENT SECTION */}
      <div className="p-4 md:p-6 flex flex-col flex-1">
        <div className="mb-auto">
          <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-black text-indigo-600">₹{product.price.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">incl. tax</span>
          </div>
        </div>
        
        {/* ACTION BUTTON */}
        <button 
          className="w-full mt-5 flex items-center justify-center gap-2 bg-slate-900 group-hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-slate-200 group-hover:shadow-indigo-200"
          onClick={handleBtnClick}
        >
          <span className="text-sm">View Details</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;