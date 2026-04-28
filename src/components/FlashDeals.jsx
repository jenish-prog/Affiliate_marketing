import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { fetchProducts } from '../lib/api';

export default function FlashDeals() {
  const [flashDeals, setFlashDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const data = await fetchProducts();
        setFlashDeals(data?.filter(p => p.section === 'flash') || []);
      } catch (error) {
        console.error('Error fetching flash deals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDeals();
  }, []);

  if (loading) return <div className="mt-12 flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  if (flashDeals.length === 0) return null;

  const featuredDeal = flashDeals[0];
  const sideDeals = flashDeals.slice(1, 3); // Get up to 2 side deals

  const calculateDiscount = (price, original) => {
    if (!original || !price || original <= price) return null;
    return Math.round(((original - price) / original) * 100);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Flame className="text-primary fill-primary" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Flash Deals</h2>
            <p className="text-gray-500 text-sm">Limited time offers you shouldn't miss.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 shadow-sm whitespace-nowrap">
          <span className="text-sm font-semibold text-gray-600 hidden md:inline">Ends in</span>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white rounded-[4px] px-2 py-1 text-sm font-bold shadow-sm">04</div>
              <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Hrs</span>
            </div>
            <span className="text-gray-400 font-bold mb-3">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white rounded-[4px] px-2 py-1 text-sm font-bold shadow-sm">29</div>
              <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Mins</span>
            </div>
            <span className="text-gray-400 font-bold mb-3">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-brand-red text-white rounded-[4px] px-2 py-1 text-sm font-bold shadow-sm">59</div>
              <span className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Secs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Deal */}
        {featuredDeal && (
          <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
            <div className="w-full md:w-1/2 bg-[#1C1F26] relative p-8 flex items-center justify-center min-h-[300px]">
               <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-[10px] font-bold text-gray-800 shadow-sm z-10">{featuredDeal.platform}</div>
              <img src={featuredDeal.image_url || "/assets/headphones.png"} alt={featuredDeal.name} className="w-full max-h-[300px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              {calculateDiscount(featuredDeal.price, featuredDeal.original_price) && (
                <div className="inline-block bg-brand-red/10 text-brand-red text-xs font-bold px-2 py-1 rounded mb-4 self-start">
                  {calculateDiscount(featuredDeal.price, featuredDeal.original_price)}% OFF
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{featuredDeal.name}</h3>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">₹{typeof featuredDeal.price === 'number' ? featuredDeal.price.toLocaleString('en-IN') : featuredDeal.price}</span>
                {featuredDeal.original_price && (
                  <span className="text-gray-400 line-through text-lg mb-1">₹{typeof featuredDeal.original_price === 'number' ? featuredDeal.original_price.toLocaleString('en-IN') : featuredDeal.original_price}</span>
                )}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                {featuredDeal.description || "Grab this high-quality product at an unbelievable price before the flash deal expires!"}
              </p>
              <div className="flex items-center gap-6 mt-auto">
                <a href={featuredDeal.affiliate_url} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 flex-1 shadow-lg shadow-primary/20">
                  Claim Deal <ArrowRight size={18} />
                </a>
              </div>
              <div className="flex items-center gap-6 mt-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1.5"><ShieldCheck className="text-green-500" size={14} /> Verified Deal</div>
                <div className="flex items-center gap-1.5"><Flame className="text-primary fill-primary" size={14} /> <span className="text-gray-800 font-bold">Hot Offer</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Right Stacked Deals */}
        {sideDeals.length > 0 && (
        <div className="col-span-1 flex flex-col gap-6">
          {sideDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow group h-full">
              <div className="w-1/3 bg-gray-50 rounded-xl p-3 flex items-center justify-center overflow-hidden min-h-[120px]">
                <img src={deal.image_url || "/assets/watch.png"} alt={deal.name} className="w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="w-2/3 flex flex-col justify-center py-2">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] text-gray-500 font-medium">{deal.platform || deal.retailer}</span>
                  {calculateDiscount(deal.price, deal.original_price) && (
                    <span className="text-[10px] bg-brand-red/10 text-brand-red font-bold px-1.5 py-0.5 rounded">-{calculateDiscount(deal.price, deal.original_price)}%</span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2 leading-snug line-clamp-2">{deal.name}</h4>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-bold text-primary">₹{typeof deal.price === 'number' ? deal.price.toLocaleString('en-IN') : deal.price}</span>
                  {deal.original_price && (
                    <span className="text-gray-400 line-through text-xs mb-0.5">₹{typeof deal.original_price === 'number' ? deal.original_price.toLocaleString('en-IN') : deal.original_price}</span>
                  )}
                </div>
                <a href={deal.affiliate_url} target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-bold flex items-center gap-1 group-hover:underline mt-auto">
                  View Deal <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
