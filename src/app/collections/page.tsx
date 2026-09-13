import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS_QUERY } from "@/lib/shopify/collection-query";
import { getStorefrontClient } from "@/lib/shopify/storefront";

export default async function CollectionsPage() {
  const storefront = await getStorefrontClient();
  const { data, errors } = await storefront.graphql(COLLECTIONS_QUERY);

  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  const collections = data?.collections.nodes ?? [];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Collections</h1>
      {collections.length === 0 ? (
        <p className="text-[var(--muted)]">No collections yet.</p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2">
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link href={`/collections/${collection.handle}`} className="group flex flex-col gap-3">
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
                  {collection.image?.url ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <h2 className="text-xl font-medium">{collection.title}</h2>
                {collection.description ? (
                  <p className="text-sm text-[var(--muted)]">{collection.description}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
