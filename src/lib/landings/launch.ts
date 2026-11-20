import type { LandingContent } from "@/lib/landings";

/**
 * Arranque / Launch landing (/pricing/launch). Facts mirror the `simple` plan and its matrix
 * rows in src/lib/pricing.ts (pricing master, 5 Nov 2026): 3 months; 8–10 pages, up to 25
 * products, 1 blog post and 4 social pieces a month; website or Shopify store with training,
 * migration without losing rankings and a catalog connected to Google Shopping and Meta;
 * AI-powered; original copy; SEO & AEO with Search Console; visual identity; social setup
 * (Meta ecosystem and TikTok); WhatsApp Business; Google ecosystem and local directories;
 * E-commetrics dashboard with a monthly report; business email; ADA / WCAG 2.1 AA site;
 * accessibility statement; cookie management; bilingual EN/ES; everything in AI Express.
 * Wording rule: "potenciado con IA" / "AI-powered", never people vs. AI.
 */
export const launchLanding: LandingContent = {
  planId: "simple",
  slug: "launch",
  meta: {
    title: { es: "Arranque: marca, sitio y redes para abrir bien", en: "Launch: brand, site and social to open right" },
    description: {
      es: "Identidad visual, sitio o tienda Shopify potenciado con IA, SEO y AEO, redes, Google Business Profile y tu dashboard, listos en 3 meses. Inaugura tu negocio digital bien hecho.",
      en: "Visual identity, an AI-powered website or Shopify store, SEO and AEO, social media, Google Business Profile and your dashboard, ready in 3 months. Open your digital business done right.",
    },
    keywords: {
      es: ["identidad visual y sitio web", "tienda Shopify Tijuana", "página web para negocio nuevo", "SEO para negocio nuevo", "Arranque Ecommetrica"],
      en: ["visual identity and website", "Shopify store San Diego", "website for a new business", "SEO for a new business", "Launch Ecommetrica"],
    },
  },
  hero: {
    eyebrow: { es: "Arranque · 3 meses", en: "Launch · 3 months" },
    lines: [
      { es: "Abre una vez.", en: "Open once." },
      { es: "Ábrelo", en: "Open it" },
      { es: "bien hecho.", en: "done right." },
    ],
    sub: {
      es: "Tu identidad visual, tu sitio o tienda, tus redes, tu Google Business Profile y tu dashboard, potenciados con IA y listos en 90 días. Sin rehacerlo después.",
      en: "Your visual identity, your website or store, your social media, your Google Business Profile and your dashboard, AI-powered and ready in 90 days. No redoing it later.",
    },
    ctaPrimary: { es: "Quiero arrancar", en: "I want to launch" },
    ctaSecondary: { es: "Cómo funciona", en: "How it works" },
    priceNote: { es: "3 meses · Total {total}", en: "3 months · {total} total" },
    proof: [
      { es: "Identidad visual", en: "Visual identity" },
      { es: "Potenciado con IA", en: "AI-powered" },
      { es: "SEO y AEO desde el día uno", en: "SEO & AEO from day one" },
      { es: "Ahorras {saving}", en: "Save {saving}" },
    ],
  },
  problem: {
    eyebrow: { es: "El error más caro", en: "The most expensive mistake" },
    title: {
      es: "Abrir con prisa sale caro: lo que se hace mal al inicio se paga dos veces.",
      en: "Opening in a rush costs more: what's done wrong at the start gets paid for twice.",
    },
    items: [
      {
        title: { es: "Una marca improvisada", en: "An improvised brand" },
        body: {
          es: "Un logo hecho de prisa y colores al azar no generan confianza. Cambiarlo después cuesta clientes y dinero.",
          en: "A rushed logo and random colors don't build trust. Changing them later costs customers and money.",
        },
      },
      {
        title: { es: "Piezas que no se hablan", en: "Pieces that don't talk" },
        body: {
          es: "El sitio por un lado, las redes por otro y Google sin configurar. Tus clientes notan que no es una sola marca.",
          en: "The site in one place, social in another and Google not set up. Customers can tell it isn't one brand.",
        },
      },
      {
        title: { es: "Invisible en buscadores", en: "Invisible in search" },
        body: {
          es: "Un sitio sin SEO ni AEO es un local sin letrero. Existe, pero nadie llega.",
          en: "A site without SEO or AEO is a shop without a sign. It exists, but nobody walks in.",
        },
      },
    ],
  },
  included: {
    eyebrow: { es: "Qué incluye", en: "What's included" },
    title: { es: "Tu negocio digital completo, de una sola vez.", en: "Your whole digital business, in one go." },
    sub: {
      es: "Todo lo de IA Exprés, más todo lo que una marca necesita para abrir con seriedad, potenciado con IA.",
      en: "Everything in AI Express, plus everything a brand needs to open seriously, AI-powered.",
    },
    items: [
      {
        title: { es: "Identidad visual", en: "Visual identity" },
        body: { es: "Tu marca con logotipo, colores y tipografía propios: lista para todo lo demás.", en: "Your brand with its own logo, colors and type, ready for everything else." },
      },
      {
        title: { es: "Sitio o tienda Shopify", en: "Website or Shopify store" },
        body: {
          es: "De 8 a 10 páginas y hasta 25 productos, con capacitación para administrarlo y migración de tu sitio actual sin perder posicionamiento.",
          en: "8 to 10 pages and up to 25 products, with training to manage it and migration of your current site without losing rankings.",
        },
      },
      {
        title: { es: "Catálogo en Google y Meta", en: "Catalog on Google and Meta" },
        body: { es: "En tienda, tu catálogo conectado a Google Shopping y a Meta.", en: "For stores, your catalog connected to Google Shopping and Meta." },
      },
      {
        title: { es: "Textos con contenido original", en: "Original website copy" },
        body: { es: "Escritos para tu cliente, con tu tono. Bilingüe español e inglés.", en: "Written for your customer, in your voice. Bilingual Spanish and English." },
      },
      {
        title: { es: "SEO y AEO", en: "SEO & AEO" },
        body: { es: "Con Search Console y un post de blog al mes, para que buscadores e IAs hablen de ti desde que abres.", en: "With Search Console and one blog post a month, so search engines and AI talk about you from the day you open." },
      },
      {
        title: { es: "Redes en orden", en: "Social, in order" },
        body: {
          es: "Ecosistema Meta (Facebook, Instagram y WhatsApp) y TikTok configurados, y 4 piezas al mes.",
          en: "Meta ecosystem (Facebook, Instagram and WhatsApp) and TikTok set up, and 4 pieces a month.",
        },
      },
      {
        title: { es: "Google y directorios locales", en: "Google and local directories" },
        body: {
          es: "Google Business Profile, Apple Maps, Bing y Yelp, más WhatsApp Business con catálogo.",
          en: "Google Business Profile, Apple Maps, Bing and Yelp, plus WhatsApp Business with a catalog.",
        },
      },
      {
        title: { es: "Dashboard y correo de negocio", en: "Dashboard and business email" },
        body: {
          es: "Dashboard E-commetrics con reporte mensual, y correo con tu dominio listo para llegar a la bandeja.",
          en: "An E-commetrics dashboard with a monthly report, and email on your domain set up to reach the inbox.",
        },
      },
      {
        title: { es: "Accesible y en regla", en: "Accessible and compliant" },
        body: {
          es: "Sitio accesible ADA / WCAG 2.1 AA, declaración de accesibilidad y gestión de cookies.",
          en: "An ADA / WCAG 2.1 AA accessible site, an accessibility statement and cookie management.",
        },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    title: { es: "Tres meses. Una marca lista para crecer.", en: "Three months. A brand ready to grow." },
    sub: { es: "Del concepto a la inauguración, en orden.", en: "From concept to opening day, in order." },
    items: [
      {
        title: { es: "Tu marca", en: "Your brand" },
        body: { es: "Definimos tu identidad visual: logo, colores y tipografía.", en: "We define your visual identity: logo, colors and type." },
      },
      {
        title: { es: "Tu sitio y tus redes", en: "Your site and social" },
        body: { es: "Construimos el sitio o la tienda, los textos y tus perfiles con esa marca.", en: "We build the site or store, the copy and your profiles with that brand." },
      },
      {
        title: { es: "Tu inauguración", en: "Your opening" },
        body: { es: "Publicamos con SEO, Google, directorios y tu dashboard funcionando.", en: "We go live with SEO, Google, directories and your dashboard running." },
      },
    ],
    note: { es: "Plan de 3 meses. Cada plan incluye todo lo del anterior.", en: "A 3-month plan. Every plan includes everything in the one before." },
  },
  alternatives: {
    eyebrow: { es: "Compara", en: "Compare" },
    title: { es: "Tres formas de abrir. Una sola marca coherente.", en: "Three ways to open. One coherent brand." },
    columns: [
      { es: "Un freelancer por pieza", en: "A freelancer per piece" },
      { es: "Plantilla y hazlo tú", en: "Template and DIY" },
      { es: "Arranque", en: "Launch" },
    ],
    rows: [
      {
        label: { es: "Marca, sitio y redes", en: "Brand, site and social" },
        values: [
          { es: "Cada quien por su lado", en: "Each one on their own" },
          { es: "Lo coordinas tú", en: "You coordinate it" },
          { es: "Un solo equipo, una sola marca", en: "One team, one brand" },
        ],
      },
      {
        label: { es: "Migración y capacitación", en: "Migration and training" },
        values: [
          { es: "Según cada proveedor", en: "Depends on each vendor" },
          { es: "Por tu cuenta", en: "On your own" },
          { es: "Incluidas", en: "Included" },
        ],
      },
      {
        label: { es: "SEO y AEO", en: "SEO & AEO" },
        values: [
          { es: "Casi siempre aparte", en: "Usually extra" },
          { es: "Lo configuras tú", en: "You set it up" },
          { es: "Incluido, con Search Console", en: "Included, with Search Console" },
        ],
      },
      {
        label: { es: "Google, directorios y dashboard", en: "Google, directories and dashboard" },
        values: [
          { es: "Casi siempre aparte", en: "Usually extra" },
          { es: "Lo configuras tú", en: "You set it up" },
          { es: "Incluidos", en: "Included" },
        ],
      },
      {
        label: { es: "Inversión", en: "Investment" },
        values: [
          { es: "Varias facturas", en: "Several invoices" },
          { es: "Tu tiempo y suscripciones", en: "Your time and subscriptions" },
          { es: "{price} al mes por 3 meses", en: "{price} a month for 3 months" },
        ],
      },
    ],
    footnote: { es: "Comparación general del mercado; cada proveedor es distinto.", en: "A general market comparison; every provider is different." },
  },
  fit: {
    eyebrow: { es: "Sin rodeos", en: "Straight talk" },
    title: { es: "¿Es para ti?", en: "Is it right for you?" },
    yesTitle: { es: "Arranque es para ti si…", en: "Launch is for you if…" },
    yes: [
      { es: "Estás abriendo, o tu imagen actual ya no te representa", en: "You're opening, or your current image no longer fits you" },
      { es: "Quieres marca, sitio y redes hablando el mismo idioma", en: "You want brand, site and social speaking the same language" },
      { es: "Te bastan hasta 10 páginas y 25 productos", en: "Up to 10 pages and 25 products is enough" },
      { es: "Quieres que te encuentren en Google desde el inicio", en: "You want to be found on Google from the start" },
    ],
    noTitle: { es: "Mejor elige Tracción si…", en: "Choose Traction instead if…" },
    no: [
      { es: "Ya vendes y necesitas reservas y pagos en línea", en: "You already sell and need online booking and payments" },
      { es: "Quieres anunciarte en Meta", en: "You want to advertise on Meta" },
      { es: "Tu catálogo pasa de 25 productos", en: "Your catalog goes past 25 products" },
      { es: "Necesitas branding y reseñas", en: "You need branding and reviews" },
    ],
    noPlanId: "advanced",
    noCta: { es: "Ver Tracción", en: "See Traction" },
  },
  offer: {
    eyebrow: { es: "La inversión", en: "The investment" },
    title: { es: "Todo para abrir bien, en un solo plan.", en: "Everything to open right, in one plan." },
    bullets: [
      { es: "Identidad visual", en: "Visual identity" },
      { es: "Sitio o tienda Shopify de 8 a 10 páginas, potenciado con IA", en: "An AI-powered 8 to 10 page site or Shopify store" },
      { es: "Hasta 25 productos, catálogo en Google y Meta", en: "Up to 25 products, catalog on Google and Meta" },
      { es: "Capacitación y migración sin perder posicionamiento", en: "Training and migration without losing rankings" },
      { es: "SEO y AEO con Search Console, 1 post de blog al mes", en: "SEO & AEO with Search Console, 1 blog post a month" },
      { es: "Redes Meta y TikTok, 4 piezas al mes", en: "Meta and TikTok social, 4 pieces a month" },
      { es: "Google, directorios locales y dashboard con reporte mensual", en: "Google, local directories and a dashboard with a monthly report" },
      { es: "Todo lo de IA Exprés", en: "Everything in AI Express" },
    ],
    highlight: {
      es: "Ahorras {saving} frente al valor de cada servicio por separado.",
      en: "You save {saving} against the value of each service on its own.",
    },
    renewal: {
      es: "Hosting del primer año incluido; después se renueva en {hosting} al año. La inversión en pauta, el dominio, las licencias de correo y la suscripción de Shopify los pagas directo.",
      en: "First year of hosting included; after that it renews at {hosting} a year. Ad spend, the domain, email licenses and the Shopify subscription are paid by you directly.",
    },
    cta: { es: "Quiero arrancar", en: "I want to launch" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Lo que nos preguntan antes de arrancar.", en: "What people ask before they launch." },
    items: [
      {
        title: { es: "¿Puede ser tienda en línea?", en: "Can it be an online store?" },
        body: {
          es: "Sí: sitio o tienda Shopify, con hasta 25 productos y tu catálogo conectado a Google Shopping y a Meta. La suscripción de Shopify la pagas directo.",
          en: "Yes: a website or Shopify store, with up to 25 products and your catalog connected to Google Shopping and Meta. You pay the Shopify subscription directly.",
        },
      },
      {
        title: { es: "Ya tengo sitio, ¿pierdo mi posicionamiento?", en: "I already have a site, do I lose my rankings?" },
        body: {
          es: "No: incluye la migración de tu sitio actual sin perder posicionamiento, y capacitación para administrarlo.",
          en: "No: it includes migrating your current site without losing rankings, plus training to manage it.",
        },
      },
      {
        title: { es: "¿En qué se diferencia de IA Exprés?", en: "How is it different from AI Express?" },
        body: {
          es: "IA Exprés es un sitio generado con IA. Arranque es potenciado con IA y suma identidad visual, contenido original, SEO completo, blog, redes cada mes y tu dashboard.",
          en: "AI Express is an AI-generated site. Launch is AI-powered and adds visual identity, original content, full SEO, a blog, social every month and your dashboard.",
        },
      },
      {
        title: { es: "¿Cuánto dura?", en: "How long does it run?" },
        body: { es: "3 meses, con el total del contrato de {total}.", en: "3 months, with a contract total of {total}." },
      },
      {
        title: { es: "¿Ya tenía IA Exprés, se abona?", en: "I had AI Express, is it credited?" },
        body: { es: "Sí, si pasas a Arranque en los primeros 30 días se abona lo que pagaste por IA Exprés.", en: "Yes, if you move to Launch within 30 days, your AI Express payment is credited." },
      },
    ],
  },
  final: {
    title: { es: "Tu inauguración empieza con una buena marca.", en: "Your opening starts with a great brand." },
    sub: { es: "{price} al mes por 3 meses. Ahorras {saving} frente al valor de cada servicio por separado.", en: "{price} a month for 3 months. Save {saving} against the value of each service on its own." },
    cta: { es: "Empezar Arranque", en: "Start Launch" },
  },
  stickyLabel: { es: "Arranque · marca, sitio y redes", en: "Launch · brand, site and social" },
};
