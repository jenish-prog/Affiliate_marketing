import React from 'react';
import { Zap } from 'lucide-react';

export default function FlashDealsBanner() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
      <div className="bg-gradient-to-r from-brand-red to-red-500 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between text-white gap-6">
        <div className="flex items-center gap-4">
          <div className="text-yellow-300">
            <Zap size={40} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Flash Deals</h2>
            <p className="text-red-100 text-sm">Limited time offers ending in:</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 font-bold text-2xl">
          <div className="flex flex-col items-center">
            <div className="bg-brand-dark/30 rounded-lg px-4 py-2 backdrop-blur-sm">13</div>
            <span className="text-[10px] text-red-100 mt-1 uppercase tracking-wider">Hrs</span>
          </div>
          <span className="text-red-200 mb-5">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-brand-dark/30 rounded-lg px-4 py-2 backdrop-blur-sm">50</div>
            <span className="text-[10px] text-red-100 mt-1 uppercase tracking-wider">Mins</span>
          </div>
          <span className="text-red-200 mb-5">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-brand-dark/30 rounded-lg px-4 py-2 backdrop-blur-sm">21</div>
            <span className="text-[10px] text-red-100 mt-1 uppercase tracking-wider">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
