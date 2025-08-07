import { useEffect, useRef } from "react";
import { useCart } from "../context/useCart";

function Cart() {
  const { cart, removeFromCart, clearCart, isCartOpen, closeCart , } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    }

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  return (
    <aside ref={cartRef} className={`cart ${isCartOpen ? "cart--open" : "cart--closed"}`}>
      <button className="closeButton" onClick={closeCart}>❌</button>
      <h2>Tu carrito</h2>
      {cart.length === 0 ? (
        <p>Está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.itemId}>
                {item.itemId} x {item.quantity}
                <button onClick={() => removeFromCart(item.itemId)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Vaciar carrito</button>
        </>
      )}
      {/* <p>Total: ${total.toFixed(2)}</p> */}
    </aside>
  );
}

export default Cart;
