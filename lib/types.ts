// ✅ Tipos flexibles y compatibles con Shopify API

export interface ShopifyImage {
  url: string;
  altText?: string | null;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  priceV2: ShopifyPrice;
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description?: string | null; // ✅ opcional
  descriptionHtml?: string | null;
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  images?: {
    edges?: Array<{
      node: ShopifyImage;
    }>;
  };
  variants?: {
    edges?: Array<{
      node: ShopifyVariant;
    }>;
  };
  productType?: string | null; // ✅ opcional
  tags?: string[]; // ✅ opcional
  availableForSale: boolean;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  image?: {
    url: string;
    altText?: string | null;
  };
  products?: {
    edges?: Array<{
      node: ShopifyProduct;
    }>;
  };
}
