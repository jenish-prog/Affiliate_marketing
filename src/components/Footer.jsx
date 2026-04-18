import { Link } from 'react-router-dom';

const Twitter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Instagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 mb-8 md:grid-cols-3 gap-12 border-b border-border/10 pb-12">
        <div className="space-y-4">
          <Link to="/" className="font-heading text-3xl font-bold tracking-tight">
            Deal<span className="text-primary">Hub</span>
          </Link>
          <p className="text-gray-400 max-w-xs">
            Find the best deals, save more every day. Handpicked products from Amazon, Flipkart, and Meesho.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#" className="p-2 bg-secondary-soft rounded-full hover:bg-primary transition-colors text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-secondary-soft rounded-full hover:bg-primary transition-colors text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-secondary-soft rounded-full hover:bg-primary transition-colors text-white">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><a href="#deals" className="hover:text-primary transition-colors">Top Deals</a></li>
            <li><a href="#categories" className="hover:text-primary transition-colors">Categories</a></li>
            <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold">Disclaimer</h3>
          <div className="p-4 bg-secondary-soft rounded-card text-gray-400 text-sm">
            This site contains affiliate links. We may earn a small commission when you purchase through links on our site, at no extra cost to you.
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DealHub. All rights reserved.
      </div>
    </footer>
  );
}
