import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { HOME_QUERY } from "@/lib/shopify/home-query";
import { getStorefrontClient } from "@/lib/shopify/storefront";

export default async function Home() {
  const storefront = await getStorefrontClient();
  const { data, errors } = await storefront.graphql(HOME_QUERY);

  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  const collections = data?.collections.nodes ?? [];
  const products = data?.products.nodes ?? [];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="max-w-2xl">
        <p className="text-sm tracking-[0.2em] uppercase text-[var(--muted)]">
          Next.js storefront · Shopify catalog
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {data?.shop.name ?? "EcoPaws"}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">
          {data?.shop.description ||
            "Sustainable goods for pets. The storefront is Next.js; products, cart, and checkout live on Shopify."}
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Collections</h2>
          <Link href="/collections" className="text-sm underline underline-offset-4">
            All collections
          </Link>
        </div>
        {collections.length === 0 ? (
          <p className="text-[var(--muted)]">No collections yet.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link href={`/collections/${collection.handle}`} className="group flex flex-col gap-3">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                    {collection.image?.url ? (
                      <Image
                        src={collection.image.url}
                        alt={collection.image.altText || collection.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>
                  <h3 className="font-medium">{collection.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
        {products.length === 0 ? (
          <p className="text-[var(--muted)]">No products yet.</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
