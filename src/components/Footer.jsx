import { Link } from 'react-router-dom';

const Github = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const Instagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Whatsapp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 items-start border-b border-border/10 pb-10">
        <div className="space-y-4">
          <Link to="/" className="font-heading text-3xl font-bold tracking-tight">
            Deal<span className="text-primary">Hub</span>
          </Link>
          <p className="text-gray-400 max-w-xs">
            Find the best deals, save more every day. Handpicked products from Amazon, Flipkart, and Meesho.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="https://github.com/jenish-prog" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary-soft rounded-full hover:bg-primary transition-colors text-white">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 bg-secondary-soft rounded-full hover:bg-primary transition-colors text-white">
              <Instagram size={20} />
            </a>
            <a href="https://api.whatsapp.com/send?phone=917845742951" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary-soft rounded-full hover:bg-primary transition-colors text-white">
              <Whatsapp size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><a href="#deals" className="hover:text-primary transition-colors">Top Deals</a></li>
            <li><a href="#categories" className="hover:text-primary transition-colors">Categories</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>+91 7845742951</li>
            <li><a href="mailto:jenish112005@gmail.com" className="hover:text-primary transition-colors">jenish112005@gmail.com</a></li>
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
