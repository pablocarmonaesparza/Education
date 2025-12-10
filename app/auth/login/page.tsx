'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Lazy initialization of Supabase client to avoid SSR issues
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if Supabase is configured before trying to create client
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const configured = url &&
        key &&
        url !== 'https://your-project.supabase.co' &&
        key !== 'your-anon-key-here' &&
        !url.includes('your-project');

      if (configured) {
        try {
          setSupabase(createClient());
        } catch (error: any) {
          console.error('Error initializing Supabase client:', error);
        }
      }
    }
  }, []);

  // Verificar si Supabase está configurado
  const isSupabaseConfigured = () => {
    if (typeof window === 'undefined') return false;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    return url &&
           key &&
           url !== 'https://your-project.supabase.co' &&
           key !== 'your-anon-key-here' &&
           !url.includes('your-project');
  };

  const translateError = (errorMessage: string): string => {
    // Error especial cuando Supabase no está configurado
    if (errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('fetch') ||
        errorMessage.includes('NetworkError')) {
      return 'Supabase no está configurado. Usa el botón "Ver Demo" para explorar la plataforma.';
    }

    const errorMap: { [key: string]: string } = {
      'Invalid login credentials': 'Email o contraseña incorrectos',
      'Email not confirmed': 'Por favor confirma tu email antes de iniciar sesión',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
      'Unable to validate email address': 'Email inválido',
    };

    for (const [key, value] of Object.entries(errorMap)) {
      if (errorMessage.includes(key)) {
        return value;
      }
    }

    return errorMessage;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      setError('Supabase no está inicializado. Por favor recarga la página.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(translateError(signInError.message));
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(translateError(err.message || 'Ocurrió un error. Intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase) {
      setError('Supabase no está inicializado. Por favor recarga la página.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        setError(translateError(error.message || 'Error al iniciar sesión con Google'));
        setLoading(false);
        return;
      }

      // If data.url exists, Supabase will handle the redirect automatically
      // Don't set loading to false as we're redirecting
    } catch (err: any) {
      console.error('Google OAuth error:', err);
      setError(translateError(err.message || 'Error al iniciar sesión con Google'));
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-950">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[480px] min-h-screen flex flex-col bg-white">
        {/* Logo */}
        <div className="p-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-[#1472FF]">Leap</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-8 pb-8">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenido de vuelta
              </h1>
              <p className="text-gray-600">
                Continúa tu aprendizaje en IA
              </p>
            </div>

            {/* Advertencia si Supabase no está configurado */}
            {!isSupabaseConfigured() && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-yellow-800 text-sm font-medium mb-1">
                      Base de datos no configurada
                    </p>
                    <p className="text-yellow-700 text-sm mb-3">
                      Explora la plataforma en modo demo.
                    </p>
                    <Link
                      href="/demo"
                      className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Ver Demo
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-3 px-4 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{loading ? 'Conectando...' : 'Continuar con Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">o</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1472FF] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1472FF] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1472FF] text-white py-3 rounded-xl font-semibold hover:bg-[#0E5FCC] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            {/* Signup Link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link href="/auth/signup" className="text-[#1472FF] hover:text-[#0E5FCC] font-semibold">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Gradient Background */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Blue Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1472FF] via-[#3B82F6] to-[#1E40AF]" />

        {/* Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1472FF]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-transparent to-indigo-600/30" />

        {/* Animated Cloud Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-400/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-cyan-300/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white mb-4">
              Continúa aprendiendo
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Retoma tu ruta personalizada y sigue construyendo proyectos con IA.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
