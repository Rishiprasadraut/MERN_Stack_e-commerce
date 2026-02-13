import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../component/ProductCard";
import { Search, PackageSearch, Sparkles, ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BANNERS = [
  {
    id: 1,
    title: "Transform Your World",
    subtitle: "One Choice at a Time",
    desc: "Experience the new 2026 collection with up to 40% off.",
    bg: "bg-indigo-900",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Smart Living",
    subtitle: "Tech Essentials",
    desc: "Upgrade your lifestyle with our curated electronics.",
    bg: "bg-slate-900",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getProducts({ search, page: pageNumber });
      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* 1. HERO BANNER SLIDER */}
      <section className="relative group">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          loop={true}
          className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
        >
          {BANNERS.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className={`relative h-full w-full overflow-hidden ${banner.bg}`}>
                <img 
                  src={banner.image} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  alt={banner.title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center text-white">
                  <div className="inline-flex items-center gap-2 bg-indigo-600/30 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold w-fit mb-3 sm:mb-6">
                    <Sparkles size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">New Season Collection 2026</span>
                    <span className="sm:hidden">New Collection</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 leading-tight">
                    {banner.title} <br/>
                    <span className="text-indigo-400">{banner.subtitle}</span>
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mb-4 sm:mb-8 line-clamp-2 sm:line-clamp-none">
                    {banner.desc}
                  </p>
                  <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold w-fit transition-all transform hover:scale-105 text-sm sm:text-base">
                    Shop Collection <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100 hidden sm:block">
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100 hidden sm:block">
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </Swiper>
      </section>

      {/* 2. SEARCH BAR OVERLAP */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-30">
        <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-indigo-600 text-sm sm:text-base"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProducts(1)}
            />
          </div>
          <button
            onClick={() => fetchProducts(1)}
            className="bg-indigo-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-200 text-sm sm:text-base whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>

      {/* 3. FEATURED PRODUCTS (SLIDER MODE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-12">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-[10px] sm:text-xs md:text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1 sm:mb-2">Curated for you</h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">Weekly Highlights</h3>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="p-2 border rounded-xl hover:bg-white hover:shadow-md transition-all feat-prev"><ChevronLeft size={20} /></button>
            <button className="p-2 border rounded-xl hover:bg-white hover:shadow-md transition-all feat-next"><ChevronRight size={20} /></button>
          </div>
        </div>

        {loading ? (
           <div className="h-[300px] sm:h-[400px] flex items-center justify-center">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
           </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{ nextEl: '.feat-next', prevEl: '.feat-prev' }}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {products.slice(0, 8).map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* 4. MAIN GRID SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-10 border-t pt-8 sm:pt-12 md:pt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Explore Everything</h2>
          <span className="text-xs sm:text-sm font-medium text-slate-500">Showing {products.length} products</span>
        </div>

        {/* ... (Your existing loading/error/grid logic here) ... */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Home;