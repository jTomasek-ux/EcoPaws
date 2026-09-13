import { gql } from "@shopify/hydrogen";

export const HOME_QUERY = gql(`
  query HomePage {
    shop {
      name
      description
    }
    collections(first: 8) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
        }
      }
    }
    products(first: 12) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`);
