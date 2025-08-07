import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/useCart";

function Header() {
  const [burst, setBurst] = useState(false);
  const { cartCount, openCart, closeCart, isCartOpen } = useCart();

  const handleClick = () => {
    // if (isCartOpen) closeCart();
    // else openCart();
    openCart();
    setBurst(true);
    setTimeout(() => setBurst(false), 400); // duración = duración de la animación
  };

  return (
    <nav className="navbar">
      <div className="nav-content container">
        <h1 className="logo">Vélez</h1>
        <button className="cart-btn" onClick={handleClick}>
          <ShoppingCart className="cart-icon" />
          {cartCount ? <span className="cart-count">{cartCount}</span> : null}
          {burst && <span className="burst" />}
        </button>
      </div>
    </nav>
  );
}

export default Header;
