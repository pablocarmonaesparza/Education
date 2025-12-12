'use client';

interface StatsSectionProps {
  completedVideos: number;
  totalVideos: number;
  totalPhases: number;
  completedPhases: number;
  overallProgress: number;
}

export default function StatsSection({
  completedVideos,
  totalVideos,
  totalPhases,
  completedPhases,
  overallProgress,
}: StatsSectionProps) {
  // Estimate time (3 min per video average)
  const minutesCompleted = completedVideos * 3;
  const totalMinutes = totalVideos * 3;

  return (
    <div className="space-y-4">
      {/* Progress Card */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tu Progreso</h2>
        
        {/* Big Progress Number */}
        <div className="text-center mb-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] bg-clip-text text-transparent">
            {overallProgress}%
          </div>
          <p className="text-sm text-gray-500 mt-1">completado</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] rounded-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Videos"
            value={completedVideos}
            total={totalVideos}
            icon={<VideoIcon />}
          />
          <StatCard
            label="Fases"
            value={completedPhases}
            total={totalPhases}
            icon={<PhaseIcon />}
          />
          <StatCard
            label="Tiempo"
            value={formatTime(minutesCompleted)}
            total={formatTime(totalMinutes)}
            icon={<TimeIcon />}
          />
          <StatCard
            label="Racha"
            value="0"
            total="días"
            icon={<StreakIcon />}
            highlight
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="space-y-2">
          <QuickAction
            href="/dashboard/my-path"
            icon={<PathIcon />}
            label="Ver mi ruta completa"
          />
          <QuickAction
            href="/dashboard/tutor"
            icon={<TutorIcon />}
            label="Hablar con el tutor IA"
          />
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  total, 
  icon,
  highlight = false 
}: { 
  label: string; 
  value: string | number; 
  total: string | number;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`p-4 rounded-xl ${highlight ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-2 mb-2 text-gray-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold ${highlight ? 'text-orange-600' : 'text-gray-900'}`}>
          {value}
        </span>
        <span className="text-sm text-gray-400">/ {total}</span>
      </div>
    </div>
  );
}

// Quick Action Button
function QuickAction({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-[#1472FF]/10 flex items-center justify-center text-[#1472FF] group-hover:bg-[#1472FF] group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
      <svg className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

// Helper function
function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Icons
function VideoIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function PhaseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StreakIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  );
}

function PathIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function TutorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
