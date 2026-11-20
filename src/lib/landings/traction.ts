import type { LandingContent } from "@/lib/landings";

/**
 * Tracción / Traction landing (/pricing/traction). Facts mirror the `advanced` plan and its
 * matrix rows in src/lib/pricing.ts (pricing master, 5 Nov 2026): 4 months; 10–18 pages, up
 * to 100 products, 3 blog posts and 8 social pieces a month; no generic templates; online
 * booking and payments (with CFDI e-invoicing in Tijuana); advanced SEO & AEO; core branding;
 * reviews and reputation; we manage 1 Meta campaign a month; accessibility audit and
 * remediation (CCPA/CPRA in the US); office-hours support; everything in Launch (including
 * the E-commetrics dashboard). Change the plan there and here together.
 */
export const tractionLanding: LandingContent = {
  planId: "advanced",
  slug: "traction",
  meta: {
    title: { es: "Tracción: convierte visitas en ventas", en: "Traction: turn visits into sales" },
    description: {
      es: "Reservas y pagos en línea, pauta en Meta, reseñas, SEO avanzado y un dashboard para ver tus ventas. Un sitio rápido, accesible y blindado. Plan de 4 meses.",
      en: "Online booking and payments, Meta ads, reviews, advanced SEO and a dashboard to watch your sales. A fast, accessible, locked-down site. A 4-month plan.",
    },
    keywords: {
      es: ["reservas y pagos en línea", "pauta en Meta Tijuana", "sitio web para vender", "SEO avanzado", "Tracción Ecommetrica"],
      en: ["online booking and payments", "Meta ads San Diego", "website that sells", "advanced SEO", "Traction Ecommetrica"],
    },
  },
  hero: {
    eyebrow: { es: "Tracción · 4 meses", en: "Traction · 4 months" },
    lines: [
      { es: "Que tu sitio", en: "Make your site" },
      { es: "no solo se vea.", en: "do more than look good." },
      { es: "Que venda.", en: "Make it sell." },
    ],
    sub: {
      es: "Reservas y pagos en línea, pauta en Meta, reseñas y un dashboard para ver cada venta. Lleva a tus visitas del clic al carrito pagado.",
      en: "Online booking and payments, Meta ads, reviews and a dashboard to see every sale. Take your visitors from the click to a paid cart.",
    },
    ctaPrimary: { es: "Quiero vender más", en: "I want to sell more" },
    ctaSecondary: { es: "Cómo funciona", en: "How it works" },
    priceNote: { es: "4 meses · Total {total}", en: "4 months · {total} total" },
    proof: [
      { es: "Reservas y pagos", en: "Booking & payments" },
      { es: "Pauta en Meta", en: "Meta ads" },
      { es: "Sin plantillas genéricas", en: "No generic templates" },
      { es: "Ahorras {saving}", en: "Save {saving}" },
    ],
  },
  problem: {
    eyebrow: { es: "Donde se pierden las ventas", en: "Where sales get lost" },
    title: {
      es: "Tener visitas no es vender. Entre el clic y el pago se va la mitad del negocio.",
      en: "Getting visits isn't selling. Half the business slips away between the click and the payment.",
    },
    items: [
      {
        title: { es: "“Mándame mensaje para apartar”", en: "“Message me to book”" },
        body: {
          es: "Cada paso manual es un cliente que se enfría. Si no pueden reservar o pagar ahí mismo, compran en otro lado.",
          en: "Every manual step is a customer cooling off. If they can't book or pay right there, they buy elsewhere.",
        },
      },
      {
        title: { es: "Sin confianza no hay compra", en: "No trust, no purchase" },
        body: {
          es: "Sin reseñas, sin marca sólida y con un sitio lento, el cliente duda justo antes de pagar.",
          en: "No reviews, no solid brand and a slow site: customers hesitate right before paying.",
        },
      },
      {
        title: { es: "Vender a ciegas", en: "Selling blind" },
        body: {
          es: "Si no ves de dónde vienen tus ventas, no sabes en qué invertir el siguiente peso.",
          en: "If you can't see where your sales come from, you don't know where to put the next dollar.",
        },
      },
    ],
  },
  included: {
    eyebrow: { es: "Qué incluye", en: "What's included" },
    title: { es: "Todo lo que convierte una visita en un pago.", en: "Everything that turns a visit into a payment." },
    sub: {
      es: "Todo lo de Arranque, más las herramientas para vender, medir y generar confianza.",
      en: "Everything in Launch, plus the tools to sell, measure and build trust.",
    },
    items: [
      {
        title: { es: "Reservas y pagos en línea", en: "Online booking and payments" },
        body: { es: "Que te reserven y te paguen sin mandarte un mensaje, con facturación electrónica CFDI.", en: "Customers book and pay without sending you a message." },
      },
      {
        title: { es: "Pauta en Meta", en: "Meta ads" },
        body: { es: "Gestionamos 1 campaña al mes en Facebook e Instagram para traer clientes a tu sitio.", en: "We manage 1 campaign a month on Facebook and Instagram to bring customers to your site." },
      },
      {
        title: { es: "Sin plantillas genéricas", en: "No generic templates" },
        body: { es: "Un sitio diseñado para tu marca y tu forma de vender.", en: "A site designed for your brand and the way you sell." },
      },
      {
        title: { es: "Reseñas y reputación", en: "Reviews and reputation" },
        body: { es: "Testimonios en tu sitio conectados con tu reputación en Meta, Google y otras redes.", en: "Website testimonials linked to your reputation on Meta, Google and other networks." },
      },
      {
        title: { es: "Branding base", en: "Core branding" },
        body: { es: "Identidad y personalidad de marca: tono, estilo y elementos gráficos.", en: "Brand identity and personality: tone, style and graphic elements." },
      },
      {
        title: { es: "SEO y AEO avanzado", en: "Advanced SEO & AEO" },
        body: { es: "Más palabras clave, backlinks y contenido más profundo para buscadores e IAs.", en: "More keywords, backlinks and deeper content for search engines and AI." },
      },
      {
        title: { es: "Hasta 100 productos", en: "Up to 100 products" },
        body: { es: "De 10 a 18 páginas, 3 posts de blog y 8 piezas para redes al mes.", en: "10 to 18 pages, 3 blog posts and 8 social pieces a month." },
      },
      {
        title: { es: "Sitio accesible ADA / WCAG", en: "ADA / WCAG accessible site" },
        body: { es: "Con auditoría y remediación de accesibilidad: más clientes, menos riesgo legal.", en: "With an accessibility audit and remediation: more customers, less legal risk." },
      },
      {
        title: { es: "Soporte en horario de oficina", en: "Office-hours support" },
        body: { es: "Lunes a viernes, de 9 a 5 (hora del Pacífico).", en: "Monday to Friday, 9 to 5 (Pacific Time)." },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    title: { es: "Del clic al pago, sin fricción.", en: "From click to payment, without friction." },
    sub: { es: "Cuatro meses para poner a vender tu sitio.", en: "Four months to put your site to work selling." },
    items: [
      {
        title: { es: "Preparamos la venta", en: "We set up the sale" },
        body: { es: "Branding, catálogo, reservas y pagos en línea listos.", en: "Branding, catalog, booking and online payments ready." },
      },
      {
        title: { es: "Traemos tráfico", en: "We bring traffic" },
        body: { es: "Tu campaña en Meta y SEO avanzado llevan clientes a tu sitio.", en: "Your Meta campaign and advanced SEO bring customers to your site." },
      },
      {
        title: { es: "Medimos y ajustamos", en: "We measure and adjust" },
        body: { es: "Tu dashboard muestra qué vende, para decidir con datos.", en: "Your dashboard shows what sells, so you decide with data." },
      },
    ],
    note: { es: "Plan de 4 meses. Incluye todo lo de Arranque.", en: "A 4-month plan. Includes everything in Launch." },
  },
  alternatives: {
    eyebrow: { es: "Compara", en: "Compare" },
    title: { es: "Vender en línea: tres caminos.", en: "Selling online: three paths." },
    columns: [
      { es: "Solo redes sociales", en: "Social media only" },
      { es: "Sitio + agencia de pauta aparte", en: "Site + separate ad agency" },
      { es: "Tracción", en: "Traction" },
    ],
    rows: [
      {
        label: { es: "Reservas y pagos", en: "Booking and payments" },
        values: [
          { es: "Por mensaje, a mano", en: "By message, by hand" },
          { es: "Según el sitio", en: "Depends on the site" },
          { es: "En línea, automáticos", en: "Online, automatic" },
        ],
      },
      {
        label: { es: "Pauta y sitio", en: "Ads and site" },
        values: [
          { es: "La pauta no tiene a dónde llevar", en: "Ads have nowhere to land" },
          { es: "Dos equipos que no se hablan", en: "Two teams that don't talk" },
          { es: "Un solo equipo", en: "One team" },
        ],
      },
      {
        label: { es: "Ver qué vende", en: "Seeing what sells" },
        values: [
          { es: "Métricas sueltas", en: "Scattered metrics" },
          { es: "Reportes de cada quien", en: "Each vendor's own report" },
          { es: "Un dashboard", en: "One dashboard" },
        ],
      },
      {
        label: { es: "Accesibilidad ADA", en: "ADA accessibility" },
        values: [
          { es: "No aplica", en: "Not applicable" },
          { es: "Casi siempre aparte", en: "Usually extra" },
          { es: "Auditada e incluida", en: "Audited and included" },
        ],
      },
      {
        label: { es: "Inversión", en: "Investment" },
        values: [
          { es: "Tu tiempo en mensajes", en: "Your time on messages" },
          { es: "Dos contratos", en: "Two contracts" },
          { es: "{price} al mes por 4 meses", en: "{price} a month for 4 months" },
        ],
      },
    ],
    footnote: { es: "Comparación general del mercado; cada proveedor es distinto.", en: "A general market comparison; every provider is different." },
  },
  fit: {
    eyebrow: { es: "Sin rodeos", en: "Straight talk" },
    title: { es: "¿Es para ti?", en: "Is it right for you?" },
    yesTitle: { es: "Tracción es para ti si…", en: "Traction is for you if…" },
    yes: [
      { es: "Ya tienes clientes y quieres vender en línea", en: "You already have customers and want to sell online" },
      { es: "Hoy apartas o cobras por mensaje", en: "Today you book or charge by message" },
      { es: "Quieres empezar a anunciarte en Meta", en: "You want to start advertising on Meta" },
      { es: "Tu catálogo llega a 100 productos", en: "Your catalog reaches 100 products" },
    ],
    noTitle: { es: "Mejor elige Escala si…", en: "Choose Scale instead if…" },
    no: [
      { es: "Quieres crecer cada mes con estrategia", en: "You want to grow every month with strategy" },
      { es: "Necesitas pauta completa en Meta y Google", en: "You need full Meta and Google ads" },
      { es: "Quieres landing pages, asistente IA y automatización", en: "You want landing pages, an AI assistant and automation" },
      { es: "Tu catálogo pasa de 100 productos", en: "Your catalog goes past 100 products" },
    ],
    noPlanId: "grower",
    noCta: { es: "Ver Escala", en: "See Scale" },
  },
  offer: {
    eyebrow: { es: "La inversión", en: "The investment" },
    title: { es: "Un sitio que se paga solo.", en: "A site that pays for itself." },
    bullets: [
      { es: "Reservas y pagos en línea", en: "Online booking and payments" },
      { es: "1 campaña de Meta al mes", en: "1 Meta campaign a month" },
      { es: "Sin plantillas genéricas", en: "No generic templates" },
      { es: "Reseñas y reputación", en: "Reviews and reputation" },
      { es: "Branding base y SEO/AEO avanzado", en: "Core branding and advanced SEO/AEO" },
      { es: "Hasta 100 productos y 18 páginas", en: "Up to 100 products and 18 pages" },
      { es: "Sitio accesible ADA / WCAG, auditado", en: "Audited ADA / WCAG accessible site" },
      { es: "Todo lo de Arranque", en: "Everything in Launch" },
    ],
    highlight: {
      es: "Ahorras {saving} frente al valor de cada servicio por separado.",
      en: "You save {saving} against the value of each service on its own.",
    },
    renewal: {
      es: "Hosting del primer año incluido; después se renueva en {hosting} al año. La inversión en pauta, el dominio y la suscripción de Shopify los pagas directo.",
      en: "First year of hosting included; after that it renews at {hosting} a year. Ad spend, the domain and the Shopify subscription are paid by you directly.",
    },
    cta: { es: "Quiero vender más", en: "I want to sell more" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Lo que nos preguntan antes de acelerar.", en: "What people ask before they speed up." },
    items: [
      {
        title: { es: "¿La inversión en pauta está incluida?", en: "Is the ad spend included?" },
        body: {
          es: "Gestionamos 1 campaña al mes en Facebook e Instagram. Lo que inviertes en anuncios lo pagas directo.",
          en: "We manage 1 campaign a month on Facebook and Instagram. Ad spend is paid by you directly.",
        },
      },
      {
        title: { es: "¿Qué veo en el dashboard?", en: "What do I see in the dashboard?" },
        body: {
          es: "Tus resultados en un solo lugar: el dashboard E-commetrics, incluido desde Arranque, reúne tus datos y te envía un reporte mensual.",
          en: "Your results in one place: the E-commetrics dashboard, included from Launch, brings your data together with a monthly report.",
        },
      },
      {
        title: { es: "¿Por qué importa la accesibilidad?", en: "Why does accessibility matter?" },
        body: {
          es: "Un sitio accesible lo usa más gente y, en California, un sitio inaccesible es una exposición legal. Tracción incluye auditoría y remediación.",
          en: "An accessible site reaches more people, and in California an inaccessible site is a legal exposure. Traction includes an audit and remediation.",
        },
      },
      {
        title: { es: "¿Cuánto dura?", en: "How long does it run?" },
        body: { es: "4 meses, con el total del contrato de {total}.", en: "4 months, with a contract total of {total}." },
      },
      {
        title: { es: "¿Qué pasa al terminar?", en: "What happens when it ends?" },
        body: {
          es: "Puedes renovar todo excepto Branding + identidad visual, o subir a Escala, que incluye todo lo de Tracción.",
          en: "You can renew everything except Branding + visual identity, or move up to Scale, which includes everything in Traction.",
        },
      },
    ],
  },
  final: {
    title: { es: "Deja de apartar por mensaje. Empieza a cobrar en línea.", en: "Stop booking by message. Start getting paid online." },
    sub: { es: "{price} al mes por 4 meses. Ahorras {saving} frente al valor de cada servicio por separado.", en: "{price} a month for 4 months. Save {saving} against the value of each service on its own." },
    cta: { es: "Empezar Tracción", en: "Start Traction" },
  },
  stickyLabel: { es: "Tracción · reservas, pagos y pauta", en: "Traction · booking, payments and ads" },
};
