import React, { useState } from 'react';
import { Search, Briefcase } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path) => location.pathname === path;

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
            <Link to="/" className={`${isActive('/') ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary transition-colors pb-1'}`}>Home</Link>
            <Link to="/top-deals" className={`${isActive('/top-deals') ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary transition-colors pb-1'}`}>Top Deals</Link>
            <Link to="/stores" className={`${isActive('/stores') ? 'text-primary border-b-2 border-primary pb-1' : 'hover:text-primary transition-colors pb-1'}`}>Stores</Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deals, products or brands..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
            <Search size={18} />
          </button>
        </form>

        <div className="flex items-center gap-6">
          {/* Sign In & Cart items removed */}
        </div>
      </div>
    </nav>
  );
}
