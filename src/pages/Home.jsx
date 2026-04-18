import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports", "Books"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary-soft text-white py-24 px-4 overflow-hidden relative">
        {/* Glow effect */}
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Find The Best Deals,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">Save More Every Day</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
            Handpicked deals from Amazon, Flipkart & Meesho. Updated hourly so you never miss a steal.
          </p>

          <div className="relative max-w-2xl mx-auto mb-10 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search for products, brands, or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-secondary py-4 pl-12 pr-32 rounded-pill shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-lg"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-dark text-white px-8 rounded-pill font-bold transition-colors">
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
            <div className="flex items-center gap-2"><span className="text-primary text-lg">●</span> 500+ Products</div>
            <div className="flex items-center gap-2"><span className="text-accent text-lg">●</span> Top Brands</div>
            <div className="flex items-center gap-2"><span className="text-blue-400 text-lg">●</span> Daily Updates</div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16" id="deals">
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-6 mb-10 gap-3 hide-scrollbar snap-x" id="categories">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-pill font-bold tracking-wide transition-all border ${
                activeCategory === category 
                  ? 'bg-primary text-white border-primary shadow-[0_4px_12px_rgba(255,107,53,0.25)]' 
                  : 'bg-surface text-secondary hover:border-primary/50 text-gray-500 border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mb-12 flex justify-between items-end">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-secondary">
            Today's Best Deals
          </h2>
          <span className="text-gray-500 font-medium bg-gray-200/50 px-4 py-1.5 rounded-full text-sm">
            {filteredProducts.length} items
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-card border border-border/50 border-dashed">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-2">No deals found</h3>
            <p className="text-gray-500 max-w-md mx-auto">We couldn't find any products matching your search criteria. Try a different term or clear filters.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
              className="mt-8 btn-primary px-8 py-3 bg-secondary hover:bg-secondary-soft inline-block"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
