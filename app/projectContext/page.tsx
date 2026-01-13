'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingNavbar from '@/components/onboarding/OnboardingNavbar';

// Simplified questions with slider responses
const questions = [
  {
    id: 'ai_familiarity',
    question: '¿Qué tan familiarizado estás con herramientas de AI como ChatGPT o Claude?',
    lowLabel: 'Nunca las he usado',
    highLabel: 'Las uso diariamente',
  },
  {
    id: 'prompting',
    question: '¿Qué tan avanzadas son tus técnicas de prompting?',
    lowLabel: 'Prompts básicos',
    highLabel: 'System prompts y chains',
  },
  {
    id: 'automation',
    question: '¿Has creado automatizaciones con Zapier, Make o n8n?',
    lowLabel: 'Nunca',
    highLabel: 'Múltiples en producción',
  },
  {
    id: 'coding',
    question: '¿Cuál es tu nivel de programación?',
    lowLabel: 'No sé programar',
    highLabel: 'Programo regularmente',
  },
  {
    id: 'apis',
    question: '¿Has trabajado con APIs?',
    lowLabel: 'No sé qué es',
    highLabel: 'Las uso regularmente',
  },
  {
    id: 'data',
    question: '¿Qué tan cómodo te sientes manejando datos y bases de datos?',
    lowLabel: 'Solo Excel básico',
    highLabel: 'SQL y DBs avanzadas',
  },
  {
    id: 'project_stage',
    question: '¿En qué etapa está tu proyecto?',
    lowLabel: 'Solo una idea',
    highLabel: 'Ya genera ingresos',
  },
  {
    id: 'time_available',
    question: '¿Cuántas horas semanales puedes dedicar a aprender?',
    lowLabel: 'Menos de 3 hrs',
    highLabel: 'Más de 15 hrs',
  },
];

interface QuestionResponse {
  question: string;
  value: number;
  lowLabel: string;
  highLabel: string;
}

export default function ProjectContextPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  // Check if project idea exists
  useEffect(() => {
    const projectIdea = sessionStorage.getItem('projectIdea');
    if (!projectIdea) {
      router.push('/projectDescription');
    }
  }, [router]);

  const currentQuestion = questions[currentIndex];
  const currentValue = answers[currentQuestion.id] ?? 3; // Default to middle

  const handleSliderChange = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    // Save current answer if not already saved
    if (answers[currentQuestion.id] === undefined) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: 3 }));
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuestionnaire();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const finishQuestionnaire = () => {
    // Build responses with full context
    const responses: Record<string, QuestionResponse> = {};
    
    questions.forEach(q => {
      responses[q.id] = {
        question: q.question,
        value: answers[q.id] ?? 3,
        lowLabel: q.lowLabel,
        highLabel: q.highLabel,
      };
    });

    sessionStorage.setItem('projectContext', JSON.stringify(responses));
    router.push('/courseCreation');
  };

  const handleSkip = () => {
    router.push('/courseCreation');
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <OnboardingNavbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            {currentIndex === 0 ? (
              <>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Personaliza tu curso
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                  {questions.length} preguntas rápidas para entender tu nivel.
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-[#1472FF] font-medium">
                  {currentIndex + 1} de {questions.length}
                </span>
                <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  ~{Math.ceil((questions.length - currentIndex) * 0.25)} min restantes
                </span>
              </div>
            )}
          </motion.div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
              <motion.div
                className="bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-12"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-10 leading-relaxed">
                {currentQuestion.question}
              </h2>
              
              {/* Slider Container */}
              <div className="max-w-md mx-auto px-4">
                {/* Labels */}
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 max-w-[120px] text-left">
                    {currentQuestion.lowLabel}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 max-w-[120px] text-right">
                    {currentQuestion.highLabel}
                  </span>
                </div>

                {/* Slider Track */}
                <div className="relative h-12 flex items-center">
                  {/* Background Track */}
                  <div className="absolute w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  
                  {/* Filled Track */}
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] rounded-full transition-all duration-150"
                    style={{ width: `${((currentValue - 1) / 4) * 100}%` }}
                  />

                  {/* Step Markers */}
                  <div className="absolute w-full flex justify-between px-0">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <button
                        key={step}
                        onClick={() => handleSliderChange(step)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                          currentValue === step
                            ? 'bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] text-white scale-125 shadow-lg'
                            : currentValue > step
                              ? 'bg-[#1472FF] text-white'
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>

                  {/* Hidden Range Input for dragging */}
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={currentValue}
                    onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="absolute w-full h-12 opacity-0 cursor-pointer z-10"
                  />
                </div>

                {/* Current Value Label */}
                <div className="text-center mt-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isDragging 
                      ? 'bg-[#1472FF] text-white scale-110' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {currentValue === 1 && currentQuestion.lowLabel}
                    {currentValue === 2 && 'Básico'}
                    {currentValue === 3 && 'Intermedio'}
                    {currentValue === 4 && 'Avanzado'}
                    {currentValue === 5 && currentQuestion.highLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-[#1472FF] text-[#1472FF] bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Anterior
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] hover:from-[#0E5FCC] hover:to-[#1472FF] transition-all duration-300 flex items-center gap-2"
            >
              {currentIndex === questions.length - 1 ? 'Crear mi curso' : 'Siguiente'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </div>

          {/* Question dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[#1472FF] to-[#5BA0FF]'
                    : answers[questions[index].id] !== undefined
                      ? 'w-2 bg-[#1472FF]'
                      : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Skip link */}
          <div className="text-center mt-6">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Saltar este paso
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
