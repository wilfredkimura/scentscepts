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
      <div className="relative w-full max-w-5xl bg-card border border-border/30 shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 transform scale-100 opacity-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-2 hover:bg-primary/5 transition-all"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 relative bg-background border-r border-border/30">
          <img 
            src={product.imageUrl || '/images/placeholder-perfume.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover min-h-[400px] md:min-h-[700px] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
          />
          {product.availability === 'OUT_OF_STOCK' && (
            <div className="absolute top-10 left-10 bg-background/90 text-label-caps px-6 py-3 border border-border/50">
              Sold Out
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
          <div className="mb-12">
            <span className="text-label-caps text-primary font-bold mb-6 block">
              {product.brand.name}
            </span>
            <h2 className="text-headline-lg font-serif font-light mb-6">
              {product.name}
            </h2>
            <p className="text-body-lg text-foreground/60 leading-relaxed mb-10 max-w-md">
              {product.description || "A masterfully crafted fragrance that speaks to the essence of luxury and sophistication. Each note is carefully selected to create an unforgettable olfactory journey."}
            </p>

            {/* Price Display */}
            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-headline-md text-primary">
                KSh {(selectedSize === 'decant' ? product.decantPrice : product.fullBottlePrice).toLocaleString()}
              </span>
              <span className="text-label-caps text-foreground/40 border-l border-border/30 pl-6">
                {selectedSize === 'decant' ? '10ml Premium Decant' : 'Original Full Bottle'}
              </span>
            </div>
          </div>

          {/* Olfactory Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-y border-border/30 py-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Wind className="w-4 h-4" />
                <span className="text-label-caps font-bold">Top</span>
              </div>
              <span className="text-body-md text-foreground/60">{product.topNotes || 'Bergamot, Mandarin'}</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Droplets className="w-4 h-4" />
                <span className="text-label-caps font-bold">Heart</span>
              </div>
              <span className="text-body-md text-foreground/60">{product.middleNotes || 'Rose, Jasmine'}</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="text-label-caps font-bold">Base</span>
              </div>
              <span className="text-body-md text-foreground/60">{product.baseNotes || 'Amber, Musk, Sandalwood'}</span>
            </div>
          </div>

          {/* Selection & Action */}
          <div className="space-y-10 mt-auto">
            <div className="space-y-6">
              <span className="text-label-caps text-foreground/40 block">Select Sizing</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedSize('decant')}
                  className={`flex-1 py-5 text-label-caps transition-all border ${selectedSize === 'decant' ? 'border-primary bg-primary/5 text-primary' : 'border-border/30 text-foreground/40 hover:border-primary'}`}
                >
                  Decant (10ml)
                </button>
                <button 
                  onClick={() => setSelectedSize('full')}
                  className={`flex-1 py-5 text-label-caps transition-all border ${selectedSize === 'full' ? 'border-primary bg-primary/5 text-primary' : 'border-border/30 text-foreground/40 hover:border-primary'}`}
                >
                  Full Bottle
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={added || product.availability === 'OUT_OF_STOCK'}
              className="w-full bg-primary text-primary-foreground py-6 text-label-caps transition-all hover:bg-primary/90 flex items-center justify-center gap-4 shadow-xl shadow-primary/10 disabled:opacity-50 group"
            >
              {added ? (
                <><Check className="w-5 h-5 animate-in zoom-in" /> Added to Collection</>
              ) : (
                <><ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" /> {product.availability === 'OUT_OF_STOCK' ? 'Temporarily Unavailable' : 'Add to Collection'}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
