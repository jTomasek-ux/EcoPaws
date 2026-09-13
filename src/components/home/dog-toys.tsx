"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fromTitle = sectionRef.current?.querySelector(".from-title");
        const toTitle = sectionRef.current?.querySelector(".to-title");
        const cards = gsap.utils.toArray<HTMLElement>(".toy-card");
        const floats = gsap.utils.toArray<HTMLElement>(".toy-float");
        const piles = gsap.utils.toArray<HTMLElement>(".toy-pile");

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        intro
          .from(fromTitle, { x: -48, autoAlpha: 0, duration: 0.7 }, 0)
          .from(toTitle, { x: 48, autoAlpha: 0, duration: 0.7 }, 0.08)
          .from(
            cards,
            {
              y: (i) => 36 + i * 14,
              autoAlpha: 0,
              scale: (i) => 0.96 - i * 0.015,
              rotate: (i) => (i === 0 ? -5 : i === 1 ? 4 : 0),
              duration: 0.85,
              stagger: 0.13,
            },
            0.18,
          );

        floats.forEach((el, i) => {
          gsap.to(el, {
            y: i === 0 ? 9 : -11,
            rotate: i === 0 ? 2.4 : -3.2,
            duration: 2.3 + i * 0.45,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 0.8 + i * 0.25,
          });

          const card = el.closest(".toy-card");
          if (!card || !contextSafe) return;

          const onEnter = contextSafe(() => {
            gsap.to(el.parentElement, {
              scale: 1.07,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
          const onLeave = contextSafe(() => {
            gsap.to(el.parentElement, {
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
        });

        piles.forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              yPercent: i === 0 ? -5 : 4,
              xPercent: i === 0 ? 0 : 10,
              scale: i === 0 ? 1 : 1.04,
            },
            {
              yPercent: i === 0 ? 7 : -7,
              xPercent: i === 0 ? 0 : -12,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1 + i * 0.5,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="dog-toys"
      className="overflow-x-clip px-[1.45%] pb-24 pt-8"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h2 className="from-title whitespace-nowrap text-[clamp(22px,3.6vw,56px)] leading-none">
          From dog lovers
        </h2>
        <h2 className="to-title whitespace-nowrap text-[clamp(22px,3.6vw,56px)] leading-none sm:text-right">
          To Dog Lovers
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-[minmax(0,288fr)_minmax(0,288fr)_minmax(0,356fr)_minmax(0,356fr)]">
        <Link
          href="/#dog-toys"
          className="toy-card relative aspect-288/442 bg-[#f8f8f8]"
        >
          <div className="absolute inset-0">
            <div className="toy-float relative size-full">
              <RotatedToy src="/home/toy-1.png" alt="Denim bone dog toy" />
            </div>
          </div>
        </Link>

        <Link
          href="/#dog-toys"
          className="toy-card relative aspect-288/442 bg-[#f8f8f8]"
        >
          <div className="absolute inset-0">
            <div className="toy-float relative size-full">
              <RotatedToy
                src="/home/toy-2.png"
                alt="Two-tone denim bone dog toy"
              />
            </div>
          </div>
        </Link>

        <Link
          href="/#dog-toys"
          className="toy-card relative aspect-356/442 overflow-hidden bg-[#f8f8f8]"
        >
          <div className="toy-pile absolute inset-x-0 top-[-7.5%] h-[107.5%]">
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
          className="toy-card relative aspect-356/442 overflow-hidden bg-[#f8f8f8]"
        >
          <div className="toy-pile absolute left-[-5.6%] top-[-7.5%] h-[118%] w-[196%]">
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
