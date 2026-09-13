import { gql } from "@shopify/hydrogen";

export const COLLECTIONS_QUERY = gql(`
  query CollectionsPage {
    collections(first: 24) {
      nodes {
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
`);

export const COLLECTION_QUERY = gql(`
  query CollectionPage($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: 24) {
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
  }
`);
