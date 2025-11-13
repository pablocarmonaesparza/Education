'use client';

interface ProgressCardProps {
  title: string;
  progress: number;
  total: number;
  icon?: React.ReactNode;
}

export default function ProgressCard({ title, progress, total, icon }: ProgressCardProps) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {progress} de {total} completados
          </p>
        </div>
        {icon && (
          <div className="text-purple-600 dark:text-purple-400">
            {icon}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="absolute right-0 -top-6 text-sm font-semibold text-purple-600 dark:text-purple-400">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
