import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, CheckCircle2, Rocket } from 'lucide-react';

// For frontend only purposes we define a mock
const mockProduct = {
  id: 1, 
  name: "Sony WH-1000XM4 Wireless Intelligent Noise Cancelling Headphones", 
  price: "₹18,990", 
  original_price: "₹29,990", 
  discount: "37% OFF",
  platform: "Amazon", 
  badge: "Hot Deal", 
  category: "Electronics", 
  description: "Industry-leading noise cancellation. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback). Touch sensor controls pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls.",
  image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80", 
  affiliate_url: "https://amazon.in"
};

export default function ProductDetail() {
  const { id } = useParams();
  // In real implementation, fetch product details by id using useEffect
  const product = mockProduct;

  const handleBuy = () => {
    window.open(product.affiliate_url, '_blank', 'noopener,noreferrer');
  };

  const getPlatformColors = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'amazon': return 'bg-[#FFF3E0] text-[#E65100]';
      case 'flipkart': return 'bg-[#E3F2FD] text-[#1565C0]';
      case 'meesho': return 'bg-[#FCE4EC] text-[#AD1457]';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Helmet>
        <title>{product.name} - Best Price | DealHub</title>
        <meta name="description" content={product.description} />
        <meta property="og:image" content={product.image_url} />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[32px] p-8 shadow-[0_12px_44px_rgba(0,0,0,0.06)] relative aspect-square flex items-center justify-center isolate group overflow-hidden">
            <div className="absolute inset-0 transition-opacity bg-primary/5 opacity-0 group-hover:opacity-100 rounded-[32px] -z-10 blur-2xl block"></div>
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 will-change-transform"
            />
            {product.badge && (
              <div className="absolute top-6 left-6 bg-primary text-white font-bold px-4 py-1.5 rounded-pill text-sm shadow-md uppercase tracking-wider">
                {product.badge}
              </div>
            )}
          </div>
          
          <div className={`self-start font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-2 ${getPlatformColors(product.platform)}`}>
            <span>Available on {product.platform}</span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-gray-200/60 text-gray-500 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
              {product.category}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-secondary leading-[1.1] mb-6">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-4">
              <span className="text-accent text-5xl md:text-6xl font-extrabold tracking-tighter">
                {product.price}
              </span>
              {product.original_price && (
                <div className="flex flex-col gap-1 pb-1">
                  <span className="text-gray-400 line-through text-lg md:text-xl font-medium">
                    {product.original_price}
                  </span>
                </div>
              )}
            </div>
            {product.discount && (
              <span className="inline-block bg-accent/10 text-accent font-bold px-3 py-1 rounded-lg text-sm mb-6 uppercase tracking-wider border border-accent/20">
                {product.discount}
              </span>
            )}
          </div>

          <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed font-medium">
            <p>{product.description}</p>
          </div>

          <hr className="border-border border-b-2 mb-10" />

          <button 
            onClick={handleBuy}
            className="w-full py-5 text-xl tracking-wide uppercase font-bold text-white bg-primary hover:bg-primary-dark rounded-card shadow-[0_8px_24px_rgba(255,107,53,0.3)] hover:shadow-[0_12px_32px_rgba(255,107,53,0.4)] transition-all transform hover:-translate-y-1 mb-6 flex items-center justify-center gap-2"
          >
            Buy on {product.platform} <span>→</span>
          </button>
          
          <p className="text-center text-gray-500 text-sm font-medium mb-10">
            You'll be safely redirected to <strong className="text-secondary">{product.platform}</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-border/40">
            <div className="flex items-center gap-3 text-secondary font-bold">
              <ShieldCheck className="text-primary w-6 h-6" />
              <span>Secure Link</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="flex items-center gap-3 text-secondary font-bold">
              <CheckCircle2 className="text-accent w-6 h-6" />
              <span>Verified Deal</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="flex items-center gap-3 text-secondary font-bold">
              <Rocket className="text-blue-500 w-6 h-6" />
              <span>Fast Redirect</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
