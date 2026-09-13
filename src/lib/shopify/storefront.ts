import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import {
  createShopifyRequestContext,
  createStorefrontClient,
} from "@shopify/hydrogen";
import { getPublicStorefrontToken, getStoreDomain } from "@/lib/shopify/env";

export const getStorefrontClient = cache(async () => {
  const requestHeaders = await headers();
  const requestContext = createShopifyRequestContext({
    request: { headers: requestHeaders },
    i18n: { country: "US", language: "EN" },
  });

  return createStorefrontClient({
    type: "public",
    requestContext,
    config: {
      storeDomain: getStoreDomain(),
      publicStorefrontToken: getPublicStorefrontToken(),
    },
  });
});
