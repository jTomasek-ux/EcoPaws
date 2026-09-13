"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const overlay = usePathname() === "/";

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-20"
          : "relative z-20 bg-white"
      }
    >
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-4 py-4 md:h-[92px] md:flex-row md:justify-between md:px-14 md:py-0">
        <nav className="order-2 flex w-full items-center justify-between gap-4 md:order-1 md:w-auto md:gap-8">
          <Link href="/#dog-toys" className="text-[13px] leading-none md:text-[14px]">
            Shop Dog Toys
          </Link>
          <Link href="/#jeans" className="text-[13px] leading-none md:text-[14px]">
            Shop Jeans
          </Link>
          <a
            href="/account/login"
            className="text-[13px] leading-none md:hidden"
          >
            Profile
          </a>
          <Link href="/cart" className="text-[13px] leading-none md:hidden">
            Bag
          </Link>
        </nav>
        <Link
          href="/"
          className="order-1 text-[24px] leading-none md:absolute md:left-1/2 md:top-1/2 md:order-none md:-translate-x-1/2 md:-translate-y-1/2 md:text-[32px]"
        >
          EcoPaws
        </Link>
        <nav className="order-3 hidden items-center gap-8 md:flex">
          <a href="/account/login" className="text-[13px] leading-none md:text-[14px]">
            Profile
          </a>
          <Link href="/cart" className="text-[13px] leading-none md:text-[14px]">
            Bag
          </Link>
        </nav>
      </div>
    </header>
  );
}
