import type { LandingContent } from "@/lib/landings";

/**
 * IA Exprés / AI Express landing (/pricing/ai-express). Every claim here mirrors the plan's
 * data in src/lib/pricing.ts and the pricing master (5 Nov 2026): ready in 3 days from
 * complete content, 1 revision round, starts with a kickoff meeting; 1–3 pages, up to 5
 * products, bilingual EN/ES, AI-generated site and copy, AEO, 3 social pieces once (images
 * and mini clips), 12 months of hosting with backups and security, social button + form,
 * GA4, Meta Pixel with consent, privacy notice, WhatsApp/email support, the 30-day credit
 * toward Arranque. Change the plan there and here together.
 */
export const aiExpressLanding: LandingContent = {
  planId: "express",
  slug: "ai-express",
  meta: {
    title: { es: "IA Exprés: tu sitio web en 3 días", en: "AI Express: your website in 3 days" },
    description: {
      es: "Sitio web bilingüe generado con IA, listo en 3 días a partir de tu contenido completo. Pago único, hosting del primer año incluido, analítica y AEO.",
      en: "A bilingual AI-generated website, ready in 3 days from your complete content. One-time payment, first year of hosting included, analytics and AEO.",
    },
    keywords: {
      es: ["sitio web en 3 días", "página web con IA", "sitio web bilingüe Tijuana", "página web pago único", "IA Exprés Ecommetrica"],
      en: ["website in 3 days", "AI website", "bilingual website San Diego", "one-time payment website", "AI Express Ecommetrica"],
    },
  },
  hero: {
    eyebrow: { es: "IA Exprés · Pago único", en: "AI Express · One-time payment" },
    lines: [
      { es: "Tu negocio,", en: "Your business," },
      { es: "en línea", en: "online" },
      { es: "en 3 días.", en: "in 3 days." },
    ],
    sub: {
      es: "Una reunión de inicio, tu contenido, y la IA genera tu sitio bilingüe, sus textos y 3 piezas para redes. En 3 días, tus clientes ya te encuentran.",
      en: "A kickoff meeting, your content, and AI generates your bilingual site, its copy and 3 social pieces. In 3 days, your customers are already finding you.",
    },
    ctaPrimary: { es: "Quiero mi sitio", en: "I want my site" },
    ctaSecondary: { es: "Cómo funciona", en: "How it works" },
    priceNote: { es: "Pago único · Hosting del primer año incluido", en: "One-time payment · First year of hosting included" },
    proof: [
      { es: "Listo en 3 días", en: "Ready in 3 days" },
      { es: "Español e inglés", en: "Spanish and English" },
      { es: "Sin mensualidades", en: "No monthly fees" },
      { es: "Hosting 12 meses incluido", en: "12 months of hosting included" },
    ],
  },
  problem: {
    eyebrow: { es: "El costo de esperar", en: "The cost of waiting" },
    title: {
      es: "Cada semana sin sitio es una semana regalándole clientes a tu competencia.",
      en: "Every week without a website is a week of customers handed to your competition.",
    },
    items: [
      {
        title: { es: "Te buscan y no apareces", en: "They search and you're not there" },
        body: {
          es: "Hoy la gente busca en Google y le pregunta a la IA antes de llamar. Si no tienes sitio, la respuesta es otro negocio.",
          en: "People search Google and ask AI before they call. Without a website, the answer is someone else.",
        },
      },
      {
        title: { es: "Un perfil en redes no basta", en: "A social profile isn't enough" },
        body: {
          es: "Las redes cambian sus reglas cuando quieren. Tu sitio es el único lugar en internet que es tuyo.",
          en: "Social platforms change their rules whenever they like. Your website is the one place online that's yours.",
        },
      },
      {
        title: { es: "Hacerlo tú cuesta más de lo que parece", en: "Doing it yourself costs more than it looks" },
        body: {
          es: "Plantillas, textos, idiomas, hosting, analítica… son semanas de tu tiempo que no estás vendiendo.",
          en: "Templates, copy, languages, hosting, analytics… that's weeks of your time you're not selling.",
        },
      },
    ],
  },
  included: {
    eyebrow: { es: "Qué incluye", en: "What's included" },
    title: { es: "Todo lo que necesitas para abrir. Nada que no.", en: "Everything you need to open. Nothing you don't." },
    sub: {
      es: "Un sitio completo, listo para recibir clientes y medir resultados desde el primer día.",
      en: "A complete website, ready to take customers and measure results from day one.",
    },
    items: [
      {
        title: { es: "Sitio de 1 a 3 páginas", en: "A 1 to 3 page website" },
        body: {
          es: "Generado con IA a partir de tu información: claro, rápido y pensado para que te escriban.",
          en: "Generated with AI from your information: clear, fast and built to make people reach out.",
        },
      },
      {
        title: { es: "Español e inglés", en: "Spanish and English" },
        body: {
          es: "Atiende a clientes de los dos lados de la frontera desde el primer día.",
          en: "Serve customers on both sides of the border from day one.",
        },
      },
      {
        title: { es: "Hasta 5 productos", en: "Up to 5 products" },
        body: {
          es: "Muestra lo que vendes con fotos y descripción, listo para que pregunten por él.",
          en: "Show what you sell with photos and descriptions, ready for people to ask about it.",
        },
      },
      {
        title: { es: "Textos escritos con IA", en: "Copy written with AI" },
        body: {
          es: "No tienes que redactar nada: la IA escribe los textos del sitio con tu información.",
          en: "You don't write a word: AI writes the site's copy from your information.",
        },
      },
      {
        title: { es: "AEO: que las IAs te encuentren", en: "AEO: get found by AI" },
        body: {
          es: "Estructura pensada para que ChatGPT, Gemini y otros asistentes puedan encontrarte y citarte.",
          en: "Structured so ChatGPT, Gemini and other assistants can find you and cite you.",
        },
      },
      {
        title: { es: "3 piezas para redes", en: "3 social pieces" },
        body: {
          es: "Imágenes y miniclips generados con IA para anunciar tu lanzamiento (una sola vez).",
          en: "AI-generated images and mini clips to announce your launch (a one-time set).",
        },
      },
      {
        title: { es: "Redes y formulario", en: "Social and form" },
        body: {
          es: "Botón a tus redes sociales y formulario: cada visita está a un toque de contactarte.",
          en: "A button to your social media and a form: every visitor is one tap from reaching you.",
        },
      },
      {
        title: { es: "Hosting por 12 meses", en: "12 months of hosting" },
        body: {
          es: "Hosting y mantenimiento con respaldos y seguridad, incluidos el primer año.",
          en: "Hosting and maintenance with backups and security, included for the first year.",
        },
      },
      {
        title: { es: "Analítica y privacidad en regla", en: "Analytics and privacy, done right" },
        body: {
          es: "Google Analytics 4, Meta Pixel con consentimiento, banner de cookies y aviso de privacidad.",
          en: "Google Analytics 4, Meta Pixel with consent, a cookie banner and a privacy notice.",
        },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    title: { es: "Tú pones el contenido. Nosotros, todo lo demás.", en: "You bring the content. We handle the rest." },
    sub: { es: "Tres pasos, tres días.", en: "Three steps, three days." },
    items: [
      {
        title: { es: "Reunión de inicio", en: "Kickoff meeting" },
        body: {
          es: "Conocemos tu negocio y reunimos tu información, tus fotos, tus productos y tu logo.",
          en: "We get to know your business and gather your information, photos, products and logo.",
        },
      },
      {
        title: { es: "La IA genera tu sitio", en: "AI generates your site" },
        body: {
          es: "Las páginas, los textos en español e inglés y tus 3 piezas para redes.",
          en: "The pages, the copy in Spanish and English, and your 3 social pieces.",
        },
      },
      {
        title: { es: "Lo revisas y sale en línea", en: "You review it and it goes live" },
        body: {
          es: "Una ronda de revisión y tu sitio se publica, con hosting, formulario y analítica funcionando.",
          en: "One revision round and your site goes live, with hosting, the form and analytics running.",
        },
      },
    ],
    note: {
      es: "Los 3 días cuentan desde que tu contenido está completo. Incluye 1 ronda de revisión.",
      en: "The 3 days start once your content is complete. Includes 1 revision round.",
    },
  },
  alternatives: {
    eyebrow: { es: "Compara", en: "Compare" },
    title: { es: "Tres caminos para tener sitio. Solo uno tarda 3 días.", en: "Three ways to get a website. Only one takes 3 days." },
    columns: [
      { es: "Hacerlo tú", en: "Do it yourself" },
      { es: "Agencia tradicional", en: "Traditional agency" },
      { es: "IA Exprés", en: "AI Express" },
    ],
    rows: [
      {
        label: { es: "Tiempo para estar en línea", en: "Time to go live" },
        values: [
          { es: "Lo que te tome", en: "However long it takes you" },
          { es: "Semanas o meses", en: "Weeks or months" },
          { es: "3 días", en: "3 days" },
        ],
      },
      {
        label: { es: "Quién escribe los textos", en: "Who writes the copy" },
        values: [
          { es: "Tú", en: "You" },
          { es: "Tú o la agencia", en: "You or the agency" },
          { es: "La IA, con tu información", en: "AI, from your information" },
        ],
      },
      {
        label: { es: "Español e inglés", en: "Spanish and English" },
        values: [
          { es: "Lo configuras tú", en: "You set it up" },
          { es: "Según cotización", en: "Quoted separately" },
          { es: "Incluido", en: "Included" },
        ],
      },
      {
        label: { es: "Hosting", en: "Hosting" },
        values: [
          { es: "Suscripción mensual", en: "Monthly subscription" },
          { es: "Según cotización", en: "Quoted separately" },
          { es: "12 meses incluidos", en: "12 months included" },
        ],
      },
      {
        label: { es: "Forma de pago", en: "How you pay" },
        values: [
          { es: "Mensualidad", en: "Monthly" },
          { es: "Anticipo y pagos", en: "Deposit and installments" },
          { es: "Un solo pago de {price}", en: "One payment of {price}" },
        ],
      },
    ],
    footnote: {
      es: "Comparación general del mercado; cada proveedor es distinto.",
      en: "A general market comparison; every provider is different.",
    },
  },
  fit: {
    eyebrow: { es: "Sin rodeos", en: "Straight talk" },
    title: { es: "¿Es para ti?", en: "Is it right for you?" },
    yesTitle: { es: "IA Exprés es para ti si…", en: "AI Express is for you if…" },
    yes: [
      { es: "Necesitas estar en línea ya", en: "You need to be online now" },
      { es: "Ya tienes tu información, tus fotos y tu logo", en: "You already have your information, photos and logo" },
      { es: "Te bastan de 1 a 3 páginas y hasta 5 productos", en: "1 to 3 pages and up to 5 products are enough" },
      { es: "Prefieres un solo pago a una mensualidad", en: "You'd rather pay once than every month" },
    ],
    noTitle: { es: "Mejor elige Arranque si…", en: "Choose Launch instead if…" },
    no: [
      { es: "Necesitas crear tu identidad visual", en: "You need a visual identity created" },
      { es: "Quieres textos con contenido original y SEO completo", en: "You want original website copy and full SEO" },
      { es: "Vendes más de 5 productos o quieres blog", en: "You sell more than 5 products or want a blog" },
      { es: "Quieres contenido para redes cada mes", en: "You want social content every month" },
    ],
    noPlanId: "simple",
    noCta: { es: "Ver Arranque", en: "See Launch" },
  },
  offer: {
    eyebrow: { es: "La inversión", en: "The investment" },
    title: { es: "Un solo pago. Sin mensualidades.", en: "One payment. No monthly fees." },
    bullets: [
      { es: "Sitio de 1 a 3 páginas en español e inglés", en: "A 1 to 3 page site in Spanish and English" },
      { es: "Hasta 5 productos", en: "Up to 5 products" },
      { es: "Textos y 3 piezas para redes generados con IA", en: "AI-generated copy and 3 social pieces" },
      { es: "AEO, Google Analytics 4 y Meta Pixel", en: "AEO, Google Analytics 4 and Meta Pixel" },
      { es: "Botón de redes, formulario y aviso de privacidad", en: "Social button, form and privacy notice" },
      { es: "Hosting y mantenimiento con respaldos y seguridad por 12 meses", en: "12 months of hosting and maintenance with backups and security" },
      { es: "Reunión de inicio y 1 ronda de revisión", en: "Kickoff meeting and 1 revision round" },
      { es: "Soporte por WhatsApp y correo", en: "Support by WhatsApp and email" },
    ],
    highlight: {
      es: "Si pasas a Arranque en los primeros 30 días, se abona el pago de IA Exprés.",
      en: "Upgrade to Launch within 30 days and the AI Express payment is credited.",
    },
    renewal: {
      es: "Después del primer año, el hosting se renueva en {hosting} al año. El dominio lo pagas tú directamente.",
      en: "After the first year, hosting renews at {hosting} a year. You pay for the domain directly.",
    },
    cta: { es: "Quiero mi sitio", en: "I want my site" },
  },
  faq: {
    eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
    title: { es: "Lo que nos preguntan antes de empezar.", en: "What people ask before they start." },
    items: [
      {
        title: { es: "¿Qué necesito mandarles?", en: "What do I need to send you?" },
        body: {
          es: "La información de tu negocio, tus fotos, tus productos (hasta 5) y tu logo. Con eso la IA genera el sitio y sus textos.",
          en: "Your business information, your photos, your products (up to 5) and your logo. With that, AI generates the site and its copy.",
        },
      },
      {
        title: { es: "¿Cuándo empiezan a contar los 3 días?", en: "When do the 3 days start?" },
        body: {
          es: "Desde que tu contenido está completo. Empezamos con una reunión de inicio para reunirlo.",
          en: "Once your content is complete. We start with a kickoff meeting to gather it.",
        },
      },
      {
        title: { es: "¿Puedo pedir cambios?", en: "Can I ask for changes?" },
        body: {
          es: "Sí: incluye 1 ronda de revisión antes de publicar.",
          en: "Yes: it includes 1 revision round before going live.",
        },
      },
      {
        title: { es: "¿En qué idiomas queda mi sitio?", en: "What languages will my site be in?" },
        body: {
          es: "En español e inglés. Si después necesitas más idiomas, Escala incluye sitio multilingüe.",
          en: "Spanish and English. If you later need more languages, Scale includes a multilingual site.",
        },
      },
      {
        title: { es: "¿Qué pasa después del primer año?", en: "What happens after the first year?" },
        body: {
          es: "Los primeros 12 meses de hosting y mantenimiento están incluidos. Después se renueva cada año en {hosting}.",
          en: "The first 12 months of hosting and maintenance are included. After that it renews each year at {hosting}.",
        },
      },
      {
        title: { es: "¿El dominio está incluido?", en: "Is the domain included?" },
        body: {
          es: "No. El dominio lo pagas tú directamente.",
          en: "No. You pay for the domain directly.",
        },
      },
      {
        title: { es: "¿Y si después quiero más?", en: "What if I want more later?" },
        body: {
          es: "Si pasas a Arranque en los primeros 30 días, se abona lo que pagaste por IA Exprés. Arranque incluye todo lo de IA Exprés y más.",
          en: "Upgrade to Launch within 30 days and your AI Express payment is credited. Launch includes everything in AI Express and more.",
        },
      },
      {
        title: { es: "¿Tengo soporte?", en: "Do I get support?" },
        body: { es: "Sí, por WhatsApp y correo.", en: "Yes, by WhatsApp and email." },
      },
    ],
  },
  final: {
    title: { es: "Tu sitio puede estar listo en 3 días.", en: "Your site could be ready in 3 days." },
    sub: {
      es: "Un solo pago de {price}. Hosting del primer año incluido.",
      en: "One payment of {price}. First year of hosting included.",
    },
    cta: { es: "Empezar ahora", en: "Start now" },
  },
  stickyLabel: { es: "IA Exprés · listo en 3 días", en: "AI Express · ready in 3 days" },
};
