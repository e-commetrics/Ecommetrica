import type { Localized } from "@/lib/i18n/types";

/**
 * OPEN COPY GAPS — `grep -rn "TODO(copy)" src/`:
 *   "¿Cómo hacemos que consigas más clientes?" — the answer never names the tools
 *   "¿En qué área se especializan?"            — a second brand name was dropped
 *   "¿Cuánto tiempo…?"                          — timings vs. src/lib/pricing.ts
 */
export type Faq = {
  question: Localized;
  answer: Localized;
};

export const faqs: Faq[] = [
  {
    // TODO(copy): the source answer split the work between "Ecommetrica" (B2C)
    // and "Ecommetrics" (B2B) as if they were two separate brands. That claim is
    // unconfirmed and reads as a typo, so it is left out here — the areas
    // themselves are kept. Restore the split only once it's confirmed real, and
    // then explain it, because as written it confused more than it clarified.
    question: {
      es: "¿En qué área se especializan?",
      en: "What areas do you specialize in?",
    },
    answer: {
      es: "Trabajamos B2C para turismo médico, marcas personales y productos, y B2B con desarrollo web robusto para la industria alimenticia y automotriz. Te guiamos paso a paso para diseñar un plan estratégico que impulse tu crecimiento, te dé autonomía, te abra a nivel regional e internacional y automatice tus procesos para maximizar eficiencia y resultados.",
      en: "We work B2C for medical tourism, personal brands, and products, and B2B with robust web development for the food and automotive industries. We guide you step by step to design a strategic plan that drives your growth, gives you autonomy, opens you up regionally and internationally, and automates your processes to maximize efficiency and results.",
    },
  },
  {
    question: {
      es: "¿Cuánto cuesta una página web o aplicación?",
      en: "How much does a website or app cost?",
    },
    answer: {
      es: "A diferencia de la ropa unitalla, una página web o aplicación depende del tamaño, las necesidades, la complejidad y los entregables de cada cliente. Manejamos paquetes que se adaptan a distintas necesidades y hacemos consultorías para casos particulares. Nos adaptamos, colaboramos y garantizamos la transparencia del proceso desde la primera llamada hasta la entrega final.",
      en: "Unlike one-size-fits-all clothing, a website or app depends on the size, needs, complexity, and deliverables of each client. We offer packages that fit a range of needs, and we run consultations for specific cases. We adapt, we collaborate, and we guarantee a transparent process from the first call to the final delivery.",
    },
  },
  {
    // TODO(copy): the source answer gave 3 / 6 / 8 months (small / medium /
    // robust), but src/lib/pricing.ts sells 3 / 4 / 6 / 8. Phrased as a range
    // here so the two don't contradict each other — reconcile them and then
    // state the real per-package timings.
    question: {
      es: "¿Cuánto tiempo tomará tener mi tienda en línea lista?",
      en: "How long will it take to have my online store ready?",
    },
    answer: {
      es: "Con nosotros siempre tienes una tienda funcionando: desde el inicio trabajas sobre una versión de desarrollo. La entrega final depende del paquete que elijas, desde tres meses para una tienda pequeña hasta ocho para una construcción robusta.",
      en: "You always have a working store with us: from day one you work on a development build. Final delivery depends on the package you choose, from three months for a small store up to eight for a robust build.",
    },
  },
  {
    // TODO(copy): this answer doesn't answer the question — it describes how the
    // conversation goes, not what we actually do to bring in clients. Needs the
    // concrete levers named (SEO and AEO, Google campaigns, social ads, email).
    question: {
      es: "¿Cómo hacemos que consigas más clientes?",
      en: "How do we get you more clients?",
    },
    answer: {
      es: "Detrás de cada objetivo hay herramientas para conseguirlo. Definimos cuáles son las tuyas poniendo las cosas sobre la mesa: objetivos, presupuesto y plazos.",
      en: "Behind every goal there are tools to reach it. We work out which ones are yours by putting everything on the table: goals, budget, and timelines.",
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
