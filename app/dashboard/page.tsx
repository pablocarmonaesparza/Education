import { createClient } from '@/lib/supabase/server';
import ProgressCard from '@/components/dashboard/ProgressCard';
import CourseCard from '@/components/dashboard/CourseCard';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Obtener el curso personalizado del usuario
  const { data: intakeResponse } = await supabase
    .from('intake_responses')
    .select('generated_path, responses')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // El curso está directamente en generated_path
  const course = intakeResponse?.generated_path;
  const phases = course?.phases || [];

  // Convertir fases a formato de secciones para mostrar
  const sections = phases.map((phase: any) => ({
    id: phase.phase_number.toString(),
    title: phase.phase_name,
    description: phase.description,
    icon: ['🧠', '🛠️', '🔌', '🚀', '💡', '⚡', '🎯', '📊', '🔥', '✨'][phase.phase_number - 1] || '📚',
    videoCount: phase.videos?.length || 0,
    duration: phase.phase_duration,
    progress: 0,
  }));

  const totalVideos = course?.total_videos || 0;
  const estimatedHours = course?.estimated_hours || '0 horas';
  const userProject = course?.user_project || 'tu proyecto';

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Bienvenido, {user?.user_metadata?.name || 'Estudiante'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Tu curso personalizado para: {userProject}
        </p>
      </div>

      {/* Progress Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <ProgressCard
          title="Videos Vistos"
          progress={0}
          total={totalVideos}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        />
        <ProgressCard
          title="Fases Completadas"
          progress={0}
          total={phases.length}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ProgressCard
          title="Checkpoints"
          progress={0}
          total={24}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tu Curso Personalizado</h2>
        <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">🎓 Tu Ruta de Aprendizaje Completa</h3>
              <p className="opacity-90 text-lg mb-4">
                {totalVideos} videos personalizados organizados en {phases.length} fases - {estimatedHours}
              </p>
              <p className="opacity-80">
                {phases[0]?.title ? `Comienza con: ${phases[0].title}` : 'Empieza tu viaje de aprendizaje'}
              </p>
            </div>
            <a
              href="/dashboard/my-path"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            >
              Ver Ruta Completa →
            </a>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tu Ruta de Aprendizaje Personalizada</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <CourseCard key={section.id} {...section} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{totalVideos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Videos Totales</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{phases.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Fases</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{estimatedHours}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Duración Total</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Personalizado</div>
        </div>
      </div>
    </div>
  );
}
