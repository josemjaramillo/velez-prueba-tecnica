import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product, ProductItem } from "../types/types";
import mapProduct from "../utils/mapProduct";
import ImgGallery from "../components/ImgGallery";
import ProductSize from "../components/ProductSize";
import ProductPrice from "../components/ProductPrice";
import ProductColor from "../components/ProductColor";
import AddCartButton from "../components/AddCartButton";

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
                const raw = data[0];
                const mapped = mapProduct(raw);
                setProduct(mapped);
                setSelectedItem(mapped.items[0]);
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

    return (
        <div className="product-container">
            <ImgGallery imgs={product.items[0].images} />
            <h1>{product.name}</h1>
            <p>{product.brand}</p>
            <p>Ref.{product.referenceCode}</p>
            <ProductSize
                items={product.items}
                selectedItem={selectedItem}
                onSelectItem={onChangeSize}
            />
            {selectedItem && (
                <ProductPrice
                    price={selectedItem.offer.price}
                    originalPrice={selectedItem.offer.priceWithoutDiscount}
                />
            )}
            {selectedItem && <ProductColor color={selectedItem.color} />}
            {/* {selectedItem?.offer.isAvailable ? (
                <p className="stock">En stock</p>
            ) : (
                <p className="stock out">Agotado</p>
            )} */}

            {selectedItem && (
                <AddCartButton
                    productId={product.productId}
                    itemId={selectedItem.itemId}
                    isAvailable={selectedItem.offer.isAvailable}
                />
            )}
        </div>
    );
}

export default ProductPage;
