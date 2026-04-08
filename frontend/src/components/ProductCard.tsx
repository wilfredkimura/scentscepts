'use client';

import Link from 'next/link';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: { name: string };
    decantPrice: number;
    fullBottlePrice: number;
    imageUrl?: string;
    availability: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // Default to 'decant' for the quick action button
    addToCart(product as any, 'decant');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col gap-3">
      {/* Image Container - Updated to professional 16:9 layout */}
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary border border-border/50">
        <img
          src={product.imageUrl || '/images/placeholder-perfume.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex gap-2">
          <button 
            onClick={handleAddToCart}
            disabled={added}
            className="flex-1 bg-background text-foreground text-[10px] tracking-[0.2em] uppercase py-3 hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
          >
            {added ? (
              <><Check className="w-3 h-3" /> Added</>
            ) : (
              <><ShoppingBag className="w-3 h-3" /> Add to Cart</>
            )}
          </button>
          <button className="bg-background text-foreground p-3 hover:bg-primary hover:text-primary-foreground transition-all">
            <Eye className="w-3 h-3" />
          </button>
        </div>

        {/* Status Badge */}
        {product.availability === 'OUT_OF_STOCK' && (
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-[8px] tracking-[0.2em] uppercase px-3 py-1">
            Sold Out
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 items-start">
        <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-medium">
          {product.brand?.name || 'Unknown Brand'}
        </span>
        <h3 className="text-sm tracking-wide text-foreground font-light">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold">
            KSh {product.decantPrice.toLocaleString()}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            — Decants
          </span>
        </div>
      </div>
    </div>
  );
}
