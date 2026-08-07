import type { Lang } from "@/lib/i18n/types";

/** One titled block of a legal document — see `LegalDocument.tsx` for rendering. */
export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Dict = {
  siteMeta: { title: string; description: string; keywords: string[] };
  nav: {
    studio: string;
    services: string;
    work: string;
    blog: string;
    contact: string;
    talk: string;
  };
  mobileMenu: { open: string };
  languageSwitcher: { ariaLabel: string };
  themeSwitcher: { ariaLabel: string };
  footer: {
    privacy: string;
    terms: string;
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
    imageAlt: string;
  };
  bigNav: { work: string; services: string; talk: string };
  planes: { eyebrow: string; bigWord: string; sub: string; popular: string };
  servicesOverview: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    cta: string;
    viewAria: (name: string) => string;
  };
  selectWork: {
    eyebrow: string;
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
    messageLabel: string;
    sendingToast: string;
    successToast: string;
    errorFallback: string;
    successTitle: string;
    successSub: string;
    submitting: string;
    submit: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      messageTooShort: string;
    };
  };
  contactPage: {
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
    sub: string;
  };
  servicesPage: {
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    headline: string;
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
    visitSite: string;
    watchVideo: string;
    closeVideo: string;
    client: string;
    year: string;
    services: string;
    testimonial: string;
    testimonialAria: (author: string) => string;
  };
  blogPage: { metaDescription: string; keywords: string[]; headline: string; dateLocale: string };
  blogDetail: { back: string; dateLocale: string };
  faqPage: { title: string; metaDescription: string; keywords: string[] };
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
      ],
    },
    nav: {
      studio: "Estudio",
      services: "Servicios",
      work: "Trabajo",
      blog: "Blog",
      contact: "Contacto",
      talk: "Hablemos",
    },
    mobileMenu: { open: "Menú" },
    languageSwitcher: { ariaLabel: "Cambiar idioma" },
    themeSwitcher: { ariaLabel: "Tema" },
    footer: {
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      faq: "FAQ",
      eyebrow: "Contáctanos",
      headline: "¿Estás listo?",
      leaveRequest: "Hablemos de lo que tu página web podría aportar a tu negocio.",
      rights: "Todos los derechos reservados.",
    },
    hero: {
      eyebrow: "Desarrollo web y webapps en Tijuana y San Diego",
      headlinePre: "Haz de tu",
      headlineAccent: "página web",
      headlinePost: "tu ventaja competitiva.",
      sub: "Tu website y tus webapps son las herramientas de crecimiento más eficaces.",
      ctaServices: "Descubre los servicios",
      ctaWork: "Ve nuestro trabajo",
    },
    pillars: {
      flow: ["Marca", "Experiencia", "Cultura"],
      headlinePre: "Construimos",
      headlineStrong: "sistemas digitales enfocados en búsqueda",
      headlineTail: "para ayudar a los líderes de categoría a liderar sus industrias.",
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
      imageAlt:
        "El equipo de Ecommetrica trabajando: laptops abiertas alrededor de una mesa alta durante una sesión de revisión.",
    },
    bigNav: { work: "Trabajo", services: "Servicios", talk: "Hablemos" },
    planes: {
      eyebrow: "Nuestros",
      bigWord: "PLANES",
      // TODO(copy): placeholder lead-in borrowed from the loose brand phrases.
      // This section deserves copy written to introduce pricing specifically.
      sub: "Páginas web y tiendas online únicas para maximizar las ventas y liderar tu presencia en internet.",
      popular: "Popular",
    },
    servicesOverview: {
      eyebrow: "Nuestros",
      headline: "Servicios",
      headlineAccent: "a la medida",
      sub: "Estrategia, diseño y desarrollo trabajando para que tu marca o empresa funcione tan bien como se ve.",
      cta: "Ver todos los servicios",
      viewAria: (name) => `Ver ${name}`,
    },
    selectWork: {
      eyebrow: "Nuestros",
      headline: "Proyectos",
      headlineAccent: "Éxito",
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
          // TODO(copy): needs a `copy` paragraph — steps 1 and 3 have one, this
          // one arrived as a title only. Renders as a title until filled.
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
      messageLabel: "Mensaje",
      sendingToast: "Enviando tu mensaje...",
      successToast: "Mensaje enviado — nos pondremos en contacto pronto.",
      errorFallback: "Algo salió mal.",
      successTitle: "Gracias — nos pondremos en contacto pronto.",
      successSub: "Tu solicitud fue enviada al equipo de Ecommetrica.",
      submitting: "Enviando...",
      submit: "Enviar formulario",
      errors: {
        nameRequired: "Ingresa tu nombre.",
        emailRequired: "Ingresa tu correo.",
        emailInvalid: "Ingresa un correo válido.",
        phoneInvalid: "Ingresa un teléfono válido.",
        messageTooShort: "Escribe un mensaje de al menos 10 caracteres.",
      },
    },
    contactPage: {
      metaDescription: "Deja tu solicitud y el equipo de Ecommetrica se pondrá en contacto contigo.",
      keywords: ["contacto Ecommetrica", "cotización", "agencia digital Tijuana", "hablemos"],
      eyebrow: "Contáctanos",
      headline: "Construyamos algo que perdure.",
      sub: "Cuéntanos sobre tu proyecto — nuestro equipo responde cada solicitud personalmente.",
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
      visitSite: "Ver sitio",
      watchVideo: "Ver video",
      closeVideo: "Cerrar video",
      client: "Cliente",
      year: "Año",
      services: "Servicios",
      testimonial: "Testimonial",
      testimonialAria: (author) => `Video testimonial de ${author}`,
    },
    blogPage: {
      metaDescription: "Estrategia, tecnología y marketing digital desde Ecommetrica.",
      keywords: ["blog Ecommetrica", "estrategia digital", "tecnología", "marketing digital"],
      headline: "Ideas sobre estrategia, tecnología y marketing.",
      dateLocale: "es-MX",
    },
    blogDetail: { back: "Volver al blog", dateLocale: "es-MX" },
    faqPage: {
      title: "FAQ",
      metaDescription:
        "Preguntas frecuentes sobre los servicios de Ecommetrica: branding, desarrollo web, marketing digital y seguridad tecnológica.",
      keywords: ["preguntas frecuentes", "FAQ Ecommetrica", "servicios Ecommetrica"],
    },
    legal: {
      privacyTitle: "Política de privacidad",
      privacyMetaDescription:
        "Política de privacidad de Ecommetrica: qué datos recopilamos, cómo los usamos y cómo puedes solicitar su eliminación.",
      privacyKeywords: ["política de privacidad", "aviso de privacidad Ecommetrica"],
      privacyIntro: [
        "En ecommetrica.com, accesible desde https://ecommetrica.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene los tipos de información que son recopilados y registrados por Ecommetrica y cómo los usamos.",
        "Si tiene preguntas adicionales o requiere más información sobre nuestra Política de Privacidad, no dude en contactarnos.",
        "Esta Política de Privacidad se aplica únicamente a nuestras actividades en línea y es válida para los visitantes de nuestro sitio web en lo que respecta a la información que comparten y/o recopilan en ecommetrica.com. Esta política no es aplicable a ninguna información recolectada fuera de línea o a través de otros canales que no sean este sitio web.",
      ],
      privacySections: [
        {
          heading: "Consentimiento",
          paragraphs: [
            "Al utilizar nuestro sitio web, usted acepta nuestra Política de Privacidad y está de acuerdo con sus términos.",
          ],
        },
        {
          heading: "La información que recogemos",
          paragraphs: [
            "La información personal que se le pide que proporcione, y las razones por las que se le pide que la proporcione, se le aclarará en el momento en que le pidamos que proporcione su información personal.",
            "Si se pone en contacto con nosotros directamente, es posible que recibamos información adicional sobre usted, como su nombre, dirección de correo electrónico, número de teléfono, el contenido del mensaje y/o los archivos adjuntos que nos envíe, y cualquier otra información que decida proporcionar.",
            "Cuando se registra en una Cuenta, podemos pedirle su información de contacto, incluyendo elementos como el nombre, el nombre de la empresa, la dirección, la dirección de correo electrónico y el número de teléfono.",
          ],
        },
        {
          heading: "Cómo utilizamos su información",
          paragraphs: ["Utilizamos la información que recogemos de varias maneras, incluyendo:"],
          bullets: [
            "Proporcionar, operar y mantener nuestra web.",
            "Mejorar, personalizar y ampliar nuestra web.",
            "Comprender y analizar cómo se utiliza nuestra web.",
            "Desarrollar nuevos productos, servicios, características y funcionalidades.",
            "Comunicarse con usted, ya sea directamente o a través de uno de nuestros socios, incluyendo el servicio de atención al cliente, para proporcionarle actualizaciones y otra información relacionada con la web, y para fines de marketing y promoción.",
            "Enviarle correos electrónicos.",
            "Encontrar y prevenir el fraude.",
          ],
        },
        {
          heading: "Archivos de registro",
          paragraphs: [
            "ecommetrica.com sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan los sitios web. Todas las empresas de hosting hacen esto y una parte de los análisis de los servicios de hosting. La información recogida por los archivos de registro incluye las direcciones del protocolo de Internet (IP), el tipo de navegador, el proveedor de servicios de Internet (ISP), la fecha y la hora, las páginas de referencia/salida y posiblemente el número de clics. Éstas no están vinculadas a ninguna información que permita la identificación personal.",
            "El propósito de la información es analizar las tendencias, administrar el sitio, rastrear el movimiento de los usuarios en el sitio web y reunir información demográfica.",
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
      contact: "Contact",
      talk: "Let's talk",
    },
    mobileMenu: { open: "Menu" },
    languageSwitcher: { ariaLabel: "Toggle language" },
    themeSwitcher: { ariaLabel: "Theme" },
    footer: {
      privacy: "Privacy policy",
      terms: "Terms & conditions",
      faq: "FAQ",
      eyebrow: "Contact us",
      headline: "Are you ready?",
      leaveRequest: "Let's talk about what your website could be doing for your business.",
      rights: "All rights reserved.",
    },
    hero: {
      eyebrow: "Web development & webapps in Tijuana and San Diego",
      headlinePre: "Make your",
      headlineAccent: "website",
      headlinePost: "your competitive edge.",
      sub: "Your website and your web apps are the most effective growth tools you have.",
      ctaServices: "Discover the services",
      ctaWork: "See our work",
    },
    pillars: {
      flow: ["Brand", "Experience", "Culture"],
      headlinePre: "We build",
      headlineStrong: "search-first digital systems",
      headlineTail: "to help category leaders lead their industries.",
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
      imageAlt:
        "The Ecommetrica team at work: laptops open around a high table during a review session.",
    },
    bigNav: { work: "Work", services: "Services", talk: "Let's talk" },
    planes: {
      eyebrow: "Our",
      bigWord: "PLANS",
      // TODO(copy): placeholder lead-in borrowed from the loose brand phrases.
      // This section deserves copy written to introduce pricing specifically.
      sub: "One-of-a-kind websites and online stores built to maximize sales and lead your presence online.",
      popular: "Popular",
    },
    servicesOverview: {
      eyebrow: "Our",
      headline: "Services",
      headlineAccent: "made to measure",
      sub: "Strategy, design, and development working together so your brand or company works as well as it looks.",
      cta: "See all services",
      viewAria: (name) => `View ${name}`,
    },
    selectWork: {
      eyebrow: "Our",
      headline: "Projects",
      headlineAccent: "Success",
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
          // TODO(copy): needs a `copy` paragraph — steps 1 and 3 have one, this
          // one arrived as a title only. Renders as a title until filled.
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
      messageLabel: "Message",
      sendingToast: "Sending your message...",
      successToast: "Message sent — we'll be in touch soon.",
      errorFallback: "Something went wrong.",
      successTitle: "Thanks — we'll be in touch soon.",
      successSub: "Your request has been sent to the Ecommetrica team.",
      submitting: "Sending...",
      submit: "Send form",
      errors: {
        nameRequired: "Enter your name.",
        emailRequired: "Enter your email.",
        emailInvalid: "Enter a valid email address.",
        phoneInvalid: "Enter a valid phone number.",
        messageTooShort: "Write a message of at least 10 characters.",
      },
    },
    contactPage: {
      metaDescription: "Leave a request and the Ecommetrica team will get back to you.",
      keywords: ["contact Ecommetrica", "get a quote", "digital agency", "let's talk"],
      eyebrow: "Contact us",
      headline: "Let's build something that lasts.",
      sub: "Tell us about your project below — our team gets back to every request personally.",
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
      visitSite: "Visit site",
      watchVideo: "Watch video",
      closeVideo: "Close video",
      client: "Client",
      year: "Year",
      services: "Services",
      testimonial: "Testimonial",
      testimonialAria: (author) => `Video testimonial from ${author}`,
    },
    blogPage: {
      metaDescription: "Strategy, technology, and digital marketing from Ecommetrica.",
      keywords: ["Ecommetrica blog", "digital strategy", "technology", "digital marketing"],
      headline: "Ideas on strategy, technology, and marketing.",
      dateLocale: "en-US",
    },
    blogDetail: { back: "Back to blog", dateLocale: "en-US" },
    faqPage: {
      title: "FAQ",
      metaDescription:
        "Frequently asked questions about Ecommetrica's services: branding, web development, digital marketing, and technology security.",
      keywords: ["frequently asked questions", "Ecommetrica FAQ", "Ecommetrica services"],
    },
    legal: {
      privacyTitle: "Privacy policy",
      privacyMetaDescription:
        "Ecommetrica's privacy policy: what data we collect, how we use it, and how you can request its deletion.",
      privacyKeywords: ["privacy policy", "Ecommetrica privacy notice"],
      privacyIntro: [
        "At ecommetrica.com, accessible from https://ecommetrica.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document describes the types of information that are collected and recorded by Ecommetrica and how we use them.",
        "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
        "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regard to the information they share and/or collect on ecommetrica.com. This policy does not apply to any information collected offline or through channels other than this website.",
      ],
      privacySections: [
        {
          heading: "Consent",
          paragraphs: [
            "By using our website, you accept our Privacy Policy and agree to its terms.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "The personal information you are asked to provide, and the reasons you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
            "If you contact us directly, we may receive additional information about you, such as your name, email address, phone number, the contents of the message and/or attachments you send us, and any other information you choose to provide.",
            "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and phone number.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: ["We use the information we collect in various ways, including to:"],
          bullets: [
            "Provide, operate, and maintain our website.",
            "Improve, personalize, and expand our website.",
            "Understand and analyze how our website is used.",
            "Develop new products, services, features, and functionality.",
            "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.",
            "Send you emails.",
            "Find and prevent fraud.",
          ],
        },
        {
          heading: "Log files",
          paragraphs: [
            "ecommetrica.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this, and it is part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.",
            "The purpose of the information is to analyze trends, administer the site, track users' movement on the website, and gather demographic information.",
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
