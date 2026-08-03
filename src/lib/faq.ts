import type { Localized } from "@/lib/i18n/types";

export type Faq = {
  question: Localized;
  answer: Localized;
};

export const faqs: Faq[] = [
  {
    question: {
      es: "¿Qué servicios ofrece Ecommetrica?",
      en: "What services does Ecommetrica offer?",
    },
    answer: {
      es: "Branding, desarrollo web, marketing digital y seguridad tecnológica, integrados como un solo ecosistema digital.",
      en: "Branding, web development, digital marketing, and technology security, integrated as a single digital ecosystem.",
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
