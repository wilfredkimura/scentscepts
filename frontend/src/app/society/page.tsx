'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Wind, Shield, Sparkles, ArrowRight, History, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function SocietyProfile() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('/images/society-hero-placeholder.jpg')] bg-cover bg-center opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-primary text-[10px] tracking-[0.5em] uppercase mb-6 block animate-in fade-in slide-in-from-bottom duration-700">Established 2024</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            The Scentcepts <br />
            <span className="italic font-normal">Society</span>
          </h1>
          <p className="text-foreground/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
            An exclusive community dedicated to the art of olfaction. <br />
            Where luxury meets discovery in every drop.
          </p>
        </div>
      </section>

      {/* Philosophy - 16:9 Image Side by Side */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[16/9] bg-secondary overflow-hidden group">
            <div className="w-full h-full bg-[url('/images/philosophy-placeholder.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="space-y-8">
            <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold">Our Philosophy</span>
            <h2 className="text-4xl font-light tracking-tight text-foreground">Curating the Inaccessible</h2>
            <p className="text-foreground/60 font-light leading-relaxed text-lg">
              Scentcepts Society was born from a simple desire: to make the world's most elusive fragrances accessible to the discerning individual. We believe that a signature scent is more than a smell—it is a silent introduction, a lingering memory, and a personal statement of elegance.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <Shield className="w-5 h-5 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-widest">Authenticity</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Guaranteed original formulations sourced directly from authorized niche houses.</p>
              </div>
              <div className="space-y-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-widest">Curation</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Every bottle in our collection is hand-selected for its unique narrative and performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gallery - Modern 16:9 Grid */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-tight text-foreground mb-4">Inside the Atelier</h2>
            <div className="w-24 h-px bg-primary mx-auto opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[16/9] bg-background border border-border/50 flex flex-col items-center justify-center p-12 text-center group">
              <History className="w-8 h-8 text-primary/40 mb-6 group-hover:text-primary transition-colors" />
              <h3 className="text-xl font-light mb-4">Heritage Collections</h3>
              <p className="text-sm text-muted-foreground font-light max-w-xs">Exploring the foundations of modern perfumery through timeless classics.</p>
            </div>
            <div className="aspect-[16/9] bg-[url('/images/gallery-2-placeholder.jpg')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="aspect-[16/9] bg-[url('/images/gallery-3-placeholder.jpg')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 md:order-last lg:order-none" />
            <div className="aspect-[16/9] bg-background border border-border/50 flex flex-col items-center justify-center p-12 text-center group">
              <Users className="w-8 h-8 text-primary/40 mb-6 group-hover:text-primary transition-colors" />
              <h3 className="text-xl font-light mb-4">Private Consultations</h3>
              <p className="text-sm text-muted-foreground font-light max-w-xs">Bespoke scent mapping for our elite members to find their olfactory identity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Society CTA */}
      <section className="max-w-3xl mx-auto px-6 py-32 text-center">
        <Globe className="w-12 h-12 text-primary/20 mx-auto mb-8" />
        <h2 className="text-4xl font-light tracking-tight mb-8">Ready to evolve your scent profile?</h2>
        <p className="text-foreground/60 text-lg font-light mb-12">
          Members receive early access to rare drops, exclusive sizing, and priority delivery services across the region.
        </p>
        <Link 
          href="/auth?registered=false" 
          className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold transition-all hover:bg-primary/90 hover:gap-6 shadow-xl"
        >
          Membership Application <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-border/50 py-12 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
          &copy; 2024 Scentcepts Society. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
