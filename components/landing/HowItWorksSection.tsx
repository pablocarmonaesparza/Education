"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

const AuthForm = dynamic(() => import("@/components/auth/AuthForm"), {
  ssr: false,
  loading: () => (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  ),
});

const MIN_CHARACTERS = 200;
const MAX_CHARACTERS = 1000;

export default function HowItWorksSection() {
  const [idea, setIdea] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateIdea = async (text: string) => {
    if (!text.trim() || text.trim().length < MIN_CHARACTERS) {
      setValidationError(null);
      return;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      const response = await fetch("/api/validate-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: text.trim() }),
      });

      const data = await response.json();

      if (!data.valid) {
        setValidationError(data.reason || "La idea no tiene sentido. Por favor, describe mejor tu proyecto.");
      } else {
        setValidationError(null);
      }
    } catch (error) {
      console.error("Error validating idea:", error);
      // No mostrar error si falla la validación, solo si la idea es inválida
    } finally {
      setIsValidating(false);
    }
  };

  const handleIdeaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setIdea(value);
      // Limpiar error de exceso de caracteres si se corrige
      if (validationError?.includes("excede")) {
        setValidationError(null);
      }
    }
  };

  const handleIdeaBlur = () => {
    if (idea.trim().length >= MIN_CHARACTERS && idea.trim().length <= MAX_CHARACTERS) {
      validateIdea(idea);
    }
  };

  const handleGenerateCourse = () => {
    if (!idea.trim() || validationError || idea.trim().length < MIN_CHARACTERS || idea.trim().length > MAX_CHARACTERS) return;
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  return (
    <section id="how-it-works" className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background decoration - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-24">
        {/* Section Header - Lomma style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light mb-6 md:mb-8">
            Describe tu idea y haremos demo para ti.
          </p>
        </motion.div>

        {/* Interactive Text Field */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="relative">
            {/* Text Field Container */}
            <div
              className={`relative bg-white rounded-xl p-3 md:p-4 shadow-lg border-2 transition-all duration-300 ${
                isFocused
                  ? "border-purple-500 shadow-xl scale-[1.01]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Label */}
              <label
                htmlFor="project-idea"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Cuéntanos sobre tu proyecto
              </label>

              {/* Textarea */}
              <textarea
                id="project-idea"
                value={idea}
                onChange={handleIdeaChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  handleIdeaBlur();
                }}
                placeholder="Ejemplo: Quiero crear un chatbot para atención al cliente que integre con WhatsApp y use IA para dar respuestas inteligentes a las preguntas más comunes..."
                className={`w-full min-h-[80px] bg-white text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none font-light leading-relaxed ${
                  validationError || idea.length > MAX_CHARACTERS ? "border-red-300" : ""
                }`}
                rows={4}
              />

              {/* Validation Error */}
              {(validationError || idea.length > MAX_CHARACTERS) && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-red-700 font-medium">
                      {idea.length > MAX_CHARACTERS 
                        ? `Has excedido el límite de ${MAX_CHARACTERS} caracteres. Por favor, reduce tu texto.`
                        : validationError}
                    </p>
                  </div>
                </div>
              )}

              {/* Character count */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <p className={`text-sm ${
                  idea.length > MAX_CHARACTERS 
                    ? "text-red-500 font-semibold" 
                    : idea.length < MIN_CHARACTERS && idea.length > 0
                    ? "text-orange-500 font-medium"
                    : "text-gray-500"
                }`}>
                  {idea.length > 0 
                    ? idea.length < MIN_CHARACTERS
                      ? `${idea.length} / ${MIN_CHARACTERS} caracteres (mínimo)`
                      : `${idea.length} / ${MAX_CHARACTERS} caracteres`
                    : `Mínimo ${MIN_CHARACTERS} caracteres`}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {isValidating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                      <span>Validando...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>IA analizará tu proyecto</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 md:mt-14 text-center"
            >
              <button
                onClick={handleGenerateCourse}
                disabled={!idea.trim() || !!validationError || isValidating || idea.trim().length < MIN_CHARACTERS || idea.trim().length > MAX_CHARACTERS}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base md:text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Generar demo de mi curso
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence mode="wait">
        {showAuthModal && (
          <motion.div
            key="auth-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100"
          >
            {/* Background decoration - Enhanced for glassmorphism */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Base gradient overlay - more vibrant */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/60 via-blue-200/60 to-indigo-200/60" />
              
              {/* Animated orbs - more visible */}
              <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
              <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50" />
              
              {/* Additional layers for depth */}
              <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40" />
              <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40" />
            </div>
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-200 transition-colors z-20 drop-shadow-lg"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Auth Form */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <AuthForm mode={authMode} />
                
                {/* Toggle between login/signup */}
                <div className="px-8 pb-6 text-center">
                  <button
                    onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {authMode === "login" ? (
                      <>¿No tienes cuenta? <span className="font-semibold text-purple-600">Regístrate gratis</span></>
                    ) : (
                      <>¿Ya tienes cuenta? <span className="font-semibold text-purple-600">Inicia sesión</span></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
