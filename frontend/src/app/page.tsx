'use client';

import { Sparkles, ShoppingBag, Wind, ArrowRight, Box, Database, Shield, Cloud } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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

      {/* Navbar Container */}
      <nav className="relative z-10 max-w-7xl w-full mx-auto px-6 h-20 sm:h-28 flex items-center justify-between">
        <div className="flex flex-col items-start gap-0">
          <span className="text-foreground font-light text-xl sm:text-3xl tracking-[0.3em] uppercase transition-all">Scentcepts</span>
          <span className="text-primary text-[8px] sm:text-[10px] tracking-[0.5em] uppercase mt-0 sm:mt-1">House of Luxury</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/catalog" className="text-foreground/80 hover:text-primary text-[10px] sm:text-sm tracking-widest uppercase transition-colors hidden sm:block">
            Collections
          </Link>
          {!isLoading && user ? (
            <Link
              href={hasRole('ROLE_ADMIN') || hasRole('ADMIN') ? "/admin" : "/dashboard"}
              className="text-primary hover:text-primary/80 font-bold transition-colors flex items-center gap-1 text-[10px] sm:text-sm uppercase tracking-widest"
            >
              Account <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/auth" className="text-foreground/60 hover:text-foreground text-[10px] sm:text-sm tracking-widest uppercase transition-colors">
                Login
              </Link>
              <Link
                href="/auth?registered=false"
                className="bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-4 sm:px-8 py-2.5 sm:py-3 transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </nav>

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

      {/* Featured Collection - 16:9 Grid Layout */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 border-t border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <span className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">New Arrivals</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground leading-tight">Season of Gold</h2>
          </div>
          <Link href="/catalog" className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-primary pb-1 transition-all hover:opacity-80 w-fit">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="group relative aspect-square sm:aspect-[16/9] overflow-hidden bg-secondary">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
            <img src="/images/luxury-perfume-1.jpg" alt="Featured 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20">
              <span className="text-white/60 text-[8px] uppercase tracking-[0.3em] font-medium">Collection No. 01</span>
              <h4 className="text-white text-xl sm:text-2xl font-light mt-2 uppercase tracking-widest">Oud & Amber</h4>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <div className="group relative aspect-square sm:aspect-[16/9] overflow-hidden bg-secondary">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all z-10" />
              <img src="/images/luxury-perfume-2.jpg" alt="Featured 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 z-20">
                <h4 className="text-white text-lg sm:text-xl font-light uppercase tracking-widest">Velvet Rose</h4>
              </div>
            </div>
            <div className="group relative aspect-[16/9] sm:aspect-auto sm:h-full bg-secondary border border-border/50 flex flex-col items-center justify-center text-center p-6 sm:p-8">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-4" />
              <h4 className="text-lg sm:text-xl font-light mb-2 uppercase tracking-widest">Bespoke Curation</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-light max-w-[200px]">Find the perfect balance of notes for your personality.</p>
              <Link href="/society" className="mt-4 sm:mt-6 text-[10px] uppercase font-bold tracking-widest text-primary hover:text-primary/70">Explore Society</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Tech Stack Badge */}
      <footer className="relative z-10 pb-8 px-4 flex justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-card border border-border/50 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 shadow-xl backdrop-blur-md w-full sm:w-auto">
          <div className="flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-border pb-3 sm:pb-0 sm:pr-6 w-full sm:w-auto justify-center">
            <Box className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] sm:text-sm font-semibold text-foreground uppercase tracking-widest">Luxury Tech Stack</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-background text-[8px] font-bold">N</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Next.js</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Spring</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Auth</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
