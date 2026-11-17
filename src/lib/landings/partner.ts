import type { LandingContent } from "@/lib/landings";

/**
 * Aliado / Partner landing (/pricing/partner). Facts mirror `customPlan` in
 * src/lib/pricing.ts (pricing master, 5 Nov 2026): custom, not a package; from a monthly fee,
 * minimum 8 months; for sites of 1,000 pages or more, or stores with more than 1,000
 * products; the client picks one module (Shopify and apps · embedded team · in-house AI
 * content engine · agentic AI development · strategic consulting · custom app development);
 * the only plan with 24/7 support; a US contracting entity and W-9 (US market); stays off
 * the comparison matrix; not eligible for à-la-carte renewal (continuous). Wording rule:
 * "sitio aliado de la IA" / "AI-partnered site". Change it there and here together.
 */
export const partnerLanding: LandingContent = {
  planId: "custom",
  slug: "partner",
  meta: {
    title: { es: "Aliado: tu área digital completa", en: "Partner: your whole digital area" },
    description: {
      es: "Para sitios de 1,000 páginas o más: eliges el módulo que tu operación necesita, con un equipo dedicado y el único plan con soporte 24/7. A la medida, desde una mensualidad.",
      en: "For sites of 1,000 pages or more: you pick the module your operation needs, with a dedicated team and the only plan with 24/7 support. Custom, from a monthly fee.",
    },
    keywords: {
      es: ["equipo digital dedicado", "desarrollo de IA agéntica", "desarrollo de apps a la medida Tijuana", "agencia con soporte 24/7", "Aliado Ecommetrica"],
      en: ["dedicated digital team", "agentic AI development", "custom app development San Diego", "agency with 24/7 support", "Partner Ecommetrica"],
    },
  },
  hero: {
    eyebrow: { es: "Aliado · A la medida", en: "Partner · Custom" },
    lines: [
      { es: "No es un", en: "Not a" },
      { es: "proveedor.", en: "vendor." },
      { es: "Es tu aliado.", en: "Your partner." },
    ],
    sub: {
      es: "Para operaciones de 1,000 páginas o más. Eliges el módulo que necesitas y un equipo dedicado lo lleva como si fuera parte de tu negocio, con soporte 24/7.",
      en: "For operations of 1,000 pages or more. You pick the module you need and a dedicated team runs it as part of your business, with 24/7 support.",
    },
    ctaPrimary: { es: "Hablemos", en: "Let's talk" },
    ctaSecondary: { es: "Cómo funciona", en: "How it works" },
    priceNote: { es: "Mínimo 8 meses · Desde {total} en total", en: "Minimum 8 months · From {total} total" },
    proof: [
      { es: "Equipo dedicado", en: "Dedicated team" },
      { es: "Sitio aliado de la IA", en: "AI-partnered site" },
      { es: "Soporte 24/7", en: "24/7 support" },
      { es: "1,000+ páginas o productos", en: "1,000+ pages or products" },
    ],
  },
  problem: {
    eyebrow: { es: "Cuando creces", en: "When you grow" },
    title: {
      es: "A cierta escala, coordinar proveedores se vuelve un trabajo de tiempo completo.",
      en: "At a certain scale, coordinating vendors becomes a full-time job.",
    },
    items: [
      {
        title: { es: "Demasiados proveedores", en: "Too many vendors" },
        body: {
          es: "Agencia, desarrolladores, productora, consultor… cada uno con su contrato, su ritmo y su versión de la verdad.",
          en: "Agency, developers, production house, consultant… each with their own contract, pace and version of the truth.",
        },
      },
      {
        title: { es: "Un área interna cuesta", en: "An in-house area is costly" },
        body: {
          es: "Reclutar, formar y retener a todo un equipo digital toma tiempo y dinero que no siempre tienes.",
          en: "Recruiting, training and keeping a whole digital team takes time and money you don't always have.",
        },
      },
      {
        title: { es: "Un paquete ya no alcanza", en: "A package no longer fits" },
        body: {
          es: "Con miles de páginas o productos, lo que necesitas es una especialidad completa, no una lista de servicios.",
          en: "With thousands of pages or products, you need a full specialty, not a list of services.",
        },
      },
    ],
  },
  included: {
    eyebrow: { es: "Eliges un módulo", en: "Pick one module" },
    title: { es: "La especialidad que tu operación necesita.", en: "The specialty your operation needs." },
    sub: {
      es: "Aliado no es un paquete: es una relación a la medida, fuera de la matriz de planes. Eliges uno de estos módulos.",
      en: "Partner isn't a package: it's a custom relationship, outside the plan matrix. You pick one of these modules.",
    },
    items: [
      {
        title: { es: "Shopify y apps", en: "Shopify and apps" },
        body: { es: "Tiendas de más de 1,000 productos y las apps que las hacen operar.", en: "Stores with more than 1,000 products and the apps that run them." },
      },
      {
        title: { es: "Equipo integrado", en: "Embedded team" },
        body: { es: "Capital humano asignado a tu área, con operación mensual fija.", en: "Dedicated people assigned to your area, with fixed monthly capacity." },
      },
      {
        title: { es: "Motor de contenido con IA in-house", en: "In-house AI content engine" },
        body: { es: "Contenido en volumen para ser la referencia de las IAs y los buscadores.", en: "Content at volume, built to be the reference for AI answers and search." },
      },
      {
        title: { es: "Desarrollo de IA agéntica", en: "Agentic AI development" },
        body: { es: "Agentes de IA que trabajan dentro de tu operación.", en: "AI agents that work inside your operation." },
      },
      {
        title: { es: "Consultoría estratégica", en: "Strategic consulting" },
        body: { es: "Dirección digital: arquitectura, presupuesto y prioridades.", en: "Digital direction: architecture, budget and priorities." },
      },
      {
        title: { es: "Desarrollo de apps a la medida", en: "Custom app development" },
        body: { es: "Desarrollo de tu propio software.", en: "Development of your own software." },
      },
      {
        title: { es: "Para 1,000 páginas o más", en: "For 1,000 pages or more" },
        body: { es: "Sitios de 1,000 páginas o más, o tiendas con más de 1,000 productos.", en: "Sites of 1,000 pages or more, or stores with more than 1,000 products." },
      },
      {
        title: { es: "Soporte 24/7", en: "24/7 support" },
        body: { es: "El único plan con atención a cualquier hora.", en: "The only plan with support at any hour." },
      },
      {
        title: { es: "Contrato en EUA", en: "A US contract" },
        body: { es: "En el mercado de Estados Unidos: entidad contratante en EUA y W-9.", en: "In the US market: a US contracting entity and W-9." },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    title: { es: "Como tener tu propia área digital.", en: "Like having your own digital area." },
    sub: { es: "Sin reclutar, sin formar, sin coordinar proveedores.", en: "No recruiting, no training, no coordinating vendors." },
    items: [
      {
        title: { es: "Conversamos", en: "We talk" },
        body: { es: "Entendemos tu operación, tu escala y lo que necesitas resolver.", en: "We understand your operation, your scale and what you need to solve." },
      },
      {
        title: { es: "Eliges tu módulo", en: "You pick your module" },
        body: { es: "Definimos juntos el módulo y el equipo que tu operación necesita.", en: "Together we define the module and the team your operation needs." },
      },
      {
        title: { es: "Tu aliado en marcha", en: "Your partner, at work" },
        body: { es: "El equipo trabaja como parte de tu negocio, con soporte 24/7.", en: "The team works as part of your business, with 24/7 support." },
      },
    ],
    note: { es: "Relación mínima de 8 meses.", en: "A minimum 8-month relationship." },
  },
  alternatives: {
    eyebrow: { es: "Compara", en: "Compare" },
    title: { es: "Tres maneras de tener un área digital.", en: "Three ways to have a digital area." },
    columns: [
      { es: "Armar un equipo interno", en: "Build an in-house team" },
      { es: "Varios proveedores", en: "Several vendors" },
      { es: "Aliado", en: "Partner" },
    ],
    rows: [
      {
        label: { es: "Tiempo para arrancar", en: "Time to get going" },
        values: [
          { es: "Meses de reclutamiento", en: "Months of recruiting" },
          { es: "Rápido, pero disperso", en: "Fast, but scattered" },
          { es: "Un equipo ya formado", en: "A team already in place" },
        ],
      },
      {
        label: { es: "Quién coordina", en: "Who coordinates" },
        values: [
          { es: "Tú", en: "You" },
          { es: "Tú, entre todos ellos", en: "You, between all of them" },
          { es: "Tu aliado", en: "Your partner" },
        ],
      },
      {
        label: { es: "Especialidad", en: "Specialty" },
        values: [
          { es: "La que puedas contratar", en: "Whatever you can hire" },
          { es: "Repartida en contratos", en: "Spread across contracts" },
          { es: "El módulo que elijas", en: "The module you pick" },
        ],
      },
      {
        label: { es: "Soporte", en: "Support" },
        values: [
          { es: "En horario laboral", en: "Business hours" },
          { es: "Según cada contrato", en: "Per contract" },
          { es: "24/7", en: "24/7" },
        ],
      },
      {
        label: { es: "Inversión", en: "Investment" },
        values: [
          { es: "Nómina, prestaciones y rotación", en: "Payroll, benefits and turnover" },
          { es: "Varias facturas", en: "Several invoices" },
          { es: "Desde {price} al mes", en: "From {price} a month" },
        ],
      },
    ],
    footnote: { es: "Comparación general del mercado; cada caso es distinto.", en: "A general market comparison; every case is different." },
  },
  fit: {
    eyebrow: { es: "Sin rodeos", en: "Straight talk" },
    title: { es: "¿Es para ti?", en: "Is it right for you?" },
    yesTitle: { es: "Aliado es para ti si…", en: "Partner is for you if…" },
    yes: [
      { es: "Tu sitio llega a 1,000 páginas o tu tienda pasa de 1,000 productos", en: "Your site reaches 1,000 pages or your store passes 1,000 products" },
      { es: "Necesitas una especialidad completa, no un proveedor", en: "You need a full specialty, not a vendor" },
      { es: "Necesitas soporte 24/7", en: "You need 24/7 support" },
      { es: "Quieres IA agéntica, apps propias o un equipo integrado", en: "You want agentic AI, your own apps or an embedded team" },
    ],
    noTitle: { es: "Mejor elige Cúspide si…", en: "Choose Peak instead if…" },
    no: [
      { es: "Tu sitio tiene de 51 a 999 páginas", en: "Your site has 51 to 999 pages" },
      { es: "Un plan completo cubre lo que necesitas", en: "A complete plan covers what you need" },
      { es: "El soporte prioritario te basta", en: "Priority support is enough" },
      { es: "Prefieres un plan con alcance definido", en: "You prefer a plan with a defined scope" },
    ],
    noPlanId: "high-profile",
    noCta: { es: "Ver Cúspide", en: "See Peak" },
  },
  offer: {
    eyebrow: { es: "La inversión", en: "The investment" },
    title: { es: "Tu área digital, a la medida.", en: "Your digital area, made to measure." },
    bullets: [
      { es: "El módulo que elijas", en: "The module you pick" },
      { es: "Equipo dedicado a tu operación", en: "A team dedicated to your operation" },
      { es: "Sitio aliado de la IA", en: "AI-partnered site" },
      { es: "Para 1,000 páginas o más, o más de 1,000 productos", en: "For 1,000 pages or more, or more than 1,000 products" },
      { es: "Soporte 24/7", en: "24/7 support" },
      { es: "Relación mínima de 8 meses", en: "A minimum 8-month relationship" },
    ],
    highlight: {
      es: "El único plan con soporte 24/7.",
      en: "The only plan with 24/7 support.",
    },
    renewal: {
      es: "Desde {total} en total por el mínimo de 8 meses. Es una relación continua: no aplica la renovación à la carte. La inversión en pauta, el dominio y la suscripción de Shopify los pagas directo.",
      en: "From {total} in total for the 8-month minimum. It's a continuous relationship: à-la-carte renewal doesn't apply. Ad spend, the domain and the Shopify subscription are paid by you directly.",
    },
    cta: { es: "Hablemos", en: "Let's talk" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Lo que nos preguntan antes de sumar un aliado.", en: "What people ask before adding a partner." },
    items: [
      {
        title: { es: "¿Cómo se define el precio?", en: "How is the price set?" },
        body: {
          es: "Empieza en {price} al mes, con un mínimo de 8 meses, y se define según el módulo que elijas y tu operación.",
          en: "It starts at {price} a month, with an 8-month minimum, and is set by the module you pick and your operation.",
        },
      },
      {
        title: { es: "¿Puedo elegir más de un módulo?", en: "Can I pick more than one module?" },
        body: {
          es: "Aliado se arma con un módulo. Si tu operación necesita más, lo platicamos en la propuesta.",
          en: "Partner is built around one module. If your operation needs more, we cover it in the proposal.",
        },
      },
      {
        title: { es: "¿En qué se diferencia de Cúspide?", en: "How is it different from Peak?" },
        body: {
          es: "Cúspide es un plan con alcance definido para sitios de 51 a 999 páginas. Aliado es a la medida, para 1,000 páginas o más, con soporte 24/7.",
          en: "Peak is a plan with a defined scope for sites of 51 to 999 pages. Partner is custom, for 1,000 pages or more, with 24/7 support.",
        },
      },
      {
        title: { es: "¿Pueden contratar en Estados Unidos?", en: "Can you contract in the US?" },
        body: {
          es: "Sí: en el mercado de EUA contamos con entidad contratante en Estados Unidos y W-9.",
          en: "Yes: in the US market we have a US contracting entity and W-9.",
        },
      },
      {
        title: { es: "¿Cómo empezamos?", en: "How do we start?" },
        body: {
          es: "Con una conversación: entendemos tu operación y armamos la propuesta con el módulo que necesitas.",
          en: "With a conversation: we understand your operation and put together a proposal with the module you need.",
        },
      },
    ],
  },
  final: {
    title: { es: "Tu siguiente área digital no se contrata. Se suma.", en: "Your next digital area isn't hired. It's added." },
    sub: { es: "Desde {price} al mes. El único plan con soporte 24/7.", en: "From {price} a month. The only plan with 24/7 support." },
    cta: { es: "Hablemos", en: "Let's talk" },
  },
  stickyLabel: { es: "Aliado · tu equipo dedicado", en: "Partner · your dedicated team" },
};
