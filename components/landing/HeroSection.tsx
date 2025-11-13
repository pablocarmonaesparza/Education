'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Domina la IA y Automatización:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100">
              De Cero a Construir y Vender Tu Solución
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed opacity-90">
            No es un curso lineal. Es un sistema de IA que analiza tu proyecto específico
            y genera una ruta de aprendizaje personalizada.
          </p>

          {/* Secondary description */}
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-80">
            400 micro-videos de 1-3 minutos. Aprende solo lo que necesitas, cuando lo necesitas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/auth/signup"
              className="bg-white text-purple-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Crear Cuenta Gratis
            </Link>
            <Link
              href="#course-structure"
              className="bg-purple-800 bg-opacity-50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-70 transition-all border border-white border-opacity-30"
            >
              Ver Contenido Completo
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>400 micro-lecciones</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>12 módulos especializados</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Incluye MCP, RAG, Vibe-Coding</span>
            </div>
          </div>

          {/* Demo Video Placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="aspect-video bg-black bg-opacity-30 rounded-xl shadow-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20">
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Video Demo: Cómo Funciona la IA de Personalización</p>
                <p className="text-sm opacity-75 mt-2">3 minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
