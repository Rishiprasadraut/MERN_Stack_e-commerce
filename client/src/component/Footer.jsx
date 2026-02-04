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
    <footer className="bg-white border-t border-slate-200 pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          
          {/* 1. BRAND & VISION */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-200">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Byte<span className="text-indigo-600">Bazaar</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The ultimate destination for tech enthusiasts. We provide high-quality 
              gear and accessories for modern developers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" },
                { icon: <Facebook size={18} />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. SHOPPING LINKS - Stacked on Mobile */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">Shop</h3>
            <ul className="space-y-4">
              {['All Products', 'Featured Items', 'New Arrivals', 'Discounts'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="hidden sm:block w-0 h-[1.5px] bg-indigo-600 group-hover:w-3 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. SUPPORT & CONTACT */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">Support</h3>
            <ul className="space-y-4">
              <li className="flex flex-col sm:flex-row items-center gap-3 text-slate-500 text-sm font-medium">
                <Mail size={16} className="text-indigo-600" />
                <span className="hover:text-indigo-600 cursor-pointer transition-colors">support@bytebazaar.com</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center gap-3 text-slate-500 text-sm font-medium">
                <Phone size={16} className="text-indigo-600" />
                +91 98765 43210
              </li>
              <li className="flex flex-col sm:flex-row items-center gap-3 text-slate-500 text-sm font-medium">
                <ShieldCheck size={16} className="text-indigo-600" />
                100% Secure Payment
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER & PAYMENTS */}
          <div className="text-center sm:text-left space-y-6">
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em]">Join the ByteClub</h3>
            <p className="text-slate-500 text-sm">Get 10% off your first order plus early access to sales.</p>
            <div className="relative max-w-sm mx-auto sm:mx-0">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all placeholder:text-slate-400"
              />
              <button className="absolute right-1.5 top-1.5 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100">
                <Send size={16} />
              </button>
            </div>
            
            <div className="pt-4 flex flex-col items-center sm:items-start border-t border-slate-100">
              <p className="text-[10px] uppercase font-black text-slate-400 mb-3 tracking-widest">Global Shipping Partners</p>
              <div className="flex gap-2">
                {['VISA', 'MC', 'PAYPAL', 'UPI'].map(pay => (
                  <span key={pay} className="px-2 py-1 border border-slate-200 rounded-md bg-white text-[9px] font-black text-slate-400">
                    {pay}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-slate-100 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-8 text-slate-400 text-xs font-medium">
          <p className="text-center md:text-left italic">
            © {new Date().getFullYear()} ByteBazaar. Built for the modern web.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link to="/" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">Privacy</Link>
            <Link to="/" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">Terms</Link>
            <Link to="/" className="hover:text-slate-900 transition-colors underline-offset-4 hover:underline">Cookies</Link>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-bold"
            >
              Top <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;