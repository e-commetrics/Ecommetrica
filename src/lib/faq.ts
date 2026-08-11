import type { Localized } from "@/lib/i18n/types";

/** Open copy gaps: `grep -rn "TODO(copy)" src/`. */
export type Faq = {
  question: Localized;
  answer: Localized;
};

export const faqs: Faq[] = [
  {
    // Ecommetrica (B2C) and Ecommetrics (B2B) are two distinct brands, not a
    // typo — confirmed by the owner. Keep both names spelled as-is
    question: {
      es: "¿En qué área se especializan?",
      en: "What areas do you specialize in?",
    },
    answer: {
      es: "En Ecommetrica nos especializamos en B2C para turismo médico, marcas personales y productos; y en Ecommetrics, orientada a desarrollo web robusto, en B2B para la industria alimenticia y automotriz. Te guiamos paso a paso para diseñar un plan estratégico que impulse tu crecimiento, te dé autonomía, te abra a nivel regional e internacional y automatice tus procesos para maximizar eficiencia y resultados.",
      en: "At Ecommetrica we specialize in B2C for medical tourism, personal brands, and products; and at Ecommetrics, focused on robust web development, in B2B for the food and automotive industries. We guide you step by step to design a strategic plan that drives your growth, gives you autonomy, opens you up regionally and internationally, and automates your processes to maximize efficiency and results.",
    },
  },
  {
    question: {
      es: "¿Cuánto cuesta una página web o aplicación?",
      en: "How much does a website or app cost?",
    },
    answer: {
      es: "A diferencia de la ropa unitalla, una página web o aplicación depende del tamaño, las necesidades, la complejidad y los entregables de cada cliente. Manejamos paquetes que se adaptan a cada una de las necesidades y hacemos consultorías para casos particulares, para adaptar 100% lo que buscas. Nos adaptamos, colaboramos y garantizamos la transparencia del proceso desde la primera llamada hasta la entrega final.",
      en: "Unlike one-size-fits-all clothing, a website or app depends on the size, needs, complexity, and deliverables of each client. We offer packages that fit every need, and we run consultations for specific cases so we can adapt 100% to what you're looking for. We adapt, we collaborate, and we guarantee a transparent process from the first call to the final delivery.",
    },
  },
  {
    // TODO(copy): answer describes the conversation, not the actual levers (SEO/AEO, Google campaigns, social ads, email).
    question: {
      es: "¿Cómo hacemos que consigas más clientes?",
      en: "How do we get you more clients?",
    },
    answer: {
      es: "Detrás de cada objetivo hay herramientas para conseguirlo. Todo dependerá de tus objetivos y de poner las cosas sobre la mesa hablando de presupuesto.",
      en: "Behind every goal there are tools to reach it. It all depends on your goals and on putting everything on the table when we talk budget.",
    },
  },
  {
    // TODO(copy): pricing.ts sells four tiers (3/4/6/8 months) but this only names three — 4-month Plan Pro has no timing here.
    question: {
      es: "¿Cuánto tiempo tomará tener mi tienda en línea lista?",
      en: "How long will it take to have my online store ready?",
    },
    answer: {
      es: "Siempre tienes una tienda lista con nosotros. Tu tienda final se te entregará de acuerdo al paquete seleccionado: puede ser tan robusta como una página que requiera una construcción de 8 meses, una mediana de 6 meses o una pequeña de 3 meses.",
      en: "You always have a store ready with us. Your final store is delivered according to the package you select: it can be as robust as a site that takes an 8-month build, a mid-size one at 6 months, or a small one at 3 months.",
    },
  },
  {
    question: {
      es: "¿Cómo empieza un proyecto con Ecommetrica?",
      en: "How does a project with Ecommetrica start?",
    },
    answer: {
      es: "Dejando una solicitud desde la página de contacto. Nuestro equipo te contacta para agendar un diagnóstico inicial.",
      en: "By leaving a request on the contact page. Our team will reach out to schedule an initial diagnostic.",
    },
  },
  {
    question: {
      es: "¿Trabajan con negocios fuera de la región?",
      en: "Do you work with businesses outside the region?",
    },
    answer: {
      es: "Sí, trabajamos con clientes en toda Latinoamérica de forma remota.",
      en: "Yes, we work remotely with clients across Latin America.",
    },
  },
];
