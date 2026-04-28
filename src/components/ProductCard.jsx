import { Link, useNavigate } from 'react-router-dom';

export default function ProductCard({ id, name, image_url, price, original_price, platform, badge, affiliate_url, rating = 4.5, review_count = 0 }) {
  const navigate = useNavigate();

  const getPlatformColors = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'amazon': return 'bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/30';
      case 'flipkart': return 'bg-[#2874F0]/10 text-[#2874F0] border border-[#2874F0]/30';
      case 'myntra': return 'bg-[#FF3F6C]/10 text-[#FF3F6C] border border-[#FF3F6C]/30';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDiscountPercentage = () => {
    if (!original_price || !price) return 0;
    return Math.round(((original_price - price) / original_price) * 100);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('½');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    window.open(affiliate_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="card cursor-pointer group flex flex-col h-full" onClick={handleClick}>
      <div className="relative aspect-square overflow-hidden rounded-t-card">
        <img 
          src={image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {getDiscountPercentage() > 0 && (
            <div className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm z-20">
              {getDiscountPercentage()}% OFF
            </div>
          )}
          {badge && (
            <div className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10">
              {badge}
            </div>
          )}
        </div>
        <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10 ${getPlatformColors(platform)}`}>
          {platform}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-secondary line-clamp-2 leading-tight mb-2 h-11" title={name}>
          {name}
        </h3>

        {/* Rating and Review Count */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-500 text-sm font-bold">{renderStars(rating)}</span>
          <span className="text-gray-600 text-xs">({review_count || 0} reviews)</span>
        </div>
        
        <div className="mt-auto pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold text-2xl tracking-tight">
              ₹{typeof price === 'number' ? price.toLocaleString('en-IN') : price}
            </span>
            {original_price && (
              <span className="text-gray-400 line-through text-sm">
                ₹{typeof original_price === 'number' ? original_price.toLocaleString('en-IN') : original_price}
              </span>
            )}
          </div>

          <button 
            onClick={handleBuyClick}
            className="w-full btn-primary py-2.5 text-sm uppercase tracking-wide group-hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all"
          >
            View Deal →
          </button>
        </div>
      </div>
    </div>
  );
}
