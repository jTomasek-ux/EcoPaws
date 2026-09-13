const DEFAULT_STORE_DOMAIN = "pets.mock.shop";

export function getStoreDomain() {
  return process.env.NEXT_PUBLIC_STORE_DOMAIN || DEFAULT_STORE_DOMAIN;
}

export function getPublicStorefrontToken() {
  return process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN || undefined;
}
