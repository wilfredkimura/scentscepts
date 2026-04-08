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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className={`fixed inset-0 z-40 bg-background p-8 md:relative md:bg-transparent md:p-0 md:w-64 transform transition-transform duration-300 ${showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex items-center justify-between md:hidden mb-8">
              <span className="text-sm font-semibold uppercase tracking-widest">Filters</span>
              <button onClick={() => setShowFilters(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-12">
              {/* Brand Filter */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">Brands</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setSelectedBrand(null)}
                    className={`text-sm text-left transition-colors ${!selectedBrand ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    All Collections
                  </button>
                  {brands.map(brand => (
                    <button 
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`text-sm text-left transition-colors ${selectedBrand === brand.id ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar (Inside Sidebar) */}
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Notes, names..." 
                  className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors pr-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-3xl font-light tracking-tight text-foreground">Our Collection</h1>
              <button 
                onClick={() => setShowFilters(true)}
                className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              <div className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Showing {products.length} Items
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-pulse">
                {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[3/4] bg-secondary" />)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-muted-foreground mb-4">No fragrances found matching your selection.</p>
                <button onClick={() => { setSelectedBrand(null); setSearch(''); }} className="text-primary text-xs uppercase tracking-widest font-bold">Clear Filters</button>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
