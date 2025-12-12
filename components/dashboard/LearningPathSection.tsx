'use client';

import Link from 'next/link';

interface LearningPathSectionProps {
  phases: any[];
  progressMap: Map<string, any>;
  currentPhaseIndex: number;
}

export default function LearningPathSection({
  phases,
  progressMap,
  currentPhaseIndex,
}: LearningPathSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Tu Ruta de Aprendizaje</h2>
        <Link 
          href="/dashboard/my-path"
          className="text-sm font-medium text-[#1472FF] hover:text-[#0E5FCC] transition-colors"
        >
          Ver todo →
        </Link>
      </div>

      <div className="space-y-3">
        {phases.slice(0, 5).map((phase: any, index: number) => {
          const videos = phase.videos || [];
          const completedInPhase = videos.filter((v: any, vi: number) => 
            progressMap.get(String(v.order || vi + 1))?.completed
          ).length;
          const totalInPhase = videos.length;
          const isComplete = totalInPhase > 0 && completedInPhase === totalInPhase;
          const isCurrent = index === currentPhaseIndex;
          const isLocked = index > currentPhaseIndex && !isComplete;
          const progressPercent = totalInPhase > 0 ? Math.round((completedInPhase / totalInPhase) * 100) : 0;

          return (
            <div
              key={index}
              className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'border-[#1472FF]/30 bg-[#1472FF]/5'
                  : isComplete
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              {/* Status Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isComplete
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-[#1472FF] text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {isComplete ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isCurrent ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold truncate ${
                    isComplete ? 'text-green-700' : isCurrent ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {phase.phase_name || `Fase ${index + 1}`}
                  </h3>
                  {isCurrent && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#1472FF] text-white rounded-full">
                      Actual
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{completedInPhase}/{totalInPhase} videos</span>
                  {!isComplete && totalInPhase > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>{progressPercent}%</span>
                    </>
                  )}
                </div>
              </div>

              {/* Progress Ring or Arrow */}
              <div className="flex-shrink-0">
                {isComplete ? (
                  <div className="text-green-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                ) : (
                  <ProgressRing percentage={progressPercent} size={40} />
                )}
              </div>
            </div>
          );
        })}

        {phases.length > 5 && (
          <Link
            href="/dashboard/my-path"
            className="block text-center py-3 text-sm font-medium text-[#1472FF] hover:text-[#0E5FCC] transition-colors"
          >
            Ver {phases.length - 5} fases más →
          </Link>
        )}
      </div>
    </section>
  );
}

// Progress Ring Component
function ProgressRing({ percentage, size = 40 }: { percentage: number; size?: number }) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#1472FF"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  );
}
