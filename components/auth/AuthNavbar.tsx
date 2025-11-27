'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isSignupPage = pathname === '/auth/signup';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Beta
              </span>
              <span className="font-bold text-gray-900"> AI</span>
            </div>
          </Link>

          {/* Auth Button - Show opposite page */}
          {isSignupPage ? (
            <button
              onClick={() => router.push('/auth/login')}
              className="px-6 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Iniciar Sesión
            </button>
          ) : (
            <button
              onClick={() => router.push('/auth/signup')}
              className="px-6 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Regístrate
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

