import React from 'react';
import { LayoutGrid, Smartphone, Shirt, Home, Plane, Sparkles, ChevronDown } from 'lucide-react';

const categories = [
  { name: 'All Deals', icon: <LayoutGrid size={16} />, active: true },
  { name: 'Electronics', icon: <Smartphone size={16} />, active: false },
  { name: 'Fashion', icon: <Shirt size={16} />, active: false },
  { name: 'Home & Kitchen', icon: <Home size={16} />, active: false },
  { name: 'Travel', icon: <Plane size={16} />, active: false },
  { name: 'Beauty', icon: <Sparkles size={16} />, active: false },
];

export default function CategoryFilters() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
            cat.active
              ? 'bg-primary border-primary text-white shadow-sm shadow-primary/20'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className={cat.active ? 'text-white' : 'text-gray-500'}>
            {cat.icon}
          </span>
          {cat.name}
        </button>
      ))}
      <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 ml-auto">
        More <ChevronDown size={16} />
      </button>
    </div>
  );
}
