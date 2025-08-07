export interface RawProduct {
  productId: string;
  productName: string;
  brand: string;
  productReference: string;
  description: string;
  items: {
    itemId: string;
    Talla: string[];
    Color: string[];
    images: {
      imageUrl: string;
      imageText: string;
    }[];
    sellers: {
      commertialOffer: {
        IsAvailable: boolean;
        Price: number;
        ListPrice: number;
      };
    }[];
  }[];
}

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
export interface CartItemDetails extends CartItem {
  productName: string;
  image: string;
  price: number;
  color: string;
  size: string;
}
