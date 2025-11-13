'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Necesito experiencia previa en programación o IA?",
      answer: "No necesariamente. El curso está diseñado para adaptarse a diferentes niveles. Si eres principiante, tu ruta personalizada incluirá los fundamentos necesarios. Si ya tienes experiencia, la IA omitirá lo básico y te enfocará en temas avanzados. Incluimos tanto opciones no-code como programación con IA.",
    },
    {
      question: "¿Cuánto tiempo me tomará completar el curso?",
      answer: "Depende de tu ruta personalizada y tiempo disponible. El contenido total es de 10.5-19.7 horas, pero tu ruta personalizada probablemente será de 6-12 horas. Con 1 hora al día, podrías completarlo en 1-2 semanas. Con 3-4 horas por semana, en 3-6 semanas. Lo mejor: aprendes a tu ritmo, con acceso de por vida.",
    },
    {
      question: "¿Qué pasa si el curso no me funciona?",
      answer: "Tienes 30 días para probarlo. Si no estás satisfecho por cualquier razón, te devolvemos el 100% de tu dinero, sin preguntas. Queremos que solo pagues si realmente obtienes valor del curso.",
    },
    {
      question: "¿Cómo funciona la personalización con IA?",
      answer: "Antes de comprar, respondes 5-7 preguntas sobre tu proyecto, experiencia, meta e industria. Nuestra IA (Claude) analiza tus respuestas y genera una ruta de aprendizaje específica para ti: qué módulos ver, en qué orden, y qué artefactos crear. Esta ruta se adapta mientras avanzas.",
    },
    {
      question: "¿Qué diferencia hay entre los planes?",
      answer: "Básico: Acceso completo a todos los videos, pero tú decides qué ver. Personalizado: La IA crea tu ruta personalizada y te guía paso a paso. Premium: Todo lo anterior + mentoría grupal, revisión 1-on-1 de tu proyecto, y acceso a Demo Days para presentar tu trabajo.",
    },
    {
      question: "¿El contenido se actualiza?",
      answer: "Sí. El mundo de la IA cambia rápido. Actualizamos el curso regularmente con nuevas técnicas, herramientas y tendencias. Todos los planes incluyen acceso a actualizaciones de por vida sin costo adicional.",
    },
    {
      question: "¿Puedo tomar el curso desde cualquier país de Latinoamérica?",
      answer: "Absolutamente. El curso está en español neutral para LatAm. Aceptamos pagos con Stripe (tarjetas internacionales) y Mercado Pago (Pix, OXXO, y métodos locales de LatAm). Los precios se muestran en USD, MXN, ARS y COP.",
    },
    {
      question: "¿Incluye certificado?",
      answer: "El plan Premium incluye un certificado de finalización verificado. Los planes Básico y Personalizado no incluyen certificado formal, pero sí badges digitales que puedes compartir en LinkedIn y tu portafolio.",
    },
    {
      question: "¿Qué tipo de proyectos puedo construir?",
      answer: "Depende de tu industria y meta. Ejemplos: chatbots personalizados, sistemas de automatización de documentos, asistentes de IA para atención al cliente, herramientas de análisis de datos con IA, agentes autónomos, sistemas RAG para bases de conocimiento, y mucho más.",
    },
    {
      question: "¿Puedo acceder desde el móvil?",
      answer: "Sí. La plataforma es 100% responsive. Puedes ver los videos desde tu teléfono, tablet o computadora. Los videos cortos (1-3 min) son perfectos para aprender en momentos libres desde tu móvil.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Respuestas a las dudas más comunes
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 transition-colors flex justify-between items-start gap-4"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
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
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¿Tienes otra pregunta?
          </h3>
          <p className="text-gray-600 mb-4">
            Estamos aquí para ayudarte. Contáctanos directamente.
          </p>
          <a
            href="mailto:hola@betaai.com"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hola@betaai.com
          </a>
        </div>
      </div>
    </section>
  );
}
