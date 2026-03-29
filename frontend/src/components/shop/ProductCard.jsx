import { Link } from 'react-router-dom';

export function ProductCard({ product }) {
  // Use product.imageUrl if available, otherwise use a luxury placeholder from Unsplash
  const image = product.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800';

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-luxury-sand rounded-sm mb-4">
        <img
          src={image}
          alt={product.name}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        {product.availability === 'SOLD_OUT' && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-luxury-black text-white px-4 py-1 text-xs font-bold tracking-widest uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-display text-luxury-black group-hover:text-luxury-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-luxury-dark/60 mt-1 mb-2 tracking-wide uppercase text-xs">
          {product.brand_name || 'Scentcepts Exclusive'}
        </p>
        <p className="text-luxury-black font-medium">
          From ${product.decant_price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
