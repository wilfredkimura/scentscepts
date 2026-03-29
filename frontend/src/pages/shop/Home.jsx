import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/shop/ProductCard';

export function Home() {
  const featuredProducts = [
    {
      id: '1',
      name: 'Midnight Oud',
      brand_name: 'Scentcepts Exclusive',
      decant_price: 15.00,
      image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      name: 'Velvet Rose',
      brand_name: 'Maison',
      decant_price: 12.50,
      image_url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      name: 'Sandalwood Whisper',
      brand_name: 'Luxe Fragrance',
      decant_price: 18.00,
      image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-luxury-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Fragrance" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-3xl px-4 animate-fade-in">
          <p className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6">Welcome to Scentcepts</p>
          <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight">
            Discover Your <br/><span className="italic font-light">Signature Scent</span>
          </h1>
          <p className="text-lg md:text-xl text-luxury-sand/80 mb-10 font-light">
            Curated premium fragrances available in accessible decants and luxurious full bottles.
          </p>
          <Link 
            to="/shop" 
            className="inline-block px-10 py-4 bg-luxury-gold text-luxury-black font-semibold tracking-wider hover:bg-white transition-colors duration-300"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-luxury-black mb-4">Featured Fragrances</h2>
            <div className="h-0.5 w-16 bg-luxury-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/shop" 
              className="inline-block border border-luxury-black text-luxury-black px-8 py-3 hover:bg-luxury-black hover:text-white transition-colors duration-300 tracking-widest text-sm"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-luxury-sand text-luxury-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-16">
            <h2 className="text-3xl md:text-4xl font-display mb-6">The Art of Perfumery</h2>
            <p className="mb-6 leading-relaxed text-luxury-dark/80">
              At Scentcepts, we believe that fragrance is an invisible accessory, a personal signature that lingers long after you've left the room. 
            </p>
            <p className="mb-6 leading-relaxed text-luxury-dark/80">
              Our curated collection brings you the world's most exquisite scents, carefully selected for their unique notes, longevity, and sillage. Whether you are exploring our 10ml decants to find your perfect match, or investing in a full experiential presentation, we promise unparalleled quality.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1595425970377-c9703bc48baf?auto=format&fit=crop&q=80&w=800" 
              alt="Perfumery Art" 
              className="w-full h-auto object-cover rounded-sm shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
