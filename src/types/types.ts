export interface Product {
    productId: string;
    name: string;
    brand: string;
    referenceCode: string;
    description: string;
    items: ProductItem[];
}

export interface ProductItem {
    itemId: string;
    size: string;
    color: string;
    images: ItemImgs[];
    offer: ItemOffer;
}

export interface ItemImgs {
    imageUrl: string;
    imageText: string;
}

export interface ItemOffer {
    isAvailable: boolean;
    price: number;
    priceWithoutDiscount: number;
}
export interface CartItem {
  productId: string;
  itemId: string;
  quantity: number;
}
