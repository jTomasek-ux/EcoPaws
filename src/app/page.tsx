import Image from "next/image";
import { DenimStory } from "@/components/home/denim-story";
import { DogToys } from "@/components/home/dog-toys";
import { JeansRow } from "@/components/home/jeans-row";

export default function Home() {
  return (
    <main className="bg-white text-black">
      <section className="relative w-full overflow-hidden aspect-[1440/792]">
        <Image
          src="/home/hero-dog.jpg"
          alt="Golden retriever on a leash in the mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_42%]"
        />
      </section>
      <JeansRow />
      <DenimStory />
      <DogToys />
    </main>
  );
}
