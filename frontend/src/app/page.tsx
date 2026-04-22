'use client';

import { Sparkles, ShoppingBag, Wind, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col font-serif">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl animate-pulse" />
      </div>

      <div className="glow-shape-1"></div>
      <div className="glow-shape-2"></div>

      <div className="glow-shape-2"></div>

      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Headline */}
          <h1 className="text-6xl sm:text-[5rem] font-light tracking-tight mb-8 text-foreground leading-[1.1]">
            Experience <br />
            <span className="italic font-normal">Pure Sophistication</span>
          </h1>

          {/* Description */}
          <p className="text-foreground/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
            Curated designer fragrances and rare niche collections. <br />
            Find your signature scent from our exclusive 5ml, 10ml, and full-bottle selections.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-foreground text-background px-8 sm:px-12 py-4 tracking-[0.2em] uppercase text-[10px] sm:text-sm transition-all hover:bg-foreground/90 flex items-center justify-center gap-3"
            >
              Explore Collection <ShoppingBag className="w-4 h-4" />
            </Link>
            {!user && (
              <Link
                href="/auth"
                className="w-full sm:w-auto bg-transparent border border-foreground/20 text-foreground px-8 sm:px-12 py-4 tracking-[0.2em] uppercase text-[10px] sm:text-sm transition-all hover:border-primary hover:text-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Featured Collection - 16:9 Grid Layout */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">New Arrivals</span>
            <h2 className="text-4xl font-light tracking-tight text-foreground">Season of Gold</h2>
          </div>
          <Link href="/catalog" className="text-xs uppercase tracking-widest font-bold border-b-2 border-primary pb-1 transition-all hover:opacity-80">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative aspect-[16/9] overflow-hidden bg-secondary">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
            <img src="/images/luxury-perfume-1.jpg" alt="Featured 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-8 left-8 z-20">
              <span className="text-white/60 text-[8px] uppercase tracking-[0.3em] font-medium">Collection No. 01</span>
              <h4 className="text-white text-2xl font-light mt-2">Oud & Amber</h4>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="group relative aspect-[16/9] overflow-hidden bg-secondary">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all z-10" />
              <img src="/images/luxury-perfume-2.jpg" alt="Featured 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 z-20">
                <h4 className="text-white text-xl font-light">Velvet Rose</h4>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
