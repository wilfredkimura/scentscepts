'use client';

import { ShoppingBag, Package } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { user } = useAuth();
  const { data: response, isLoading } = useFetch<any>('/api/v1/products?size=4&sort=createdAt,desc');
  const products = response?.content || [];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col font-serif">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl animate-pulse" />
      </div>

      <div className="glow-shape-1"></div>
      <div className="glow-shape-2"></div>

      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 sm:py-0 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-[5rem] font-light tracking-tight mb-6 sm:mb-8 text-foreground leading-[1.2] sm:leading-[1.1]">
            Experience <br className="hidden sm:block" />
            <span className="italic font-normal">Pure Sophistication</span>
          </h1>

          {/* Description */}
          <p className="text-foreground/60 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light tracking-wide px-4">
            Curated designer fragrances and rare niche collections. <br className="hidden md:block" />
            Find your signature scent from our exclusive selection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none">
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-foreground text-background px-8 sm:px-12 py-4 tracking-[0.2em] uppercase text-xs sm:text-sm transition-all hover:bg-foreground/90 flex items-center justify-center gap-3"
            >
              Explore Collection <ShoppingBag className="w-4 h-4" />
            </Link>
            {!user && (
              <Link
                href="/auth"
                className="w-full sm:w-auto bg-transparent border border-foreground/20 text-foreground px-8 sm:px-12 py-4 tracking-[0.2em] uppercase text-xs sm:text-sm transition-all hover:border-primary hover:text-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Featured Collection — Real Products from API */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 border-t border-border/50 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">Featured</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground leading-tight">Latest Arrivals</h2>
          </div>
          <Link href="/catalog" className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-primary pb-1 transition-all hover:opacity-80 w-fit">
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-sm uppercase tracking-widest font-light">No products yet. Add some from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/catalog/${product.id}`}
                className="group relative bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500"
              >
                {/* Product Image */}
                <div className="aspect-square bg-secondary overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-2">
                  <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-bold">
                    {product.brand?.name || 'Scentcepts'}
                  </p>
                  <h3 className="text-sm font-light tracking-wide text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-xs text-muted-foreground">
                      From <span className="text-foreground font-semibold">KSh {product.decantPrice?.toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
