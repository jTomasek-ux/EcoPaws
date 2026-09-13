import Image from "next/image";
import Link from "next/link";

type Jean = {
  src: string;
  alt: string;
  href: string;
  title?: string;
  price?: string;
  sizes?: string;
  sizesBar?: boolean;
};

const jeans: Jean[] = [
  {
    src: "/home/jeans-1.jpg",
    alt: "Blue wide-leg jeans",
    title: "Blue Jeans",
    price: "20$",
    href: "/collections",
  },
  {
    src: "/home/jeans-2.jpg",
    alt: "Person wearing faded wide-leg jeans and a white tank",
    href: "/collections",
  },
  {
    src: "/home/jeans-3.jpg",
    alt: "Person wearing dark wide-leg jeans",
    sizes: "S   L",
    href: "/collections",
  },
  {
    src: "/home/jeans-4.jpg",
    alt: "Faded green wide-leg jeans",
    sizes: "S  M  L  X",
    sizesBar: true,
    href: "/collections",
  },
];

export function JeansRow() {
  return (
    <section id="jeans" className="bg-[#f2f2f2] px-[1.5%] pb-10 pt-1">
      <ul className="grid grid-cols-2 gap-[1.4%] lg:grid-cols-4">
        {jeans.map((item) => (
          <li key={item.src} className="min-w-0">
            <Link href={item.href} className="block">
              <div className="relative aspect-[348/523] overflow-hidden bg-[#f2f2f2]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                {item.sizes ? (
                  <div
                    className={
                      item.sizesBar
                        ? "absolute inset-x-0 bottom-[6.7%] flex h-[35px] items-center bg-white/71 px-3 text-[16px] leading-none"
                        : "absolute bottom-[5.2%] left-3 text-[16px] leading-none"
                    }
                  >
                    {item.sizes}
                  </div>
                ) : null}
              </div>
              {item.title ? (
                <div className="pt-1 text-[20px] leading-tight">
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
