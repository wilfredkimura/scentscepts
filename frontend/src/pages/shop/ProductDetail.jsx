import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('DECANT_10ML');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const openCart = useCartStore(state => state.openCart);

  // Mock fetching product details
  useEffect(() => {
    // Simulating API fetch
    const mockDb = {
      '1': {
        id: '1', name: 'Midnight Oud', brand_name: 'Scentcepts Exclusive', 
        description: 'An exquisitely opulent fragrance that opens with striking dark rose, settles into rich vanilla, and finishes with a profound smoky agarwood (oud). Perfect for evening wear and making a lasting impression.',
        top_notes: 'Dark Rose, Pink Pepper',
        middle_notes: 'Rich Vanilla, Amber',
        base_notes: 'Smoky Agarwood (Oud), Patchouli',
        decant_price: 15.00, full_bottle_price: 150.00,
        availability: 'AVAILABLE',
        image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
      }
    };
    
    // Just fetch the first if not found for demo purposes
    setProduct(mockDb[id] || mockDb['1']);
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const price = selectedSize === 'DECANT_10ML' ? product.decant_price : product.full_bottle_price;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity, price);
    openCart();
  };

  return (
    <div className="bg-luxury-cream min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/5] bg-luxury-sand rounded-sm overflow-hidden sticky top-28 shadow-lg">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10">
            <p className="text-luxury-dark uppercase tracking-[0.2em] text-xs font-semibold mb-3">
              {product.brand_name}
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-luxury-black mb-4">
              {product.name}
            </h1>
            
            <p className="text-2xl font-light text-luxury-black mb-8 border-b border-luxury-sand pb-8">
              ${price.toFixed(2)}
            </p>
            
            <div className="prose prose-sm text-luxury-dark/80 mb-10 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Olfactory Notes */}
            <div className="mb-10 bg-white p-6 rounded border border-luxury-sand">
              <h3 className="uppercase tracking-widest text-xs font-semibold text-luxury-black mb-4">Olfactory Pyramide</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex"><span className="w-24 font-medium text-luxury-black">Top Notes:</span> <span className="text-luxury-dark/80">{product.top_notes}</span></li>
                <li className="flex"><span className="w-24 font-medium text-luxury-black">Heart Notes:</span> <span className="text-luxury-dark/80">{product.middle_notes}</span></li>
                <li className="flex"><span className="w-24 font-medium text-luxury-black">Base Notes:</span> <span className="text-luxury-dark/80">{product.base_notes}</span></li>
              </ul>
            </div>

            {/* Selection */}
            <div className="mb-10">
              <h3 className="uppercase tracking-widest text-xs font-semibold text-luxury-black mb-4">Select Size</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedSize('DECANT_10ML')}
                  className={`py-4 border text-center transition-colors ${
                    selectedSize === 'DECANT_10ML' 
                      ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-black font-medium' 
                      : 'border-luxury-sand text-luxury-dark hover:border-luxury-gold/50'
                  }`}
                >
                  <span className="block text-sm mb-1 uppercase tracking-wider">10ml Decant</span>
                  <span className="block text-xs text-luxury-dark/60">${product.decant_price.toFixed(2)}</span>
                </button>
                <button
                  onClick={() => setSelectedSize('FULL_BOTTLE')}
                  className={`py-4 border text-center transition-colors ${
                    selectedSize === 'FULL_BOTTLE' 
                      ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-black font-medium' 
                      : 'border-luxury-sand text-luxury-dark hover:border-luxury-gold/50'
                  }`}
                >
                  <span className="block text-sm mb-1 uppercase tracking-wider">Full Bottle</span>
                  <span className="block text-xs text-luxury-dark/60">${product.full_bottle_price.toFixed(2)}</span>
                </button>
              </div>
            </div>

            {/* Add to Cart Area */}
            {product.availability === 'AVAILABLE' ? (
              <div className="flex gap-4">
                <div className="w-1/3 flex border border-luxury-black items-center justify-between px-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-xl hover:text-luxury-gold">-</button>
                  <span className="font-medium text-luxury-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-xl hover:text-luxury-gold">+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="w-2/3 bg-luxury-black text-white font-medium tracking-widest uppercase hover:bg-luxury-gold transition-colors py-4 flex items-center justify-center"
                >
                  ADD TO CART
                </button>
              </div>
            ) : (
              <button disabled className="w-full bg-luxury-sand text-luxury-dark/50 py-4 font-medium tracking-widest uppercase cursor-not-allowed">
                SOLD OUT
              </button>
            )}

            {/* Additional Info */}
            <div className="mt-12 text-xs text-luxury-dark/60 flex flex-col space-y-2 border-t border-luxury-sand pt-6">
              <p>✓ 100% Authentic Guaranteed</p>
              <p>✓ Next-day delivery within Nairobi</p>
              <p>✓ Secure & safe packaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
