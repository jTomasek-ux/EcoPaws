import Image from "next/image";
import Link from "next/link";

export function DogToys() {
  return (
    <section id="dog-toys" className="overflow-hidden px-[1.45%] pb-24 pt-4">
      <div className="mb-6 flex items-end justify-between gap-6">
        <h2 className="max-w-[502px] text-[clamp(28px,4.44vw,64px)] leading-[0.95]">
          From dog lovers
        </h2>
        <h2 className="max-w-[502px] text-right text-[clamp(28px,4.44vw,64px)] leading-[0.95]">
          To Dog Lovers
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-[minmax(0,288fr)_minmax(0,288fr)_minmax(0,356fr)_minmax(0,356fr)]">
        <Link
          href="/collections/playful-parade"
          className="relative aspect-[288/442] bg-[#f8f8f8]"
        >
          <div className="absolute left-[14.9%] top-[16.7%] h-[66.3%] w-[70.1%]">
            <div className="flex size-full items-center justify-center">
              <div className="h-[68.9%] w-[145%] rotate-90">
                <div className="relative size-full overflow-hidden">
                  <img
                    src="/home/toy-1.png"
                    alt="Denim bone dog toy"
                    width={293}
                    height={202}
                    className="absolute max-w-none"
                    style={{
                      height: "203.92%",
                      width: "187.81%",
                      left: "-43.79%",
                      top: "-47.39%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/collections/playful-parade"
          className="relative aspect-[288/442] bg-[#f8f8f8]"
        >
          <div className="absolute left-[6.9%] top-[7%] h-[86%] w-[85.8%]">
            <div className="flex size-full items-center justify-center">
              <div className="relative h-[65%] w-[154%] rotate-90">
                <Image
                  src="/home/toy-2.png"
                  alt="Two-tone denim bone dog toy"
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/collections/playful-parade"
          className="relative aspect-[356/442] overflow-hidden bg-[#f8f8f8]"
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
          href="/collections/playful-parade"
          className="relative aspect-[356/442] overflow-hidden bg-[#f8f8f8]"
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
