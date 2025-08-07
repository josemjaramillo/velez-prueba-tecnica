import type { ProductItem } from "../../types/types";
import "./ProductSize.css";
interface ProductSizeProps {
  items: ProductItem[];
  selectedItem: ProductItem | null;
  onSelectItem: (item: ProductItem) => void;
}

function ProductSize({ items, selectedItem, onSelectItem }: ProductSizeProps) {
  return (
    <div className="size-container">
      <p>Tallas:</p>
      {items.map((item, index) => (
        <button
          key={index}
          className={`size-button ${
            selectedItem?.itemId === item.itemId ? "active" : ""
          }`}
          onClick={() => {
            onSelectItem(item);
          }}
        >
          {item.size}
        </button>
      ))}
    </div>
  );
}

export default ProductSize;
