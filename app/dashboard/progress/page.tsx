import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProgressPage() {
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
    .select('generated_path')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Obtener progreso de videos
  const { data: videoProgress } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', user.id);

  const course = intakeResponse?.generated_path;
  const phases = course?.phases || [];
  const totalVideos = course?.total_videos || 0;

  // Calcular estadísticas
  const completedVideos = videoProgress?.filter(v => v.completed)?.length || 0;
  const inProgressVideos = videoProgress?.filter(v => !v.completed && v.progress > 0)?.length || 0;
  const overallProgress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  // Progreso por fase
  const phaseProgress = phases.map((phase: any) => {
    const phaseVideos = phase.videos || [];
    const completed = phaseVideos.filter((video: any) =>
      videoProgress?.some(v => v.video_id === video.order.toString() && v.completed)
    ).length;
    return {
      ...phase,
      completed,
      total: phaseVideos.length,
      percentage: phaseVideos.length > 0 ? Math.round((completed / phaseVideos.length) * 100) : 0
    };
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mi Progreso 📊</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Seguimiento detallado de tu avance en el curso
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-purple-200 dark:border-purple-800 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl">🎯</div>
            <div className={`text-2xl font-bold ${overallProgress >= 75 ? 'text-green-600 dark:text-green-400' : overallProgress >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
              {overallProgress}%
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Progreso General</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-700 h-2 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-green-200 dark:border-green-800 transition-colors">
          <div className="text-3xl mb-3">✅</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completedVideos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Videos Completados</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">de {totalVideos} totales</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-yellow-200 dark:border-yellow-800 transition-colors">
          <div className="text-3xl mb-3">⏳</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{inProgressVideos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">En Progreso</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">videos iniciados</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 border-blue-200 dark:border-blue-800 transition-colors">
          <div className="text-3xl mb-3">🏆</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {phaseProgress.filter((p: any) => p.percentage === 100).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Fases Completas</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">de {phases.length} totales</div>
        </div>
      </div>

      {/* Progress by Phase */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Progreso por Fase</h2>
        <div className="space-y-6">
          {phaseProgress.map((phase: any, index: number) => (
            <div key={phase.phase_number} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {['🧠', '🛠️', '🔌', '🚀', '💡', '⚡', '🎯', '📊', '🔥', '✨', '🎨', '🏆'][index] || '📚'}
                  </span>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">FASE {phase.phase_number}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{phase.phase_name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${phase.percentage === 100 ? 'text-green-600 dark:text-green-400' : phase.percentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {phase.percentage}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {phase.completed}/{phase.total} videos
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    phase.percentage === 100
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : phase.percentage >= 50
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                      : 'bg-gradient-to-r from-purple-600 to-blue-700'
                  }`}
                  style={{ width: `${phase.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Actividad Reciente 📅</h2>
        {videoProgress && videoProgress.length > 0 ? (
          <div className="space-y-4">
            {videoProgress.slice(0, 5).map((progress: any) => (
              <div key={progress.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    progress.completed ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {progress.completed ? '✓' : '⏳'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Video #{progress.video_id}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {progress.completed ? 'Completado' : `${progress.progress}% completado`}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(progress.last_watched).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Comienza tu aprendizaje!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Aún no has visto ningún video. Empieza ahora tu ruta personalizada.
            </p>
            <a
              href="/dashboard/my-path"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-800"
            >
              Ver Mi Ruta →
            </a>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white">
          <div className="text-4xl mb-3">🔥</div>
          <div className="text-3xl font-bold">0</div>
          <div className="text-sm opacity-90">Días consecutivos</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-4xl mb-3">⭐</div>
          <div className="text-3xl font-bold">{completedVideos * 10}</div>
          <div className="text-sm opacity-90">Puntos acumulados</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-4xl mb-3">🎖️</div>
          <div className="text-3xl font-bold">
            {phaseProgress.filter((p: any) => p.percentage === 100).length}
          </div>
          <div className="text-sm opacity-90">Insignias ganadas</div>
        </div>
      </div>
    </div>
  );
}
