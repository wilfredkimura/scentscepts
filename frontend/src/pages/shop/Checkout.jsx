import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';

export function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-display text-luxury-black mb-4">Your Cart is Empty</h2>
        <p className="text-luxury-dark/70 mb-8">Add items to your cart to proceed with checkout.</p>
        <Link 
          to="/shop" 
          className="bg-luxury-black text-white px-8 py-3 rounded hover:bg-luxury-gold transition-colors tracking-widest text-sm font-medium"
        >
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    let message = `*New Order from Scentcepts*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    message += `Address: ${formData.address}%0A%0A`;
    
    message += `*Order Items:*%0A`;
    items.forEach(item => {
      const sizeStr = item.size === 'DECANT_10ML' ? '10ml Decant' : 'Full Bottle';
      message += `- ${item.quantity}x ${item.product.name} (${sizeStr}) @ $${item.price.toFixed(2)} each%0A`;
    });
    
    message += `%0A*Total Amount: $${getTotal().toFixed(2)}*%0A%0A`;
    message += `Please confirm my order and share payment instructions.`;

    // The WhatsApp number defined in the PRD is 254716052342
    const whatsappUrl = `https://wa.me/254716052342?text=${message}`;
    
    // Clear cart and redirect
    clearCart();
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="bg-luxury-cream min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-center text-luxury-black mb-12">Checkout</h1>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Form */}
          <div className="flex-1 bg-white p-8 rounded shadow-sm border border-luxury-sand">
            <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-sm">Delivery Details</h2>
            <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-luxury-dark mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-luxury-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-luxury-gold bg-luxury-cream/50"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-luxury-dark mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-luxury-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-luxury-gold bg-luxury-cream/50"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-luxury-dark mb-2">Delivery Address</label>
                <textarea 
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-luxury-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-luxury-gold bg-luxury-cream/50 resize-none"
                  placeholder="House No, Street, City"
                ></textarea>
              </div>

              <div className="pt-4">
                <p className="text-sm text-luxury-dark/70 mb-4 bg-luxury-sand/40 p-3 rounded border border-luxury-sand">
                  Clicking the button below will redirect you to WhatsApp to confirm your order directly with our sales team and arrange payment.
                </p>
                <button 
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-4 font-medium tracking-widest hover:bg-[#128C7E] transition-colors rounded shadow flex items-center justify-center gap-2"
                >
                  CHECKOUT VIA WHATSAPP
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded shadow-sm border border-luxury-sand sticky top-24">
              <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-sm border-b border-luxury-sand pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-luxury-black">{item.quantity}x {item.product.name}</p>
                      <p className="text-luxury-dark/60 text-xs mt-1">
                        {item.size === 'DECANT_10ML' ? '10ml' : 'Full Bottle'}
                      </p>
                    </div>
                    <p className="font-medium text-luxury-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-luxury-sand pt-4 flex justify-between items-center">
                <span className="font-medium uppercase tracking-widest text-sm">Total</span>
                <span className="text-xl font-display font-semibold">${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
