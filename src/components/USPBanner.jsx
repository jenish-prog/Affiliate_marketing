import React from 'react';
import { ShieldCheck, Lock, RefreshCw, HeadphonesIcon } from 'lucide-react';

export default function USPBanner() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm md:text-base">Verified Prices</h4>
          <p className="text-gray-500 text-xs md:text-sm">100% authentic deals</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-10 bg-gray-100"></div>
      
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Lock className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm md:text-base">Secure Links</h4>
          <p className="text-gray-500 text-xs md:text-sm">Safe & trusted shopping</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-10 bg-gray-100"></div>

      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <RefreshCw className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm md:text-base">Real-time Updates</h4>
          <p className="text-gray-500 text-xs md:text-sm">Never miss a deal</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-10 bg-gray-100"></div>

      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <HeadphonesIcon className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm md:text-base">24/7 Support</h4>
          <p className="text-gray-500 text-xs md:text-sm">We're here to help</p>
        </div>
      </div>
    </div>
  );
}
