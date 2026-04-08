'use client';

import React, { useState } from 'react';
import { formatWhatsAppMessage, CheckoutData } from '@/lib/whatsapp';
import { useCart } from '@/hooks/useCart';
import { ArrowLeft, Check } from 'lucide-react';

interface CheckoutFormProps {
  onBack: () => void;
}

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { cart, total } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const checkoutData: CheckoutData = {
      ...formData,
      items: cart.map(item => ({
        name: item.name,
        brand: item.brand?.name || 'No Brand',
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        price: item.itemPrice
      })),
      total
    };

    const whatsappLink = formatWhatsAppMessage(checkoutData);
    
    // Simulate a brief delay for "premium" feel
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" /> Back to Cart
      </button>

      <div className="flex-1">
        <h3 className="text-xl font-light tracking-tight mb-2">Delivery Details</h3>
        <p className="text-xs text-muted-foreground mb-8">Please provide your shipping information to complete your order via WhatsApp.</p>

        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Full Name</label>
            <input 
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="E.g. Jane Doe"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Phone Number</label>
            <input 
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="+254..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Delivery Address</label>
            <textarea 
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Building, Street, City"
            />
          </div>
        </form>
      </div>

      <div className="pt-8 space-y-4">
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Order Total</span>
          <span className="text-lg font-bold">KSh {total.toLocaleString()}</span>
        </div>
        
        <button 
          form="checkout-form"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-foreground/90 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
            <><Check className="w-4 h-4 animate-pulse" /> Finalizing...</>
          ) : (
            'Confirm & Send to WhatsApp'
          )}
        </button>
      </div>
    </div>
  );
}
