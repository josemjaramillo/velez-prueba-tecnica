import type { Product } from "../types/types";

// TODO: reemplazar "any" para respetar tipado
function mapProduct(raw: any): Product {
  return {
    productId: raw.productId,
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
  };
}

export default mapProduct;
