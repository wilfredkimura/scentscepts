import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Cart Drawer state
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Cart Actions
      addItem: (product, size, quantity, price) => set((state) => {
        const existingItem = state.items.find(
          item => item.product.id === product.id && item.size === size
        );

        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.product.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }

        return {
          items: [...state.items, { product, size, quantity, price }]
        };
      }),

      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(
          item => !(item.product.id === productId && item.size === size)
        )
      })),

      updateQuantity: (productId, size, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'scentcepts-cart-storage',
    }
  )
);
