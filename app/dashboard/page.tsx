import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { DashboardSkeleton } from '@/components/dashboard/DashboardShell';
import ContinueLearningHero from '@/components/dashboard/ContinueLearningHero';
import LearningPathSection from '@/components/dashboard/LearningPathSection';
import StatsSection from '@/components/dashboard/StatsSection';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/auth/login');
  }

  // Fetch user profile
  const { data: userProfile } = await supabase
    .from('users')
    .select('name, email, tier')
    .eq('id', user.id)
    .single();

  // Fetch learning path (intake response with generated_path)
  const { data: intakeResponse } = await supabase
    .from('intake_responses')
    .select('id, responses, generated_path, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Redirect to onboarding if no learning path
  if (!intakeResponse?.generated_path) {
    redirect('/onboarding');
  }

  // Fetch video progress
  const { data: videoProgress } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', user.id);

  const generatedPath = intakeResponse.generated_path;
  const phases = generatedPath?.phases || [];
  const projectDescription = intakeResponse.responses?.project || '';

  // Calculate progress
  const progressMap = new Map();
  (videoProgress || []).forEach((vp: any) => {
    progressMap.set(vp.video_id, vp);
  });

  // Find current video (first incomplete)
  let currentPhaseIndex = 0;
  let currentVideoIndex = 0;
  let totalVideos = 0;
  let completedVideos = 0;
  let foundCurrent = false;

  phases.forEach((phase: any, pIndex: number) => {
    const videos = phase.videos || [];
    videos.forEach((video: any, vIndex: number) => {
      totalVideos++;
      const progress = progressMap.get(String(video.order || vIndex + 1));
      if (progress?.completed) {
        completedVideos++;
      } else if (!foundCurrent) {
        currentPhaseIndex = pIndex;
        currentVideoIndex = vIndex;
        foundCurrent = true;
      }
    });
  });

  // If all completed, set to last video
  if (!foundCurrent && phases.length > 0) {
    const lastPhase = phases[phases.length - 1];
    currentPhaseIndex = phases.length - 1;
    currentVideoIndex = (lastPhase.videos?.length || 1) - 1;
  }

  const currentPhase = phases[currentPhaseIndex];
  const currentVideo = currentPhase?.videos?.[currentVideoIndex];
  const overallProgress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  // User name
  const userName = userProfile?.name || userProfile?.email?.split('@')[0] || 'Usuario';

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className="space-y-8">
        {/* Welcome */}
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            ¡Hola, {userName.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            {overallProgress === 100 
              ? '¡Felicidades! Has completado tu ruta de aprendizaje.'
              : 'Continúa donde lo dejaste y avanza en tu proyecto.'}
          </p>
        </header>

        {/* Hero: Continue Learning */}
        <ContinueLearningHero
          currentPhase={currentPhase}
          currentPhaseIndex={currentPhaseIndex}
          currentVideo={currentVideo}
          currentVideoIndex={currentVideoIndex}
          totalVideosInPhase={currentPhase?.videos?.length || 0}
          overallProgress={overallProgress}
          projectDescription={projectDescription}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Path - 2/3 */}
          <div className="lg:col-span-2">
            <LearningPathSection
              phases={phases}
              progressMap={progressMap}
              currentPhaseIndex={currentPhaseIndex}
            />
          </div>

          {/* Stats - 1/3 */}
          <div>
            <StatsSection
              completedVideos={completedVideos}
              totalVideos={totalVideos}
              totalPhases={phases.length}
              completedPhases={phases.filter((p: any, i: number) => {
                const videos = p.videos || [];
                return videos.every((v: any, vi: number) => 
                  progressMap.get(String(v.order || vi + 1))?.completed
                );
              }).length}
              overallProgress={overallProgress}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
