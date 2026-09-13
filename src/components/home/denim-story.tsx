"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function DenimStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};
          if (!isDesktop || reduceMotion) return;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: copyRef.current,
            pinSpacing: false,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative grid items-start gap-8 px-[1.5%] py-10 lg:min-h-[160vh] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-10 lg:py-16"
    >
      <div className="min-w-0">
        <div ref={copyRef} className="pr-4">
          <h2 className="max-w-[18ch] text-[clamp(36px,5vw,80px)] leading-[0.95]">
            Radically Reclaimed Denim.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.35] lg:mt-6">
            Discarded jeans. Cut and remade.{" "}
            <span className="whitespace-nowrap">Nothing wasted.</span>
          </p>
        </div>
      </div>
      <div className="relative min-h-[50vh] w-full overflow-hidden lg:min-h-[140vh]">
        <Image
          src="/home/denim-texture.jpg"
          alt="Close-up of reclaimed denim fabric"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
