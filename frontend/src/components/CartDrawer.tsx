'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const toggleCheckout = () => setIsCheckout(!isCheckout);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col border-l border-border/50 transition-transform overflow-hidden">
        
        {/* Header */}
        {!isCheckout && (
          <div className="p-8 flex items-center justify-between border-b border-border/30">
            <h2 className="text-label-caps flex items-center gap-4">
              <ShoppingBag className="w-5 h-5 text-primary" /> Shopping Bag
            </h2>
            <button onClick={onClose} aria-label="Close cart" className="p-2 hover:bg-primary/5 transition-all"><X className="w-6 h-6" /></button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {isCheckout ? (
            <CheckoutForm onBack={toggleCheckout} />
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-body-lg text-foreground/40 mb-8">Your collection is empty.</p>
              <button 
                onClick={onClose}
                className="text-label-caps text-primary border-b border-primary pb-2 transition-all hover:opacity-70"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group">
                  <div className="w-24 h-28 bg-background border border-border/30 overflow-hidden relative">
                    <img 
                      src={item.imageUrl || '/images/placeholder-perfume.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <h3 className="text-body-md font-serif font-light">{item.name}</h3>
                      <p className="text-label-caps text-primary text-[10px]">
                        {item.brand?.name} &bull; {item.selectedSize}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-border/30">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-xs hover:bg-primary/5 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 text-xs w-10 text-center tabular-nums">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-xs hover:bg-primary/5 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-foreground/40 hover:text-primary transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-label-caps pt-2 tabular-nums text-primary">
                    KSh {(item.itemPrice * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions for Cart View */}
        {!isCheckout && cart.length > 0 && (
          <div className="p-8 border-t border-border/30 space-y-8 bg-card">
            <div className="flex items-center justify-between">
              <span className="text-label-caps text-foreground/40">Total</span>
              <span className="text-headline-md text-primary">KSh {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={toggleCheckout}
              className="w-full bg-primary text-primary-foreground py-5 text-label-caps transition-all hover:bg-primary/90 flex items-center justify-center gap-4 shadow-xl shadow-primary/10"
            >
              Secure Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
