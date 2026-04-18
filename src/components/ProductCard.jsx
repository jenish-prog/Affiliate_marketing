import { Link, useNavigate } from 'react-router-dom';

export default function ProductCard({ id, name, image_url, price, original_price, platform, badge, affiliate_url }) {
  const navigate = useNavigate();

  const getPlatformColors = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'amazon': return 'bg-[#FFF3E0] text-[#E65100]';
      case 'flipkart': return 'bg-[#E3F2FD] text-[#1565C0]';
      case 'meesho': return 'bg-[#FCE4EC] text-[#AD1457]';
      default: return 'bg-gray-100 text-gray-700';
    }
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
        {badge && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10">
            {badge}
          </div>
        )}
        <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10 ${getPlatformColors(platform)}`}>
          {platform}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-secondary line-clamp-2 leading-tight mb-2 h-11" title={name}>
          {name}
        </h3>
        
        <div className="mt-auto pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold text-2xl tracking-tight">
              {price}
            </span>
            {original_price && (
              <span className="text-gray-400 line-through text-sm">
                {original_price}
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
