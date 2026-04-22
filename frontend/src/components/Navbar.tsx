'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { user } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Mobile Menu & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/catalog" className="text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors">
              Collections
            </Link>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-2xl font-light tracking-[0.3em] uppercase">Scentcepts</span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-primary -mt-1 hidden sm:block">House of Luxury</span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:block hover:text-primary transition-colors text-foreground/60">
              <Search className="w-4 h-4" />
            </button>
            
            {user?.roles?.includes('ROLE_ADMIN') && (
              <Link href="/admin" className="text-[10px] tracking-[0.2em] font-bold uppercase text-primary border border-primary/30 px-3 py-1 hover:bg-primary/10 transition-all hidden md:block">
                Admin
              </Link>
            )}

            <Link href={user ? (user.roles?.includes('ROLE_ADMIN') || user.roles?.includes('ADMIN') ? "/admin" : "/dashboard") : "/auth"} className="hover:text-primary transition-colors text-foreground/60">
              <User className="w-4 h-4" />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative h-full w-full flex flex-col p-8">
            <div className="flex items-center justify-between mb-20">
              <span className="text-xl font-light tracking-[0.3em] uppercase">Scentcepts</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-10">
              <Link 
                href="/catalog" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-light tracking-[0.2em] uppercase hover:text-primary transition-colors"
              >
                Collections
              </Link>
              
              <div className="h-px bg-border w-12 my-4" />

              <Link 
                href={user ? (user.roles?.includes('ROLE_ADMIN') || user.roles?.includes('ADMIN') ? "/admin" : "/dashboard") : "/auth"}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-bold tracking-[0.3em] uppercase text-primary"
              >
                {user ? 'My Account' : 'Sign In / Join'}
              </Link>
            </nav>

            <div className="mt-auto pt-10">
              <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-light leading-relaxed">
                Authorized Retailer of <br /> Luxury Niche Fragrances
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
