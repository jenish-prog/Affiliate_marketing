import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, BadgeCheck, Tag, ShieldCheck, Undo2 } from 'lucide-react';

const STORES = [
  { name: 'Amazon', count: '36,462 Deals', discount: 'Up to 60% Off', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Flipkart', count: '28,341 Deals', discount: 'Up to 70% Off', img: 'https://brandlogos.net/wp-content/uploads/2020/11/flipkart-logo.png' },
  { name: 'Myntra', count: '18,925 Deals', discount: 'Up to 60% Off', img: 'https://cdn.iconscout.com/icon/free/png-256/myntra-2709168-2249158.png' },
  { name: 'Ajio', count: '8,674 Deals', discount: 'Up to 50% Off', img: 'https://assets.ajio.com/static/img/Ajio-Logo.svg' },
  { name: 'Tata Cliq', count: '7,291 Deals', discount: 'Up to 50% Off', img: 'https://www.tatacliq.com/src/general/components/img/tata_cliq_logo.svg' },
  { name: 'Nykaa', count: '6,543 Deals', discount: 'Up to 40% Off', img: 'https://iconape.com/wp-content/png_logo_vector/nykaa-logo.png' },
  { name: 'Croma', count: '5,432 Deals', discount: 'Up to 40% Off', img: 'https://iconape.com/wp-content/png_logo_vector/croma-logo.png' },
  { name: 'boAt', count: '4,621 Deals', discount: 'Up to 60% Off', img: 'https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg' },
  { name: 'firstcry', count: '3,210 Deals', discount: 'Up to 50% Off', img: 'https://cdn.fcglcdn.com/brainbees/images/n/fc_logo.png' },
  { name: 'Reliance Digital', count: '2,180 Deals', discount: 'Up to 40% Off', img: 'https://www.reliancedigital.in/build/client/images/loaders/rd_logo.svg' },
  { name: 'Pepperfry', count: '2,346 Deals', discount: 'Up to 40% Off', img: 'https://iconape.com/wp-content/png_logo_vector/pepperfry-logo.png' },
  { name: 'View All Stores', count: 'Explore more', discount: '', img: null },
];

export default function Stores() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#F8F9FA]">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 max-w-[1400px] mx-auto w-full py-8">
        
        {/* Breadcrumb row */}
        <div className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> <ChevronRight size={12} />
          <Link to="/categories" className="hover:text-primary">Categories</Link> <ChevronRight size={12} />
          <Link to="/top-deals" className="hover:text-primary">Top Deals</Link> <ChevronRight size={12} />
          <span className="text-gray-800">Stores</span>
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stores</h1>
          <p className="text-gray-500">Shop from your favorite stores and brands.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search stores or brands..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-auto mt-4 md:mt-0 justify-between">
             <span className="text-gray-800 font-bold hidden md:inline">Category:</span>
             <select className="bg-transparent border-none outline-none font-bold text-gray-800 w-full cursor-pointer pr-4 appearance-none">
               <option>All Categories</option>
               <option>Electronics</option>
               <option>Fashion</option>
               <option>Home & Kitchen</option>
             </select>
             <ChevronDown size={14} className="-ml-4 pointer-events-none text-gray-500" />
          </div>
        </div>
        
        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {STORES.map((store, idx) => (
            <Link to={`/search?q=${store.name}`} key={idx} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group h-48">
              {store.img ? (
                <>
                  <div className="h-12 w-full flex items-center justify-center mb-6 px-4">
                    <img 
                      src={store.img} 
                      alt={store.name} 
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{store.name}</h3>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-500 text-xs font-semibold">{store.count}</span>
                    <span className="text-green-500 text-xs font-bold">{store.discount}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-primary flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="text-xl">⊞</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{store.name}</h3>
                  <span className="text-gray-500 text-xs font-semibold mt-1">{store.count}</span>
                </>
              )}
            </Link>
          ))}
        </div>

        {/* Bottom Trust Strip */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 shadow-sm mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 text-primary p-3 rounded-full"><BadgeCheck size={24} /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 leading-tight">100% Original</h4>
              <p className="text-xs text-gray-500 font-medium">Genuine products</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 text-primary p-3 rounded-full"><ShieldCheck size={24} /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 leading-tight">Secure Payments</h4>
              <p className="text-xs text-gray-500 font-medium">100% secure payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 text-primary p-3 rounded-full"><Undo2 size={24} /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 leading-tight">Easy Returns</h4>
              <p className="text-xs text-gray-500 font-medium">Hassle-free returns</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 text-primary p-3 rounded-full"><Tag size={24} /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 leading-tight">Best Price</h4>
              <p className="text-xs text-gray-500 font-medium">Price match guarantee</p>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}