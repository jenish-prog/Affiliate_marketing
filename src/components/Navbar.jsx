import React from 'react';
import { Search, ShoppingCart, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Briefcase className="text-primary" size={20} />
            </div>
            <div className="text-2xl font-bold tracking-tight text-gray-900">DealHub</div>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <Link to="/" className="text-primary border-b-2 border-primary pb-1">Home</Link>
            <Link to="/" className="hover:text-primary transition-colors pb-1">Categories</Link>
            <Link to="/" className="hover:text-primary transition-colors pb-1">Top Deals</Link>
            <Link to="/" className="hover:text-primary transition-colors pb-1">Stores</Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search deals, products or brands..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-gray-600 hover:text-primary transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>
          <Link to="/admin" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-primary/30 transition-all">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
