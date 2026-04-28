import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'More'];

export default function TopDeals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Filter out system config and limit to active products
        setProducts(data?.filter(p => p.section !== 'system_config') || []);
      } catch (error) {
        console.error('Failed to load deals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const displayProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#F8F9FA]">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 max-w-[1400px] mx-auto w-full py-8">
        {/* Header & Breadcrumbs mock */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Deals</h1>
            <p className="text-gray-500">Grab the best offers handpicked for you.</p>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category} {category === 'More' && <ChevronDown size={14} className="inline ml-1" />}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 text-sm flex-shrink-0">
            <span className="text-gray-500">Sort by:</span>
            <button className="flex items-center gap-2 font-semibold text-gray-800 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
              Most Popular <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {displayProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                 {displayProducts.map(product => (
                   <ProductCard 
                     key={product.id}
                     {...product}
                     rating={parseFloat((Math.random() * 2 + 3).toFixed(1))} // Mocking ratings 3.0 - 5.0 for UI effect
                     review_count={Math.floor(Math.random() * 5000)}
                   />
                 ))}
               </div>
            ) : (
               <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                 <p className="text-gray-500 font-medium">No deals found for {activeCategory}.</p>
               </div>
            )}
          </>
        )}

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-secondary flex items-center gap-2 mb-1">
              <span className="text-2xl">🔥</span> Don't Miss Out!
            </h3>
            <p className="text-gray-600 font-medium">New deals every day. Limited stock only.</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-bold shadow-md shadow-primary/20 transition-all whitespace-nowrap">
            Explore More Deals
          </button>
        </div>

      </main>
      <Footer />
    </div>
  );
}