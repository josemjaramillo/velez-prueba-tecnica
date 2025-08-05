import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
    id: string;
    name: string;
    brand: string;
    referenceCode: string;
    description: string;
    items: ProductItem[];
}

interface ProductItem {
    itemId: string;
    size: string;
    color: string;
    images: ItemImgs[];
    offer: ItemOffer;
}

interface ItemImgs {
    imageUrl: string;
    imageText: string;
}

interface ItemOffer {
    isAvailable: boolean;
    price: number;
    priceWithoutDiscount: number;
}

function Product() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // TODO: reemplazar "any" para respetar tipado
    function mapProduct(raw: any): Product {
        return ({
            id: raw.productId,
            name: raw.productName,
            brand: raw.brand,
            referenceCode: raw.productReference,
            description: raw.description,
            items: raw.items.map((item: any) => ({
                itemId: item.itemId,
                size: item.Talla[0],
                color: item.Color[0],
                images: item.images.map((img: any) => ({
                    imageUrl: img.imageUrl,
                    imageText: img.imageText,
                })),
                offer: {
                    isAvailable: item.sellers[0].commertialOffer.IsAvailable,
                    price: item.sellers[0].commertialOffer.Price,
                    priceWithoutDiscount: item.sellers[0].commertialOffer.ListPrice,
                },
            })),
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch(`https://api-frontend-production.up.railway.app/api/products/${id}`)
                if (!res.ok) throw new Error("No se pudo cargar el producto")
                const data = await res.json();
                const raw = data[0];
                console.log(mapProduct(raw));
                setProduct(mapProduct(raw));

            } catch (error: unknown) {
                console.error("Error fetching", error);
                const message = (error as Error)?.message || "Error desconocido"
                setError(message);
            } finally {
                setIsLoading(false);
            }

        }
        fetchData();
    }, [id])

    if(isLoading) return (
        <div>
            <h1>Cargando productos</h1>
        </div>
    )

    if(error) return (
        <div>
            <h1>{error}</h1>
        </div>
    )
    return (
        <div>
            <h1>Pagina del producto</h1>
            <p>Producto {id}</p>
            <p>{product?.id}</p>
        </div>
    )
}


export default Product;