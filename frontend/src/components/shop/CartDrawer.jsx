import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

import { X as XIcon, Minus as MinusIcon, Plus as PlusIcon, ShoppingBag as ShoppingBagIcon } from 'lucide-react';

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, getTotal } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-luxury-cream shadow-2xl z-50 transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-luxury-sand">
          <h2 className="text-2xl font-display font-medium text-luxury-black flex items-center">
            <ShoppingBagIcon className="w-6 h-6 mr-3 text-luxury-gold" />
            Your Cart
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 text-luxury-dark hover:text-luxury-gold transition-colors"
          >
            <XIcon className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-luxury-dark/60">
              <ShoppingBagIcon className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Your cart is currently empty.</p>
              <button 
                onClick={closeCart}
                className="mt-6 text-luxury-gold underline hover:text-luxury-gold-dark transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4">
                  <div className="w-24 h-32 bg-luxury-sand rounded-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col pt-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-display text-lg text-luxury-black">{item.product.name}</h3>
                        <p className="text-xs text-luxury-dark/60 uppercase tracking-wider mt-1">
                          {item.size === 'DECANT_10ML' ? '10ml Decant' : 'Full Bottle'}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-luxury-dark/40 hover:text-red-500 transition-colors"
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center border border-luxury-sand rounded">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 text-luxury-dark hover:text-luxury-gold transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 text-luxury-dark hover:text-luxury-gold transition-colors"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-medium text-luxury-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-luxury-sand bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="text-luxury-dark font-medium uppercase tracking-wide text-sm">Subtotal</span>
              <span className="text-2xl font-display text-luxury-black font-semibold">
                ${getTotal().toFixed(2)}
              </span>
            </div>
            <button 
              className="w-full bg-luxury-black text-white py-4 font-medium tracking-widest hover:bg-luxury-gold transition-colors rounded shadow-lg flex items-center justify-center gap-2"
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
