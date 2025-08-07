interface ProductPriceProps {
  price: number;
  originalPrice: number;
}

function ProductPrice({ price, originalPrice }: ProductPriceProps) {
  const showDiscount = price < originalPrice;

  function toCOP(amount: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "narrowSymbol", // solo el signo $
    }).format(amount);
  }

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
