import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-secondary/90 backdrop-blur-md text-white border-b border-border/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold tracking-tight">
          Deal<span className="text-primary">Hub</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
          <a href="#categories" className="text-gray-300 hover:text-primary transition-colors">Categories</a>
          <a href="#deals" className="text-gray-300 hover:text-primary transition-colors">Top Deals</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-300 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="md:hidden p-2 text-gray-300 hover:text-primary transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
