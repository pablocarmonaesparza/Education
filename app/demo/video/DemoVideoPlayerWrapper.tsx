'use client';

import VideoPlayer from '@/components/dashboard/VideoPlayer';

interface DemoVideoPlayerWrapperProps {
  videoUrl: string;
  title: string;
}

export default function DemoVideoPlayerWrapper({ videoUrl, title }: DemoVideoPlayerWrapperProps) {
  return (
    <VideoPlayer
      videoUrl={videoUrl}
      title={title}
      onProgress={(time) => console.log('Demo video progress:', time)}
      onComplete={() => console.log('Demo video completed!')}
      initialTime={0}
    />
  );
}
