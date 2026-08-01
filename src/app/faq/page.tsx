import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Ecommetrica",
};

const faqs = [
  {
    question: "¿Qué servicios ofrece Ecommetrica?",
    answer:
      "Branding, desarrollo web, marketing digital y seguridad tecnológica, integrados como un solo ecosistema digital.",
  },
  {
    question: "¿Cómo empieza un proyecto con Ecommetrica?",
    answer:
      "Dejando una solicitud desde la página de contacto. Nuestro equipo te contacta para agendar un diagnóstico inicial.",
  },
  {
    question: "¿Trabajan con negocios fuera de la región?",
    answer:
      "Sí, trabajamos con clientes en toda Latinoamérica de forma remota.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ecom-ink">
        FAQ
      </h1>
      <div className="mt-12 flex flex-col divide-y divide-ecom-ink/10">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-6 first:pt-0">
            <h2 className="font-display text-lg font-medium text-ecom-ink">
              {faq.question}
            </h2>
            <p className="mt-2 text-ecom-ink/70">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
