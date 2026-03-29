import { useState } from 'react';
import { ProductCard } from '../../components/shop/ProductCard';

export function Shop() {
  const [filter, setFilter] = useState('ALL');

  // Placeholder mock data until backend is integrated
  const products = [
    {
      id: '1', name: 'Midnight Oud', brand_name: 'Scentcepts Exclusive', 
      decant_price: 15.00, full_bottle_price: 150.00,
      availability: 'AVAILABLE'
    },
    {
      id: '2', name: 'Velvet Rose', brand_name: 'Maison', 
      decant_price: 12.50, full_bottle_price: 120.00,
      availability: 'AVAILABLE'
    },
    {
      id: '3', name: 'Sandalwood Whisper', brand_name: 'Luxe Fragrance', 
      decant_price: 18.00, full_bottle_price: 180.00,
      availability: 'AVAILABLE'
    },
    {
      id: '4', name: 'Oceanic Citrus', brand_name: 'Aqua', 
      decant_price: 10.00, full_bottle_price: 95.00,
      availability: 'SOLD_OUT'
    },
    {
      id: '5', name: 'Amber Glow', brand_name: 'Scentcepts Exclusive', 
      decant_price: 20.00, full_bottle_price: 200.00,
      availability: 'AVAILABLE'
    },
    {
      id: '6', name: 'Vanilla Dream', brand_name: 'Luxe Fragrance', 
      decant_price: 14.00, full_bottle_price: 140.00,
      availability: 'AVAILABLE'
    }
  ];

  const filteredProducts = filter === 'ALL' 
    ? products 
    : products.filter(p => p.brand_name.includes(filter));

  return (
    <div className="bg-luxury-cream min-h-screen pb-24">
      {/* Header */}
      <div className="bg-luxury-black text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display mb-4">Our Collection</h1>
        <p className="text-luxury-sand/80 max-w-2xl mx-auto font-light">
          Browse our complete curation of designer and niche fragrances.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-luxury-gold/30">
          <div className="flex space-x-6 overflow-x-auto w-full md:w-auto pb-4 md:pb-0">
            {['ALL', 'Scentcepts Exclusive', 'Maison', 'Luxe Fragrance'].map((b) => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className={`uppercase tracking-wider text-xs whitespace-nowrap transition-colors pb-1 ${
                  filter === b 
                    ? 'text-luxury-gold border-b border-luxury-gold' 
                    : 'text-luxury-dark hover:text-luxury-black'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="text-sm text-luxury-dark pt-4 md:pt-0">
            Showing {filteredProducts.length} Results
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
