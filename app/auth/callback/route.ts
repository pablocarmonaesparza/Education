import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(errorDescription || error)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Error exchanging code:', exchangeError)
      return NextResponse.redirect(`${origin}/auth/login?error=confirmation_failed`)
    }

    // Get user to check if they have a personalized path
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Check if user has a personalized path
      const { data: intakeData } = await supabase
        .from('intake_responses')
        .select('generated_path')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (intakeData?.generated_path) {
        return NextResponse.redirect(`${origin}/dashboard`)
      } else {
        return NextResponse.redirect(`${origin}/onboarding`)
      }
    }

    // Default redirect to onboarding for new users
    return NextResponse.redirect(`${origin}/onboarding`)
  }

  // No code provided, redirect to login
  return NextResponse.redirect(`${origin}/auth/login?error=no_code`)
}
