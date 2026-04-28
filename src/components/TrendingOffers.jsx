import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Star } from 'lucide-react';
import { fetchProducts } from '../lib/api';

export default function TrendingOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await fetchProducts();
        setOffers(data?.filter(p => p.section === 'trending') || []);
      } catch (error) {
        console.error('Error fetching trending offers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  if (loading) return null;
  if (offers.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Trending Offers</h2>
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
          View All Offers <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <a key={offer.id} href={offer.affiliate_url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-all block">
            <div className="relative bg-gray-50 rounded-xl aspect-square mb-4 flex items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-3 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 shadow-sm z-10">
                {offer.platform || 'Platform'}
              </div>
              <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors z-10">
                <Heart size={16} />
              </button>
              <img src={offer.image_url || '/assets/watch.png'} alt={offer.name} className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 leading-snug">{offer.name}</h3>
            
            <div className="flex items-end gap-2 mb-3">
              <span className="font-bold text-brand-red text-lg">₹{typeof offer.price === 'number' ? offer.price.toLocaleString('en-IN') : offer.price}</span>
              {offer.original_price && (
                <span className="text-gray-400 line-through text-xs mb-1">₹{typeof offer.original_price === 'number' ? offer.original_price.toLocaleString('en-IN') : offer.original_price}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs">
              <Star className="text-amber-400 fill-amber-400" size={14} />
              <span className="font-bold text-gray-700">4.5</span>
              <span className="text-gray-400">(2k+)</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
