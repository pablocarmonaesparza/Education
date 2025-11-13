import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export const metadata = {
  title: 'Crear Cuenta | IA & Automatización',
  description: 'Crea tu cuenta y comienza tu viaje en IA y automatización',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al inicio
        </Link>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
