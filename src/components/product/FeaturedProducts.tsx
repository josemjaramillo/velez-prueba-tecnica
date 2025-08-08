import { useEffect, useState } from "react";
import mapProduct from "../../utils/mapProduct";
import type { Product, RawProduct } from "../../types/types";
import "./FeaturedProducts.css"
import { Link } from "react-router-dom";
import toCOP from "../../utils/toCOP";

interface ProductPriceProps {
  query: string;
}

function FeaturedProducts({ query }: ProductPriceProps) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `https://api-frontend-production.up.railway.app/api/products?ft=${query}`
        );
        if (!res.ok) throw new Error("No se pudieron cargar productos");
        const data = await res.json();

        const raw = data.slice(0, 5);
        const productsMapped = raw.map((product: RawProduct) =>
          mapProduct(product)
        );

        setProducts(productsMapped);
      } catch (error: unknown) {
        console.error("Error fetching", error);
        const message = (error as Error)?.message || "Error desconocido";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (isLoading)
    return (
      <div>
        <h1>Cargando mas productos</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>No se cargaron mas productos</h1>
      </div>
    );

  if (!products)
    return (
      <div>
        <h1>Producto no encontrado</h1>
      </div>
    );

  return (
    <section className="featured">
      <h2>Mas productos como este</h2>
      <div className="featured-grid">
        {products.map((product) => (
          <Link key={product.productId} to={`/product/${product.productId}`} className="featured-card">
            <img src={product.items[0].images[0].imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p className="brand">{product.brand}</p>
            <p>{toCOP(product.items[0].offer.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
