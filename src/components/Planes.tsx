"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { plans } from "@/lib/pricing";
import Reveal from "@/components/Reveal";

export default function Planes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-ecom-black py-20 lg:py-28"
    >
      <motion.div
        aria-hidden
        style={{ x: drift }}
        className="pointer-events-none absolute inset-x-0 top-24 select-none text-center lg:top-16"
      >
        <span className="text-stroke font-display text-[16vw] leading-none font-medium text-white/10">
          PLANES
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
            Nuestros
          </p>
        </Reveal>

        <div className="mt-24 grid gap-6 lg:mt-32 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-ecom-orange bg-gradient-to-b from-ecom-red to-ecom-black text-white"
                    : "border-white/15 bg-white/5 text-white"
                }`}
              >
                <h3 className="font-display text-lg font-medium">{plan.name}</h3>
                <p className="mt-4 font-display text-3xl font-medium">
                  {plan.price}
                  <span className="ml-1 text-sm font-normal text-white/50">
                    / {plan.duration}
                  </span>
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ecom-orange" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                    plan.featured
                      ? "bg-white text-ecom-black hover:bg-ecom-orange hover:text-white"
                      : "bg-white/10 hover:bg-ecom-orange"
                  }`}
                >
                  Let&rsquo;s talk
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
