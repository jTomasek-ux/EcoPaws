import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/shopify/format-price";
import { PRODUCT_QUERY } from "@/lib/shopify/product-query";
import { getStorefrontClient } from "@/lib/shopify/storefront";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const storefront = await getStorefrontClient();
  const { data, errors } = await storefront.graphql(PRODUCT_QUERY, {
    variables: { handle },
  });

  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  const product = data?.product;
  if (!product) notFound();

  const image = product.featuredImage;

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2">
      <div className="relative aspect-square bg-[var(--surface)]">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-5">
        <Link href="/collections" className="text-sm underline underline-offset-4">
          Back to shop
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight">{product.title}</h1>
        <p className="text-xl">{formatPrice(product.priceRange.minVariantPrice)}</p>
        {product.description ? (
          <p className="max-w-prose text-[var(--muted)]">{product.description}</p>
        ) : null}
        <p className="text-sm text-[var(--muted)]">
          Cart and checkout are handled by Shopify. Add-to-cart forms come next.
        </p>
      </div>
    </main>
  );
}
