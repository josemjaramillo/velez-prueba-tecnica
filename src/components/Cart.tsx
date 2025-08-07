import { useRef } from "react";
import { useCart } from "../context/useCart";
import toCOP from "../utils/toCOP";

function Cart() {
  const {
    cartDetails,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart,
    cartTotal,
    loadingDetails,
  } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isCartOpen && <div className="overlay" onClick={closeCart} />}
      <aside
        ref={cartRef}
        className={`cart ${isCartOpen ? "cart--open" : "cart--closed"}`}
      >
        <button className="closeButton" onClick={closeCart}>
          ❌
        </button>
        <h2>Tu carrito</h2>

        {loadingDetails ? (
          <p>Cargando productos...</p>
        ) : cartDetails.length === 0 ? (
          <p>Está vacío.</p>
        ) : (
          <>
            <ul>
              {cartDetails.map((item) => (
                <li key={item.itemId}>
                  <img src={item.image} alt={item.productName} />
                  <div className="item-info">
                    <p>{item.productName}</p>
                    <p>
                      {item.quantity} × {toCOP(item.price)}
                    </p>
                    <p className="info">Color: {item.color}</p>
                    <p className="info">Talla: {item.size}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.itemId)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p>Total: {toCOP(cartTotal)}</p>
            <div className="cart-buttons-container">
              <button className="clear btn" onClick={clearCart}>
                Vaciar carrito
              </button>
              <button className="btn">Finalizar compra</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;
