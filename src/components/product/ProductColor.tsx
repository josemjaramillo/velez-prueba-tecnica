import getColorHex from "../../utils/getColorHex";
import "./ProductColor.css"

interface ProductColorProps {
  color: string;
}

function ProductColor({ color }: ProductColorProps) {
    const colorHex = getColorHex(color);
    return (
    <div className="product-color">
      <p>Color:</p>
      <button
        className="active color-button"
        style={{
          backgroundColor: colorHex,
        }}
        disabled
      >
      </button>
    </div>
  );
}

export default ProductColor;
