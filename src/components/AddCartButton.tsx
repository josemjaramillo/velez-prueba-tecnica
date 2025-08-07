import { useState } from "react";
import { useCart } from "../context/useCart";

interface AddCartButtonProps {
  productId: string;
  itemId: string;
  isAvailable: boolean;
}

function AddCartButton({ productId, itemId, isAvailable }: AddCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const {addToCart} = useCart();

  function handleAddToCart() {
    if (!isAvailable) return;

    setIsAdding(true);

    setTimeout(() => {
      console.log(`Agregado al carrito: ${itemId}`);
      addToCart(productId, itemId);
      setIsAdding(false);
    }, 1000);
  }

  return (
    <button
      className="add-cart-btn"
      onClick={handleAddToCart}
      disabled={!isAvailable || isAdding}
    >
      {isAvailable
        ? isAdding
          ? "Agregando..."
          : "Agregar al carrito"
        : "Sin stock"}
    </button>
  );
}

export default AddCartButton;
