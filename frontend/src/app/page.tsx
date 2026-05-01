'use client';

import { ShoppingBag, Package } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const { user } = useAuth();
  const { data: response, isLoading } = useFetch<any>('/api/v1/products?size=4&sort=createdAt,desc');
  const products = response?.content || [];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col font-sans">
      <div className="glow-shape-1"></div>
      <div className="glow-shape-2"></div>

      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 lg:py-32 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-label-caps text-primary mb-8 animate-in fade-in slide-in-from-bottom duration-700">Est. 2024 &bull; Nairobi</span>
          <h1 className="text-display-xl mb-12 text-foreground animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            EXPERIENCE <br />
            <span className="italic font-serif">Pure Sophistication</span>
          </h1>

          <p className="text-body-lg text-foreground/60 max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
            Curated designer fragrances and rare niche collections. <br className="hidden md:block" />
            Find your signature scent from our exclusive selection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full animate-in fade-in slide-in-from-bottom duration-1000 delay-600 px-4">
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-primary text-primary-foreground px-16 py-5 text-label-caps transition-all hover:bg-primary/90 flex items-center justify-center gap-4 shadow-xl shadow-primary/10"
            >
              Explore Collection <ShoppingBag className="w-4 h-4" />
            </Link>
            {!user && (
              <Link
                href="/auth"
                className="w-full sm:w-auto bg-transparent border border-primary/30 text-primary px-16 py-5 text-label-caps transition-all hover:border-primary hover:bg-primary/5"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Featured Collection */}
      <section className="relative z-10 container-wide py-24 sm:py-32 border-t border-border/30 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-24">
          <div className="space-y-6">
            <span className="text-label-caps text-primary">The Selection</span>
            <h2 className="text-headline-lg text-foreground">Latest Arrivals</h2>
          </div>
          <Link href="/catalog" className="text-label-caps border-b border-primary pb-2 transition-all hover:opacity-70">
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border border-primary/20 border-t-primary animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-label-caps">Collections coming soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
