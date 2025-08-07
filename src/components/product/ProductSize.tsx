import type { ProductItem } from "../../types/types";

interface ProductSizeProps {
  items: ProductItem[];
  selectedItem: ProductItem | null;
  onSelectItem: (item: ProductItem) => void;
}

function ProductSize({ items, selectedItem, onSelectItem }: ProductSizeProps) {
  return (
    <div>
      {items.map((item, index) => (
        <button
          key={index}
          
          className={selectedItem?.itemId === item.itemId ? "active" : ""}
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
