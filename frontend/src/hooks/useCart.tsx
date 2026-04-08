'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductDto } from '@/lib/types';

interface CartItem extends ProductDto {
  selectedSize: 'decant' | 'full';
  quantity: number;
  itemPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductDto, size: 'decant' | 'full') => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductDto, size: 'decant' | 'full') => {
    const itemPrice = size === 'decant' ? product.decantPrice : product.fullBottlePrice;
    
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1, itemPrice }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => prev.map(item => 
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.itemPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
