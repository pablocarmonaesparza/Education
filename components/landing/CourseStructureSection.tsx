'use client';

import { useState } from 'react';

export default function CourseStructureSection() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  // Placeholder data - replace with actual syllabus data later
  const sections = [
    {
      id: 1,
      title: "Fundamentos de IA",
      icon: "🧠",
      description: "Conceptos básicos, tipos de IA, modelos de lenguaje, y casos de uso.",
      duration: "45-60 min",
      videoCount: 25,
    },
    {
      id: 2,
      title: "Prompt Engineering",
      icon: "✍️",
      description: "Técnicas avanzadas para comunicarte efectivamente con modelos de IA.",
      duration: "60-75 min",
      videoCount: 35,
    },
    {
      id: 3,
      title: "APIs y Automatización",
      icon: "🔌",
      description: "Integra IA en tus workflows usando APIs de Claude, GPT y más.",
      duration: "90-120 min",
      videoCount: 40,
    },
    {
      id: 4,
      title: "RAG (Retrieval Augmented Generation)",
      icon: "📚",
      description: "Crea sistemas de IA que acceden a tu base de conocimiento.",
      duration: "75-90 min",
      videoCount: 30,
    },
    {
      id: 5,
      title: "MCP (Model Context Protocol)",
      icon: "🔗",
      description: "Conecta modelos de IA con herramientas y fuentes de datos externas.",
      duration: "60-75 min",
      videoCount: 28,
    },
    {
      id: 6,
      title: "Agentes de IA",
      icon: "🤖",
      description: "Construye agentes autónomos que toman decisiones y ejecutan tareas.",
      duration: "90-120 min",
      videoCount: 38,
    },
    {
      id: 7,
      title: "Vibe-Coding",
      icon: "💻",
      description: "Programa con IA como copiloto. Aumenta tu productividad 10x.",
      duration: "60-90 min",
      videoCount: 32,
    },
    {
      id: 8,
      title: "No-Code & Low-Code AI",
      icon: "🎨",
      description: "Herramientas visuales para crear soluciones de IA sin programar.",
      duration: "45-60 min",
      videoCount: 25,
    },
    {
      id: 9,
      title: "Fine-Tuning y Personalización",
      icon: "⚙️",
      description: "Ajusta modelos de IA para casos de uso específicos.",
      duration: "75-90 min",
      videoCount: 30,
    },
    {
      id: 10,
      title: "IA Multimodal",
      icon: "🎭",
      description: "Trabaja con texto, imágenes, audio y video usando IA.",
      duration: "60-75 min",
      videoCount: 28,
    },
    {
      id: 11,
      title: "Ética y Seguridad en IA",
      icon: "🛡️",
      description: "Privacidad, sesgos, y mejores prácticas para IA responsable.",
      duration: "30-45 min",
      videoCount: 20,
    },
    {
      id: 12,
      title: "Vender Soluciones de IA",
      icon: "💰",
      description: "Marketing, pricing, ventas y monetización de productos con IA.",
      duration: "90-120 min",
      videoCount: 35,
    },
  ];

  return (
    <section id="course-structure" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Estructura del Curso: 12 Módulos Especializados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada módulo es independiente y modular. Tu ruta personalizada seleccionará los más relevantes para ti.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section) => (
            <div
              key={section.id}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-300 cursor-pointer group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl">{section.icon}</div>
                  <div className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    #{section.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {section.title}
                </h3>
              </div>

              {/* Card Body - Shows on hover */}
              <div className={`px-6 pb-6 transition-all duration-300 ${hoveredSection === section.id ? 'block' : 'hidden'} md:block`}>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {section.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{section.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{section.videoCount} videos</span>
                  </div>
                </div>
              </div>

              {/* Gradient bar at bottom */}
              <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">366</div>
              <div className="text-purple-100">Videos Totales</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10.5 - 19.7</div>
              <div className="text-purple-100">Horas de Contenido</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-purple-100">Modular y Flexible</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            ¿Cuáles módulos necesitas TÚ? Descúbrelo con nuestra IA.
          </p>
          <a
            href="/auth/signup"
            className="inline-block bg-gradient-to-r from-purple-700 to-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-800 hover:to-blue-900 transition-all transform hover:scale-105 shadow-lg"
          >
            Comenzar Ahora
          </a>
        </div>
      </div>
    </section>
  );
}
