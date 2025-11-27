"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Necesito experiencia previa en programación o IA?",
      answer:
        "No necesariamente. El curso está diseñado para adaptarse a diferentes niveles. Si eres principiante, tu ruta personalizada incluirá los fundamentos necesarios.",
    },
    {
      question: "¿Cuánto tiempo me tomará completar el curso?",
      answer:
        "Depende de tu ruta personalizada y tiempo disponible. El contenido total es de 10.5-19.7 horas, pero tu ruta personalizada probablemente será de 6-12 horas.",
    },
    {
      question: "¿Qué pasa si el curso no me funciona?",
      answer:
        "Tienes 30 días para probarlo. Si no estás satisfecho por cualquier razón, te devolvemos el 100% de tu dinero, sin preguntas.",
    },
    {
      question: "¿Cómo funciona la personalización con IA?",
      answer:
        "Antes de comprar, respondes 5-7 preguntas sobre tu proyecto, experiencia, meta e industria. Nuestra IA analiza tus respuestas y genera una ruta de aprendizaje específica para ti.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Lomma style */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Encuentra respuestas a tus dudas más comunes.
          </p>
        </div>
        
        {/* FAQ Items - Lomma style */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0 py-6 md:py-8">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left group"
              >
                <span className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
