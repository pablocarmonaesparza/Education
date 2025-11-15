'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-lg">IA & Automatización</div>
              <div className="text-xs text-gray-500">by Beta AI</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#course-structure" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contenido
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Precios
            </Link>
            <Link href="/#faq" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              FAQ
            </Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/signup"
              className="bg-gradient-to-r from-purple-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-800 transition-all"
            >
              Crear Cuenta
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/#course-structure"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contenido
              </Link>
              <Link
                href="/#pricing"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Precios
              </Link>
              <Link
                href="/#faq"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
