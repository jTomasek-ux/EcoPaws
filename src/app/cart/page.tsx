import { cartHandlers } from "@/lib/shopify/handlers";
import { getStorefrontClient } from "@/lib/shopify/storefront";

export default async function CartPage() {
  const storefront = await getStorefrontClient();
  const { data } = await cartHandlers.get({ storefrontClient: storefront });
  const cart = data.cart;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Cart</h1>
      {!cart || cart.totalQuantity === 0 ? (
        <p className="text-[var(--muted)]">Your cart is empty.</p>
      ) : (
        <p>
          {cart.totalQuantity} item{cart.totalQuantity === 1 ? "" : "s"} in cart.
        </p>
      )}
    </main>
  );
}
