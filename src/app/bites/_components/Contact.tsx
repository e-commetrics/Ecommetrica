"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <main>
      <div ref={ref} className="relative h-80 w-full overflow-hidden md:h-[500px]">
        <motion.div
          style={{
            y,
            backgroundImage: "url(/bites/parallax.webp)",
          }}
          className="absolute inset-[-15%] bg-cover bg-center"
          role="img"
          aria-label="Somos una clínica especializada en diseño de sonrisa con procedimientos no invasivos con técnicas y equipo de primer nivel en Tijuana "
        />
      </div>
    </main>
  );
};

export default Contact;
