'use client';

import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Wind, Sparkles, Droplets, Check } from 'lucide-react';
import { ProductDto } from '@/lib/types';
import { useCart } from '@/hooks/useCart';

interface QuickViewProps {
  product: ProductDto | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<'decant' | 'full'>('decant');
  const [added, setAdded] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 transform scale-100 opacity-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 relative bg-secondary">
          <img 
            src={product.imageUrl || '/images/placeholder-perfume.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover min-h-[400px] md:min-h-[600px]"
          />
          {product.availability === 'OUT_OF_STOCK' && (
            <div className="absolute top-8 left-8 bg-background/90 text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-border">
              Sold Out
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
          <div className="mb-10">
            <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-bold mb-4 block">
              {product.brand.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              {product.name}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 max-w-md">
              {product.description || "A masterfully crafted fragrance that speaks to the essence of luxury and sophistication. Each note is carefully selected to create an unforgettable olfactory journey."}
            </p>

            {/* Price Display */}
            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-2xl font-medium">
                KSh {(selectedSize === 'decant' ? product.decantPrice : product.fullBottlePrice).toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest border-l border-border pl-4">
                {selectedSize === 'decant' ? '10ml Premium Decant' : 'Original Full Bottle'}
              </span>
            </div>
          </div>

          {/* Olfactory Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-y border-border/50 py-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Wind className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Top Notes</span>
              </div>
              <span className="text-xs text-foreground font-light">{product.topNotes || 'Bergamot, Mandarin'}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Droplets className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Heart Notes</span>
              </div>
              <span className="text-xs text-foreground font-light">{product.middleNotes || 'Rose, Jasmine'}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Base Notes</span>
              </div>
              <span className="text-xs text-foreground font-light">{product.baseNotes || 'Amber, Musk, Sandalwood'}</span>
            </div>
          </div>

          {/* Selection & Action */}
          <div className="space-y-8 mt-auto">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Select Size</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedSize('decant')}
                  className={`flex-1 py-4 text-[10px] tracking-[0.2em] uppercase transition-all border ${selectedSize === 'decant' ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:border-muted-foreground'}`}
                >
                  Decant (10ml)
                </button>
                <button 
                  onClick={() => setSelectedSize('full')}
                  className={`flex-1 py-4 text-[10px] tracking-[0.2em] uppercase transition-all border ${selectedSize === 'full' ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:border-muted-foreground'}`}
                >
                  Full Bottle
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={added || product.availability === 'OUT_OF_STOCK'}
              className="w-full bg-primary text-primary-foreground text-[10px] tracking-[0.3em] uppercase py-5 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {added ? (
                <><Check className="w-4 h-4 animate-in zoom-in" /> Added to Collection</>
              ) : (
                <><ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" /> {product.availability === 'OUT_OF_STOCK' ? 'Temporarily Unavailable' : 'Add to Collection'}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
