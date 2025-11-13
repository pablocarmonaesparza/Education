import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function LearningPathPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Obtener el curso personalizado
  const { data: intakeResponse } = await supabase
    .from('intake_responses')
    .select('generated_path, responses')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // El curso está directamente en generated_path
  const course = intakeResponse?.generated_path;
  const phases = course?.phases || [];
  const userProject = course?.user_project || 'tu proyecto';
  const totalVideos = course?.total_videos || 0;
  const estimatedHours = course?.estimated_hours || '0 horas';

  if (phases.length === 0) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No tienes un curso generado aún
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Completa el onboarding para generar tu curso personalizado
          </p>
          <a
            href="/onboarding"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-800"
          >
            Ir al Onboarding
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/dashboard"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Volver al Dashboard
          </a>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Tu Ruta de Aprendizaje Personalizada 🎓
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{userProject}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-purple-200 dark:border-purple-800 transition-colors">
            <div className="text-3xl mb-2">📹</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalVideos}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Videos Totales</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-200 dark:border-blue-800 transition-colors">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{phases.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fases de Aprendizaje</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-green-200 dark:border-green-800 transition-colors">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{estimatedHours}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Duración Estimada</div>
          </div>
        </div>

        {/* Learning Path Summary */}
        {course?.learning_path_summary && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-xl shadow-lg p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">📍 Tu Camino de Aprendizaje</h2>
            <ul className="space-y-3">
              {course.learning_path_summary.map((step: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="opacity-95">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Phases with Videos */}
        <div className="space-y-6">
          {phases.map((phase: any, phaseIndex: number) => (
            <div
              key={phase.phase_number}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 transition-colors"
            >
              {/* Phase Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-700 p-6 text-white">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl">
                    {['🧠', '🛠️', '🔌', '🚀', '💡', '⚡', '🎯', '📊', '🔥', '✨', '🎨', '🏆'][phaseIndex] || '📚'}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm opacity-80 font-medium">
                      FASE {phase.phase_number} DE {phases.length}
                    </div>
                    <h2 className="text-2xl font-bold">{phase.phase_name}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{phase.videos?.length || 0}</div>
                    <div className="text-sm opacity-80">videos</div>
                  </div>
                </div>
                <p className="opacity-90">{phase.description}</p>
                <div className="mt-2 text-sm opacity-80">
                  ⏱️ Duración: {phase.phase_duration}
                </div>
              </div>

              {/* Videos List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {phase.videos?.map((video: any) => (
                  <div
                    key={video.order}
                    className="p-6 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex gap-4">
                      {/* Video Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-700 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                          {video.order}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                                {video.section}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">→</span>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                {video.subsection}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {video.description}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                              {video.duration}
                            </div>
                          </div>
                        </div>

                        {/* Why Relevant */}
                        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-400 p-3 mt-3 rounded">
                          <div className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1">
                            💡 Por qué es importante:
                          </div>
                          <p className="text-sm text-blue-800 dark:text-blue-300">{video.why_relevant}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {course?.recommendations && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 border-green-200 dark:border-green-800 mt-8 transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Recomendaciones</h2>
            <ul className="space-y-3">
              {course.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 dark:text-green-400 text-xl">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        {course?.next_steps && (
          <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-xl shadow-lg p-8 text-white mt-8">
            <h2 className="text-2xl font-bold mb-4">🚀 Próximos Pasos</h2>
            <ul className="space-y-3">
              {course.next_steps.map((step: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="opacity-95">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Start Button */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-purple-600 to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            🎬 Comenzar Fase 1: {phases[0]?.phase_name}
          </button>
        </div>
      </div>
    </div>
  );
}
