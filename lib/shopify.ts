// ✅ Shopify API config
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const API_URL = `https://${domain}/api/2024-01/graphql.json`;

// ======================================================
// 🧩 TIPOS (completos y reutilizables)
// ======================================================

export type ShopifyImage = {
  url: string;
  altText?: string | null;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  productType?: string;
  tags?: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants?: {
    edges: { node: ShopifyVariant }[];
  };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: ShopifyImage;
  products?: {
    edges: { node: ShopifyProduct }[];
  };
};

// ======================================================
// ⚙️ Función genérica para ejecutar queries GraphQL
// ======================================================

async function shopifyFetch<T>(query: string): Promise<T> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    cache: 'no-store', // importante en SSR/ISR
  };

  try {
    const res = await fetch(API_URL, options);
    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('❌ Error fetching Shopify data:', error);
    throw new Error('Error al obtener datos desde Shopify.');
  }
}

// ======================================================
// 🛍️ Obtener todos los productos
// ======================================================

export async function getProducts(): Promise<{ node: ShopifyProduct }[]> {
  const query = `
    {
      products(first: 50, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            productType
            tags
            availableForSale
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(query);
  return data.products.edges || [];
}

// ======================================================
// 🔎 Obtener un producto específico
// ======================================================

export async function getProduct(handle: string): Promise<ShopifyProduct> {
  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
        productType
        tags
        availableForSale
      }
    }
  `;

  const data = await shopifyFetch<{ product: ShopifyProduct }>(query);
  return data.product;
}

// ======================================================
// 🧭 Obtener colecciones
// ======================================================

export async function getCollections(): Promise<{ node: ShopifyCollection }[]> {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>(query);
  return data.collections.edges || [];
}

// ======================================================
// 📦 Obtener una colección específica
// ======================================================

export async function getCollection(handle: string): Promise<ShopifyCollection> {
  const query = `
    {
      collection(handle: "${handle}") {
        id
        title
        handle
        description
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              productType
              tags
              availableForSale
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collection: ShopifyCollection }>(query);
  return data.collection;
}

// ======================================================
// 💳 Crear checkout (carrito)
// ======================================================

export async function createCheckout(variantId: string, quantity: number) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }]
      }) {
        checkout {
          id
          webUrl
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutCreate: { checkout: any } }>(query);
  return data.checkoutCreate.checkout;
}
