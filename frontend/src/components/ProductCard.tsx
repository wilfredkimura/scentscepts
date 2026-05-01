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
      <div className="group flex flex-col bg-card border border-border/30 hover-card-luxury relative">
        <Link href={`/catalog/${product.id}`} className="flex flex-col">
          {/* Image Container - Fashion 4:5 layout */}
          <div className="relative aspect-[4/5] overflow-hidden bg-background">
            <img
              src={product.imageUrl || '/images/placeholder-perfume.jpg'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Status Badge */}
            {product.availability === 'OUT_OF_STOCK' && (
              <div className="absolute top-6 right-6 bg-background/90 text-label-caps px-4 py-2 border border-border/50 z-10">
                Sold Out
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-8 space-y-4">
            <span className="text-label-caps text-primary font-bold">
              {product.brand?.name || 'Unknown Brand'}
            </span>
            <h3 className="text-lg font-serif font-light tracking-wide text-foreground">
              {product.name}
            </h3>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-label-caps text-foreground/40">
                From <span className="text-primary font-bold">KSh {product.decantPrice.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Hover Actions - Absolute to stay on top of Link */}
        <div className="absolute inset-x-0 bottom-[140px] opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 z-20 px-8">
          <button 
            onClick={handleAddToCart}
            disabled={added || product.availability === 'OUT_OF_STOCK'}
            className="w-full bg-primary text-primary-foreground text-label-caps py-4 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl"
          >
            {added ? (
              <><Check className="w-4 h-4" /> Added</>
            ) : (
              <><ShoppingBag className="w-4 h-4" /> {product.availability === 'OUT_OF_STOCK' ? 'Sold Out' : 'Add to Cart'}</>
            )}
          </button>
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
