import type { Lang } from "@/lib/i18n/types";

/** One titled block of a legal document — see `LegalDocument.tsx` for rendering. */
export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/** Shared shape for standalone "what is X, why does it matter at this tier, what do we
 *  deliver" pages linked from a plan feature's "Learn more" (vpatPage, ga4Page, etc.) —
 *  see FeatureExplainerPage.tsx for the one layout that renders all of them. */
export type FeatureExplainerContent = {
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  headline: string;
  intro: string;
  whatTitle: string;
  whatBody: string;
  whyTitle: string;
  whyBody: string;
  deliverableTitle: string;
  deliverableBody: string;
  backCta: string;
};

export type Dict = {
  siteMeta: { title: string; description: string; keywords: string[] };
  nav: {
    studio: string;
    services: string;
    work: string;
    blog: string;
    faq: string;
    contact: string;
    talk: string;
    logoAlt: string;
  };
  mobileMenu: { open: string; close: string };
  languageSwitcher: { ariaLabel: string };
  themeSwitcher: { ariaLabel: string };
  a11y: { skipToContent: string; pauseVideo: string; playVideo: string };
  footer: {
    privacy: string;
    terms: string;
    accessibility: string;
    faq: string;
    eyebrow: string;
    headline: string;
    leaveRequest: string;
    rights: string;
  };
  hero: {
    eyebrow: string;
    headlinePre: string;
    headlineAccent: string;
    headlinePost: string;
    sub: string;
    ctaServices: string;
    ctaWork: string;
  };
  pillars: {
    flow: [string, string, string];
    headlinePre: string;
    headlineStrong: string;
    headlineTail: string;
    items: { title: string; copy: string }[];
    stats: { value: string; label: string }[];
  };
  bigNav: { work: string; services: string; talk: string };
  marquee: { words: string[] };
  planes: {
    eyebrow: string;
    bigWord: string;
    sub: string;
    select: string;
    viewAll: string;
  };
  servicesOverview: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    /** Group label for the layer buttons. */
    layersAria: string;
    /** Under a layer's services: the earliest plan carrying that layer. */
    includedFrom: (plan: string) => string;
    cta: string;
    ctaPlans: string;
  };
  selectWork: {
    headline: string;
    headlineAccent: string;
    seeAll: string;
  };
  workGallery: {
    filterAriaLabel: string;
    all: string;
    viewProject: string;
    visitSite: string;
    withTestimonial: string;
    withTestimonialAriaLabel: string;
  };
  aboutStudio: {
    eyebrow: string;
    studioWord: string;
    prevAria: string;
    nextAria: string;
    viewAria: (name: string) => string;
  };
  methodology: {
    eyebrow: string;
    headline: string;
    intro: string[];
    /** `copy` is optional: an unwritten step renders as a title only. */
    steps: { title: string; copy?: string }[];
  };
  contactForm: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    companyLabel: string;
    packageSummaryLabel: string;
    packagePrefilledNotice: string;
    messageLabel: string;
    sendingToast: string;
    successToast: string;
    errorFallback: string;
    successTitle: string;
    successSub: string;
    submitting: string;
    submit: string;
    /** Simplified privacy notice (LFPDPPP) shown above the consent checkbox. */
    consentNotice: string;
    /** Checkbox label; `consentLinkLabel` is appended as a link to the privacy policy. */
    consentLabel: string;
    consentLinkLabel: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      messageTooShort: string;
      consentRequired: string;
    };
  };
  contactPage: {
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
    sub: string;
    scrollToFormCta: string;
  };
  servicesPage: {
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
    sub: string;
    goalsTitle: string;
    /** Goal buttons read "{goalPrefix} {goal}" — "Quiero vender en línea". */
    goalPrefix: string;
    bundleKicker: string;
    bundleFrom: string;
    bundleCta: (plan: string) => string;
    compareCta: string;
    allTitle: string;
    allSub: string;
    includedFrom: (plan: string) => string;
  };
  studioPage: {
    metaDescription: string;
    keywords: string[];
    quote: string;
    intro: string[];
    missionTitle: string;
    missionCopy: string;
    visionTitle: string;
    visionCopy: string;
    howWeWorkTitle: string;
    reasons: { title: string; copy: string }[];
    teamTitle: string;
  };
  workPage: { metaDescription: string; keywords: string[]; headline: string };
  workDetail: {
    back: string;
    briefing: string;
    visitSite: string;
    client: string;
    year: string;
    imageClose: string;
    imageNext: string;
    imagePrevious: string;
  };
  blogPage: {
    metaDescription: string;
    keywords: string[];
    headline: string;
    intro: { lead: string; listTitle: string; items: string[]; closing: string };
    latestTitle: string;
    dateLocale: string;
  };
  blogDetail: { back: string; dateLocale: string };
  faqPage: {
    title: string;
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
    listHeading: string;
    stillTitle: string;
    stillCopy: string;
    cta: string;
  };
  packagesPage: {
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
    sub: string;
  };
  pricingPage: {
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
    sub: string;
    bannerTitle: string;
    bannerTitleUs: string;
    bannerBody: string;
    bestValueBadge: string;
    oneTimeLabel: string;
    perMonth: string;
    totalLabel: string;
    servicesLabel: string;
    perServiceLabel: string;
    lowestBadge: string;
    selectCta: string;
    customFromLabel: string;
    customTotalLabel: string;
    customScaleLabel: string;
    customModuleLabel: string;
    customChooseOne: string;
    customCta: string;
    footnote: string;
    footer: string;
    includesAllFrom: (planName: string) => string;
    viewAllIncluded: string;
    viewLess: string;
    learnMore: string;
    /** Side-column heading on the feature explainer pages: the plans carrying the feature. */
    includedInLabel: string;
    specsLabels: { pages: string; products: string; blog: string; social: string };
    compareTitle: string;
    compareSub: string;
    colService: string;
    rowPrice: string;
    rowDuration: string;
    rowTotal: string;
    summaryTitle: string;
    rowServices: string;
    rowPerService: string;
    rowSaving: string;
    rowStage: string;
    rowRenewal: string;
    comparedWithMarket: string;
    includedAria: string;
    notIncludedAria: string;
    compareHint: string;
    compareClear: string;
    compareOnlyDiff: string;
    stageLabel: string;
    notes: {
      inheritance: string;
      hosting: (price: string) => string;
      /** Who pays what outside the plan (24/7 support, ad spend, domain, Shopify). */
      clientCosts: string;
    };
  };
  vpatPage: FeatureExplainerContent;
  ga4Page: FeatureExplainerContent;
  metaGraphApiPage: FeatureExplainerContent;
  googleBusinessProfilePage: FeatureExplainerContent;
  packagesFlow: {
    /** Plan, one per `packagePhases` entry (packages.ts), then the summary. */
    stepLabels: [string, string, string, string, string];
    stepOf: (current: number, total: number) => string;
    choosePlanCta: string;
    planSelected: string;
    changePlan: string;
    addCta: string;
    addedCta: string;
    includedBadge: string;
    quoteOnRequestLabel: string;
    backCta: string;
    continueCta: string;
    reviewCta: string;
    requirePlanNotice: string;
    orderSummaryLabel: string;
    summaryTitle: string;
    summaryBasePlan: string;
    summaryExtras: string;
    summaryNoExtras: string;
    summaryTotal: string;
    summarySendCta: string;
    messagePlanLabel: string;
    messageExtrasLabel: string;
    messageTotalLabel: string;
    /** Whole-term total of the package: (plan + extras per month) × the plan's months. */
    summaryPlanTotal: string;
    /** Why AI Express skips the extras steps — it's sold alone, as a single piece. */
    expressAloneNotice: string;
    /** AI Express → Launch upgrade credit; `amount` is the formatted AI Express price. */
    expressCredit: (amount: string) => string;
    messageNoteLabel: string;
  };
  legal: {
    privacyTitle: string;
    privacyMetaDescription: string;
    privacyKeywords: string[];
    privacyIntro: string[];
    privacySections: LegalSection[];
    termsTitle: string;
    termsMetaDescription: string;
    termsKeywords: string[];
    termsIntro: string[];
    termsSections: LegalSection[];
    accessibilityTitle: string;
    accessibilityMetaDescription: string;
    accessibilityKeywords: string[];
    accessibilityMeta: string;
    accessibilityIntro: string[];
    accessibilitySections: LegalSection[];
  };
  notFound: {
    title: string;
    eyebrow: string;
    headline: string;
    sub: string;
    cta: string;
    ctaContact: string;
  };
};

export const dict: Record<Lang, Dict> = {
  es: {
    siteMeta: {
      title: "Ecommetrica | Desarrollo Web a Medida, Webapps y Ecommerce",
      description:
        "Creamos páginas, webapps y tiendas en línea. Impulsa tu marca con branding y marketing digital en Tijuana, San Diego y Los Ángeles.",
      keywords: [
        "Desarrollo web a medida",
        "Código",
        "agencias de desarrollo web",
        "desarrollo de webapps",
        "tiendas en línea Tijuana",
        "branding y diseño web",
        "consultoría tecnológica",
        "Paginas web",
        "Desarrollo de WeApps",
        "Diseño y producción",
        "desarrolladores web",
        "Marketing online",
        "Negocio digital",
      ],
    },
    nav: {
      studio: "Estudio",
      services: "Servicios",
      work: "Trabajo",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contacto",
      talk: "Hablemos",
      logoAlt:
        "Ecommetrica es una consultora y empresa de gestión especializada en marketing y tecnología para el comercio electrónico de empresas y marcas",
    },
    mobileMenu: { open: "Menú", close: "Cerrar menú" },
    languageSwitcher: { ariaLabel: "Cambiar idioma" },
    themeSwitcher: { ariaLabel: "Tema" },
    a11y: {
      skipToContent: "Saltar al contenido",
      pauseVideo: "Pausar video",
      playVideo: "Reproducir video",
    },
    footer: {
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      accessibility: "Accesibilidad",
      faq: "FAQ",
      eyebrow: "Contáctanos",
      headline: "¿Estás listo?",
      leaveRequest: "Hablemos de lo que tu página web podría aportar a tu negocio.",
      rights: "Todos los derechos reservados.",
    },
    hero: {
      eyebrow: "Desarrollo web y webapps en Tijuana y San Diego",
      headlinePre: "Creamos",
      headlineAccent: "marcas",
      headlinePost: "que transforman industrias e impulsan negocios.",
      sub: "Tu website y tus webapps son las herramientas de crecimiento más eficaces.",
      ctaServices: "Descubre los servicios",
      ctaWork: "Ve nuestro trabajo",
    },
    pillars: {
      flow: ["Marca", "Experiencia", "Cultura"],
      headlinePre: "Páginas web y tiendas online",
      headlineStrong: "únicas",
      headlineTail: "para maximizar las ventas y liderar tu presencia en internet.",
      items: [
        {
          title: "Marca",
          copy: "Estrategia de marca construida desde el negocio, no desde la forma.",
        },
        {
          title: "Experiencia",
          copy: "Sistemas digitales seguros y funcionales que sostienen el crecimiento.",
        },
        {
          title: "Cultura",
          copy: "Acompañamiento como socios estratégicos, con visión de largo plazo.",
        },
      ],
      stats: [
        { value: "+40", label: "Proyectos entregados" },
        { value: "15", label: "Industrias atendidas" },
        { value: "98%", label: "Clientes que renuevan" },
      ],
    },
    bigNav: { work: "Trabajo", services: "Servicios", talk: "Hablemos" },
    marquee: {
      words: [
        "Páginas",
        "Webapps",
        "Tiendas en línea",
        "Branding",
        "Marketing digital",
        "Tijuana",
        "San Diego",
        "Los Ángeles",
      ],
    },
    planes: {
      eyebrow: "Nuestros",
      bigWord: "PLANES",
      sub: "Cinco paquetes con todo incluido: sitio web, SEO, redes y publicidad. Elige el que corresponda a la etapa de tu negocio.",
      select: "Seleccionar",
      viewAll: "Ver todos los planes y precios",
    },
    servicesOverview: {
      eyebrow: "Servicios",
      headline: "Todo tu ecosistema digital,",
      headlineAccent: "en un solo plan.",
      sub: "Cinco capas, un solo equipo. Elige una para ver todo lo que hacemos en ella.",
      layersAria: "Capas de servicio",
      includedFrom: (plan) => `Incluido en los planes desde ${plan}.`,
      cta: "Ver todos los servicios",
      ctaPlans: "Ver planes",
    },
    selectWork: {
      headline: "Nuestros",
      headlineAccent: "Proyectos",
      seeAll: "Ver todos los proyectos",
    },
    workGallery: {
      filterAriaLabel: "Filtrar por tipo de proyecto",
      all: "Todos",
      viewProject: "Ver proyecto",
      visitSite: "Visitar sitio",
      withTestimonial: "Con testimonial",
      withTestimonialAriaLabel: "Mostrar solo proyectos con testimonial en video",
    },
    aboutStudio: {
      eyebrow: "Sobre el",
      studioWord: "Studio",
      prevAria: "Miembro anterior",
      nextAria: "Siguiente miembro",
      viewAria: (name) => `Ver a ${name}`,
    },
    methodology: {
      eyebrow: "Nuestra metodología",
      headline: "Trabajo en equipo y bajo una misma metodología",
      intro: [
        "Conoce las bases para que no te den gato por liebre.",
        "Hemos tenido el gozo de poner nuestro gramito de arena en proyectos nuevos, refrescar proyectos con larga trayectoria y mejorar sitios web y aplicaciones.",
      ],
      steps: [
        {
          title: "Crea tu sitio desde cero",
          copy: "Aquí una idea o un objeto puede inspirarnos. Y si ya tienes todo listo, ¡comenzamos!",
        },
        {
          title: "Creamos código limpio para ofrecer experiencias dinámicas",
          copy: "Escribimos cada componente a la medida: código ordenado que carga rápido y es fácil de mantener.",
        },
        {
          title: "Siempre tendrás un DEVELOPMENT",
          copy: "Mientras creamos tu página, tienda en línea o webapp siempre tendrás una versión beta para que conviertas el tráfico en ingresos, realices pruebas con herramientas nativas y personalices según tu público.",
        },
      ],
    },
    contactForm: {
      nameLabel: "Nombre",
      emailLabel: "Correo",
      phoneLabel: "Teléfono",
      companyLabel: "Empresa",
      packageSummaryLabel: "Paquete seleccionado",
      packagePrefilledNotice: "Agregamos tu paquete — completa tus datos para recibir tu cotización.",
      messageLabel: "Mensaje",
      sendingToast: "Enviando tu mensaje...",
      successToast: "Mensaje enviado — nos pondremos en contacto pronto.",
      errorFallback: "Algo salió mal.",
      successTitle: "Gracias — nos pondremos en contacto pronto.",
      successSub: "Tu solicitud fue enviada al equipo de Ecommetrica.",
      submitting: "Enviando...",
      submit: "Enviar formulario",
      consentNotice:
        "Ecommetrica usará tu nombre, correo, teléfono, empresa y mensaje solo para responder tu solicitud y enviarte una cotización. No vendemos ni compartimos tus datos con terceros para fines propios.",
      consentLabel: "He leído y acepto el ",
      consentLinkLabel: "aviso de privacidad",
      errors: {
        nameRequired: "Ingresa tu nombre.",
        emailRequired: "Ingresa tu correo.",
        emailInvalid: "Ingresa un correo válido.",
        phoneInvalid: "Ingresa un teléfono válido.",
        messageTooShort: "Escribe un mensaje de al menos 10 caracteres.",
        consentRequired: "Necesitamos tu consentimiento para responder tu solicitud.",
      },
    },
    contactPage: {
      metaDescription: "Deja tu solicitud y el equipo de Ecommetrica se pondrá en contacto contigo.",
      keywords: ["contacto Ecommetrica", "cotización", "agencia digital Tijuana", "hablemos"],
      eyebrow: "Contáctanos",
      headline: "Construyamos algo que perdure.",
      sub: "Cuéntanos sobre tu proyecto — nuestro equipo responde cada solicitud personalmente.",
      scrollToFormCta: "Tu cotización está lista — completa el formulario aquí abajo para enviarla.",
    },
    servicesPage: {
      metaDescription:
        "Desarrollo web a medida, webapps, tiendas en línea, SEO y AEO, campañas, video y diseño. Todos los servicios de Ecommetrica en Tijuana, San Diego y Los Ángeles.",
      keywords: [
        "servicios de desarrollo web",
        "desarrollo de webapps",
        "tiendas en línea Tijuana",
        "posicionamiento SEO y AEO",
        "mantenimiento web",
        "diseño y branding",
      ],
      eyebrow: "Servicios",
      headline: "Convierte tu sitio web obsoleto en tu principal activo de crecimiento.",
      sub: "Marca, sitio, visibilidad, contenido y operación: lo hacemos todo, y lo entregamos dentro de un plan.",
      goalsTitle: "¿Qué quieres lograr?",
      goalPrefix: "Quiero",
      bundleKicker: "Todo junto",
      bundleFrom: "Desde",
      bundleCta: (plan) => `Ver ${plan}`,
      compareCta: "Comparar planes",
      allTitle: "Todo lo que hacemos",
      allSub: "Cada servicio viene incluido en nuestros planes: elige el plan y todo trabaja junto.",
      includedFrom: (plan) => `Incluido desde ${plan}`,
    },
    studioPage: {
      metaDescription:
        "Construimos ecosistemas digitales seguros para el crecimiento sostenible de los negocios.",
      keywords: [
        "estudio Ecommetrica",
        "equipo Ecommetrica",
        "consultoría estratégica",
        "branding",
        "misión y visión",
      ],
      quote:
        "Construimos ecosistemas digitales seguros para el crecimiento sostenible de los negocios.",
      intro: [
        "En 2023 comenzó Ecommetrica con un equipo pequeño pero lleno de buenas ideas y corazón.",
        "Nuestro equipo cuenta con un bagaje de más de 10 años de experiencia elaborando proyectos relacionados con el mundo digital, el diseño y el marketing online.",
        "Nos basamos en métodos iterativos de mejora: análisis, planificación, medición y testeo. Con mucha creatividad y método para generar marcas únicas.",
        // Salvaged from a source paragraph that otherwise repeated the two
        // lines above almost word for word; only this half said anything new.
        "Trabajamos con planeación estratégica y segura, y soluciones a la medida para tu negocio digital y tu comercio en línea.",
      ],
      missionTitle: "Misión",
      missionCopy:
        "Brindar soluciones digitales estratégicas, seguras y personalizadas que permitan a empresas y emprendedores fortalecer su presencia digital, optimizar sus procesos y alcanzar un crecimiento sostenible.",
      visionTitle: "Visión",
      visionCopy:
        "Ser la consultora digital referente en innovación, estrategia y seguridad tecnológica en Latinoamérica, impulsando la transformación digital de miles de negocios.",
      howWeWorkTitle: "Cómo trabajamos",
      reasons: [
        {
          title: "Pensamos la marca desde el negocio",
          copy: "No partimos de la forma ni de la comunicación. Partimos del contexto del negocio, sus decisiones críticas y su momento de crecimiento.",
        },
        {
          title: "Trabajamos con método, no con intuición",
          copy: "Cada proyecto sigue un proceso estratégico claro: diagnóstico, definición, sistema y activación.",
        },
        {
          title: "Tenemos independencia intelectual",
          copy: "No vendemos lo que el cliente pide, sino lo que necesita. Decimos la verdad estratégica, incluso cuando es incómoda.",
        },
        {
          title: "Acompañamos como socios estratégicos",
          copy: "Nos involucramos en el negocio del cliente y en sus decisiones clave, con visión de largo plazo.",
        },
      ],
      teamTitle: "El equipo",
    },
    workPage: {
      metaDescription: "Proyectos de branding y desarrollo web de Ecommetrica.",
      keywords: ["proyectos Ecommetrica", "portafolio", "casos de éxito", "desarrollo web", "branding"],
      headline: "Proyectos que construyen ecosistemas digitales sostenibles.",
    },
    workDetail: {
      back: "Volver a trabajo",
      briefing: "Briefing del proyecto",
      visitSite: "Ver sitio",
      client: "Cliente",
      year: "Año",
      imageClose: "Cerrar imagen",
      imageNext: "Imagen siguiente",
      imagePrevious: "Imagen anterior",
    },
    blogPage: {
      metaDescription: "Estrategia, tecnología y marketing digital desde Ecommetrica.",
      keywords: ["blog Ecommetrica", "estrategia digital", "tecnología", "marketing digital"],
      headline: "Ideas sobre estrategia, tecnología y marketing.",
      intro: {
        lead: "En Ecommetrica creemos que la tecnología y el marketing funcionan mejor cuando trabajan juntos, guiados por una estrategia clara. Este blog es el espacio donde compartimos cómo pensamos las decisiones digitales de nuestros clientes: no desde la forma, sino desde el contexto real del negocio.",
        listTitle: "Qué vas a encontrar aquí",
        items: [
          "Casos de estudio de marca y desarrollo web.",
          "Notas sobre seguridad y arquitectura digital.",
          "Criterios que usamos para tomar decisiones de marketing basadas en datos.",
        ],
        closing:
          "Si estás construyendo o escalando tu presencia digital, este es un buen lugar para empezar a seguir cómo lo hacemos.",
      },
      latestTitle: "Últimas publicaciones",
      dateLocale: "es-MX",
    },
    blogDetail: { back: "Volver al blog", dateLocale: "es-MX" },
    faqPage: {
      title: "FAQ",
      metaDescription:
        "Preguntas frecuentes sobre los servicios de Ecommetrica: branding, desarrollo web, marketing digital y seguridad tecnológica.",
      keywords: ["preguntas frecuentes", "FAQ Ecommetrica", "servicios Ecommetrica"],
      eyebrow: "Preguntas frecuentes",
      headline: "Lo que nos preguntan antes de empezar.",
      listHeading: "Preguntas frecuentes",
      stillTitle: "¿No está tu pregunta?",
      stillCopy: "Escríbenos y te respondemos personalmente.",
      cta: "Hablemos",
    },
    packagesPage: {
      metaDescription:
        "Arma tu paquete: elige tu plan base y agrega los extras de marketing, integraciones y personalización que tu proyecto necesita.",
      keywords: [
        "paquetes Ecommetrica",
        "planes de desarrollo web",
        "extras de marketing digital",
        "cotización personalizada",
      ],
      eyebrow: "Arma tu paquete",
      headline: "Elige tu plan y hazlo tuyo.",
      sub: "Empieza con un plan base y súmale los extras que tu proyecto necesita — tú decides qué lleva tu paquete.",
    },
    pricingPage: {
      metaDescription:
        "Planes y paquetes de Ecommetrica: sitio web, SEO/AEO, redes, publicidad y cumplimiento de accesibilidad. Precios por región.",
      keywords: [
        "planes Ecommetrica",
        "precios desarrollo web Tijuana",
        "paquetes de marketing digital",
        "cumplimiento ADA WCAG",
      ],
      eyebrow: "ECOMMETRICA",
      headline: "Planes y paquetes",
      sub: "Elige el plan según la etapa de tu negocio, no según la lista de servicios.",
      bannerTitle: "Cumplimiento incluido desde el plan Tracción.",
      bannerTitleUs: "Cumplimiento incluido desde el plan Arranque.",
      bannerBody:
        "Accesibilidad ADA / WCAG 2.1 AA y consentimiento de datos configurados desde el inicio — porque en California un sitio inaccesible es una exposición legal, no un detalle de diseño.",
      bestValueBadge: "Mejor valor",
      oneTimeLabel: "Pago único",
      perMonth: "/mes",
      totalLabel: "Total",
      servicesLabel: "servicios",
      perServiceLabel: "por servicio al mes",
      lowestBadge: "el más bajo",
      selectCta: "Seleccionar",
      customFromLabel: "Desde",
      customTotalLabel: "Desde",
      customScaleLabel: "Escala por número de personas",
      customModuleLabel: "Módulo base",
      customChooseOne: "Elige 1",
      customCta: "Cotizar",
      footnote: "★ Inclusiones exclusivas del mercado US — no disponibles en los planes de México.",
      footer:
        "Cada plan incluye la totalidad del plan anterior. Precios en USD; en los planes de varios meses el precio es mensual e IA Exprés es pago único. El costo por servicio se calcula sobre los servicios incluidos en cada plan. Vigencia sujeta a contrato.",
      includesAllFrom: (planName) => `Incluye todo lo de ${planName}`,
      viewAllIncluded: "Ver todo lo incluido",
      viewLess: "Ver menos",
      learnMore: "Saber más",
      includedInLabel: "Incluido en",
      specsLabels: {
        pages: "Páginas",
        products: "Productos en tienda",
        blog: "Posts de blog al mes",
        social: "Piezas para redes",
      },
      compareTitle: "Compara todos los planes",
      compareSub:
        "Precios en USD · ✓ incluido · Cada plan incluye todo lo del plan anterior · Escalera v1.2",
      colService: "Servicio",
      rowPrice: "Precio (USD)",
      rowDuration: "Duración",
      rowTotal: "Total del contrato (USD)",
      summaryTitle: "Resumen",
      rowServices: "Servicios incluidos",
      rowPerService: "Costo mensual por servicio (USD)",
      rowSaving: "Ahorro vs. comprar cada servicio por separado",
      rowStage: "Etapa del negocio",
      rowRenewal: "Renovación à la carte (al terminar el plan)",
      comparedWithMarket: "Se compara con el mercado",
      includedAria: "Incluido",
      notIncludedAria: "No incluido",
      compareHint: "Elige dos planes para compararlos lado a lado.",
      compareClear: "Quitar comparación",
      compareOnlyDiff: "Solo diferencias",
      stageLabel: "Ideal si",
      notes: {
        inheritance:
          "Cada plan incluye todo lo del plan anterior; desde Arranque, lo que IA Exprés genera con IA lo hacen personas asistidas con IA. El total del contrato siempre se muestra junto al precio mensual. Mejor valor = el plan con el mayor ahorro frente a comprar cada servicio por separado.",
        hosting: (price) =>
          `Hosting y mantenimiento: los primeros 12 meses van incluidos en todos los paquetes. Después se renueva cada año en la fecha de inicio: ${price} al año.`,
        clientCosts:
          "Soporte 24/7 solo en Aliado. La inversión en pauta, el dominio y la suscripción de Shopify los paga el cliente directamente.",
      },
    },
    vpatPage: {
      metaDescription:
        "Qué es un VPAT y por qué el plan Cúspide de Ecommetrica lo incluye como reporte de conformidad de accesibilidad.",
      keywords: ["VPAT", "reporte de conformidad", "accesibilidad web", "ADA WCAG Ecommetrica"],
      eyebrow: "ACCESIBILIDAD",
      headline: "VPAT / Reporte de conformidad",
      intro:
        "Un documento que dice, con detalle verificable, qué tan accesible es tu sitio — no una promesa de marketing.",
      whatTitle: "¿Qué es un VPAT?",
      whatBody:
        "Un VPAT (Voluntary Product Accessibility Template) es un documento estandarizado que evalúa un producto digital contra los criterios de accesibilidad de WCAG 2.1 AA y Section 508, criterio por criterio. El resultado es un reporte de conformidad: qué cumple tu sitio, qué cumple parcialmente y qué no aplica, con evidencia — no una casilla de \"sitio accesible\" sin respaldo.",
      whyTitle: "¿Por qué importa en el plan Cúspide?",
      whyBody:
        "A esta escala, tu sitio suele ser parte de procesos de compra o cumplimiento de otras empresas — grandes clientes, licitaciones o contratos en EUA piden evidencia de accesibilidad antes de firmar, no solo una declaración. El plan Tracción ya incluye cumplimiento ADA/WCAG 2.1 AA; Cúspide añade el reporte formal que convierte ese trabajo técnico en un documento que tu equipo legal o de compras puede exigir y verificar.",
      deliverableTitle: "¿Qué entrega Ecommetrica?",
      deliverableBody:
        "Una auditoría completa de tu sitio contra WCAG 2.1 AA, documentada en el formato VPAT estándar (modelo del International Committee for Information Technology Standards), más la remediación de los hallazgos encontrados dentro del alcance del plan. El reporte queda listo para compartirse con clientes, aliados o equipos de cumplimiento que lo soliciten.",
      backCta: "Ver planes y precios",
    },
    ga4Page: {
      metaDescription:
        "Qué es Google Analytics 4 y por qué Ecommetrica lo configura desde el plan IA Exprés.",
      keywords: ["Google Analytics 4", "GA4", "analítica web Ecommetrica"],
      eyebrow: "ANALÍTICA",
      headline: "Google Analytics 4",
      intro:
        "La base de cualquier decisión de marketing: saber qué está pasando en tu sitio antes de decidir qué cambiar.",
      whatTitle: "¿Qué es GA4?",
      whatBody:
        "Google Analytics 4 es la plataforma de analítica web de Google: registra qué páginas visitan tus usuarios, de dónde vienen, qué los hace convertir (comprar, llenar un formulario, llamar) y en qué punto abandonan. A diferencia de su versión anterior (Universal Analytics), GA4 está construido alrededor de eventos, no de sesiones, lo que lo hace más preciso para medir conversiones reales.",
      whyTitle: "¿Por qué importa desde el plan IA Exprés?",
      whyBody:
        "No puedes mejorar lo que no mides. Configurar GA4 desde el primer día — no meses después, cuando ya perdiste esos datos — es lo que te permite tomar decisiones de marketing basadas en comportamiento real de tus visitantes, no en suposiciones. Es la base sobre la que se apoyan las campañas de pauta y la optimización de conversión en los planes superiores.",
      deliverableTitle: "¿Qué entrega Ecommetrica?",
      deliverableBody:
        "Configuración de tu propiedad GA4, definición de eventos de conversión relevantes para tu negocio (compras, formularios, llamadas, WhatsApp, etc.), vinculación con Google Ads/Meta cuando aplique, y acceso a tu panel para que veas tus propios datos en cualquier momento.",
      backCta: "Ver planes y precios",
    },
    metaGraphApiPage: {
      metaDescription:
        "Qué es Meta Graph API y por qué Ecommetrica la integra desde el plan Escala.",
      keywords: ["Meta Graph API", "integración Facebook Instagram", "automatización Ecommetrica"],
      eyebrow: "INTEGRACIONES",
      headline: "Meta Graph API",
      intro:
        "La conexión técnica que permite que tu sitio y tus procesos de negocio hablen directamente con Facebook e Instagram, no solo que publiques en ellos.",
      whatTitle: "¿Qué es Meta Graph API?",
      whatBody:
        "Es la interfaz que Meta (Facebook/Instagram) ofrece para que una aplicación externa —como tu sitio o tu panel interno— lea y escriba datos directamente en sus plataformas: mensajes, reseñas, catálogos de producto, leads de formularios de anuncios, publicaciones automatizadas, entre otros. Sin esta integración, cada una de esas tareas se hace manualmente, plataforma por plataforma.",
      whyTitle: "¿Por qué importa en el plan Escala?",
      whyBody:
        "A esta escala ya gestionas publicidad digital, redes sociales y potencialmente un catálogo de productos — hacerlo manualmente entre pestañas deja de ser sostenible. La integración por API es lo que permite que tu dashboard centralice reseñas, leads y mensajes de Meta en un solo lugar y que las automatizaciones (correos, respuestas, reportes) funcionen sin intervención manual.",
      deliverableTitle: "¿Qué entrega Ecommetrica?",
      deliverableBody:
        "Configuración de la aplicación y permisos en Meta for Developers, conexión autenticada entre tu negocio y la API, y el mapeo específico de datos que tu plan incluye (leads, mensajes, catálogo o reseñas, según tu caso) hacia tu sitio o dashboard.",
      backCta: "Ver planes y precios",
    },
    googleBusinessProfilePage: {
      metaDescription:
        "Qué es Google Business Profile API y por qué Ecommetrica la integra desde el plan Arranque.",
      keywords: [
        "Google Business Profile API",
        "ficha de Google",
        "reseñas Google Ecommetrica",
      ],
      eyebrow: "INTEGRACIONES",
      headline: "Google Business Profile API",
      intro:
        "Tu ficha de Google (la que aparece en Maps y en la búsqueda local) conectada directamente a tu sitio, no administrada a mano desde otra pestaña.",
      whatTitle: "¿Qué es Google Business Profile API?",
      whatBody:
        "Es la interfaz que permite gestionar tu perfil de negocio en Google (horarios, publicaciones, preguntas y respuestas, y reseñas) de forma programática, en lugar de entrar manualmente a Google Business Profile Manager cada vez que necesitas actualizar algo o responder a un cliente.",
      whyTitle: "¿Por qué importa en el plan Arranque?",
      whyBody:
        "Cuando apenas abres, la mayoría de tus primeros clientes locales te encuentran — y te califican — en tu ficha de Google antes de llegar a tu sitio. Dejarla bien conectada desde el inicio hace que reseñas, horarios y publicaciones estén sincronizados con tu sitio desde el primer día, sin depender de que alguien entre a actualizarlos manualmente.",
      deliverableTitle: "¿Qué entrega Ecommetrica?",
      deliverableBody:
        "Verificación y conexión de tu perfil de Google Business a la API, configuración de sincronización de reseñas y preguntas frecuentes, y la automatización de publicaciones o alertas que tu plan incluya.",
      backCta: "Ver planes y precios",
    },
    packagesFlow: {
      stepLabels: ["Plan", "Producción", "Anuncios", "Branding", "Resumen"],
      stepOf: (current, total) => `Paso ${current} de ${total}`,
      choosePlanCta: "Seleccionar",
      planSelected: "Plan seleccionado",
      changePlan: "Cambiar plan",
      addCta: "Agregar",
      addedCta: "Agregado",
      includedBadge: "Incluido en tu plan",
      quoteOnRequestLabel: "Cotización a solicitud",
      backCta: "Atrás",
      continueCta: "Continuar",
      reviewCta: "Ver resumen",
      requirePlanNotice: "Elige un plan base para continuar.",
      orderSummaryLabel: "Tu paquete",
      summaryTitle: "Resumen de tu paquete",
      summaryBasePlan: "Plan base",
      summaryExtras: "Extras seleccionados",
      summaryNoExtras: "Sin extras adicionales.",
      summaryTotal: "Total estimado",
      summarySendCta: "Enviar solicitud",
      messagePlanLabel: "Plan elegido",
      messageExtrasLabel: "Extras seleccionados",
      messageTotalLabel: "Total estimado",
      summaryPlanTotal: "Total del paquete",
      expressAloneNotice: "IA Exprés se contrata solo, como pago único: no admite extras.",
      expressCredit: (amount) =>
        `Si pasas de IA Exprés a Arranque dentro de los primeros 30 días, se abona tu pago de IA Exprés (${amount}).`,
      messageNoteLabel: "Nota",
    },
    legal: {
      privacyTitle: "Política de privacidad",
      privacyMetaDescription:
        "Política de privacidad de Ecommetrica: qué datos recopilamos, cómo los usamos y cómo puedes solicitar su eliminación.",
      privacyKeywords: ["política de privacidad", "aviso de privacidad Ecommetrica"],
      privacyIntro: [
        "Última actualización: 14 de octubre de 2026.",
        "Este Aviso de Privacidad explica qué datos personales recaba Ecommetrica a través de https://ecommetrica.com, para qué los usa y cómo puedes ejercer tus derechos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México.",
        "Para cualquier tema relacionado con tus datos personales, escríbenos a privacidad@ecommetrica.com.",
      ],
      privacySections: [
        {
          heading: "Responsable de tus datos",
          paragraphs: [
            "Ecommetrica (nombre comercial), con domicilio en Calle Ignacio Zaragoza 8169-306, Gustavo Madero, Tijuana, Baja California, México, es responsable del tratamiento de los datos personales que nos proporcionas en este sitio.",
          ],
        },
        {
          heading: "Datos que recabamos",
          paragraphs: [
            "Este sitio no tiene cuentas de usuario ni tienda. Solo recabamos los datos que tú escribes en el formulario de contacto o en el configurador de paquetes:",
          ],
          bullets: [
            "Nombre.",
            "Correo electrónico.",
            "Teléfono (opcional).",
            "Empresa (opcional).",
            "Tu mensaje y, si usaste el configurador, el paquete que elegiste.",
          ],
        },
        {
          heading: "Para qué usamos tus datos",
          paragraphs: ["Usamos tus datos únicamente para:"],
          bullets: [
            "Responder tu solicitud y darte seguimiento.",
            "Prepararte y enviarte una cotización.",
            "Enviarte un correo de confirmación de que recibimos tu mensaje.",
          ],
        },
        {
          heading: "Consentimiento",
          paragraphs: [
            "Antes de enviar el formulario te pedimos que marques una casilla aceptando este Aviso de Privacidad. Sin ese consentimiento no podemos recibir tu solicitud. Puedes revocarlo en cualquier momento escribiendo a privacidad@ecommetrica.com.",
          ],
        },
        {
          heading: "Cómo viajan y dónde se guardan tus datos",
          paragraphs: [
            "Al enviar el formulario, tus datos viajan cifrados (HTTPS) a nuestro servidor, que los envía por correo electrónico (SMTP) al equipo de Ecommetrica y te manda a ti una confirmación. No guardamos tus datos en una base de datos del sitio; quedan en los buzones de correo del equipo.",
            "No vendemos ni rentamos tus datos. Solo los comparten con terceros los proveedores que necesitamos para operar: el hosting del sitio y el servicio de correo electrónico.",
          ],
        },
        {
          heading: "Cuánto tiempo los conservamos",
          paragraphs: [
            "Conservamos tus datos mientras damos seguimiento a tu solicitud y, si no llegamos a trabajar juntos, hasta 12 meses después del último contacto. Después los eliminamos.",
          ],
        },
        {
          heading: "Tus derechos ARCO",
          paragraphs: [
            "Tienes derecho a Acceder a tus datos, Rectificarlos, Cancelarlos (pedir que los borremos) u Oponerte a su uso. Para ejercerlos, escribe a privacidad@ecommetrica.com indicando tu nombre, el derecho que quieres ejercer y un medio para responderte. Te responderemos en un plazo máximo de 7 días hábiles.",
          ],
        },
        {
          heading: "Cookies y registros técnicos",
          paragraphs: [
            "Este sitio usa Google Analytics para medir las visitas y Meta Pixel para medir la publicidad. Ambos pueden guardar cookies y enviar a Google y a Meta datos como tu dirección IP, las páginas que visitas y información de tu navegador. Además, el sitio guarda en tu navegador el tema de color, el idioma y la región de precios que elijas, que no te identifican.",
            "Para mostrarte los precios de tu mercado (México o Estados Unidos), nuestro servidor consulta de qué país viene tu dirección IP. Solo usamos el país, no lo guardamos ni lo vinculamos contigo.",
            "Como cualquier sitio web, nuestro proveedor de hosting registra datos técnicos de cada visita (dirección IP, navegador, fecha y hora) para operar y proteger el sitio. Estos registros no se vinculan con tus datos de contacto.",
          ],
        },
        {
          heading: "Cambios a este aviso",
          paragraphs: [
            "Si cambiamos este Aviso de Privacidad, publicaremos la nueva versión en esta misma página con su fecha de actualización.",
          ],
        },
      ],
      termsTitle: "Términos y condiciones",
      termsMetaDescription:
        "Términos y condiciones de Ecommetrica: cómo atendemos las consultas de soporte y cómo notificar un cambio o devolución.",
      termsKeywords: ["términos y condiciones", "términos de servicio Ecommetrica"],
      termsIntro: [
        "La página de ecommetrica.com contiene el contacto directo con nuestro personal de atención al cliente.",
      ],
      termsSections: [
        {
          heading: "Consultas y soporte",
          paragraphs: [
            "Todas las consultas realizadas en la página son directas a nuestro equipo de soporte. Las consultas son respondidas por correo electrónico y deberán ser atendidas por el cliente en el periodo de 48hrs a 24hrs después de la consulta. Consultas no respondidas podrán ser consideradas como resueltas por el cliente.",
          ],
        },
        {
          heading: "Cambios y devoluciones",
          paragraphs: [
            "Toda situación que se presente por cambio o devolución deberá ser notificada por correo electrónico a juanmanuel@ecommetrica.com enviando descripción del problema o razón de la devolución.",
          ],
        },
      ],
      accessibilityTitle: "Declaración de accesibilidad",
      accessibilityMetaDescription:
        "Declaración de accesibilidad de Ecommetrica: el estándar que usamos, el estado actual del sitio, sus limitaciones conocidas y cómo reportar una barrera.",
      accessibilityKeywords: ["declaración de accesibilidad", "accesibilidad web", "WCAG 2.1"],
      accessibilityMeta: "Última actualización: 13 de octubre de 2026",
      accessibilityIntro: [
        "Queremos que ecommetrica.com se pueda usar con teclado, con lector de pantalla y en pantallas de distintos tamaños. Tomamos como referencia las pautas WCAG 2.1 nivel AA.",
        "Esta declaración describe el estado actual del sitio. No afirma que cumpla todas las pautas: las limitaciones conocidas están más abajo.",
      ],
      accessibilitySections: [
        {
          heading: "Qué hemos hecho",
          paragraphs: [
            "El 13 de octubre de 2026 revisamos con la herramienta automática axe las páginas principales del sitio en español y en inglés, y corregimos los problemas críticos y serios que encontró, salvo los de contraste de color descritos en las limitaciones.",
          ],
          bullets: [
            "Enlace para saltar al contenido principal al navegar con teclado.",
            "Menú móvil que se maneja con teclado: el foco queda dentro del menú y Escape lo cierra.",
            "Videos decorativos con botón de pausa; si tu sistema pide menos movimiento, no se reproducen solos.",
            "Formularios con etiquetas y mensajes de error escritos, no solo en color.",
          ],
        },
        {
          heading: "Limitaciones conocidas",
          paragraphs: [
            "Estamos trabajando en estos puntos y actualizaremos esta declaración cuando se resuelvan.",
          ],
          bullets: [
            "Algunos textos secundarios y botones de color de acento no alcanzan la relación de contraste de 4.5:1 en uno o más de los temas visuales.",
            "Aún no hemos hecho pruebas manuales con lectores de pantalla (NVDA y VoiceOver).",
            "Dos videos de testimonios todavía no tienen subtítulos.",
          ],
        },
        {
          heading: "Cómo lo medimos",
          paragraphs: [
            "Usamos pruebas automáticas con axe y revisión con teclado de las funciones nuevas. Esto no es una auditoría de conformidad completa.",
          ],
        },
        {
          heading: "Reporta una barrera",
          paragraphs: [
            "Si hay algo del sitio que no puedes usar, escríbenos a juanmanuel@ecommetrica.com con la dirección de la página y qué problema tuviste. Te responderemos lo antes posible.",
          ],
        },
      ],
    },
    notFound: {
      title: "Página no encontrada",
      eyebrow: "Error 404",
      headline: "Esta página no existe.",
      sub: "El enlace que seguiste puede estar roto o la página fue movida. Volvamos a terreno conocido.",
      cta: "Volver al inicio",
      ctaContact: "Contáctanos",
    },
  },
  en: {
    siteMeta: {
      title: "Ecommetrica | Custom Web Development & Webapps Agency",
      description:
        "High-performance web apps, custom code websites, branding, and digital marketing. Premium tech consulting serving Tijuana, San Diego, and LA.",
      keywords: [
        "Custom web development",
        "web apps agency",
        "e-commerce developers",
        "CMS",
        "Webflow development",
        "Rank in AI search",
        "Branding Tijuana San Diego",
        "software development company",
      ],
    },
    nav: {
      studio: "Studio",
      services: "Services",
      work: "Work",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      talk: "Let's talk",
      logoAlt:
        "Ecommetrica is a consulting and management company specialized in marketing and technology for e-commerce businesses and brands",
    },
    mobileMenu: { open: "Menu", close: "Close menu" },
    languageSwitcher: { ariaLabel: "Toggle language" },
    themeSwitcher: { ariaLabel: "Theme" },
    a11y: {
      skipToContent: "Skip to content",
      pauseVideo: "Pause video",
      playVideo: "Play video",
    },
    footer: {
      privacy: "Privacy policy",
      terms: "Terms & conditions",
      accessibility: "Accessibility",
      faq: "FAQ",
      eyebrow: "Contact us",
      headline: "Are you ready?",
      leaveRequest: "Let's talk about what your website could be doing for your business.",
      rights: "All rights reserved.",
    },
    hero: {
      eyebrow: "Web development & webapps in Tijuana and San Diego",
      headlinePre: "We build",
      headlineAccent: "brands",
      headlinePost: "that transform industries and boost businesses.",
      sub: "Your website and your web apps are the most effective growth tools you have.",
      ctaServices: "Discover the services",
      ctaWork: "See our work",
    },
    pillars: {
      flow: ["Brand", "Experience", "Culture"],
      headlinePre: "One-of-a-kind",
      headlineStrong: "websites and online stores",
      headlineTail: "built to maximize sales and lead your presence online.",
      items: [
        {
          title: "Brand",
          copy: "Brand strategy built from the business, not from the form.",
        },
        {
          title: "Experience",
          copy: "Secure, functional digital systems that sustain growth.",
        },
        {
          title: "Culture",
          copy: "Partnership as strategic allies, with a long-term vision.",
        },
      ],
      stats: [
        { value: "+40", label: "Projects delivered" },
        { value: "15", label: "Industries served" },
        { value: "98%", label: "Clients who renew" },
      ],
    },
    bigNav: { work: "Work", services: "Services", talk: "Let's talk" },
    marquee: {
      words: [
        "Web pages",
        "Webapps",
        "Online stores",
        "Branding",
        "Digital marketing",
        "Tijuana",
        "San Diego",
        "Los Angeles",
      ],
    },
    planes: {
      eyebrow: "Our",
      bigWord: "PLANS",
      sub: "Five all-inclusive packages: website, SEO, social media, and advertising. Pick the one that matches where your business is.",
      select: "Select",
      viewAll: "See all plans and pricing",
    },
    servicesOverview: {
      eyebrow: "Services",
      headline: "Your whole digital ecosystem,",
      headlineAccent: "in one plan.",
      sub: "Five layers, one team. Pick one to see everything we do in it.",
      layersAria: "Service layers",
      includedFrom: (plan) => `Included in plans from ${plan}.`,
      cta: "See all services",
      ctaPlans: "See plans",
    },
    selectWork: {
      headline: "Our",
      headlineAccent: "Projects",
      seeAll: "See all projects",
    },
    workGallery: {
      filterAriaLabel: "Filter by project type",
      all: "All",
      viewProject: "View project",
      visitSite: "Visit site",
      withTestimonial: "With testimonial",
      withTestimonialAriaLabel: "Show only projects with a video testimonial",
    },
    aboutStudio: {
      eyebrow: "About the",
      studioWord: "Studio",
      prevAria: "Previous member",
      nextAria: "Next member",
      viewAria: (name) => `View ${name}`,
    },
    methodology: {
      eyebrow: "Our methodology",
      headline: "One team, one methodology",
      intro: [
        "Know how it works, so nobody can pull the wool over your eyes.",
        "We've had the joy of adding our grain of sand to brand-new projects, refreshing long-running ones, and improving existing websites and apps.",
      ],
      steps: [
        {
          title: "Build your site from scratch",
          copy: "An idea — even an object — can spark it. And if you already have everything ready, we start right away.",
        },
        {
          title: "Clean code that delivers dynamic experiences",
          copy: "We write every component to measure: clean code that loads fast and stays easy to maintain.",
        },
        {
          title: "You always have a DEVELOPMENT build",
          copy: "While we build your site, online store, or web app, you always have a beta version — so you can turn traffic into revenue, run tests with native tools, and tailor it to your audience.",
        },
      ],
    },
    contactForm: {
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone number",
      companyLabel: "Company",
      packageSummaryLabel: "Selected package",
      packagePrefilledNotice: "We added your package — fill in your info below to get your quote.",
      messageLabel: "Message",
      sendingToast: "Sending your message...",
      successToast: "Message sent — we'll be in touch soon.",
      errorFallback: "Something went wrong.",
      successTitle: "Thanks — we'll be in touch soon.",
      successSub: "Your request has been sent to the Ecommetrica team.",
      submitting: "Sending...",
      submit: "Send form",
      consentNotice:
        "Ecommetrica will use your name, email, phone, company, and message only to answer your request and send you a quote. We don't sell your data or share it with third parties for their own purposes.",
      consentLabel: "I have read and accept the ",
      consentLinkLabel: "privacy notice",
      errors: {
        nameRequired: "Enter your name.",
        emailRequired: "Enter your email.",
        emailInvalid: "Enter a valid email address.",
        phoneInvalid: "Enter a valid phone number.",
        messageTooShort: "Write a message of at least 10 characters.",
        consentRequired: "We need your consent to answer your request.",
      },
    },
    contactPage: {
      metaDescription: "Leave a request and the Ecommetrica team will get back to you.",
      keywords: ["contact Ecommetrica", "get a quote", "digital agency", "let's talk"],
      eyebrow: "Contact us",
      headline: "Let's build something that lasts.",
      sub: "Tell us about your project below — our team gets back to every request personally.",
      scrollToFormCta: "Your quote is ready — fill out the form below to send it.",
    },
    servicesPage: {
      metaDescription:
        "Custom web development, web apps, online stores, SEO and AEO, campaigns, video, and design. Every Ecommetrica service across Tijuana, San Diego, and LA.",
      keywords: [
        "web development services",
        "web apps agency",
        "e-commerce developers",
        "SEO and AEO positioning",
        "web maintenance",
        "branding and design",
      ],
      eyebrow: "Services",
      headline: "Turn your outdated website into your biggest growth asset.",
      sub: "Brand, site, visibility, content, and operations: we do it all, and deliver it inside a plan.",
      goalsTitle: "What do you want to achieve?",
      goalPrefix: "I want to",
      bundleKicker: "All together",
      bundleFrom: "From",
      bundleCta: (plan) => `See ${plan}`,
      compareCta: "Compare plans",
      allTitle: "Everything we do",
      allSub: "Every service comes included in our plans: pick the plan and everything works together.",
      includedFrom: (plan) => `Included from ${plan}`,
    },
    studioPage: {
      metaDescription: "We build secure digital ecosystems for sustainable business growth.",
      keywords: [
        "Ecommetrica studio",
        "Ecommetrica team",
        "strategic consulting",
        "branding",
        "mission and vision",
      ],
      quote: "We build secure digital ecosystems for sustainable business growth.",
      intro: [
        "Ecommetrica started in 2023 with a small team full of good ideas and heart.",
        "Our team brings over 10 years of experience building projects across the digital world, design, and online marketing.",
        "We work from iterative methods of improvement: analysis, planning, measurement, and testing. Plenty of creativity, and a method behind it, to build brands that stand out.",
        // See the note on the Spanish side — this is the half of a source
        // paragraph that wasn't already said two lines above.
        "We work with strategic, secure planning and made-to-measure solutions for your digital business and your online store.",
      ],
      missionTitle: "Mission",
      missionCopy:
        "To provide strategic, secure, and personalized digital solutions that let businesses and entrepreneurs strengthen their digital presence, optimize their processes, and reach sustainable growth.",
      visionTitle: "Vision",
      visionCopy:
        "To be the leading digital consultancy in innovation, strategy, and technological security in Latin America, driving the digital transformation of thousands of businesses.",
      howWeWorkTitle: "How we work",
      reasons: [
        {
          title: "We think about brand from the business",
          copy: "We don't start from form or communication. We start from the business context, its critical decisions, and its moment of growth.",
        },
        {
          title: "We work with method, not intuition",
          copy: "Every project follows a clear strategic process: diagnosis, definition, system, and activation.",
        },
        {
          title: "We have intellectual independence",
          copy: "We don't sell what the client asks for, but what they need. We tell the strategic truth, even when it's uncomfortable.",
        },
        {
          title: "We accompany as strategic partners",
          copy: "We get involved in the client's business and their key decisions, with a long-term vision.",
        },
      ],
      teamTitle: "The team",
    },
    workPage: {
      metaDescription: "Branding and web development projects by Ecommetrica.",
      keywords: ["Ecommetrica projects", "portfolio", "case studies", "web development", "branding"],
      headline: "Projects that build sustainable digital ecosystems.",
    },
    workDetail: {
      back: "Back to work",
      briefing: "Project briefing",
      visitSite: "Visit site",
      client: "Client",
      year: "Year",
      imageClose: "Close image",
      imageNext: "Next image",
      imagePrevious: "Previous image",
    },
    blogPage: {
      metaDescription: "Strategy, technology, and digital marketing from Ecommetrica.",
      keywords: ["Ecommetrica blog", "digital strategy", "technology", "digital marketing"],
      headline: "Ideas on strategy, technology, and marketing.",
      intro: {
        lead: "At Ecommetrica we believe technology and marketing work best when they work together, guided by a clear strategy. This blog is the space where we share how we think through our clients' digital decisions — not from form, but from the real context of the business.",
        listTitle: "What you'll find here",
        items: [
          "Brand and web development case studies.",
          "Notes on security and digital architecture.",
          "The criteria we use to make data-driven marketing decisions.",
        ],
        closing:
          "If you're building or scaling your digital presence, this is a good place to start following how we do it.",
      },
      latestTitle: "Latest posts",
      dateLocale: "en-US",
    },
    blogDetail: { back: "Back to blog", dateLocale: "en-US" },
    faqPage: {
      title: "FAQ",
      metaDescription:
        "Frequently asked questions about Ecommetrica's services: branding, web development, digital marketing, and technology security.",
      keywords: ["frequently asked questions", "Ecommetrica FAQ", "Ecommetrica services"],
      eyebrow: "Frequently asked questions",
      headline: "What people ask us before we start.",
      listHeading: "Frequently asked questions",
      stillTitle: "Question not here?",
      stillCopy: "Write to us and we'll answer personally.",
      cta: "Let's talk",
    },
    packagesPage: {
      metaDescription:
        "Build your package: choose your base plan and add the marketing, integration, and customization extras your project needs.",
      keywords: [
        "Ecommetrica packages",
        "web development plans",
        "digital marketing add-ons",
        "custom quote",
      ],
      eyebrow: "Build your package",
      headline: "Choose your plan and make it yours.",
      sub: "Start with a base plan and add the extras your project needs — you decide what goes into your package.",
    },
    pricingPage: {
      metaDescription:
        "Ecommetrica plans and packages: website, SEO/AEO, social, advertising, and accessibility compliance. Pricing by region.",
      keywords: [
        "Ecommetrica plans",
        "web development pricing Tijuana",
        "digital marketing packages",
        "ADA WCAG compliance",
      ],
      eyebrow: "ECOMMETRICA STUDIO",
      headline: "Plans and packages",
      sub: "Pick the plan that matches your stage, not the longest feature list.",
      bannerTitle: "Accessibility compliance included from Traction up.",
      bannerTitleUs: "Accessibility compliance included from Launch up.",
      bannerBody:
        "ADA and WCAG 2.1 AA conformance plus data-consent handling, built in from day one — because in California an inaccessible site is legal exposure, not a design detail.",
      bestValueBadge: "Best value",
      oneTimeLabel: "One-time",
      perMonth: "/mo",
      totalLabel: "Total",
      servicesLabel: "services",
      perServiceLabel: "per service per month",
      lowestBadge: "lowest",
      selectCta: "Select",
      customFromLabel: "From",
      customTotalLabel: "From",
      customScaleLabel: "Scales by headcount",
      customModuleLabel: "Base module",
      customChooseOne: "Choose 1",
      customCta: "Get a quote",
      footnote: "★ US-market inclusions — not offered on the Mexico plans.",
      footer:
        "Each plan includes everything in the plan before it. Prices in USD; multi-month plans are priced per month and AI Express is a one-time payment. Per-service cost is calculated across the services included in each plan. Terms subject to contract.",
      includesAllFrom: (planName) => `Includes everything in ${planName}`,
      viewAllIncluded: "See everything included",
      viewLess: "See less",
      learnMore: "Learn more",
      includedInLabel: "Included in",
      specsLabels: {
        pages: "Pages",
        products: "Store products",
        blog: "Blog posts a month",
        social: "Social pieces",
      },
      compareTitle: "Compare every plan",
      compareSub:
        "Prices in USD · ✓ included · Each plan includes everything in the plan before it · Ladder v1.2",
      colService: "Service",
      rowPrice: "Price (USD)",
      rowDuration: "Term",
      rowTotal: "Contract total (USD)",
      summaryTitle: "Summary",
      rowServices: "Services included",
      rowPerService: "Monthly cost per service (USD)",
      rowSaving: "Saving vs. buying each service separately",
      rowStage: "Business stage",
      rowRenewal: "À la carte renewal (after the plan ends)",
      comparedWithMarket: "Compared with the market",
      includedAria: "Included",
      notIncludedAria: "Not included",
      compareHint: "Pick two plans to compare them side by side.",
      compareClear: "Clear comparison",
      compareOnlyDiff: "Differences only",
      stageLabel: "Best if",
      notes: {
        inheritance:
          "Each plan includes everything in the plan before it; from Launch, what AI Express generates with AI is made by people with AI assistance. The contract total is always shown next to the monthly price. Best value = the plan with the biggest saving against buying each service separately.",
        hosting: (price) =>
          `Hosting and maintenance: the first 12 months are included in every package. After that it renews yearly on the start date at ${price} a year.`,
        clientCosts:
          "24/7 support is only in Partner. Ad spend, the domain and the Shopify subscription are paid by the client directly.",
      },
    },
    vpatPage: {
      metaDescription:
        "What a VPAT is and why Ecommetrica's Peak plan includes it as an accessibility conformance report.",
      keywords: ["VPAT", "conformance report", "web accessibility", "ADA WCAG Ecommetrica"],
      eyebrow: "ACCESSIBILITY",
      headline: "VPAT / Conformance Report",
      intro:
        "A document that states, with verifiable detail, how accessible your site actually is — not a marketing promise.",
      whatTitle: "What is a VPAT?",
      whatBody:
        "A VPAT (Voluntary Product Accessibility Template) is a standardized document that evaluates a digital product against WCAG 2.1 AA and Section 508 accessibility criteria, one criterion at a time. The output is a conformance report: what your site meets, what it partially meets, and what doesn't apply — with evidence, not an unsupported \"accessible site\" checkbox.",
      whyTitle: "Why does it matter at the Peak tier?",
      whyBody:
        "At this scale, your site is often part of another company's procurement or compliance process — large clients, RFPs, or US contracts ask for accessibility evidence before signing, not just a statement. The Traction plan already includes ADA/WCAG 2.1 AA conformance work; Peak adds the formal report that turns that technical work into a document your legal or procurement counterparts can request and verify.",
      deliverableTitle: "What does Ecommetrica deliver?",
      deliverableBody:
        "A full audit of your site against WCAG 2.1 AA, documented in the standard VPAT format (the International Committee for Information Technology Standards' template), plus remediation of findings within the plan's scope. The report is ready to share with clients, partners, or compliance teams who request it.",
      backCta: "See plans and pricing",
    },
    ga4Page: {
      metaDescription:
        "What Google Analytics 4 is and why Ecommetrica sets it up starting at the AI Express plan.",
      keywords: ["Google Analytics 4", "GA4", "Ecommetrica web analytics"],
      eyebrow: "ANALYTICS",
      headline: "Google Analytics 4",
      intro:
        "The foundation of any marketing decision: knowing what's actually happening on your site before deciding what to change.",
      whatTitle: "What is GA4?",
      whatBody:
        "Google Analytics 4 is Google's web analytics platform: it tracks which pages your visitors view, where they came from, what makes them convert (buy, fill out a form, call), and where they drop off. Unlike its predecessor (Universal Analytics), GA4 is built around events rather than sessions, making it more accurate for measuring real conversions.",
      whyTitle: "Why does it matter from the AI Express plan?",
      whyBody:
        "You can't improve what you don't measure. Setting up GA4 from day one — not months later, once that data is already lost — is what lets you make marketing decisions based on real visitor behavior instead of guesswork. It's the foundation that paid campaigns and conversion optimization in higher tiers build on.",
      deliverableTitle: "What does Ecommetrica deliver?",
      deliverableBody:
        "Your GA4 property set up, conversion events defined for your business (purchases, forms, calls, WhatsApp, etc.), linking to Google Ads/Meta where applicable, and access to your own dashboard so you can see your data anytime.",
      backCta: "See plans and pricing",
    },
    metaGraphApiPage: {
      metaDescription:
        "What the Meta Graph API is and why Ecommetrica integrates it starting at the Scale plan.",
      keywords: ["Meta Graph API", "Facebook Instagram integration", "Ecommetrica automation"],
      eyebrow: "INTEGRATIONS",
      headline: "Meta Graph API",
      intro:
        "The technical connection that lets your site and business processes talk directly to Facebook and Instagram — not just post to them.",
      whatTitle: "What is the Meta Graph API?",
      whatBody:
        "It's the interface Meta (Facebook/Instagram) provides for an external application — like your site or internal dashboard — to read and write data directly on its platforms: messages, reviews, product catalogs, ad form leads, automated posts, and more. Without this integration, each of those tasks happens manually, platform by platform.",
      whyTitle: "Why does it matter at the Scale tier?",
      whyBody:
        "At this scale you're already running paid ads, social media, and potentially a product catalog — doing it manually across tabs stops being sustainable. The API integration is what lets your dashboard centralize Meta reviews, leads, and messages in one place, and what makes automations (emails, replies, reports) run without manual intervention.",
      deliverableTitle: "What does Ecommetrica deliver?",
      deliverableBody:
        "App and permissions setup in Meta for Developers, an authenticated connection between your business and the API, and the specific data mapping your plan includes (leads, messages, catalog, or reviews, depending on your case) into your site or dashboard.",
      backCta: "See plans and pricing",
    },
    googleBusinessProfilePage: {
      metaDescription:
        "What the Google Business Profile API is and why Ecommetrica integrates it starting at the Launch plan.",
      keywords: ["Google Business Profile API", "Google listing", "Ecommetrica reviews"],
      eyebrow: "INTEGRATIONS",
      headline: "Google Business Profile API",
      intro:
        "Your Google listing — the one that shows up on Maps and local search — connected directly to your site, not managed by hand from another tab.",
      whatTitle: "What is the Google Business Profile API?",
      whatBody:
        "It's the interface that lets you manage your Google Business listing (hours, posts, Q&A, and reviews) programmatically, instead of logging into Google Business Profile Manager by hand every time something needs updating or a customer review needs a response.",
      whyTitle: "Why does it matter at the Launch tier?",
      whyBody:
        "When you're just opening, most of your first local customers find — and judge — you through your Google listing before they ever reach your site. Getting it properly connected from the start keeps reviews, hours, and posts in sync with your site from day one, instead of depending on someone logging in to update them manually.",
      deliverableTitle: "What does Ecommetrica deliver?",
      deliverableBody:
        "Verification and API connection of your Google Business profile, review and FAQ sync setup, and whatever post or alert automation your plan includes.",
      backCta: "See plans and pricing",
    },
    packagesFlow: {
      stepLabels: ["Plan", "Production", "Ads", "Branding", "Summary"],
      stepOf: (current, total) => `Step ${current} of ${total}`,
      choosePlanCta: "Select",
      planSelected: "Plan selected",
      changePlan: "Change plan",
      addCta: "Add",
      addedCta: "Added",
      includedBadge: "Included in your plan",
      quoteOnRequestLabel: "Quote on request",
      backCta: "Back",
      continueCta: "Continue",
      reviewCta: "View summary",
      requirePlanNotice: "Choose a base plan to continue.",
      orderSummaryLabel: "Your package",
      summaryTitle: "Your package summary",
      summaryBasePlan: "Base plan",
      summaryExtras: "Selected extras",
      summaryNoExtras: "No additional extras.",
      summaryTotal: "Estimated total",
      summarySendCta: "Send request",
      messagePlanLabel: "Chosen plan",
      messageExtrasLabel: "Selected extras",
      messageTotalLabel: "Estimated total",
      summaryPlanTotal: "Package total",
      expressAloneNotice: "AI Express is sold on its own, as a one-time payment: it doesn't take extras.",
      expressCredit: (amount) =>
        `Upgrade from AI Express to Launch within 30 days and your AI Express payment (${amount}) is credited.`,
      messageNoteLabel: "Note",
    },
    legal: {
      privacyTitle: "Privacy policy",
      privacyMetaDescription:
        "Ecommetrica's privacy policy: what data we collect, how we use it, and how you can request its deletion.",
      privacyKeywords: ["privacy policy", "Ecommetrica privacy notice"],
      privacyIntro: [
        "Last updated: October 14, 2026.",
        "This Privacy Notice explains what personal data Ecommetrica collects through https://ecommetrica.com, what we use it for, and how you can exercise your rights, under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP).",
        "For anything related to your personal data, write to privacidad@ecommetrica.com.",
      ],
      privacySections: [
        {
          heading: "Who is responsible for your data",
          paragraphs: [
            "Ecommetrica (trade name), located at Calle Ignacio Zaragoza 8169-306, Gustavo Madero, Tijuana, Baja California, Mexico, is responsible for the personal data you give us on this site.",
          ],
        },
        {
          heading: "Data we collect",
          paragraphs: [
            "This site has no user accounts or store. We only collect what you type into the contact form or the package configurator:",
          ],
          bullets: [
            "Name.",
            "Email address.",
            "Phone (optional).",
            "Company (optional).",
            "Your message and, if you used the configurator, the package you chose.",
          ],
        },
        {
          heading: "What we use your data for",
          paragraphs: ["We use your data only to:"],
          bullets: [
            "Answer your request and follow up.",
            "Prepare and send you a quote.",
            "Send you an email confirming we received your message.",
          ],
        },
        {
          heading: "Consent",
          paragraphs: [
            "Before you send the form, we ask you to tick a box accepting this Privacy Notice. Without that consent we can't receive your request. You can withdraw it at any time by writing to privacidad@ecommetrica.com.",
          ],
        },
        {
          heading: "How your data travels and where it's kept",
          paragraphs: [
            "When you send the form, your data travels encrypted (HTTPS) to our server, which emails it (SMTP) to the Ecommetrica team and sends you a confirmation. We don't store your data in a site database; it stays in the team's mailboxes.",
            "We don't sell or rent your data. The only third parties that handle it are the providers we need to operate: the site's hosting and the email service.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "We keep your data while we follow up on your request and, if we don't end up working together, for up to 12 months after our last contact. After that we delete it.",
          ],
        },
        {
          heading: "Your ARCO rights",
          paragraphs: [
            "You have the right to Access your data, Rectify it, Cancel it (ask us to delete it), or Object to its use. To exercise them, write to privacidad@ecommetrica.com with your name, the right you want to exercise, and a way to reply to you. We'll answer within 7 business days at most.",
          ],
        },
        {
          heading: "Cookies and technical logs",
          paragraphs: [
            "This site uses Google Analytics to measure visits and Meta Pixel to measure advertising. Both may store cookies and send data such as your IP address, the pages you visit and information about your browser to Google and Meta. The site also stores in your browser the color theme, language and pricing region you choose, which do not identify you.",
            "To show you the prices for your market (Mexico or the United States), our server looks up which country your IP address comes from. We only use the country; we don't store it or link it to you.",
            "Like any website, our hosting provider logs technical data for each visit (IP address, browser, date and time) to run and protect the site. These logs aren't linked to your contact details.",
          ],
        },
        {
          heading: "Changes to this notice",
          paragraphs: [
            "If we change this Privacy Notice, we'll publish the new version on this same page with its update date.",
          ],
        },
      ],
      termsTitle: "Terms & conditions",
      termsMetaDescription:
        "Ecommetrica's terms and conditions: how we handle support enquiries and how to report a change or return.",
      termsKeywords: ["terms and conditions", "Ecommetrica terms of service"],
      termsIntro: [
        "The ecommetrica.com website puts you in direct contact with our customer support staff.",
      ],
      termsSections: [
        {
          heading: "Enquiries and support",
          paragraphs: [
            "All enquiries made through the site go directly to our support team. Enquiries are answered by email and must be attended to by the client within 24 to 48 hours of the enquiry. Enquiries that go unanswered may be considered resolved by the client.",
          ],
        },
        {
          heading: "Changes and returns",
          paragraphs: [
            "Any situation involving a change or return must be reported by email to juanmanuel@ecommetrica.com, including a description of the problem or the reason for the return.",
          ],
        },
      ],
      accessibilityTitle: "Accessibility statement",
      accessibilityMetaDescription:
        "Ecommetrica's accessibility statement: the standard we use, the current state of the site, its known limitations and how to report a barrier.",
      accessibilityKeywords: ["accessibility statement", "web accessibility", "WCAG 2.1"],
      accessibilityMeta: "Last updated: October 13, 2026",
      accessibilityIntro: [
        "We want ecommetrica.com to be usable with a keyboard, with a screen reader and on screens of different sizes. We use the WCAG 2.1 Level AA guidelines as our reference.",
        "This statement describes the current state of the site. It does not claim that the site meets every guideline: the known limitations are listed below.",
      ],
      accessibilitySections: [
        {
          heading: "What we have done",
          paragraphs: [
            "On October 13, 2026 we ran the axe automated tool on the main pages of the site in Spanish and English, and fixed the critical and serious problems it found, except the color contrast ones described under known limitations.",
          ],
          bullets: [
            "A link to skip to the main content when navigating with a keyboard.",
            "A mobile menu that works with the keyboard: focus stays inside the menu and Escape closes it.",
            "Decorative videos with a pause button; if your system asks for reduced motion, they do not play on their own.",
            "Forms with labels and error messages written in text, not only in color.",
          ],
        },
        {
          heading: "Known limitations",
          paragraphs: [
            "We are working on these points and will update this statement when they are resolved.",
          ],
          bullets: [
            "Some secondary text and accent-colored buttons do not reach the 4.5:1 contrast ratio in one or more of the visual themes.",
            "We have not yet done manual testing with screen readers (NVDA and VoiceOver).",
            "Two testimonial videos do not have captions yet.",
          ],
        },
        {
          heading: "How we measured",
          paragraphs: [
            "We used automated testing with axe and a keyboard review of the new features. This is not a full conformance audit.",
          ],
        },
        {
          heading: "Report a barrier",
          paragraphs: [
            "If something on the site is hard to use, write to juanmanuel@ecommetrica.com with the page address and the problem you had. We will reply as soon as we can.",
          ],
        },
      ],
    },
    notFound: {
      title: "Page not found",
      eyebrow: "Error 404",
      headline: "This page doesn't exist.",
      sub: "The link you followed may be broken, or the page may have moved. Let's get you back on track.",
      cta: "Back to home",
      ctaContact: "Contact us",
    },
  },
};

export function getDict(lang: Lang): Dict {
  return dict[lang];
}
