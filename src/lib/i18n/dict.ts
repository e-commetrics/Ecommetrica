import type { Lang } from "@/lib/i18n/types";

export type Dict = {
  siteMeta: { title: string; description: string; keywords: string[] };
  nav: { studio: string; work: string; blog: string; contact: string; talk: string };
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
  };
  bigNav: { work: string; services: string; talk: string };
  planes: { eyebrow: string; bigWord: string; popular: string };
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
  };
  aboutStudio: {
    eyebrow: string;
    studioWord: string;
    prevAria: string;
    nextAria: string;
    viewAria: (name: string) => string;
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
  studioPage: {
    metaDescription: string;
    keywords: string[];
    quote: string;
    missionTitle: string;
    missionCopy: string;
    visionTitle: string;
    visionCopy: string;
    howWeWorkTitle: string;
    reasons: { title: string; copy: string }[];
    teamTitle: string;
  };
  workPage: { metaDescription: string; keywords: string[]; headline: string };
  workDetail: { back: string; visitSite: string; client: string; year: string; services: string };
  blogPage: { metaDescription: string; keywords: string[]; headline: string; dateLocale: string };
  blogDetail: { back: string; dateLocale: string };
  faqPage: { title: string; metaDescription: string; keywords: string[] };
  legal: {
    privacyTitle: string;
    privacyMetaDescription: string;
    privacyKeywords: string[];
    privacyBody: string;
    termsTitle: string;
    termsMetaDescription: string;
    termsKeywords: string[];
    termsBody: string;
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
      title: "Ecommetrica | Estrategia, tecnología y marketing digital",
      description:
        "Construimos ecosistemas digitales seguros para el crecimiento sostenible de los negocios. Estrategia, tecnología y marketing trabajando juntos.",
      keywords: [
        "Ecommetrica",
        "agencia digital",
        "desarrollo web",
        "marketing digital",
        "branding",
        "seguridad tecnológica",
        "consultoría digital",
      ],
    },
    nav: { studio: "Estudio", work: "Trabajo", blog: "Blog", contact: "Contacto", talk: "Hablemos" },
    mobileMenu: { open: "Menú" },
    languageSwitcher: { ariaLabel: "Cambiar idioma" },
    themeSwitcher: { ariaLabel: "Tema" },
    footer: {
      privacy: "Aviso de privacidad",
      terms: "Términos de servicio",
      faq: "FAQ",
      eyebrow: "Contáctanos",
      headline: "¿Estás listo?",
      leaveRequest: "Deja tu solicitud",
      rights: "Todos los derechos reservados.",
    },
    hero: {
      eyebrow: "Ecommetrica Studio",
      headlinePre: "Construimos marcas que",
      headlineAccent: "transforman industrias",
      headlinePost: "e impulsan negocios.",
      sub: "A través de estrategias basadas en realidades de mercado.",
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
    },
    bigNav: { work: "Trabajo", services: "Servicios", talk: "Hablemos" },
    planes: { eyebrow: "Nuestros", bigWord: "PLANES", popular: "Popular" },
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
    },
    aboutStudio: {
      eyebrow: "Sobre el",
      studioWord: "Studio",
      prevAria: "Miembro anterior",
      nextAria: "Siguiente miembro",
      viewAria: (name) => `Ver a ${name}`,
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
      client: "Cliente",
      year: "Año",
      services: "Servicios",
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
      privacyTitle: "Aviso de privacidad",
      privacyMetaDescription:
        "Aviso de privacidad de Ecommetrica: qué datos recopilamos, cómo los usamos y cómo puedes solicitar su eliminación.",
      privacyKeywords: ["aviso de privacidad", "política de privacidad Ecommetrica"],
      privacyBody:
        "Esta página es un marcador de posición. Reemplaza este texto con la política de privacidad real de Ecommetrica antes del lanzamiento — qué datos se recopilan en este sitio (incluyendo el formulario de contacto), cómo se almacenan y usan, y cómo los visitantes pueden solicitar su eliminación.",
      termsTitle: "Términos de servicio",
      termsMetaDescription: "Términos de servicio de Ecommetrica para el uso de este sitio web.",
      termsKeywords: ["términos de servicio", "términos y condiciones Ecommetrica"],
      termsBody:
        "Esta página es un marcador de posición. Reemplaza este texto con los términos de servicio reales de Ecommetrica antes del lanzamiento.",
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
      title: "Ecommetrica | Strategy, technology, and digital marketing",
      description:
        "We build secure digital ecosystems for sustainable business growth. Strategy, technology, and marketing working together.",
      keywords: [
        "Ecommetrica",
        "digital agency",
        "web development",
        "digital marketing",
        "branding",
        "technology security",
        "digital consulting",
      ],
    },
    nav: { studio: "Studio", work: "Work", blog: "Blog", contact: "Contact", talk: "Let's talk" },
    mobileMenu: { open: "Menu" },
    languageSwitcher: { ariaLabel: "Toggle language" },
    themeSwitcher: { ariaLabel: "Theme" },
    footer: {
      privacy: "Privacy policy",
      terms: "Terms of service",
      faq: "FAQ",
      eyebrow: "Contact us",
      headline: "Are you ready?",
      leaveRequest: "Leave a request",
      rights: "All rights reserved.",
    },
    hero: {
      eyebrow: "Ecommetrica Studio",
      headlinePre: "We build brands that",
      headlineAccent: "transform industries",
      headlinePost: "and boost businesses.",
      sub: "Through strategies based on market realities.",
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
    },
    bigNav: { work: "Work", services: "Services", talk: "Let's talk" },
    planes: { eyebrow: "Our", bigWord: "PLANS", popular: "Popular" },
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
    },
    aboutStudio: {
      eyebrow: "About the",
      studioWord: "Studio",
      prevAria: "Previous member",
      nextAria: "Next member",
      viewAria: (name) => `View ${name}`,
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
      client: "Client",
      year: "Year",
      services: "Services",
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
      privacyTitle: "Privacy Policy",
      privacyMetaDescription:
        "Ecommetrica's privacy policy: what data we collect, how we use it, and how you can request its deletion.",
      privacyKeywords: ["privacy policy", "Ecommetrica privacy policy"],
      privacyBody:
        "This page is a placeholder. Replace this copy with Ecommetrica's actual privacy policy before launch — what data is collected through this site (including the contact form), how it is stored and used, and how visitors can request deletion.",
      termsTitle: "Terms of Service",
      termsMetaDescription: "Ecommetrica's terms of service for using this website.",
      termsKeywords: ["terms of service", "Ecommetrica terms and conditions"],
      termsBody:
        "This page is a placeholder. Replace this copy with Ecommetrica's actual terms of service before launch.",
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
