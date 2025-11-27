export default function StructuredData() {
  const courseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Curso de IA Personalizado con Claude AI",
    "description": "Aprende a construir proyectos con Inteligencia Artificial en 3 semanas. Ruta 100% personalizada por Claude AI con 400+ micro-videos.",
    "provider": {
      "@type": "Organization",
      "name": "Tu Empresa", // Actualizar
      "sameAs": "https://tudominio.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT3W"
    },
    "educationalLevel": "Beginner to Advanced",
    "teaches": [
      "Inteligencia Artificial",
      "Automatización con IA",
      "Claude AI",
      "MCP",
      "RAG",
      "Agentes IA"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": [{
      "@type": "Offer",
      "category": "Paid",
      "priceCurrency": "USD",
      "price": "247",
      "availability": "https://schema.org/InStock",
      "url": "https://tudominio.com#pricing",
      "validFrom": "2024-01-01"
    }]
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tu Empresa", // Actualizar
    "url": "https://tudominio.com",
    "logo": "https://tudominio.com/logo.png",
    "sameAs": [
      "https://twitter.com/tutwitter", // Actualizar
      "https://linkedin.com/company/tuempresa", // Actualizar
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@tudominio.com", // Actualizar
      "availableLanguage": ["Spanish", "English"]
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Curso IA Personalizado",
    "url": "https://tudominio.com",
    "description": "Plataforma de aprendizaje de IA con rutas personalizadas por Claude AI",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tudominio.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const educationalOrganizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Tu Empresa", // Actualizar
    "url": "https://tudominio.com",
    "description": "Plataforma líder de educación en IA en español para profesionales latinoamericanos",
    "areaServed": ["MX", "AR", "CO", "ES", "CL", "PE"],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "professional"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrganizationStructuredData) }}
      />
    </>
  );
}
