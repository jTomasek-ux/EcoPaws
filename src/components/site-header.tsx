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
      <div className="relative mx-auto flex h-[92px] max-w-[1440px] items-center justify-between px-6 md:px-14">
        <nav className="flex items-center gap-6 md:gap-8">
          <Link href="/#jeans" className="text-[13px] leading-none md:text-[14px]">
            Shop Jeans
          </Link>
          <Link href="/#dog-toys" className="text-[13px] leading-none md:text-[14px]">
            Shop Dog Toys
          </Link>
        </nav>
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[24px] md:text-[32px] leading-none"
        >
          EcoPaws
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
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
