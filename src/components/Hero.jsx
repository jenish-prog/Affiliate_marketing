import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-[#1C1F26] rounded-[24px] mt-6 px-8 md:px-16 pt-16 pb-0 overflow-hidden relative shadow-2xl">
      {/* Background Rings */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-amber-500/10 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-amber-500/20 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] border-[1px] border-amber-500/10 rounded-full pointer-events-none"></div>
      
      {/* Gradient glow */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 h-full">
        <div className="flex-1 text-white max-w-xl pb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#2A2E39] border border-gray-700/50 rounded-full px-3 py-1 mb-6">
            <Zap size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold tracking-wider text-gray-200">LIVE NOW</span>
          </div>
          
          <h1 className="text-5xl md:text-[56px] font-bold leading-[1.1] mb-6">
            India's Best Deals,<br />
            <span className="text-primary">Curated for You.</span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Access verified, premium offers from top merchants.<br />
            Stop searching and start saving with our real-time curated platform.
          </p>
          
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-lg shadow-primary/30">
            Explore Offers <ArrowRight size={18} />
          </button>
          
          <div className="mt-12 flex items-center gap-4 border-t border-gray-800 pt-6">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-[#1C1F26]" />
              <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-[#1C1F26]" />
              <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-[#1C1F26]" />
            </div>
            <div className="text-sm text-gray-400">
              Trusted by <span className="text-white font-bold">250K+</span> shoppers across India
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex justify-end items-end h-full">
          {/* Man Illustration */}
          <img src="/assets/hero-new.png" alt="Premium Shopping" className="max-w-[450px] w-full object-contain object-bottom -mb-2 z-20 drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
}
