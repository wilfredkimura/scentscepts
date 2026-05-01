'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { productsApi, brandsApi } from '@/lib/api';
import { ProductDto, BrandDto } from '@/lib/types';
import { useCart } from '@/hooks/useCart';
import { Search, Filter, X } from 'lucide-react';

export default function Catalog() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedBrand]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pRes, bRes] = await Promise.all([
        productsApi.all({ brandId: selectedBrand || undefined, name: search || undefined }),
        brandsApi.all()
      ]);
      setProducts(pRes.data.content);
      setBrands(bRes.data.content);
    } catch (error) {
      console.error('Error fetching catalog data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters */}
          <div className={`fixed inset-0 z-50 md:relative md:z-0 ${showFilters ? 'visible' : 'invisible md:visible'}`}>
            {/* Backdrop (Mobile Only) */}
            <div 
              className={`absolute inset-0 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ${showFilters ? 'opacity-100' : 'opacity-0'}`} 
              onClick={() => setShowFilters(false)}
            />
            
            <aside className={`
              absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-card md:bg-transparent p-8 
              md:relative md:p-0 md:w-64 md:translate-x-0 transition-transform duration-500 transform
              ${showFilters ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div className="flex items-center justify-between md:hidden mb-12">
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-widest">Filters</span>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-primary">Refine Collection</span>
                </div>
                <button onClick={() => setShowFilters(false)} className="p-2 -mr-2"><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-12">
                {/* Brand Filter */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">Brands</h4>
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => setSelectedBrand(null)}
                      className={`text-xs text-left transition-colors uppercase tracking-widest ${!selectedBrand ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      All Collections
                    </button>
                    {brands.map(brand => (
                      <button 
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`text-xs text-left transition-colors uppercase tracking-widest ${selectedBrand === brand.id ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Bar (Inside Sidebar) */}
                <form onSubmit={handleSearch} className="relative pt-8 border-t border-border/50">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Search Notes</span>
                  <input 
                    type="text" 
                    placeholder="Rose, Amber, Fresh..." 
                    className="w-full bg-transparent border-b border-border py-3 text-xs focus:outline-none focus:border-primary transition-colors pr-8 uppercase tracking-widest"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="absolute right-0 bottom-3 text-muted-foreground hover:text-primary">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </aside>
          </div>

          {/* Product Grid */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <span className="text-label-caps text-primary">Curated Selection</span>
                <h1 className="text-headline-lg text-foreground leading-none">The Archive</h1>
              </div>
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="md:hidden flex items-center justify-center w-12 h-12 border border-border/30 text-foreground bg-card"
                >
                  <Filter className="w-5 h-5" />
                </button>
                <div className="hidden sm:block text-label-caps text-foreground/40 px-6 py-3 border border-border/30">
                  {products.length} Fragrances Found
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 animate-pulse">
                {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-card border border-border/30" />)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-border/30">
                <p className="text-label-caps text-foreground/40 mb-8">No fragrances match your selection.</p>
                <button onClick={() => { setSelectedBrand(null); setSearch(''); }} className="text-label-caps text-primary border-b border-primary pb-2">Reset Filters</button>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
