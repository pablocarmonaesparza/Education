'use client';

import { useState } from 'react';

type Currency = 'USD' | 'MXN' | 'ARS' | 'COP';

export default function PricingSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  const exchangeRates = {
    USD: 1,
    MXN: 17,
    ARS: 350,
    COP: 4000,
  };

  const formatPrice = (usdPrice: number) => {
    const price = Math.round(usdPrice * exchangeRates[selectedCurrency]);
    const symbols = {
      USD: '$',
      MXN: '$',
      ARS: '$',
      COP: '$',
    };
    return `${symbols[selectedCurrency]}${price.toLocaleString()}`;
  };

  const tiers = [
    {
      id: 'basic',
      name: 'Básico',
      price: 147,
      popular: false,
      description: 'Acceso completo para aprender a tu ritmo',
      features: [
        'Acceso a los 400+ micro-videos',
        'Biblioteca completa de 12 módulos',
        'Aprendizaje auto-guiado',
        'Actualizaciones de contenido',
        'Acceso de por vida',
        'Subtítulos en español',
      ],
      cta: 'Comenzar Ahora',
      gradient: 'from-gray-600 to-gray-700',
    },
    {
      id: 'personalized',
      name: 'Personalizado',
      price: 247,
      popular: true,
      description: 'La experiencia completa con IA',
      features: [
        'Todo lo del plan Básico',
        'Ruta personalizada con IA',
        'Análisis de tu proyecto específico',
        'Checkpoints adaptativos',
        'Plantillas de proyectos',
        'Recomendaciones dinámicas',
        'Sistema de badges y progreso',
      ],
      cta: 'Más Popular',
      gradient: 'from-purple-600 to-blue-700',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 497,
      popular: false,
      description: 'Experiencia completa + mentoría',
      features: [
        'Todo lo del plan Personalizado',
        'Mentoría grupal semanal',
        'Revisión 1-on-1 de tu proyecto',
        'Demo Days (presenta tu proyecto)',
        'Acceso prioritario a actualizaciones',
        'Comunidad privada Premium',
        'Certificado de finalización',
        'Soporte técnico prioritario',
      ],
      cta: 'Máxima Inversión',
      gradient: 'from-purple-700 to-blue-800',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Elige Tu Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Inversión única. Acceso de por vida. Sin pagos recurrentes.
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center gap-2 flex-wrap">
            {(['USD', 'MXN', 'ARS', 'COP'] as Currency[]).map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCurrency === currency
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-gradient-to-br from-purple-900 to-blue-900 ring-4 ring-purple-500 shadow-2xl transform lg:-translate-y-4'
                  : 'bg-gray-800'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ MÁS POPULAR
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold">{formatPrice(tier.price)}</span>
                  <span className="text-gray-400 ml-2">{selectedCurrency}</span>
                </div>
                <p className="text-sm text-gray-400">Pago único • Acceso de por vida</p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className={`w-6 h-6 flex-shrink-0 ${
                        tier.popular ? 'text-purple-300' : 'text-purple-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 text-white shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Money-Back Guarantee */}
        <div className="bg-purple-900 bg-opacity-30 border border-purple-500 rounded-xl p-6 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-2xl font-bold text-purple-300">Garantía de Satisfacción</h3>
          </div>
          <p className="text-gray-300">
            Prueba el curso durante 30 días. Si no estás satisfecho, te devolvemos el 100% de tu dinero. Sin preguntas.
          </p>
        </div>

        {/* FAQ Note */}
        <div className="text-center mt-12">
          <p className="text-gray-400">
            ¿Tienes preguntas sobre qué plan elegir?{' '}
            <a href="#faq" className="text-purple-400 hover:text-purple-300 underline">
              Consulta las preguntas frecuentes
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
