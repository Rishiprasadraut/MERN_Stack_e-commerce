import React from "react";
import { Link } from "react-router-dom";
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Send, 
  Mail, 
  Phone, 
  ShieldCheck,
  ChevronUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-12 lg:mb-16">
          
          {/* 1. BRAND & VISION */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-200">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                Byte<span className="text-indigo-600">Bazaar</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs">
              The ultimate destination for tech enthusiasts. We provide high-quality 
              gear and accessories for modern developers.
            </p>
            <div className="flex gap-2 md:gap-3">
              {[
                { icon: <Twitter size={16} className="md:w-[18px] md:h-[18px]" />, href: "#" },
                { icon: <Instagram size={16} className="md:w-[18px] md:h-[18px]" />, href: "#" },
                { icon: <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />, href: "#" },
                { icon: <Facebook size={16} className="md:w-[18px] md:h-[18px]" />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. SHOPPING LINKS - Stacked on Mobile */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">Shop</h3>
            <ul className="space-y-3 md:space-y-4">
              {['All Products', 'Featured Items', 'New Arrivals', 'Discounts'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-slate-500 hover:text-indigo-600 text-xs md:text-sm font-medium transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="hidden sm:block w-0 h-[1.5px] bg-indigo-600 group-hover:w-3 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SUPPORT & CONTACT */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-4 md:mb-6">Support</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 text-slate-500 text-xs md:text-sm font-medium">
                <Mail size={14} className="md:w-4 md:h-4 text-indigo-600 shrink-0" />
                <span className="hover:text-indigo-600 cursor-pointer transition-colors break-all">support@bytebazaar.com</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 text-slate-500 text-xs md:text-sm font-medium">
                <Phone size={14} className="md:w-4 md:h-4 text-indigo-600 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 text-slate-500 text-xs md:text-sm font-medium">
                <ShieldCheck size={14} className="md:w-4 md:h-4 text-indigo-600 shrink-0" />
                <span>100% Secure Payment</span>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER & PAYMENTS */}
          <div className="text-center sm:text-left space-y-4 md:space-y-6">
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em]">Join the ByteClub</h3>
            <p className="text-slate-500 text-xs md:text-sm">Get 10% off your first order plus early access to sales.</p>
            <div className="relative max-w-sm mx-auto sm:mx-0">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all placeholder:text-slate-400"
              />
              <button className="absolute right-1 md:right-1.5 top-1 md:top-1.5 bg-indigo-600 text-white p-1.5 md:p-2 rounded-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100">
                <Send size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
            
            <div className="pt-3 md:pt-4 flex flex-col items-center sm:items-start border-t border-slate-100">
              <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 mb-2 md:mb-3 tracking-widest">Global Shipping Partners</p>
              <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                {['VISA', 'MC', 'PAYPAL', 'UPI'].map(pay => (
                  <span key={pay} className="px-2 py-1 border border-slate-200 rounded-md bg-white text-[8px] md:text-[9px] font-black text-slate-400">
                    {pay}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-slate-100 pt-6 md:pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-8 text-slate-400 text-[10px] md:text-xs font-medium">
          <p className="text-center md:text-left italic">
            © {new Date().getFullYear()} ByteBazaar. Built for the modern web.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            <Link to="/" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">Privacy</Link>
            <Link to="/" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">Terms</Link>
            <Link to="/" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">Cookies</Link>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-bold"
            >
              Top <ChevronUp size={12} className="md:w-[14px] md:h-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;