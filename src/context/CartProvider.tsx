import { useEffect, useState } from "react";
import type { CartItem } from "../types/types";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "cart-items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (error) {
      console.warn("Error al cargar el carrito desde localStorage:", error);
      setCart([]);
    }
  }, []);

  
  function saveCart(updated: CartItem[]) {
    setCart(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addToCart(productId: string, itemId: string) {
    const existing = cart.find((item) => item.itemId === itemId);
    let updated: CartItem[];

    if (existing) {
      updated = cart.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...cart, { productId, itemId, quantity: 1 }];
    }

    saveCart(updated);
  }

  function removeFromCart(itemId: string) {
    const updated = cart.filter((item) => item.itemId !== itemId);
    saveCart(updated);
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    setCart([]);
  }

  const cartCount = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
