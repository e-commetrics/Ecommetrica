import Link from "next/link";

const plans = [
  {
    name: "Marca",
    description: "Para negocios que necesitan una identidad sólida y un sitio que convierta.",
    features: ["Identidad visual", "Sitio web a medida", "SEO on-page"],
  },
  {
    name: "Crecimiento",
    description: "Para equipos que buscan escalar su presencia digital con datos reales.",
    features: ["Todo en Marca", "Marketing digital", "Analítica y reporting"],
    featured: true,
  },
  {
    name: "Ecosistema",
    description: "Para empresas que requieren estrategia, tecnología y seguridad integradas.",
    features: ["Todo en Crecimiento", "Seguridad digital", "Acompañamiento estratégico"],
  },
];

export default function Pricing() {
  return (
    <section id="services" className="border-y border-ecom-dark/10 bg-white/40">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-dark/60">
          Nuestros planes
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.featured
                  ? "border-ecom-red bg-ecom-dark text-ecom-cream"
                  : "border-ecom-dark/10 bg-transparent"
              }`}
            >
              <h3 className="font-display text-xl font-medium">{plan.name}</h3>
              <p
                className={`mt-3 text-sm ${
                  plan.featured ? "text-ecom-cream/70" : "text-ecom-dark/70"
                }`}
              >
                {plan.description}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        plan.featured ? "bg-ecom-cream" : "bg-ecom-red"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-ecom-cream text-ecom-dark hover:bg-white"
                    : "bg-ecom-dark text-ecom-cream hover:bg-ecom-red"
                }`}
              >
                Let&rsquo;s talk
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
