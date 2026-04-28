import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchProducts } from '../lib/api';
import { 
  ShieldCheck, CheckCircle2, ChevronRight, Heart, Share2, 
  MapPin, Undo2, BadgeCheck 
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts();
        const found = data?.find(p => p.id === parseInt(id) || p.id === id);
        setProduct(found || null);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[#F8F9FA]">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[#F8F9FA]">
        <Navbar />
        <div className="flex-1 flex justify-center items-center flex-col gap-4">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/" className="text-primary hover:underline font-bold">Return to Home</Link>
        </div>
      </div>
    );
  }

  const getDiscountPercentage = (price, original) => {
    if (!original || !price) return 0;
    return Math.round(((original - price) / original) * 100);
  };

  const discount = getDiscountPercentage(product.price, product.original_price);
  
  const mockImages = [
    product.image_url || 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426fa99f5?w=500&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80'
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#F8F9FA]">
      <Navbar />
      
      <main className="flex-1 px-4 md:px-8 max-w-[1400px] mx-auto w-full py-8">
        {/* Breadcrumb row */}
        <div className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-8 tracking-wide">
          <Link to="/" className="hover:text-primary">Home</Link> <ChevronRight size={12} />
          <Link to="/categories" className="hover:text-primary">Categories</Link> <ChevronRight size={12} />
          <Link to="/top-deals" className="hover:text-primary">Top Deals</Link> <ChevronRight size={12} />
          <span className="text-gray-800 font-bold truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-10 flex flex-col lg:flex-row gap-12 mb-12 relative">
          
          {/* Left Column: Images */}
          <div className="w-full lg:w-[45%] flex-shrink-0 flex flex-col gap-6">
            <div className="aspect-[4/3] lg:aspect-square bg-gray-50 rounded-2xl relative overflow-hidden flex items-center justify-center p-8 group border border-gray-100">
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-100 text-red-600 border border-red-200 text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm z-10">
                  {discount}% OFF
                </span>
              )}
              <img 
                src={mockImages[0]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {mockImages.map((img, i) => (
                <button key={i} className={`w-20 h-20 flex-shrink-0 rounded-xl bg-gray-50 border-2 p-2 ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-200'} transition-all`}>
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-[55%] flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold text-secondary leading-tight md:leading-snug mb-3 pr-8">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                4.6 <span className="text-[10px]">★</span>
              </div>
              <span className="text-sm font-semibold text-primary hover:underline cursor-pointer border-r border-gray-300 pr-3">(2,345 ratings)</span>
              <span className="text-sm font-bold text-gray-700">1K+ bought in past month</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight">₹{product.price?.toLocaleString('en-IN')}</span>
              {product.original_price && (
                <span className="text-xl font-semibold text-gray-400 line-through">₹{product.original_price?.toLocaleString('en-IN')}</span>
              )}
              {discount > 0 && (
                <span className="text-lg font-extrabold text-red-500">{discount}% OFF</span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-medium mb-8">Inclusive of all taxes</p>

            {/* Offers */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 border border-gray-200 bg-white shadow-sm rounded-xl p-4 flex flex-col gap-1 hover:border-orange-300 transition-colors cursor-pointer group">
                <span className="text-xs font-bold text-gray-900 group-hover:text-primary">Bank Offer</span>
                <span className="text-xs text-gray-600 font-medium mt-1 mb-2">10% instant discount on ICICI Cards</span>
                <span className="text-xs text-primary font-bold mt-auto hover:underline uppercase tracking-wide">T&C</span>
              </div>
              <div className="flex-1 border border-gray-200 bg-white shadow-sm rounded-xl p-4 flex flex-col gap-1 hover:border-orange-300 transition-colors cursor-pointer group">
                <span className="text-xs font-bold text-gray-900 group-hover:text-primary">No Cost EMI</span>
                <span className="text-xs text-gray-600 font-medium mt-1 mb-2">From ₹1,299/month. View detailed plans.</span>
                <span className="text-xs text-primary font-bold mt-auto hover:underline uppercase tracking-wide">View Plans</span>
              </div>
              <div className="flex-1 border border-gray-200 bg-white shadow-sm rounded-xl p-4 flex flex-col gap-1 hover:border-orange-300 transition-colors cursor-pointer group">
                <span className="text-xs font-bold text-gray-900 group-hover:text-primary">Partner Offer</span>
                <span className="text-xs text-gray-600 font-medium mt-1 mb-2">Get ₹200 cashback on select wallets</span>
                <span className="text-xs text-primary font-bold mt-auto hover:underline uppercase tracking-wide">T&C</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Delivery Options</h4>
              <div className="flex items-center gap-2 text-sm mb-4">
                <MapPin size={18} className="text-gray-400" />
                <span className="font-medium text-gray-600">Deliver to: <span className="text-gray-900 font-extrabold">110001</span></span>
                <button className="text-primary font-bold text-xs ml-2 uppercase tracking-wide hover:underline">Change</button>
              </div>
              <div className="text-sm font-bold text-gray-900 pl-7 mb-6 flex items-center gap-2">
                Get it by Tomorrow, May 16 | <span className="text-green-600 font-extrabold uppercase text-xs">Free Delivery</span>
              </div>
              
              <div className="flex gap-4 sm:gap-8 pl-1 pt-6 border-t border-gray-200 justify-between sm:justify-start">
                <div className="flex flex-col items-center gap-2 text-center max-w-[80px]">
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary font-bold">7</div>
                  <span className="text-[10px] font-bold text-gray-600 leading-tight">7 Days Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center max-w-[80px]">
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary"><ShieldCheck size={20} /></div>
                  <span className="text-[10px] font-bold text-gray-600 leading-tight">1 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center max-w-[80px]">
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary"><BadgeCheck size={20} /></div>
                  <span className="text-[10px] font-bold text-gray-600 leading-tight">Original Product</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="h-[56px] px-6 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all flex-shrink-0">
                <Heart size={24} className="fill-current bg-transparent stroke-current" />
              </button>
              <a 
                href={product.affiliate_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 h-[56px] rounded-xl bg-primary text-white font-bold hover:bg-primary-dark shadow-[0_8px_20px_rgba(255,107,53,0.3)] flex items-center justify-center transition-all uppercase tracking-wide hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(255,107,53,0.4)]"
              >
                Buy Now
              </a>
            </div>

            {/* Footer tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-6 border-t border-gray-100 gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-lg w-max">
                Sold by <span className="font-bold text-indigo-900 border-b border-dashed border-indigo-900 hover:text-primary transition-colors cursor-pointer">Appario Retail</span>
                <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-sm ml-1 flex items-center gap-1">4.5 <span className="text-[10px]">★</span></span>
                <CheckCircle2 size={16} className="text-green-500 ml-2" /> 
                <span className="text-green-600 font-bold text-xs uppercase tracking-wide">Trusted</span>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors ml-auto sm:ml-0 bg-gray-50 px-4 py-2 rounded-lg">
                <Share2 size={16} /> Share
              </button>
            </div>
            
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
