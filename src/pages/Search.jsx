import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, Filter, ChevronRight, X } from 'lucide-react';
import { fetchProducts } from '../lib/api';

const SIDEBAR_FILTERS = {
  categories: ['Electronics', 'Audio', 'Accessories', 'Fashion'],
  brands: ['Sony', 'boAt', 'JBL', 'Apple'],
  discounts: ['10% and above', '20% and above', '30% and above', '40% and above']
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(50000);

  useEffect(() => {
    const loadSearchedProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        // Simple search mock based on `query`
        const filtered = (data || [])
          .filter(p => p.section !== 'system_config')
          .filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()));
        setProducts(filtered);
      } catch (error) {
        console.error('Failed to search deals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSearchedProducts();
  }, [query]);

  // UI helpers
  const getDiscountPercentage = (price, original) => {
    if (!original || !price) return 0;
    return Math.round(((original - price) / original) * 100);
  };

  const getPlatformColors = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'amazon': return 'text-[#FF9900]';
      case 'flipkart': return 'text-[#2874F0]';
      case 'myntra': return 'text-[#FF3F6C]';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#F8F9FA]">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 max-w-[1400px] mx-auto w-full py-8">
        
        {/* Breadcrumb row & Search Header combo */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-primary">Home</Link> <ChevronRight size={12} />
            <Link to="/categories" className="hover:text-primary">Categories</Link> <ChevronRight size={12} />
            <Link to="/top-deals" className="hover:text-primary">Top Deals</Link> <ChevronRight size={12} />
            <span className="text-gray-800">Stores</span>
          </div>
          
          <div className="flex justify-between items-center bg-white p-4 px-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Search Results for "{query}"</h1>
              <p className="text-gray-500 text-sm">Showing 1-{products.length} of {products.length} results</p>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
              <span className="text-sm font-semibold text-gray-500">Sort by:</span>
              <select className="bg-transparent border-none outline-none font-bold text-gray-800 cursor-pointer px-2">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Filter Section */}
          <aside className="w-full lg:w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h2 className="font-bold flex items-center justify-center gap-2 text-lg text-secondary">
                <Filter size={20} className="text-primary"/> Filters
              </h2>
              <button className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline">
                Clear All
              </button>
            </div>

            {/* Category Checks */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {SIDEBAR_FILTERS.categories.map((cat, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" defaultChecked={idx === 0} />
                      <span className="text-sm text-gray-600 group-hover:text-primary font-medium">{cat}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{Math.floor(Math.random() * 400 + 20)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex justify-between">
                Price Range <span className="text-primary text-xs bg-primary/10 px-2 rounded-md py-1">₹{priceRange.toLocaleString('en-IN')}</span>
              </h3>
              <input 
                type="range" 
                min="109" 
                max="50000" 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
              />
              <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                <span>₹109</span>
                <span>₹50,000+</span>
              </div>
            </div>

            {/* Discount Checks */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Discount</h3>
              <div className="space-y-3">
                {SIDEBAR_FILTERS.discounts.map((disc, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary accent-primary" />
                      <span className="text-sm text-gray-600 group-hover:text-primary font-medium">{disc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands Checks */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Brands</h3>
              <div className="space-y-3">
                {SIDEBAR_FILTERS.brands.map((brand, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary accent-primary" />
                      <span className="text-sm text-gray-600 group-hover:text-primary font-medium">{brand}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{Math.floor(Math.random() * 100 + 10)}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Results (List View Layout) */}
          <div className="flex-1">
            {loading ? (
              <div className="flex h-64 items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col divide-y divide-gray-100">
                {products.map(product => {
                    const discount = getDiscountPercentage(product.price, product.original_price);
                    
                    return (
                      <div key={product.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 md:gap-8 hover:bg-gray-50 transition-colors group">
                        {/* Image Block */}
                        <div className="w-full sm:w-48 aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative flex-shrink-0">
                          <img 
                            src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} 
                            alt={product.name}
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                          />
                          {discount > 0 && (
                            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                              {discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* Details Block */}
                        <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 leading-snug hover:text-primary cursor-pointer">
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                          </h3>
                          
                          {/* Rating and Review Mock */}
                          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                            <span className="text-yellow-500 text-sm font-bold tracking-widest">★★★★½</span>
                            <span className="text-gray-500 text-xs font-semibold">(4.6)</span>
                            <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full ml-1">1K+ reviews</span>
                          </div>
                        </div>

                        {/* Price & CTA Block */}
                        <div className="w-full sm:w-48 flex-shrink-0 flex flex-col items-center sm:items-end border-t sm:border-t-0 sm:border-l border-gray-100 pt-6 sm:pt-0 sm:pl-8 mt-2 sm:mt-0">
                          <span className={`text-base font-black tracking-widest uppercase mb-3 px-3 py-1 bg-gray-100 rounded text-center sm:text-right w-full sm:w-auto ${getPlatformColors(product.platform)}`}>
                            {product.platform || 'General'}
                          </span>
                          
                          <div className="flex sm:flex-col items-end gap-3 sm:gap-0 mb-4 w-full sm:w-auto mt-auto">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-secondary tracking-tight">₹{product.price?.toLocaleString('en-IN')}</span>
                            </div>
                            {product.original_price && (
                              <span className="text-gray-400 line-through text-sm font-medium mt-1">₹{product.original_price?.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                          
                          <a 
                            href={product.affiliate_url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary w-full py-2.5 text-sm uppercase tracking-wide group-hover:shadow-md text-center max-w-xs"
                          >
                            View Deal →
                          </a>
                        </div>
                      </div>
                    );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No exactly matching products</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any deals for "{query}". Try checking your spelling or using more general terms.</p>
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}