import React from 'react';
import DealCard from './DealCard';

export default function DealGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Today's Best Deals</h2>
          <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full">1 item</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-full">Newest</button>
          <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-full transition-colors">Price: Low to High</button>
          <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-full transition-colors">Discount %</button>
          <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-full transition-colors">Popular</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DealCard />
        {/* Repeating for layout visualization, but since it's just 1 item based on design, we only show 1 or a few. */}
        {/* Let's show 4 just to make the grid look nice, or just 1 as per text. I will show 1 to match exactly, but the prompt says "make exact like this ui" which shows 1 item. Let's just show 1. */}
      </div>
    </div>
  );
}
