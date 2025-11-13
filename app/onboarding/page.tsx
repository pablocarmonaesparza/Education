'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [projectIdea, setProjectIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleCreateCourse = async () => {
    if (!projectIdea.trim()) {
      setError('Por favor describe tu idea antes de continuar');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Obtener el usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No estás autenticado');
      }

      // Progreso más lento para 2-3 minutos
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          // Incrementar más lento: 2% cada 3 segundos = ~2.5 minutos para llegar a 95%
          return prev + 2;
        });
      }, 3000);

      // Iniciar el procesamiento (n8n responderá inmediatamente)
      console.log('Starting course generation...');

      const response = await fetch('/api/generate-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          user_email: user.email,
          user_name: user.user_metadata?.name || 'Usuario',
          project_idea: projectIdea,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error starting generation:', errorData);
        throw new Error(errorData.error || 'Error al iniciar la generación del curso.');
      }

      const result = await response.json();
      console.log('Generation started:', result);

      // Hacer polling cada 5 segundos para ver si ya terminó
      const checkCompletion = async (): Promise<boolean> => {
        const { data, error } = await supabase
          .from('intake_responses')
          .select('generated_path')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.log('Still processing...');
          return false;
        }

        // Si tiene generated_path, ya terminó
        if (data && data.generated_path) {
          console.log('Course generation completed!');
          return true;
        }

        return false;
      };

      // Polling: revisar cada 5 segundos
      const pollInterval = setInterval(async () => {
        const isComplete = await checkCompletion();

        if (isComplete) {
          clearInterval(pollInterval);
          clearInterval(progressInterval);
          setProgress(100);

          // Esperar un momento para mostrar 100%
          setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
          }, 1000);
        }
      }, 5000); // Cada 5 segundos

      // Timeout de seguridad: si después de 4 minutos no terminó, mostrar error
      setTimeout(() => {
        clearInterval(pollInterval);
        clearInterval(progressInterval);
        setError('La generación está tomando más tiempo del esperado. Por favor recarga la página.');
        setLoading(false);
      }, 240000); // 4 minutos

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al crear tu curso. Intenta de nuevo.');
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {!loading ? (
          // Formulario de idea
          <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤖</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                ¡Bienvenido! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Cuéntanos qué quieres construir con IA
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Describe tu proyecto o idea 💡
                </label>
                <textarea
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  placeholder="Ejemplo: Quiero crear un chatbot para atención al cliente que responda preguntas sobre productos, integrado con mi inventario en Shopify..."
                  rows={8}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Sé específico: ¿Qué problema quieres resolver? ¿Qué herramientas usas?
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4 py-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Rápido</h3>
                  <p className="text-xs text-gray-600">Tu curso estará listo en ~30 segundos</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Personalizado</h3>
                  <p className="text-xs text-gray-600">100% adaptado a tu proyecto</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">🚀</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Accionable</h3>
                  <p className="text-xs text-gray-600">Pasos concretos para implementar</p>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleCreateCourse}
                disabled={!projectIdea.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                🎓 Crear Mi Curso Personalizado
              </button>

              <p className="text-center text-sm text-gray-500">
                Nuestra IA analizará tu idea y generará un curso específico para ti
              </p>
            </div>
          </div>
        ) : (
          // Loading State
          <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12">
            <div className="text-center">
              {/* Animated Icon */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-4xl animate-bounce">🤖</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Creando tu curso personalizado...
              </h2>
              <p className="text-gray-600 mb-8">
                Nuestra IA está analizando tu proyecto y diseñando tu ruta de aprendizaje
              </p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-700 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-purple-600 mt-2">{progress}%</p>
              </div>

              {/* Loading Steps */}
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className={`flex items-center gap-3 transition-opacity ${progress >= 20 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 20 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {progress >= 20 ? '✓' : '○'}
                  </div>
                  <span className="text-sm text-gray-700">Analizando tu idea de proyecto</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress >= 40 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 40 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {progress >= 40 ? '✓' : '○'}
                  </div>
                  <span className="text-sm text-gray-700">Consultando base de conocimiento</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress >= 60 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 60 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {progress >= 60 ? '✓' : '○'}
                  </div>
                  <span className="text-sm text-gray-700">Seleccionando módulos relevantes</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress >= 80 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 80 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {progress >= 80 ? '✓' : '○'}
                  </div>
                  <span className="text-sm text-gray-700">Generando tu ruta personalizada</span>
                </div>
                <div className={`flex items-center gap-3 transition-opacity ${progress >= 95 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 95 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {progress >= 95 ? '✓' : '○'}
                  </div>
                  <span className="text-sm text-gray-700">Finalizando tu curso</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-8">
                Esto puede tomar hasta 30 segundos...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
