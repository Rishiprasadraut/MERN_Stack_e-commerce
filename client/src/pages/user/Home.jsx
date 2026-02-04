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
          className="h-[500px] md:h-[600px]"
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
                
                <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-white">
                  <div className="inline-flex items-center gap-2 bg-indigo-600/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold w-fit mb-6">
                    <Sparkles size={16} />
                    <span>New Season Collection 2026</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                    {banner.title} <br/>
                    <span className="text-indigo-400">{banner.subtitle}</span>
                  </h1>
                  <p className="text-slate-300 text-lg max-w-xl mb-8">
                    {banner.desc}
                  </p>
                  <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold w-fit transition-all transform hover:scale-105">
                    Shop Collection <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={24} />
          </button>
        </Swiper>
      </section>

      {/* 2. SEARCH BAR OVERLAP */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600"
              placeholder="Searching for something specific?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProducts(1)}
            />
          </div>
          <button
            onClick={() => fetchProducts(1)}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-200"
          >
            Find Products
          </button>
        </div>
      </div>

      {/* 3. FEATURED PRODUCTS (SLIDER MODE) */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Curated for you</h2>
            <h3 className="text-4xl font-extrabold text-slate-900">Weekly Highlights</h3>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-xl hover:bg-white hover:shadow-md transition-all feat-prev"><ChevronLeft /></button>
            <button className="p-2 border rounded-xl hover:bg-white hover:shadow-md transition-all feat-next"><ChevronRight /></button>
          </div>
        </div>

        {loading ? (
           <div className="h-[400px] flex items-center justify-center">Loading...</div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{ nextEl: '.feat-next', prevEl: '.feat-prev' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10 border-t pt-16">
          <h2 className="text-3xl font-bold text-slate-900">Explore Everything</h2>
          <span className="text-sm font-medium text-slate-500">Showing {products.length} products</span>
        </div>

        {/* ... (Your existing loading/error/grid logic here) ... */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Home;