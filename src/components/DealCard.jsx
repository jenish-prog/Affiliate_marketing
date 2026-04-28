import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function DealCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col">
      <div className="relative p-6 bg-gray-50 flex items-center justify-center aspect-[4/3]">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Hot Deal</span>
        </div>
        <div className="absolute top-4 right-4 z-10 bg-white rounded shadow-sm px-2 py-1">
          <span className="text-blue-600 font-bold italic text-xs">Flipkart <span className="text-yellow-400 not-italic">✦</span></span>
        </div>
        <img 
          src="/assets/sunscreen.png" 
          alt="Sunscreen" 
          className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Sunscreen</h3>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-amber-400">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
            <Star size={14} fill="currentColor" stroke="currentColor" className="text-amber-400 opacity-50" />
          </div>
          <span className="text-xs text-gray-500 ml-1">(0 reviews)</span>
        </div>
        
        <div className="flex items-end gap-2 mb-2">
          <span className="text-brand-green font-bold text-2xl">₹332</span>
          <span className="text-gray-400 line-through text-sm mb-1">₹349</span>
        </div>
        
        <div className="mb-6">
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">5% OFF</span>
        </div>
        
        <button className="mt-auto w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
          View Deal <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
