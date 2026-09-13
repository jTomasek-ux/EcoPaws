import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/shopify/format-price";

type ProductCardProduct = {
  handle: string;
  title: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export function ProductCard({ product }: { product: ProductCardProduct }) {
  const image = product.featuredImage;

  return (
    <Link href={`/products/${product.handle}`} className="group flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden bg-[var(--surface)]">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{product.title}</h3>
        <p className="text-sm text-[var(--muted)]">
          {formatPrice(product.priceRange.minVariantPrice)}
        </p>
      </div>
    </Link>
  );
}
