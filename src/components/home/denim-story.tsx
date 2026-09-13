import Image from "next/image";

export function DenimStory() {
  return (
    <section className="grid items-start gap-6 px-[0.5%] py-8 lg:grid-cols-[minmax(0,502fr)_minmax(0,957fr)] lg:gap-0">
      <h2 className="max-w-[502px] text-[clamp(40px,6.67vw,96px)] leading-[0.95]">
        Radically Reclaimed Denim.
      </h2>
      <div className="relative aspect-[957/638] w-full overflow-hidden">
        <Image
          src="/home/denim-texture.jpg"
          alt="Close-up of reclaimed denim fabric"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
