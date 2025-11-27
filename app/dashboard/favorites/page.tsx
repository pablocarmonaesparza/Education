import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FavoritesContent from '@/components/dashboard/FavoritesContent';

export default async function FavoritesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user profile data
  const { data: userProfile } = await supabase
    .from('users')
    .select('name, email, tier')
    .eq('id', user.id)
    .maybeSingle();

  // Get full intake response with project details
  const { data: intakeResponse } = await supabase
    .from('intake_responses')
    .select('id, responses, generated_path')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  // Redirect to onboarding if user doesn't have a personalized path
  if (!intakeResponse || !intakeResponse.generated_path) {
    redirect('/onboarding');
  }

  // After the check above, we know generated_path exists
  const generatedPath = intakeResponse.generated_path;

  return (
    <FavoritesContent learningPath={generatedPath} />
  );
}


