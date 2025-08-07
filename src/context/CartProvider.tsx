import { useEffect, useState } from "react";
import type { CartItem, CartItemDetails, ProductItem } from "../types/types";
import { CartContext } from "./cartContext";
import mapProduct from "../utils/mapProduct";

const STORAGE_KEY = "cart-items";


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartDetails, setCartDetails] = useState<CartItemDetails[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(true);

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
        item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item
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

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  // Fetch product details for all cart items
  useEffect(() => {
    async function fetchCartDetails() {
      setLoadingDetails(true);
      const details: CartItemDetails[] = [];

      for (const item of cart) {
        try {
          const res = await fetch(
            `https://api-frontend-production.up.railway.app/api/products/${item.productId}`
          );
          const data = await res.json();
          const rawProduct = data[0];
          const product = mapProduct(rawProduct);
          const matchedItem = product.items.find(
            (i: ProductItem) => i.itemId === item.itemId
          );
          if (!matchedItem) continue;

          details.push({
            ...item,
            productName: product.name,
            image: matchedItem.images[0].imageUrl,
            price: matchedItem.offer.price,
            color: matchedItem.color,
            size: matchedItem.size
          });
        } catch (err) {
          console.error("Error cargando producto:", item.productId, err);
        }
      }

      setCartDetails(details);
      setLoadingDetails(false);
    }

    if (cart.length > 0) {
      fetchCartDetails();
    } else {
      setCartDetails([]);
      setLoadingDetails(false);
    }
  }, [cart]);

  const cartTotal = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        cartDetails,
        loadingDetails,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
