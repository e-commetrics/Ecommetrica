import type { LandingContent } from "@/lib/landings";

/**
 * Cúspide / Peak landing (/pricing/peak). Every claim here mirrors the plan's data in
 * src/lib/pricing.ts (everything in Escala, plus: custom design and development up to 12 h,
 * advanced branding, cinematic 4K video, marketing automation, integrations with up to 3
 * systems / 16 h, the custom BI app, VPAT, the quarterly strategy and roadmap,
 * the US-only quarterly visit in San Diego; 51 to 999 pages, up to 1,000 products, 6 blog
 * posts and 16 social pieces a month, 8 months): change the plan there and here together.
 */
export const peakLanding: LandingContent = {
  planId: "high-profile",
  slug: "peak",
  meta: {
    title: {
      es: "Cúspide: tu negocio corriendo en software y automatización",
      en: "Peak: your business running on software and automation",
    },
    description: {
      es: "Integraciones con tus sistemas, app de inteligencia de negocio (BI) a la medida y automatización de marketing para negocios que operan con volumen. Incluye todo lo de Escala.",
      en: "Integrations with your systems, a custom business intelligence (BI) app and marketing automation for businesses operating at volume. Includes everything in Scale.",
    },
    keywords: {
      es: [
        "automatización de marketing",
        "integraciones de sistemas",
        "app de BI a la medida",
        "desarrollo web a la medida Tijuana",
        "Cúspide Ecommetrica",
      ],
      en: [
        "marketing automation",
        "system integrations",
        "custom BI app",
        "custom web development San Diego",
        "Peak Ecommetrica",
      ],
    },
  },
  hero: {
    eyebrow: { es: "Cúspide · 8 meses", en: "Peak · 8 months" },
    lines: [
      { es: "Lo manual", en: "Manual work" },
      { es: "ahora corre", en: "now runs" },
      { es: "solo.", en: "itself." },
    ],
    sub: {
      es: "Conectamos tus sistemas, automatizamos tu marketing y reunimos tus datos en tu app de BI. Tu equipo deja de capturar y empieza a decidir.",
      en: "We connect your systems, automate your marketing and bring your data into your BI app. Your team stops typing and starts deciding.",
    },
    ctaPrimary: { es: "Quiero automatizar", en: "I want to automate" },
    ctaSecondary: { es: "Cómo funciona", en: "How it works" },
    priceNote: {
      es: "8 meses · Total {total}",
      en: "8 months · {total} total",
    },
    proof: [
      { es: "Integraciones con tus sistemas", en: "Integrations with your systems" },
      { es: "Sitio aliado de la IA", en: "AI-partnered site" },
      { es: "Marketing automatizado", en: "Automated marketing" },
      { es: "Todo lo de Escala incluido", en: "Everything in Scale included" },
    ],
  },
  problem: {
    eyebrow: { es: "El costo de lo manual", en: "The cost of manual work" },
    title: {
      es: "Cuando operas con volumen, cada tarea manual se multiplica.",
      en: "When you operate at volume, every manual task multiplies.",
    },
    items: [
      {
        title: { es: "Tus datos viven en islas", en: "Your data lives on islands" },
        body: {
          es: "La tienda, el calendario, la pauta y los mensajes van cada uno por su lado. Nadie ve el panorama completo.",
          en: "The store, the calendar, the ads and the messages each go their own way. Nobody sees the whole picture.",
        },
      },
      {
        title: { es: "Tu equipo captura en vez de vender", en: "Your team types instead of selling" },
        body: {
          es: "Copiar datos, contestar lo mismo y agendar a mano se come las horas que deberían ir a tus clientes.",
          en: "Copying data, answering the same thing and scheduling by hand eats the hours your customers should get.",
        },
      },
      {
        title: { es: "Decides con reportes viejos", en: "You decide on old reports" },
        body: {
          es: "Para cuando alguien termina de armar el reporte, el momento de actuar ya pasó.",
          en: "By the time someone finishes building the report, the moment to act has passed.",
        },
      },
    ],
  },
  included: {
    eyebrow: { es: "Qué incluye", en: "What's included" },
    title: {
      es: "Todo lo de Escala. Más el software que la hace correr sola.",
      en: "Everything in Scale. Plus the software that makes it run itself.",
    },
    sub: {
      es: "Sitio, marca, contenido y pauta, ahora conectados a tus sistemas y medidos en un solo lugar.",
      en: "Site, brand, content and ads, now connected to your systems and measured in one place.",
    },
    items: [
      {
        title: { es: "Integraciones con tus sistemas", en: "Integrations with your systems" },
        body: {
          es: "Conectamos hasta 3 de tus sistemas, con hasta 16 horas de desarrollo, para que los datos dejen de pasar a mano.",
          en: "We connect up to 3 of your systems, with up to 16 hours of development, so data stops moving by hand.",
        },
      },
      {
        title: { es: "App de BI a la medida", en: "Custom BI app" },
        body: {
          es: "Tu propia web app con todos tus datos, gestión de calendarios y los niveles de acceso que tú decidas.",
          en: "Your own web app with all your data, calendar management and the access levels you choose.",
        },
      },
      {
        title: { es: "Automatización de marketing", en: "Marketing automation" },
        body: {
          es: "Correos masivos, respuestas y calendarización que salen solos, sin esfuerzo manual.",
          en: "Bulk email, replies and scheduling that go out on their own, with no manual effort.",
        },
      },
      {
        title: { es: "Diseño y desarrollo a la medida", en: "Custom design and development" },
        body: {
          es: "Diseño web hecho para tu negocio, con hasta 12 horas de código a la medida.",
          en: "Web design made for your business, with up to 12 hours of custom code.",
        },
      },
      {
        title: { es: "De 51 a 999 páginas", en: "51 to 999 pages" },
        body: {
          es: "Hasta 1,000 productos, 6 posts de blog al mes y 16 piezas para redes al mes.",
          en: "Up to 1,000 products, 6 blog posts a month and 16 social pieces a month.",
        },
      },
      {
        title: { es: "Branding avanzado y videos 4K", en: "Advanced branding and 4K videos" },
        body: {
          es: "Re-Branding + Kickstart para tu marca, y tu marca con imagen de cine: 2 a 3 videos en 4K.",
          en: "Re-Branding + Kickstart for your brand, and your brand with a cinematic look: 2 to 3 videos in 4K.",
        },
      },
      {
        title: { es: "VPAT y accesibilidad", en: "VPAT and accessibility" },
        body: {
          es: "Sitio accesible ADA / WCAG, con auditoría y tu reporte de conformidad VPAT.",
          en: "An ADA / WCAG accessible site, with an audit and your VPAT conformance report.",
        },
      },
      {
        title: { es: "Estrategia y roadmap trimestrales", en: "Quarterly strategy and roadmap" },
        body: {
          es: "Cada trimestre revisamos resultados y trazamos lo que sigue. En el mercado de EUA, con sesión presencial en San Diego.",
          en: "Every quarter we review results and map what's next. For the US market, with an on-site visit in San Diego.",
        },
      },
      {
        title: { es: "Todo lo de Escala", en: "Everything in Scale" },
        body: {
          es: "Pauta en Meta y Google, estrategia mensual de redes, landing pages, asistente IA, contenido original y soporte prioritario.",
          en: "Meta and Google ads, monthly social strategy, landing pages, an AI assistant, original content and priority support.",
        },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    title: {
      es: "Primero el plan. Luego las conexiones. Después, corre solo.",
      en: "First the plan. Then the connections. After that, it runs itself.",
    },
    sub: { es: "Tres pasos, ocho meses.", en: "Three steps, eight months." },
    items: [
      {
        title: { es: "Trazamos tu roadmap", en: "We map your roadmap" },
        body: {
          es: "Definimos la estrategia y elegimos qué sistemas conectar y qué tareas automatizar primero.",
          en: "We set the strategy and choose which systems to connect and which tasks to automate first.",
        },
      },
      {
        title: { es: "Conectamos tus sistemas", en: "We connect your systems" },
        body: {
          es: "Construimos las integraciones y tu app de BI a la medida, con tus datos en un solo lugar.",
          en: "We build the integrations and your custom BI app, with your data in one place.",
        },
      },
      {
        title: { es: "Automatizamos y medimos", en: "We automate and measure" },
        body: {
          es: "Tu marketing sale solo, tu app de BI te dice qué funciona y cada trimestre ajustamos el rumbo.",
          en: "Your marketing goes out on its own, your BI app shows what works, and each quarter we adjust course.",
        },
      },
    ],
    note: {
      es: "Las integraciones cubren hasta 3 sistemas y 16 horas de desarrollo.",
      en: "Integrations cover up to 3 systems and 16 hours of development.",
    },
  },
  alternatives: {
    eyebrow: { es: "Compara", en: "Compare" },
    title: {
      es: "Tres formas de operar con volumen. Solo una viene conectada.",
      en: "Three ways to operate at volume. Only one comes connected.",
    },
    columns: [
      { es: "Equipo interno", en: "In-house team" },
      { es: "Varios proveedores", en: "Several vendors" },
      { es: "Cúspide", en: "Peak" },
    ],
    rows: [
      {
        label: { es: "Quién coordina", en: "Who coordinates" },
        values: [
          { es: "Tú contratas y diriges", en: "You hire and manage" },
          { es: "Tú, entre todos ellos", en: "You, between all of them" },
          { es: "Un solo equipo", en: "One team" },
        ],
      },
      {
        label: { es: "Tus sistemas", en: "Your systems" },
        values: [
          { es: "Depende de a quién contrates", en: "Depends on who you hire" },
          { es: "Cada herramienta por su lado", en: "Every tool on its own" },
          { es: "Integrados (máx. 3, hasta 16 h)", en: "Integrated (max. 3, up to 16 h)" },
        ],
      },
      {
        label: { es: "Tus datos", en: "Your data" },
        values: [
          { es: "Reportes armados a mano", en: "Reports built by hand" },
          { es: "Un panel por herramienta", en: "One panel per tool" },
          { es: "Tu propia app de BI", en: "Your own BI app" },
        ],
      },
      {
        label: { es: "Tu marketing", en: "Your marketing" },
        values: [
          { es: "Según el tiempo del equipo", en: "As the team's time allows" },
          { es: "Una suscripción por tarea", en: "A subscription per task" },
          { es: "Automatizado", en: "Automated" },
        ],
      },
      {
        label: { es: "Forma de pago", en: "How you pay" },
        values: [
          { es: "Nómina y prestaciones", en: "Payroll and benefits" },
          { es: "Varias facturas y suscripciones", en: "Several invoices and subscriptions" },
          { es: "{price} al mes, por 8 meses", en: "{price} a month, for 8 months" },
        ],
      },
    ],
    footnote: {
      es: "Comparación general del mercado; cada equipo y proveedor es distinto.",
      en: "A general market comparison; every team and provider is different.",
    },
  },
  fit: {
    eyebrow: { es: "Sin rodeos", en: "Straight talk" },
    title: { es: "¿Es para ti?", en: "Is it right for you?" },
    yesTitle: { es: "Cúspide es para ti si…", en: "Peak is for you if…" },
    yes: [
      { es: "Operas con volumen y quieres dejar las tareas manuales", en: "You operate at volume and want to drop the manual work" },
      { es: "Necesitas integrar hasta 3 de tus sistemas", en: "You need up to 3 of your systems integrated" },
      { es: "Quieres todos tus datos en tu propia app de BI", en: "You want all your data in your own BI app" },
      { es: "Tu sitio tiene de 51 a 999 páginas y hasta 1,000 productos", en: "Your site has 51 to 999 pages and up to 1,000 products" },
    ],
    noTitle: { es: "Mejor elige Aliado si…", en: "Choose Partner instead if…" },
    no: [
      { es: "Necesitas un equipo asignado a tu área", en: "You need a team assigned to your area" },
      { es: "Requieres soporte 24/7", en: "You require 24/7 support" },
      { es: "Tu sitio llega a 1,000 páginas o más", en: "Your site reaches 1,000 pages or more" },
      { es: "Quieres una app o software propio a la medida", en: "You want a custom app or software of your own" },
    ],
    noPlanId: "custom",
    noCta: { es: "Ver Aliado", en: "See Partner" },
  },
  offer: {
    eyebrow: { es: "La inversión", en: "The investment" },
    title: {
      es: "Una mensualidad. Toda tu operación digital.",
      en: "One monthly fee. Your whole digital operation.",
    },
    bullets: [
      { es: "Todo lo que incluye Escala", en: "Everything included in Scale" },
      { es: "Integraciones con tus sistemas (máx. 3, hasta 16 h)", en: "Integrations with your systems (max. 3, up to 16 h)" },
      { es: "App de inteligencia de negocio (BI) a la medida", en: "Custom business intelligence (BI) app" },
      { es: "Automatización de marketing", en: "Marketing automation" },
      { es: "Diseño y desarrollo a la medida (hasta 12 h de código)", en: "Custom design and development (up to 12 h of code)" },
      { es: "Branding avanzado y 2 a 3 videos en 4K", en: "Advanced branding and 2 to 3 videos in 4K" },
      { es: "VPAT / reporte de conformidad", en: "VPAT / conformance report" },
      { es: "Estrategia y roadmap trimestrales", en: "Quarterly strategy and roadmap" },
    ],
    highlight: {
      es: "Ahorras {saving} frente al valor de cada servicio por separado.",
      en: "You save {saving} against the value of each service on its own.",
    },
    renewal: {
      es: "Contrato de 8 meses ({total} en total). Después de los primeros 12 meses, el hosting se renueva en {hosting} al año. La inversión en pauta, el dominio y la suscripción de Shopify los pagas tú directamente.",
      en: "8-month contract ({total} in total). After the first 12 months, hosting renews at {hosting} a year. You pay for ad spend, the domain and the Shopify subscription directly.",
    },
    cta: { es: "Quiero Cúspide", en: "I want Peak" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Lo que nos preguntan antes de empezar.", en: "What people ask before they start." },
    items: [
      {
        title: { es: "¿Qué sistemas pueden integrar?", en: "Which systems can you integrate?" },
        body: {
          es: "Hasta 3 de los sistemas que ya usas, con un máximo de 16 horas de desarrollo. Además incluye las integraciones de plataforma de Escala, como Meta Graph API.",
          en: "Up to 2 of the systems you already use, with a maximum of 16 hours of development. It also includes Scale's platform integrations, such as Meta Graph API.",
        },
      },
      {
        title: { es: "¿Qué es la app de BI?", en: "What is the BI app?" },
        body: {
          es: "Tu propia web app con todos tus datos y la gestión de tus calendarios. Tú decides quién ve qué, con los niveles de acceso que quieras.",
          en: "Your own web app with all your data and your calendar management. You decide who sees what, with the access levels you want.",
        },
      },
      {
        title: { es: "¿Qué se automatiza exactamente?", en: "What exactly gets automated?" },
        body: {
          es: "Correos masivos, respuestas y calendarización, sin esfuerzo manual. Se suma a la automatización básica de correo y WhatsApp que ya incluye Escala.",
          en: "Bulk email, replies and scheduling, with no manual effort. It adds to the basic email and WhatsApp automation already in Scale.",
        },
      },
      {
        title: { es: "¿Cuánto dura el contrato?", en: "How long is the contract?" },
        body: {
          es: "8 meses, a {price} al mes. El total del contrato es {total}.",
          en: "8 months, at {price} a month. The contract total is {total}.",
        },
      },
      {
        title: { es: "¿Qué pago aparte?", en: "What do I pay separately?" },
        body: {
          es: "La inversión en pauta, el dominio y la suscripción de Shopify los pagas tú directamente. El hosting se renueva en {hosting} al año después de los primeros 12 meses.",
          en: "You pay for ad spend, the domain and the Shopify subscription directly. Hosting renews at {hosting} a year after the first 12 months.",
        },
      },
      {
        title: { es: "¿La sesión presencial aplica para mí?", en: "Does the on-site visit apply to me?" },
        body: {
          es: "La sesión presencial trimestral en San Diego es para el mercado de Estados Unidos. La estrategia y el roadmap trimestrales están incluidos en ambos mercados.",
          en: "The quarterly on-site visit in San Diego is for the US market. The quarterly strategy and roadmap are included in both markets.",
        },
      },
      {
        title: { es: "¿Y si necesito todavía más?", en: "What if I need even more?" },
        body: {
          es: "Para eso está Aliado: equipo asignado a tu área, soporte 24/7, sitios de 1,000 páginas o más y desarrollo a la medida.",
          en: "That's what Partner is for: a team assigned to your area, 24/7 support, sites of 1,000 pages or more and custom development.",
        },
      },
    ],
  },
  final: {
    title: {
      es: "Tu negocio ya creció. Que tus sistemas lo alcancen.",
      en: "Your business has grown. Let your systems catch up.",
    },
    sub: {
      es: "{price} al mes por 8 meses. Hosting del primer año incluido.",
      en: "{price} a month for 8 months. First year of hosting included.",
    },
    cta: { es: "Empezar ahora", en: "Start now" },
  },
  stickyLabel: { es: "Cúspide · software y automatización", en: "Peak · software and automation" },
};
