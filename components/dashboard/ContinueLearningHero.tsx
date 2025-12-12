'use client';

import Link from 'next/link';

interface ContinueLearningHeroProps {
  currentPhase: any;
  currentPhaseIndex: number;
  currentVideo: any;
  currentVideoIndex: number;
  totalVideosInPhase: number;
  overallProgress: number;
  projectDescription: string;
}

export default function ContinueLearningHero({
  currentPhase,
  currentPhaseIndex,
  currentVideo,
  currentVideoIndex,
  totalVideosInPhase,
  overallProgress,
  projectDescription,
}: ContinueLearningHeroProps) {
  const phaseNumber = currentPhaseIndex + 1;
  const videoNumber = currentVideoIndex + 1;
  const phaseName = currentPhase?.phase_name || `Fase ${phaseNumber}`;
  const videoTitle = currentVideo?.description || currentVideo?.section || 'Siguiente lección';
  const videoDuration = currentVideo?.duration || '3 min';
  const videoRelevance = currentVideo?.why_relevant || 'Aprende los conceptos clave para tu proyecto.';

  // Truncate project description for display
  const shortProject = projectDescription.length > 60 
    ? projectDescription.slice(0, 60) + '...' 
    : projectDescription;

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 sm:p-8">
        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1472FF]/10 text-[#1472FF]">
            Continuar donde lo dejaste
          </span>
          <span className="text-sm text-gray-500">
            {overallProgress}% completado
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {videoTitle}
        </h2>
        <p className="text-gray-600 mb-6">
          {phaseName} • Video {videoNumber} de {totalVideosInPhase}
        </p>

        {/* Video Preview Card */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row gap-5">
          {/* Thumbnail */}
          <div className="w-full sm:w-56 h-32 bg-gradient-to-br from-[#1472FF]/20 to-[#5BA0FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 relative group cursor-pointer">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#1472FF] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
              {currentVideo?.section || 'Lección actual'}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {videoRelevance}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {videoDuration}
              </span>
              {shortProject && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="truncate">{shortProject}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/dashboard/my-path/video/${phaseNumber}/${videoNumber}`}
            className="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] hover:from-[#0E5FCC] hover:to-[#1472FF] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Reproducir Video
          </Link>
          <Link
            href="/dashboard/my-path"
            className="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 rounded-full font-semibold text-[#1472FF] border-2 border-[#1472FF]/20 hover:border-[#1472FF]/40 hover:bg-[#1472FF]/5 transition-all"
          >
            Ver Ruta Completa
          </Link>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="h-1 bg-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-[#1472FF] to-[#5BA0FF] transition-all duration-500"
          style={{ width: `${overallProgress}%` }}
        />
      </div>
    </section>
  );
}
