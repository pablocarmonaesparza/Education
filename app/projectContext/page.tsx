'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingNavbar from '@/components/onboarding/OnboardingNavbar';

// Types
interface Option {
  value: number;
  label: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface TrunkQuestion extends Question {
  branches?: Question[]; // Branch questions activated if user selects 3 or 4
}

// Complete question system
const trunkQuestions: TrunkQuestion[] = [
  // TRUNK 1: AI Familiarity
  {
    id: 'ai_familiarity',
    question: '¿Qué tan familiarizado estás con herramientas de AI como ChatGPT o Claude?',
    options: [
      { value: 1, label: 'Nunca las he usado o muy pocas veces' },
      { value: 2, label: 'Las uso ocasionalmente para tareas simples' },
      { value: 3, label: 'Las uso varias veces por semana para trabajo' },
      { value: 4, label: 'Las uso diariamente, son esenciales en mi flujo' },
    ],
    branches: [
      {
        id: 'ai_tool',
        question: '¿Cuál es tu herramienta de AI principal actualmente?',
        options: [
          { value: 1, label: 'ChatGPT (free o Plus)' },
          { value: 2, label: 'Claude (Sonnet o Opus)' },
          { value: 3, label: 'Gemini o Perplexity' },
          { value: 4, label: 'Uso varias según la tarea' },
        ],
      },
      {
        id: 'prompting_level',
        question: '¿Cuál de estas técnicas usas regularmente en tus prompts?',
        options: [
          { value: 1, label: 'Doy contexto básico y pido lo que necesito' },
          { value: 2, label: 'Uso ejemplos o pido formatos específicos' },
          { value: 3, label: 'Uso system prompts o chain of thought' },
          { value: 4, label: 'Tengo librería de prompts y meta-prompts' },
        ],
      },
      {
        id: 'ai_features',
        question: '¿Cuáles de estos features has usado?',
        options: [
          { value: 1, label: 'Solo chat básico' },
          { value: 2, label: 'Análisis de documentos o imágenes' },
          { value: 3, label: 'Custom GPTs o Claude Projects' },
          { value: 4, label: 'APIs de AI o integraciones programáticas' },
        ],
      },
      {
        id: 'rag_knowledge',
        question: '¿Has trabajado con RAG (Retrieval Augmented Generation)?',
        options: [
          { value: 1, label: 'No sé qué es RAG' },
          { value: 2, label: 'Entiendo el concepto pero no lo he implementado' },
          { value: 3, label: 'He subido docs a Custom GPTs o Projects' },
          { value: 4, label: 'He implementado RAG con vector databases' },
        ],
      },
    ],
  },
  // TRUNK 2: Automation
  {
    id: 'automation',
    question: '¿Has creado flujos de automatización con Zapier, Make o n8n?',
    options: [
      { value: 1, label: 'No sé qué son o nunca las he usado' },
      { value: 2, label: 'He probado alguna pero no tengo nada activo' },
      { value: 3, label: 'Tengo automatizaciones simples activas' },
      { value: 4, label: 'Tengo múltiples automatizaciones en producción' },
    ],
    branches: [
      {
        id: 'automation_tool',
        question: '¿Cuál es tu herramienta principal de automatización?',
        options: [
          { value: 1, label: 'Zapier' },
          { value: 2, label: 'Make (Integromat)' },
          { value: 3, label: 'n8n' },
          { value: 4, label: 'Varias combinadas' },
        ],
      },
      {
        id: 'flow_complexity',
        question: '¿Qué tipo de automatizaciones has construido?',
        options: [
          { value: 1, label: 'Conexiones simples (form → spreadsheet)' },
          { value: 2, label: 'Flujos multi-paso con transformación' },
          { value: 3, label: 'Flujos con condicionales y error handling' },
          { value: 4, label: 'Flujos con APIs, webhooks o código custom' },
        ],
      },
      {
        id: 'automation_ai',
        question: '¿Has integrado AI dentro de tus automatizaciones?',
        options: [
          { value: 1, label: 'No, solo automatizo sin AI' },
          { value: 2, label: 'Lo he intentado sin mucho éxito' },
          { value: 3, label: 'Tengo 1-2 flujos que usan AI' },
          { value: 4, label: 'AI es parte central de varios flujos' },
        ],
      },
    ],
  },
  // TRUNK 3: Technical Level
  {
    id: 'technical_level',
    question: '¿Cuál describe mejor tu relación con el código?',
    options: [
      { value: 1, label: 'No sé programar y prefiero evitarlo' },
      { value: 2, label: 'No programo pero puedo modificar código' },
      { value: 3, label: 'Entiendo código y escribo scripts básicos' },
      { value: 4, label: 'Programo regularmente en uno o más lenguajes' },
    ],
    branches: [
      {
        id: 'main_language',
        question: '¿Con qué lenguaje te sientes más cómodo?',
        options: [
          { value: 1, label: 'JavaScript / TypeScript' },
          { value: 2, label: 'Python' },
          { value: 3, label: 'No-code avanzado (Webflow, Bubble)' },
          { value: 4, label: 'Otro lenguaje o varios' },
        ],
      },
      {
        id: 'ai_coding_tools',
        question: '¿Has usado herramientas de AI para programar?',
        options: [
          { value: 1, label: 'No las he probado' },
          { value: 2, label: 'Las he probado pero no las uso' },
          { value: 3, label: 'Uso Copilot para autocompletado' },
          { value: 4, label: 'Uso Cursor o Claude Code regularmente' },
        ],
      },
      {
        id: 'vibe_coding',
        question: '¿Has usado herramientas que generan apps desde prompts?',
        options: [
          { value: 1, label: 'No sé qué son' },
          { value: 2, label: 'Las conozco pero no las he usado' },
          { value: 3, label: 'He generado prototipos con ellas' },
          { value: 4, label: 'He lanzado proyectos reales con ellas' },
        ],
      },
    ],
  },
  // TRUNK 4: APIs
  {
    id: 'apis',
    question: '¿Has trabajado con APIs (conectar servicios programáticamente)?',
    options: [
      { value: 1, label: 'No sé qué es una API' },
      { value: 2, label: 'Entiendo el concepto pero no he usado' },
      { value: 3, label: 'He conectado APIs usando no-code o Postman' },
      { value: 4, label: 'Trabajo regularmente con APIs y webhooks' },
    ],
    branches: [
      {
        id: 'api_types',
        question: '¿Qué tipo de APIs has usado más?',
        options: [
          { value: 1, label: 'APIs de productividad (Sheets, Notion)' },
          { value: 2, label: 'APIs de comunicación (Slack, WhatsApp)' },
          { value: 3, label: 'APIs de AI (OpenAI, Anthropic)' },
          { value: 4, label: 'APIs de pagos, CRMs o especializadas' },
        ],
      },
      {
        id: 'api_auth',
        question: '¿Con qué autenticación de API estás familiarizado?',
        options: [
          { value: 1, label: 'Solo API keys simples' },
          { value: 2, label: 'Bearer tokens / JWT básico' },
          { value: 3, label: 'OAuth 2.0 completo' },
          { value: 4, label: 'Múltiples métodos incluyendo webhooks' },
        ],
      },
    ],
  },
  // TRUNK 5: Content Generation
  {
    id: 'content',
    question: '¿Cómo generas contenido (textos, imágenes, videos) actualmente?',
    options: [
      { value: 1, label: 'Todo manual, sin AI' },
      { value: 2, label: 'Uso AI para textos pero no para visual' },
      { value: 3, label: 'Uso AI para textos e imágenes regularmente' },
      { value: 4, label: 'Tengo workflows para producir en escala' },
    ],
    branches: [
      {
        id: 'visual_tools',
        question: '¿Qué herramientas de generación visual usas?',
        options: [
          { value: 1, label: 'DALL-E dentro de ChatGPT' },
          { value: 2, label: 'Midjourney o Stable Diffusion' },
          { value: 3, label: 'Video AI (Runway, Sora, etc.)' },
          { value: 4, label: 'Múltiples según el contenido' },
        ],
      },
      {
        id: 'content_volume',
        question: '¿Cuántas piezas produces al mes con AI?',
        options: [
          { value: 1, label: 'Menos de 10 piezas/mes' },
          { value: 2, label: '10-30 piezas/mes' },
          { value: 3, label: '30-100 piezas/mes' },
          { value: 4, label: 'Más de 100 piezas/mes' },
        ],
      },
    ],
  },
  // TRUNK 6: Data & Analytics
  {
    id: 'data',
    question: '¿Cómo manejas datos y análisis en tu trabajo?',
    options: [
      { value: 1, label: 'Excel/Sheets básico' },
      { value: 2, label: 'Uso dashboards pero no los creo yo' },
      { value: 3, label: 'Creo reportes con herramientas de BI o SQL' },
      { value: 4, label: 'Trabajo con bases de datos y análisis avanzado' },
    ],
    branches: [
      {
        id: 'data_tools',
        question: '¿Cuál es tu herramienta principal para datos?',
        options: [
          { value: 1, label: 'Google Sheets / Excel avanzado' },
          { value: 2, label: 'Airtable, Notion databases' },
          { value: 3, label: 'SQL o herramientas de BI' },
          { value: 4, label: 'Python/R o bases de datos propias' },
        ],
      },
      {
        id: 'sql_level',
        question: '¿Qué tan cómodo te sientes con SQL?',
        options: [
          { value: 1, label: 'No sé SQL' },
          { value: 2, label: 'SELECT básicos con WHERE' },
          { value: 3, label: 'JOINs, GROUP BY y subqueries' },
          { value: 4, label: 'CTEs, window functions, etc.' },
        ],
      },
    ],
  },
  // TRUNK 7: Sales
  {
    id: 'sales',
    question: '¿Cuál es tu experiencia vendiendo productos o servicios?',
    options: [
      { value: 1, label: 'Nunca he vendido nada directamente' },
      { value: 2, label: 'He vendido ocasionalmente sin proceso' },
      { value: 3, label: 'Vendo regularmente con proceso básico' },
      { value: 4, label: 'Tengo pipeline, CRM y proceso estructurado' },
    ],
    branches: [
      {
        id: 'sales_channel',
        question: '¿Cómo consigues la mayoría de tus clientes?',
        options: [
          { value: 1, label: 'Referidos y boca a boca' },
          { value: 2, label: 'Contenido e inbound (me encuentran)' },
          { value: 3, label: 'Outreach activo (cold email, LinkedIn)' },
          { value: 4, label: 'Combinación sistemática inbound/outbound' },
        ],
      },
      {
        id: 'sales_automation',
        question: '¿Qué tan automatizado está tu proceso de ventas?',
        options: [
          { value: 1, label: 'Nada automatizado, todo manual' },
          { value: 2, label: 'Algunas herramientas pero mayormente manual' },
          { value: 3, label: 'Secuencias de email automatizadas' },
          { value: 4, label: 'Pipeline completo con scoring y nurturing' },
        ],
      },
    ],
  },
  // TRUNK 8: MCP
  {
    id: 'mcp',
    question: '¿Has escuchado o trabajado con MCP (Model Context Protocol)?',
    options: [
      { value: 1, label: 'No sé qué es' },
      { value: 2, label: 'He escuchado pero no lo he usado' },
      { value: 3, label: 'He configurado algún MCP server' },
      { value: 4, label: 'He creado o personalizado MCP servers' },
    ],
    branches: [
      {
        id: 'mcp_servers',
        question: '¿Qué tipo de MCP servers has utilizado?',
        options: [
          { value: 1, label: 'Filesystem o GitHub básico' },
          { value: 2, label: 'Integraciones de productividad' },
          { value: 3, label: 'Bases de datos (Supabase, Postgres)' },
          { value: 4, label: 'Múltiples servers o custom' },
        ],
      },
    ],
  },
  // TRUNK 9-12: Context questions (no branches)
  {
    id: 'objective',
    question: '¿Qué resultado te importa MÁS lograr en los próximos 3 meses?',
    options: [
      { value: 1, label: 'Ahorrar tiempo automatizando tareas' },
      { value: 2, label: 'Crear contenido más rápido con AI' },
      { value: 3, label: 'Lanzar un producto o servicio nuevo' },
      { value: 4, label: 'Generar más ventas o leads' },
    ],
  },
  {
    id: 'project_stage',
    question: '¿En qué etapa está tu proyecto actualmente?',
    options: [
      { value: 1, label: 'Solo tengo una idea, nada construido' },
      { value: 2, label: 'Tengo algo básico pero no genera ingresos' },
      { value: 3, label: 'Genera ingresos, quiero escalar' },
      { value: 4, label: 'Ya funciona, quiero optimizar con AI' },
    ],
  },
  {
    id: 'time_available',
    question: '¿Cuántas horas semanales puedes dedicar a aprender?',
    options: [
      { value: 1, label: 'Menos de 3 horas por semana' },
      { value: 2, label: '3-7 horas por semana' },
      { value: 3, label: '7-15 horas por semana' },
      { value: 4, label: 'Más de 15 horas por semana' },
    ],
  },
  {
    id: 'urgency',
    question: '¿En cuánto tiempo necesitas ver resultados tangibles?',
    options: [
      { value: 1, label: 'Sin prisa, quiero aprender bien' },
      { value: 2, label: 'En 2-3 meses tener algo funcionando' },
      { value: 3, label: 'En 4-6 semanas avanzar significativamente' },
      { value: 4, label: 'Lo antes posible, tengo urgencia' },
    ],
  },
];

export default function ProjectContextPage() {
  const [currentTrunkIndex, setCurrentTrunkIndex] = useState(0);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(-1); // -1 means we're on trunk
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activatedBranches, setActivatedBranches] = useState<Set<string>>(new Set());
  const router = useRouter();

  // Check if project idea exists
  useEffect(() => {
    const projectIdea = sessionStorage.getItem('projectIdea');
    if (!projectIdea) {
      router.push('/projectDescription');
    }
  }, [router]);

  // Safety checks for bounds
  const safeCurrentTrunkIndex = Math.min(currentTrunkIndex, trunkQuestions.length - 1);
  const currentTrunk = trunkQuestions[safeCurrentTrunkIndex];
  const isInBranch = currentBranchIndex >= 0;
  
  // Get current question with safety checks
  const getCurrentQuestion = () => {
    if (!currentTrunk) return trunkQuestions[0];
    if (isInBranch && currentTrunk.branches && currentTrunk.branches[currentBranchIndex]) {
      return currentTrunk.branches[currentBranchIndex];
    }
    return currentTrunk;
  };
  const currentQuestion = getCurrentQuestion();

  // Calculate progress
  const calculateProgress = () => {
    let totalAnswered = Object.keys(answers).length;
    let totalQuestions = trunkQuestions.length;
    
    // Add activated branch questions
    trunkQuestions.forEach((trunk, index) => {
      if (trunk.branches && activatedBranches.has(trunk.id)) {
        totalQuestions += trunk.branches.length;
      }
    });
    
    return { answered: totalAnswered, total: totalQuestions };
  };

  const progress = calculateProgress();

  const handleSelect = (value: number) => {
    const questionId = currentQuestion.id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));

    // If on trunk and selected 3 or 4, activate branches
    if (!isInBranch && value >= 3 && currentTrunk.branches && currentTrunk.branches.length > 0) {
      setActivatedBranches(prev => new Set([...prev, currentTrunk.id]));
    }

    // Auto-advance after selection
    setTimeout(() => {
      handleNext(value);
    }, 400);
  };

  const handleNext = (selectedValue?: number) => {
    const value = selectedValue ?? answers[currentQuestion.id];
    
    if (!isInBranch) {
      // We're on a trunk question
      const shouldBranch = value >= 3 && currentTrunk.branches && currentTrunk.branches.length > 0;
      
      if (shouldBranch) {
        // Go to first branch question
        setCurrentBranchIndex(0);
      } else {
        // Go to next trunk
        if (currentTrunkIndex < trunkQuestions.length - 1) {
          setCurrentTrunkIndex(prev => prev + 1);
          setCurrentBranchIndex(-1);
        } else {
          // Finished all questions
          finishQuestionnaire();
        }
      }
    } else {
      // We're in a branch
      if (currentTrunk.branches && currentBranchIndex < currentTrunk.branches.length - 1) {
        // Go to next branch question
        setCurrentBranchIndex(prev => prev + 1);
      } else {
        // Finished this branch, go to next trunk
        if (currentTrunkIndex < trunkQuestions.length - 1) {
          setCurrentTrunkIndex(prev => prev + 1);
          setCurrentBranchIndex(-1);
        } else {
          // Finished all questions
          finishQuestionnaire();
        }
      }
    }
  };

  const handlePrevious = () => {
    if (isInBranch && currentBranchIndex > 0) {
      // Go to previous branch question
      setCurrentBranchIndex(prev => prev - 1);
    } else if (isInBranch && currentBranchIndex === 0) {
      // Go back to trunk from first branch
      setCurrentBranchIndex(-1);
    } else if (currentTrunkIndex > 0) {
      // Go to previous trunk
      const prevTrunk = trunkQuestions[currentTrunkIndex - 1];
      const prevAnswer = answers[prevTrunk.id];
      const prevHadBranches = prevAnswer >= 3 && prevTrunk.branches && prevTrunk.branches.length > 0;
      
      setCurrentTrunkIndex(prev => prev - 1);
      if (prevHadBranches && prevTrunk.branches) {
        setCurrentBranchIndex(prevTrunk.branches.length - 1);
      } else {
        setCurrentBranchIndex(-1);
      }
    } else {
      router.back();
    }
  };

  const [isFinishing, setIsFinishing] = useState(false);

  const finishQuestionnaire = () => {
    setIsFinishing(true);
    sessionStorage.setItem('projectContext', JSON.stringify(answers));
    router.push('/courseCreation');
  };

  const handleSkip = () => {
    setIsFinishing(true);
    router.push('/courseCreation');
  };

  // Show nothing while finishing/redirecting
  if (isFinishing || !currentQuestion) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1472FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Get visual indicator of which trunk we're on
  const getOverallPosition = () => {
    let position = currentTrunkIndex + 1;
    return `${position} de ${trunkQuestions.length}`;
  };

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
            {progress.answered === 0 ? (
              <>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Personaliza tu curso
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                  En menos de 5 minutos, entenderemos tu nivel y crearemos un curso perfecto para ti.
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-[#1472FF] font-medium">
                  {progress.answered} de {progress.total}
                </span>
                <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  ~{Math.max(1, Math.ceil((progress.total - progress.answered) * 0.3))} min restantes
                </span>
              </div>
            )}
            
            {isInBranch && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#1472FF] font-medium"
              >
                ¡Genial! Profundizando para personalizar mejor...
              </motion.p>
            )}
          </motion.div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
              <motion.div
                className="bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(progress.answered / Math.max(progress.total, 1)) * 100}%` }}
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
              className="mb-10"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl text-sm font-medium text-left transition-all duration-200 ${
                      answers[currentQuestion.id] === option.value
                        ? 'bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] text-white'
                        : 'bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#1472FF] dark:hover:border-[#1472FF]'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
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
              onClick={() => handleNext()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!answers[currentQuestion.id]}
              className="px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] hover:from-[#0E5FCC] hover:to-[#1472FF] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentTrunkIndex === trunkQuestions.length - 1 && !isInBranch ? 'Crear mi curso' : 'Siguiente'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </div>

          {/* Trunk indicators */}
          <div className="flex justify-center gap-1.5 mt-8">
            {trunkQuestions.map((trunk, index) => {
              const isAnswered = answers[trunk.id] !== undefined;
              const isCurrent = index === currentTrunkIndex;
              const hasBranches = trunk.branches && trunk.branches.length > 0;
              const branchesActivated = activatedBranches.has(trunk.id);
              
              return (
                <div key={trunk.id} className="flex items-center gap-0.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-6 bg-gradient-to-r from-[#1472FF] to-[#5BA0FF]'
                        : isAnswered
                          ? 'w-1.5 bg-[#1472FF]'
                          : 'w-1.5 bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                  {/* Show small dots for branch questions if activated */}
                  {hasBranches && branchesActivated && trunk.branches?.map((branch, bIndex) => (
                    <div
                      key={branch.id}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        answers[branch.id] !== undefined
                          ? 'bg-[#1472FF]/60'
                          : isCurrent && isInBranch && bIndex === currentBranchIndex
                            ? 'bg-[#1472FF]'
                            : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              );
            })}
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
