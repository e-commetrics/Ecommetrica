import type { LandingContent } from "@/lib/landings";

/**
 * Escala / Scale landing (/pricing/scale). Facts mirror the `grower` plan (always "best
 * value") and its matrix rows in src/lib/pricing.ts (pricing master, 5 Nov 2026): 6 months;
 * 19–50 pages, up to 300 products, 4 blog posts and 12 social pieces a month; multilingual
 * site; 3 campaign landing pages; live monitoring; monthly Meta social strategy; original
 * content for blog, SEO and social; AI search visibility report; Google ads and full Meta
 * management; server-side conversion tracking; digital design (12 h); 4–5 HD videos a month;
 * platform integrations incl. Meta Graph API (up to 8 h); email and WhatsApp automation from
 * the site; 3 outgoing campaigns a month; calendar, CRM or custom dashboard; AI assistant on
 * the site and WhatsApp; priority support; English account; everything in Traction.
 */
export const scaleLanding: LandingContent = {
  planId: "grower",
  slug: "scale",
  meta: {
    title: { es: "Escala: crecimiento mensual con estrategia", en: "Scale: monthly growth with strategy" },
    description: {
      es: "Pauta en Meta y Google, estrategia mensual, contenido original, video, landing pages, asistente IA y automatización. El plan con el mayor ahorro. 6 meses.",
      en: "Meta and Google ads, monthly strategy, original content, video, landing pages, an AI assistant and automation. The plan with the biggest saving. 6 months.",
    },
    keywords: {
      es: ["marketing digital mensual", "pauta en Google y Meta", "agencia de crecimiento Tijuana", "contenido original y video", "Escala Ecommetrica"],
      en: ["monthly digital marketing", "Google and Meta ads", "growth agency San Diego", "original content and video", "Scale Ecommetrica"],
    },
  },
  hero: {
    eyebrow: { es: "Escala · Mejor valor", en: "Scale · Best value" },
    lines: [
      { es: "Cada mes,", en: "Every month," },
      { es: "un negocio", en: "a business" },
      { es: "más grande.", en: "that's bigger." },
    ],
    sub: {
      es: "Pauta en Meta y Google, contenido original, video y automatización, conectados por una estrategia mensual. Un motor de crecimiento, no una lista de tareas.",
      en: "Meta and Google ads, original content, video and automation, tied together by a monthly strategy. A growth engine, not a to-do list.",
    },
    ctaPrimary: { es: "Quiero escalar", en: "I want to scale" },
    ctaSecondary: { es: "Cómo funciona", en: "How it works" },
    priceNote: { es: "6 meses · Total {total}", en: "6 months · {total} total" },
    proof: [
      { es: "Meta y Google Ads", en: "Meta & Google Ads" },
      { es: "Estrategia mensual", en: "Monthly strategy" },
      { es: "Contenido original y video", en: "Original content & video" },
      { es: "Ahorras {saving}", en: "Save {saving}" },
    ],
  },
  problem: {
    eyebrow: { es: "Por qué no crece", en: "Why it isn't growing" },
    title: {
      es: "Publicar, anunciar y medir por separado no es una estrategia. Es ruido.",
      en: "Posting, advertising and measuring separately isn't a strategy. It's noise.",
    },
    items: [
      {
        title: { es: "Esfuerzo sin dirección", en: "Effort without direction" },
        body: {
          es: "Mucho contenido, pauta que prende y apaga, y nadie decide qué sigue con base en los números.",
          en: "Lots of content, ads switched on and off, and nobody deciding what's next based on the numbers.",
        },
      },
      {
        title: { es: "Un solo canal es frágil", en: "One channel is fragile" },
        body: {
          es: "Si todo depende de Instagram, un cambio de algoritmo te deja sin ventas. Google, Meta y búsqueda deben sumar juntos.",
          en: "If everything depends on Instagram, one algorithm change leaves you without sales. Google, Meta and search must add up together.",
        },
      },
      {
        title: { es: "Tu equipo atrapado en lo manual", en: "Your team stuck on manual work" },
        body: {
          es: "Responder, dar seguimiento y agendar a mano roba el tiempo que debería ir a vender.",
          en: "Replying, following up and scheduling by hand steals the time that should go to selling.",
        },
      },
    ],
  },
  included: {
    eyebrow: { es: "Qué incluye", en: "What's included" },
    title: { es: "Un motor de crecimiento completo.", en: "A complete growth engine." },
    sub: {
      es: "Todo lo de Tracción, más los canales, el contenido y la estrategia para crecer mes a mes.",
      en: "Everything in Traction, plus the channels, content and strategy to grow month after month.",
    },
    items: [
      {
        title: { es: "Estrategia mensual", en: "Monthly strategy" },
        body: { es: "Cada mes definimos tu estrategia de redes en Meta con base en tus resultados.", en: "Every month we set your Meta social strategy based on your results." },
      },
      {
        title: { es: "Pauta en Meta y Google", en: "Meta and Google ads" },
        body: { es: "Gestión completa en los dos canales, más 3 campañas salientes multicanal al mes.", en: "Full management on both channels, plus 3 outgoing multichannel campaigns a month." },
      },
      {
        title: { es: "Contenido original", en: "Original content" },
        body: { es: "Para blog, SEO y redes: 4 posts de blog y 12 piezas para redes al mes.", en: "For blog, SEO and social: 4 blog posts and 12 social pieces a month." },
      },
      {
        title: { es: "4 a 5 videos HD al mes", en: "4 to 5 HD videos a month" },
        body: { es: "Producción y grabación de video profesional en HD.", en: "Professional HD video production and filming." },
      },
      {
        title: { es: "3 landing pages de campaña", en: "3 campaign landing pages" },
        body: { es: "Páginas hechas para convertir cada campaña en ventas.", en: "Pages built to turn each campaign into sales." },
      },
      {
        title: { es: "Asistente IA", en: "AI assistant" },
        body: { es: "En tu sitio y en WhatsApp, responde a tus clientes a cualquier hora.", en: "On your site and on WhatsApp, answering customers at any hour." },
      },
      {
        title: { es: "Automatización desde tu sitio", en: "Automation from your site" },
        body: { es: "Correos y mensajes de WhatsApp que salen solos, sin hacerlo a mano.", en: "Emails and WhatsApp messages that go out on their own, no manual work." },
      },
      {
        title: { es: "CRM e integraciones", en: "CRM and integrations" },
        body: { es: "Calendario, CRM o dashboard personalizado en tu sitio, e integraciones como Meta Graph API (hasta 8 h).", en: "Calendar, CRM or a custom dashboard on your site, and integrations like the Meta Graph API (up to 8 h)." },
      },
      {
        title: { es: "Medición y visibilidad en IA", en: "Tracking and AI visibility" },
        body: { es: "Conversiones medidas del lado del servidor y un reporte de tu visibilidad en ChatGPT, Gemini y Perplexity.", en: "Server-side conversion tracking and a report on your visibility in ChatGPT, Gemini and Perplexity." },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    title: { es: "Un ciclo que se repite cada mes.", en: "A cycle that repeats every month." },
    sub: { es: "Seis meses de crecimiento con método.", en: "Six months of growth with a method." },
    items: [
      {
        title: { es: "Planeamos", en: "We plan" },
        body: { es: "Estrategia del mes: canales, contenido y campañas.", en: "The month's strategy: channels, content and campaigns." },
      },
      {
        title: { es: "Ejecutamos", en: "We execute" },
        body: { es: "Contenido, video, pauta y landing pages en marcha.", en: "Content, video, ads and landing pages in motion." },
      },
      {
        title: { es: "Medimos y escalamos", en: "We measure and scale" },
        body: { es: "Lo que funciona recibe más; lo que no, se ajusta.", en: "What works gets more; what doesn't gets adjusted." },
      },
    ],
    note: { es: "Plan de 6 meses. Incluye todo lo de Tracción.", en: "A 6-month plan. Includes everything in Traction." },
  },
  alternatives: {
    eyebrow: { es: "Compara", en: "Compare" },
    title: { es: "Crecer con varios proveedores, o con un solo motor.", en: "Grow with several vendors, or with one engine." },
    columns: [
      { es: "Freelancers por canal", en: "Freelancers per channel" },
      { es: "Agencia de pauta + productora", en: "Ad agency + production house" },
      { es: "Escala", en: "Scale" },
    ],
    rows: [
      {
        label: { es: "Estrategia", en: "Strategy" },
        values: [
          { es: "Cada quien la suya", en: "Each one their own" },
          { es: "Separada por servicio", en: "Split by service" },
          { es: "Una estrategia mensual", en: "One monthly strategy" },
        ],
      },
      {
        label: { es: "Meta, Google y SEO", en: "Meta, Google and SEO" },
        values: [
          { es: "Varios contratos", en: "Several contracts" },
          { es: "SEO casi siempre aparte", en: "SEO usually extra" },
          { es: "Todo junto, sumando", en: "All together, adding up" },
        ],
      },
      {
        label: { es: "Contenido y video", en: "Content and video" },
        values: [
          { es: "Por pieza", en: "Per piece" },
          { es: "Por proyecto", en: "Per project" },
          { es: "Incluidos cada mes", en: "Included every month" },
        ],
      },
      {
        label: { es: "Automatización y CRM", en: "Automation and CRM" },
        values: [
          { es: "Casi nunca", en: "Rarely" },
          { es: "Aparte", en: "Extra" },
          { es: "Incluidos", en: "Included" },
        ],
      },
      {
        label: { es: "Inversión", en: "Investment" },
        values: [
          { es: "Varias facturas", en: "Several invoices" },
          { es: "Dos o más contratos", en: "Two or more contracts" },
          { es: "{price} al mes por 6 meses", en: "{price} a month for 6 months" },
        ],
      },
    ],
    footnote: { es: "Comparación general del mercado; cada proveedor es distinto.", en: "A general market comparison; every provider is different." },
  },
  fit: {
    eyebrow: { es: "Sin rodeos", en: "Straight talk" },
    title: { es: "¿Es para ti?", en: "Is it right for you?" },
    yesTitle: { es: "Escala es para ti si…", en: "Scale is for you if…" },
    yes: [
      { es: "Tu negocio ya opera y quieres crecer cada mes", en: "Your business already runs and you want to grow every month" },
      { es: "Quieres pauta en Meta y Google con estrategia", en: "You want Meta and Google ads with a strategy" },
      { es: "Necesitas contenido original y video", en: "You need original content and video" },
      { es: "Manejas hasta 300 productos", en: "You handle up to 300 products" },
    ],
    noTitle: { es: "Mejor elige Cúspide si…", en: "Choose Peak instead if…" },
    no: [
      { es: "Operas con volumen y quieres dejar lo manual", en: "You operate at volume and want to drop manual work" },
      { es: "Necesitas integrar tus sistemas y un dashboard con BI", en: "You need your systems integrated and a BI dashboard" },
      { es: "Quieres automatización de marketing completa", en: "You want full marketing automation" },
      { es: "Tu sitio pasa de 50 páginas", en: "Your site goes past 50 pages" },
    ],
    noPlanId: "high-profile",
    noCta: { es: "Ver Cúspide", en: "See Peak" },
  },
  offer: {
    eyebrow: { es: "La inversión", en: "The investment" },
    title: { es: "El plan con más valor por cada peso.", en: "The plan with the most value per dollar." },
    bullets: [
      { es: "Estrategia mensual de redes en Meta", en: "Monthly Meta social strategy" },
      { es: "Pauta en Meta y Google, 3 campañas salientes al mes", en: "Meta and Google ads, 3 outgoing campaigns a month" },
      { es: "Contenido original y 4 a 5 videos HD al mes", en: "Original content and 4 to 5 HD videos a month" },
      { es: "3 landing pages y asistente IA en sitio y WhatsApp", en: "3 landing pages and an AI assistant on site and WhatsApp" },
      { es: "Automatización, CRM e integraciones", en: "Automation, CRM and integrations" },
      { es: "Medición avanzada y reporte de visibilidad en IA", en: "Advanced tracking and an AI visibility report" },
      { es: "Sitio multilingüe, hasta 300 productos y 50 páginas", en: "Multilingual site, up to 300 products and 50 pages" },
      { es: "Todo lo de Tracción", en: "Everything in Traction" },
    ],
    highlight: {
      es: "Mejor valor: ahorras {saving} frente al valor de cada servicio por separado, el mayor ahorro de todos los planes.",
      en: "Best value: you save {saving} against the value of each service on its own, the biggest saving of any plan.",
    },
    renewal: {
      es: "Hosting del primer año incluido; después se renueva en {hosting} al año. La inversión en pauta, el dominio y la suscripción de Shopify los pagas directo.",
      en: "First year of hosting included; after that it renews at {hosting} a year. Ad spend, the domain and the Shopify subscription are paid by you directly.",
    },
    cta: { es: "Quiero escalar", en: "I want to scale" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Lo que nos preguntan antes de escalar.", en: "What people ask before they scale." },
    items: [
      {
        title: { es: "¿La inversión en pauta está incluida?", en: "Is the ad spend included?" },
        body: {
          es: "La gestión de Meta y Google sí. Lo que inviertes en cada plataforma lo pagas directo a ella.",
          en: "Managing Meta and Google is. What you spend on each platform is paid directly to it.",
        },
      },
      {
        title: { es: "¿Por qué es el de mejor valor?", en: "Why is it the best value?" },
        body: {
          es: "Porque es el plan con el mayor ahorro frente al valor de cada servicio por separado: {saving}.",
          en: "Because it's the plan with the biggest saving against the value of each service on its own: {saving}.",
        },
      },
      {
        title: { es: "¿Qué hace el asistente IA?", en: "What does the AI assistant do?" },
        body: {
          es: "Vive en tu sitio y en WhatsApp, y responde a tus clientes, también fuera de horario.",
          en: "It lives on your site and on WhatsApp and answers your customers, including after hours.",
        },
      },
      {
        title: { es: "¿Cuánto dura?", en: "How long does it run?" },
        body: { es: "6 meses, con el total del contrato de {total}.", en: "6 months, with a contract total of {total}." },
      },
      {
        title: { es: "¿Qué pasa al terminar?", en: "What happens when it ends?" },
        body: {
          es: "Puedes renovar todo excepto Gestión pura, Branding + identidad visual y Branding + diseño digital, o subir a Cúspide, que incluye todo lo de Escala.",
          en: "You can renew everything except Pure management, Branding + visual identity and Branding + digital design, or move up to Peak, which includes everything in Scale.",
        },
      },
    ],
  },
  final: {
    title: { es: "Deja de publicar al azar. Empieza a crecer con método.", en: "Stop posting at random. Start growing with a method." },
    sub: { es: "{price} al mes por 6 meses. El mayor ahorro: {saving}.", en: "{price} a month for 6 months. The biggest saving: {saving}." },
    cta: { es: "Empezar Escala", en: "Start Scale" },
  },
  stickyLabel: { es: "Escala · mejor valor", en: "Scale · best value" },
};
