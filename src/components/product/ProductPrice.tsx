import toCOP from "../../utils/toCOP";

interface ProductPriceProps {
  price: number;
  originalPrice: number;
}

function ProductPrice({ price, originalPrice }: ProductPriceProps) {
  const showDiscount = price < originalPrice;



  return (
    <div className="price">
      {showDiscount && (
        <span className="original-price">{toCOP(originalPrice)}</span>
      )}
      <span className="final-price">{toCOP(price)}</span>
    </div>
  );
}

export default ProductPrice;
