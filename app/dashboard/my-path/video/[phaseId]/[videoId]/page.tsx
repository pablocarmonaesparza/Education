'use client'; // Added use client for interactive components

import VideoPlayer from '@/components/dashboard/VideoPlayer';
import { useState } from 'react'; // Added useState

interface VideoPageProps {
  params: {
    phaseId: string;
    videoId: string;
  };
}

export default function VideoPage({ params }: VideoPageProps) {
  const { phaseId, videoId } = params;
  const [isCheckpointMarked, setIsCheckpointMarked] = useState(false); // State for checkpoint

  const handleMarkCheckpoint = () => {
    // Simulate marking a checkpoint
    console.log(`Checkpoint marked for Phase: ${phaseId}, Video: ${videoId}`);
    setIsCheckpointMarked(true);
    // In a real app, this would involve an API call to save progress
  };

  // Placeholder functions for VideoPlayer props
  const handleProgress = (time: number) => {
    console.log(`Video progress for ${videoId}: ${time}%`);
    // Logic to update user progress in DB
  };

  const handleComplete = () => {
    console.log(`Video ${videoId} completed!`);
    // Logic to mark video as completed in DB
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Reproduciendo Video</h1>
      <p className="text-lg mb-6">Phase ID: {phaseId} | Video ID: {videoId}</p>
      <div className="w-full max-w-4xl">
        <VideoPlayer
          videoId={videoId}
          videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Placeholder URL
          title={`Video ${videoId} - Phase ${phaseId}`} // Placeholder title
          onProgress={handleProgress}
          onComplete={handleComplete}
        />
      </div>
      {/* Additional video details, navigation, etc. would go here */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">Detalles del Video</h2>
        <p>Aquí se mostrarán detalles como título, descripción, y "por qué es relevante".</p>
        <div className="mt-4">
          <button
            onClick={handleMarkCheckpoint}
            disabled={isCheckpointMarked}
            className={`px-6 py-2 rounded-md font-semibold text-white ${
              isCheckpointMarked ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isCheckpointMarked ? 'Checkpoint Marcado' : 'Marcar Checkpoint'}
          </button>
        </div>
      </div>
    </div>
  );
}