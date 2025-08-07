function toCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol", // solo el signo $
  }).format(amount);
}

export default toCOP;