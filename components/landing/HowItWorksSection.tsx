"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const steps = [
  {
    title: "Describe tu idea",
    description: "Escribe tu idea de proyecto en nuestras palabras. Puede ser cualquier cosa relacionada con automatización, IA o desarrollo de software.",
    image: "/images/module-fundamentals.webp",
  },
  {
    title: "Generamos tu curso",
    description: "Nuestra IA analiza tu idea y crea un plan de estudios personalizado con videos seleccionados específicamente para tu proyecto.",
    image: "/images/module-prompting.webp",
  },
  {
    title: "Aprende y construye",
    description: "Accede a videos cortos y prácticos que te guiarán paso a paso. Aprende mientras construyes tu proyecto real.",
    image: "/images/module-rag.webp",
  },
  {
    title: "Completa tu proyecto",
    description: "Con nuestro sistema de seguimiento de progreso, sabrás exactamente qué has aprendido y qué falta por hacer.",
    image: "/images/module-agents.webp",
  },
];

export default function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transformar el scroll en índice de imagen
  const imageIndex = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 3]
  );

  useEffect(() => {
    const unsubscribe = imageIndex.on("change", (latest) => {
      const index = Math.round(latest);
      if (index >= 0 && index < steps.length) {
        setActiveIndex(index);
      }
    });

    return () => unsubscribe();
  }, [imageIndex]);

  return (
    <section 
      ref={containerRef}
      id="how-it-works" 
      className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Background decoration - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1472FF]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Cómo Funciona
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Text Column - Left 1/3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.5 }}
                className={`space-y-3 ${
                  activeIndex === index ? "scale-105" : "scale-100"
                } transition-transform duration-500`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
            
            {/* Indicators */}
            <div className="flex gap-2 mt-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const element = containerRef.current;
                    if (element) {
                      const scrollPosition = 
                        (window.innerHeight * 0.25) * index + 
                        element.getBoundingClientRect().top + 
                        window.scrollY - window.innerHeight * 0.5;
                      window.scrollTo({
                        top: scrollPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-[#1472FF]"
                      : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Ir al paso ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Image Column - Right 2/3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-full">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.95,
                    zIndex: activeIndex === index ? 10 : 1,
                    pointerEvents: activeIndex === index ? 'auto' : 'none',
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover rounded-2xl"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Next section indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => {
            const element = document.getElementById("available-courses");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <span className="text-sm font-semibold tracking-wide text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
            Cursos
          </span>
          <motion.svg
            className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </button>
      </motion.div>
    </section>
  );
}
