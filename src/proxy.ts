import {
  createShopifyRequestContext,
  createStorefrontClient,
  handleShopifyRoutes,
} from "@shopify/hydrogen";
import { NextResponse, type NextRequest } from "next/server";
import { cartHandlers, customerAccountHandlers } from "@/lib/shopify/handlers";
import { routeTemplates } from "@/lib/shopify/route-templates";
import { createSessionManager } from "@/lib/shopify/session";

export async function proxy(request: NextRequest) {
  const requestContext = createShopifyRequestContext({
    request,
    i18n: { country: "US", language: "EN" },
  });
  const storefrontClient = createStorefrontClient({
    type: "public",
    requestContext,
    config: {
      storeDomain: process.env.NEXT_PUBLIC_STORE_DOMAIN!,
      publicStorefrontToken: process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
    },
  });
  const sessionManager = await createSessionManager(request);

  const shopifyRoute = handleShopifyRoutes({
    request,
    requestContext,
    sessionManager,
    storefrontClient,
    routeTemplates,
    handlers: [cartHandlers, customerAccountHandlers],
  });
  if (shopifyRoute) return shopifyRoute;

  const requestHeaders = requestContext.getForwardedRequestHeaders();
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  requestContext.applyResponseHeaders(response.headers);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon.ico).*)"],
};
