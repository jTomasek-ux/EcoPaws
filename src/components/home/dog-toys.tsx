import Image from "next/image";
import Link from "next/link";

function RotatedToy({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative h-[52%] w-[123%] rotate-90">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="25vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function DogToys() {
  return (
    <section id="dog-toys" className="overflow-hidden px-[1.45%] pb-24 pt-4">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h2 className="whitespace-nowrap text-[clamp(22px,3.6vw,56px)] leading-none">
          From dog lovers
        </h2>
        <h2 className="whitespace-nowrap text-[clamp(22px,3.6vw,56px)] leading-none sm:text-right">
          To Dog Lovers
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-[minmax(0,288fr)_minmax(0,288fr)_minmax(0,356fr)_minmax(0,356fr)]">
        <Link
          href="/#dog-toys"
          className="relative aspect-288/442 bg-[#f8f8f8]"
        >
          <RotatedToy src="/home/toy-1.png" alt="Denim bone dog toy" />
        </Link>

        <Link
          href="/#dog-toys"
          className="relative aspect-288/442 bg-[#f8f8f8]"
        >
          <RotatedToy src="/home/toy-2.png" alt="Two-tone denim bone dog toy" />
        </Link>

        <Link
          href="/#dog-toys"
          className="relative aspect-356/442 overflow-hidden bg-[#f8f8f8]"
        >
          <div className="absolute inset-x-0 top-[-7.5%] h-[107.5%]">
            <Image
              src="/home/toy-3.png"
              alt="Pile of small denim bone toys"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        </Link>

        <Link
          href="/#dog-toys"
          className="relative aspect-356/442 overflow-hidden bg-[#f8f8f8]"
        >
          <div className="absolute left-[-5.6%] top-[-7.5%] h-[118%] w-[196%]">
            <Image
              src="/home/toy-4.png"
              alt="Assorted denim bone dog toys"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
