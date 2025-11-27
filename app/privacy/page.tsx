import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Política de Privacidad</h1>
        <p className="text-lg text-center">
          Aquí se explicará cómo recopilamos, usamos y protegemos sus datos personales.
        </p>
        <p className="text-lg text-center mt-4">
          Su privacidad es de suma importancia para nosotros.
        </p>
      </section>
      <Footer />
    </main>
  );
}
