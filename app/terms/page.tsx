import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Términos y Condiciones</h1>
        <p className="text-lg text-center">
          Aquí se detallarán los términos y condiciones de uso de la plataforma.
        </p>
        <p className="text-lg text-center mt-4">
          Es importante leer este documento cuidadosamente antes de utilizar nuestros servicios.
        </p>
      </section>
      <Footer />
    </main>
  );
}
