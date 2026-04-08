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
      <div className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col border-l border-border transition-transform overflow-hidden">
        
        {/* Header (Hidden in Checkout mode to keep it clean?) */}
        {!isCheckout && (
          <div className="p-6 flex items-center justify-between border-b border-border">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Shopping Cart
            </h2>
            <button onClick={onClose} aria-label="Close cart"><X className="w-5 h-5" /></button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {isCheckout ? (
            <CheckoutForm onBack={toggleCheckout} />
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground font-light mb-4 text-sm">Your collection is empty.</p>
              <button 
                onClick={onClose}
                className="text-primary text-xs uppercase tracking-widest font-bold border-b border-primary pb-1 transition-all hover:opacity-80"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-secondary overflow-hidden relative">
                    <img 
                      src={item.imageUrl || '/images/placeholder-perfume.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-light tracking-wide">{item.name}</h3>
                      <p className="text-[10px] text-primary uppercase tracking-widest mt-1">
                        {item.brand?.name} • {item.selectedSize}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs hover:bg-secondary transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 text-xs w-8 text-center tabular-nums">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs hover:bg-secondary transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold pt-1 tabular-nums">
                    KSh {(item.itemPrice * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions for Cart View */}
        {!isCheckout && cart.length > 0 && (
          <div className="p-6 border-t border-border space-y-6 bg-card/90 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Order Total</span>
              <span className="text-lg font-bold">KSh {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={toggleCheckout}
              className="w-full bg-primary text-primary-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary/90 flex items-center justify-center gap-3"
            >
              Proceed to Checkout
            </button>
            <p className="text-[10px] text-muted-foreground text-center">
              Exclusive fragrances delivered directly to your doorstep.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
