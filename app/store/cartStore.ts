import { create } from 'zustand';

interface CartItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  totalPrice: () => {
    return get().items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
  },
}));