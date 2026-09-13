import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { COLLECTION_QUERY } from "@/lib/shopify/collection-query";
import { getStorefrontClient } from "@/lib/shopify/storefront";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const storefront = await getStorefrontClient();
  const { data, errors } = await storefront.graphql(COLLECTION_QUERY, {
    variables: { handle },
  });

  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  const collection = data?.collection;
  if (!collection) notFound();

  const products = collection.products.nodes;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">{collection.title}</h1>
        {collection.description ? (
          <p className="mt-3 text-[var(--muted)]">{collection.description}</p>
        ) : null}
      </header>
      {products.length === 0 ? (
        <p className="text-[var(--muted)]">No products in this collection.</p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
