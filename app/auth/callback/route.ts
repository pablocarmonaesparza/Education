import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Verificar si el usuario ya completó el onboarding
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: intakeResponse } = await supabase
        .from('intake_responses')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // Si no tiene intake response, redirigir a onboarding
      if (!intakeResponse) {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }
    }
  }

  // Si ya completó el onboarding, ir al dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
