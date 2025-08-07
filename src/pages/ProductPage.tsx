import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product, ProductItem, RawProduct } from "../types/types";
import mapProduct from "../utils/mapProduct";
import ImgGallery from "../components/product/ImgGallery";
import ProductSize from "../components/product/ProductSize";
import ProductPrice from "../components/product/ProductPrice";
import ProductColor from "../components/product/ProductColor";
import AddCartButton from "../components/product/AddCartButton";
import "./ProductPage.css";
import FeaturedProducts from "../components/product/FeaturedProducts";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChangeSize(item: ProductItem) {
    console.log(item);
    setSelectedItem(item);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `https://api-frontend-production.up.railway.app/api/products/${id}`
        );
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        const data = await res.json();
        const raw: RawProduct = data[0];
        const mapped = mapProduct(raw);
        setProduct(mapped);
        setSelectedItem(mapped.items[0]);
        console.log(mapped.items[0]);
      } catch (error: unknown) {
        console.error("Error fetching", error);
        const message = (error as Error)?.message || "Error desconocido";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading)
    return (
      <div>
        <h1>Cargando productos</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );

  if (!product)
    return (
      <div>
        <h1>Producto no encontrado</h1>
      </div>
    );

  const keyword = product.name.split(" ")[0].toLowerCase();
  return (
    <div className="product-container">
      <ImgGallery imgs={product.items[0].images} />
      <div className="info-container">
        <div className="text-info">
          <h2>{product.name}</h2>
          <p>{product.brand}</p>
          <p>Ref.{product.referenceCode}</p>
        </div>

        <div>
          <ProductSize
            items={product.items}
            selectedItem={selectedItem}
            onSelectItem={onChangeSize}
          />

          {selectedItem && <ProductColor color={selectedItem.color} />}
        </div>
        <div>
          {selectedItem && (
            <ProductPrice
              price={selectedItem.offer.price}
              originalPrice={selectedItem.offer.priceWithoutDiscount}
            />
          )}
          {selectedItem && (
            <AddCartButton
              productId={product.productId}
              itemId={selectedItem.itemId}
              isAvailable={selectedItem.offer.isAvailable}
            />
          )}
        </div>
      </div>
      <FeaturedProducts query={keyword} />
    </div>
  );
}

export default ProductPage;
