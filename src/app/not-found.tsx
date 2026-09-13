import { handleShopifyRedirects } from "@shopify/hydrogen";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { getStorefrontClient } from "@/lib/shopify/storefront";
import { routeTemplates } from "@/lib/shopify/route-templates";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col gap-4 px-6 py-24">
      <Suspense fallback={null}>
        <RedirectChecker />
      </Suspense>
      <p className="text-sm tracking-[0.2em] uppercase text-[var(--muted)]">EcoPaws</p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-[var(--muted)]">
        That path is not in this storefront. Browse the shop instead.
      </p>
      <a className="w-fit underline underline-offset-4" href="/collections">
        View collections
      </a>
    </main>
  );
}

async function RedirectChecker() {
  await connection();
  const url = (await headers()).get("x-storefront-url");

  if (url) {
    const result = await handleShopifyRedirects({
      request: new Request(url),
      routeTemplates,
      storefrontClient: await getStorefrontClient(),
    });
    const location = result?.headers.get("location");
    if (location) redirect(location);
  }

  return null;
}
