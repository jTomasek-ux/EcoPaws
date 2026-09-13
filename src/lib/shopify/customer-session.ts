import { createCustomerSession } from "@shopify/hydrogen/customer-account";

export const customerSession = createCustomerSession({
  shopId: process.env.SHOP_ID ?? "0",
  customerAccountApiClientId:
    process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID ?? "offline",
});
