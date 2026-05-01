'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useState, useEffect } from 'react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        <div className="container-wide h-20 flex items-center justify-between">
          
          {/* Left: Desktop Links */}
          <div className="hidden lg:flex items-center gap-12">
            <Link href="/catalog" className="text-label-caps hover:text-primary transition-all relative group py-2">
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-secondary transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
          
          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-2xl font-serif font-light tracking-[0.4em] uppercase">Scentcepts</span>
            <span className="text-[8px] tracking-[0.5em] uppercase text-primary -mt-1 hidden sm:block">House of Luxury</span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-8">
            <button className="hidden md:block hover:text-primary transition-colors text-foreground/60 p-2">
              <Search className="w-4 h-4" />
            </button>
            
            <Link href={user ? (user.roles?.includes('ROLE_ADMIN') || user.roles?.includes('ADMIN') ? "/admin" : "/dashboard") : "/auth"} className="hover:text-primary transition-colors text-foreground/60 p-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-primary transition-colors p-2"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[8px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-card border-r border-border shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-16">
              <div className="flex flex-col">
                <span className="text-lg font-light tracking-[0.2em] uppercase">Scentcepts</span>
                <span className="text-[8px] tracking-[0.4em] uppercase text-primary">Mobile Boutique</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Collections', href: '/catalog' },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-light tracking-widest uppercase hover:text-primary transition-colors flex items-center justify-between group"
                >
                  {item.name}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-border flex flex-col gap-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {user.firstName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest">{user.firstName} {user.lastName}</span>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user.email}</span>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center py-4 bg-secondary text-[10px] font-bold uppercase tracking-widest border border-border"
                  >
                    Manage Account
                  </Link>
                </div>
              ) : (
                <Link 
                  href="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20"
                >
                  Join the Society
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
