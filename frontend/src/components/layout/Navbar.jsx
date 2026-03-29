import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openCart = useCartStore(state => state.openCart);
  const itemCount = useCartStore(state => state.getItemCount());

  return (
    <nav className="sticky top-0 z-40 bg-luxury-cream/90 backdrop-blur-md border-b border-luxury-sand text-luxury-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-display uppercase tracking-widest font-semibold text-luxury-gold-dark">
              Scentcepts
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-luxury-gold transition-colors font-medium">Home</Link>
            <Link to="/shop" className="hover:text-luxury-gold transition-colors font-medium">Collection</Link>
            <Link to="/admin" className="text-sm text-luxury-dark/50 hover:text-luxury-dark transition-colors border border-luxury-sand px-3 py-1 rounded">Admin</Link>
            
            <button 
              onClick={openCart} 
              className="relative p-2 text-luxury-black hover:text-luxury-gold transition-colors"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-luxury-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={openCart} className="relative p-2">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-luxury-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-luxury-cream border-t border-luxury-sand">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium hover:bg-luxury-sand rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="block px-3 py-2 text-base font-medium hover:bg-luxury-sand rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collection
            </Link>
            <Link 
              to="/admin" 
              className="block px-3 py-2 text-base font-medium text-luxury-dark/70 hover:bg-luxury-sand rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
