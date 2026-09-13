"use client";

import Image from "next/image";
import Link from "next/link";

const COLORS = [
  { name: "Indigo", hex: "#1e3a5f" },
  { name: "Faded", hex: "#8a9a7b" },
  { name: "Green", hex: "#5c6b4a" },
] as const;

type Jean = {
  src: string;
  hoverSrc: string;
  alt: string;
  title: string;
  price: string;
  href: string;
  colorIndex: number;
};

const jeans: Jean[] = [
  {
    src: "/home/jeans-1.jpg",
    hoverSrc: "/home/jeans-3.jpg",
    alt: "Blue wide-leg jeans",
    title: "Blue Jeans",
    price: "20$",
    href: "/collections",
    colorIndex: 0,
  },
  {
    src: "/home/jeans-2.jpg",
    hoverSrc: "/home/jeans-4.jpg",
    alt: "Person wearing faded wide-leg jeans and a white tank",
    title: "Faded Jeans",
    price: "20$",
    href: "/collections",
    colorIndex: 1,
  },
  {
    src: "/home/jeans-3.jpg",
    hoverSrc: "/home/jeans-1.jpg",
    alt: "Person wearing dark wide-leg jeans",
    title: "Indigo Jeans",
    price: "20$",
    href: "/collections",
    colorIndex: 0,
  },
  {
    src: "/home/jeans-4.jpg",
    hoverSrc: "/home/jeans-2.jpg",
    alt: "Faded green wide-leg jeans",
    title: "Reclaimed Jeans",
    price: "20$",
    href: "/collections",
    colorIndex: 2,
  },
];

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function JeanCard({ item }: { item: Jean }) {
  return (
    <li className="relative min-w-0">
      <Link href={item.href} className="group block">
        <div className="relative aspect-3/4 overflow-hidden bg-[#f2f2f2]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
          <Image
            src={item.hoverSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
          <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] leading-none">
              New In
            </span>
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] leading-none">
              Most Wanted
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex h-11 items-center justify-between bg-white/90 px-5 text-[15px] leading-none tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <span>S</span>
            <span>M</span>
            <span>L</span>
            <span>XL</span>
          </div>
        </div>
        <div className="pt-3">
          <p className="text-[15px] leading-tight">{item.title}</p>
          <p className="mt-0.5 text-[15px] leading-tight">{item.price}</p>
          <ul className="mt-2 flex items-end gap-1.5" aria-label="Available washes">
            {COLORS.map((color, index) => (
              <li
                key={color.name}
                title={color.name}
                className={
                  index === item.colorIndex
                    ? "h-3.5 w-3.5 border-b-2 border-black pb-0.5"
                    : "h-3 w-3"
                }
              >
                <span
                  className="block size-full"
                  style={{ backgroundColor: color.hex }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Link>
      <button
        type="button"
        aria-label="Save to wishlist"
        className="absolute right-3 top-3 z-20 text-black"
      >
        <HeartIcon />
      </button>
    </li>
  );
}

export function JeansRow() {
  return (
    <section id="jeans" className="bg-white px-[1.5%] pb-12 pt-6">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {jeans.map((item) => (
          <JeanCard key={item.title} item={item} />
        ))}
      </ul>
    </section>
  );
}
