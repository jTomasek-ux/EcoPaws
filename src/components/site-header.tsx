import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          EcoPaws
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/collections" className="hover:underline underline-offset-4">
            Shop
          </Link>
          <Link href="/cart" className="hover:underline underline-offset-4">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
