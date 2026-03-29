import { Link } from 'react-router-dom';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-luxury-black text-luxury-sand pt-16 pb-8 border-t-[3px] border-luxury-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-display uppercase tracking-widest text-luxury-gold mb-6">Scentcepts</h2>
            <p className="text-luxury-nude/80 text-sm leading-relaxed mb-6">
              Discover your signature scent through our curated collection of luxury perfumes, available in premium decants or full bottles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-luxury-sand hover:text-luxury-gold transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="#" className="text-luxury-sand hover:text-luxury-gold transition-colors"><TwitterIcon className="w-5 h-5" /></a>
              <a href="#" className="text-luxury-sand hover:text-luxury-gold transition-colors"><FacebookIcon className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 text-white">Shop</h3>
            <ul className="space-y-4 text-sm text-luxury-nude/80">
              <li><Link to="/shop" className="hover:text-luxury-gold transition-colors">All Perfumes</Link></li>
              <li><Link to="/shop?category=niche" className="hover:text-luxury-gold transition-colors">Niche Collection</Link></li>
              <li><Link to="/shop?category=designer" className="hover:text-luxury-gold transition-colors">Designer Collection</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 text-white">Support</h3>
            <ul className="space-y-4 text-sm text-luxury-nude/80">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-6 text-white">Newsletter</h3>
            <p className="text-luxury-nude/80 text-sm leading-relaxed mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex border border-luxury-gold/50 rounded overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-luxury-dark px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-shadow"
              />
              <button 
                type="button"
                className="bg-luxury-gold text-luxury-black px-4 py-2 text-sm font-medium hover:bg-luxury-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-luxury-dark pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-luxury-nude/50">
          <p>&copy; {new Date().getFullYear()} Scentcepts. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-luxury-sand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-luxury-sand transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
