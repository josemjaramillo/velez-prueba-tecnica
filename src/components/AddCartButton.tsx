import { useState } from "react";

interface AddCartButtonProps {
  itemId: string;
  isAvailable: boolean;
}

function AddCartButton({ itemId, isAvailable }: AddCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  function handleAddToCart() {
    if (!isAvailable) return;

    setIsAdding(true);

    setTimeout(() => {
      console.log(`Agregado al carrito: ${itemId}`);
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
