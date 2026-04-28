import React from 'react';
import { Award, Star, RefreshCw, ShieldCheck } from 'lucide-react';

export default function FeaturesStrip() {
  return (
    <div className="mt-16 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
          <Award className="text-orange-500" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Top Brands</h4>
          <p className="text-gray-500 text-xs">Deals from trusted brands you love</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
          <Star className="text-amber-500" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Great Savings</h4>
          <p className="text-gray-500 text-xs">Best prices & exclusive discounts</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <RefreshCw className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Easy Returns</h4>
          <p className="text-gray-500 text-xs">Hassle-free returns & refunds</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="text-orange-500" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">100% Secure</h4>
          <p className="text-gray-500 text-xs">Your data and privacy are protected</p>
        </div>
      </div>
    </div>
  );
}
