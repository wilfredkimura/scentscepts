'use client';

import Link from 'next/link';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import QuickView from './QuickView';
import { ProductDto } from '@/lib/types';

interface ProductCardProps {
  product: ProductDto;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'decant');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div 
        className="group flex flex-col gap-3 cursor-pointer"
        onClick={() => setIsQuickViewOpen(true)}
      >
        {/* Image Container - Professional 16:9 layout */}
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
              disabled={added || product.availability === 'OUT_OF_STOCK'}
              className="flex-1 bg-background text-foreground text-[10px] tracking-[0.2em] uppercase py-3 hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {added ? (
                <><Check className="w-3 h-3" /> Added</>
              ) : (
                <><ShoppingBag className="w-3 h-3" /> {product.availability === 'OUT_OF_STOCK' ? 'Sold Out' : 'Add to Cart'}</>
              )}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsQuickViewOpen(true); }}
              className="bg-background text-foreground p-3 hover:bg-primary hover:text-primary-foreground transition-all"
            >
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
          <h3 className="text-sm tracking-wide text-foreground font-light group-hover:text-primary transition-colors">
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

      <QuickView 
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
