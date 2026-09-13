import { createCartServerHandlers } from "@shopify/hydrogen";
import { createCustomerAccountServerHandlers } from "@shopify/hydrogen/customer-account";
import { customerSession } from "@/lib/shopify/customer-session";

export const cartHandlers = createCartServerHandlers();

export const customerAccountHandlers = createCustomerAccountServerHandlers({
  customerSession,
});
