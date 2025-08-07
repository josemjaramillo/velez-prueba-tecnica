import { createContext } from "react";
import type { CartItem } from "../types/types";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (productId: string, itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
