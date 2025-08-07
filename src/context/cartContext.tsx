import { createContext } from "react";
import type { CartItem, CartItemDetails } from "../types/types";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (productId: string, itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;

  cartDetails: CartItemDetails[];
  loadingDetails: boolean;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
