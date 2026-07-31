import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Ecommetrica",
  description:
    "Construimos ecosistemas digitales seguros para el crecimiento sostenible de los negocios.",
};

const team = [
  {
    name: "Kevin O. Okhuysen",
    role: "Desarrollo",
    bio: "Es versátil para facilitar y agilizar procesos de programación para que tu sitio web sea funcional y atractivo.",
  },
  {
    name: "Karen Valdez",
    role: "Creativa",
    bio: "Es una creativa que eleva la voz de tu proyecto, para atraer clientes y maximizar su crecimiento.",
  },
  {
    name: "María J. Zuili",
    role: "Creativa",
    bio: "Es una creativa que eleva la voz de tu proyecto, para atraer clientes y maximizar su crecimiento.",
  },
];

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ecom-red">
        Studio
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-5xl">
        &ldquo;Construimos ecosistemas digitales seguros para el crecimiento
        sostenible de los negocios.&rdquo;
      </h1>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-medium uppercase tracking-wide text-ecom-dark">
            Misión
          </h2>
          <p className="mt-3 text-ecom-dark/70">
            Brindar soluciones digitales estratégicas, seguras y personalizadas
            que permitan a empresas y emprendedores fortalecer su presencia
            digital, optimizar sus procesos y alcanzar un crecimiento
            sostenible.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-medium uppercase tracking-wide text-ecom-dark">
            Visión
          </h2>
          <p className="mt-3 text-ecom-dark/70">
            Ser la consultora digital referente en innovación, estrategia y
            seguridad tecnológica en Latinoamérica, impulsando la transformación
            digital de miles de negocios.
          </p>
        </div>
      </div>

      <div className="mt-20 border-t border-ecom-dark/10 pt-16">
        <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-dark/60">
          Cómo trabajamos
        </h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <Reason
            title="Pensamos la marca desde el negocio"
            copy="No partimos de la forma ni de la comunicación. Partimos del contexto del negocio, sus decisiones críticas y su momento de crecimiento."
          />
          <Reason
            title="Trabajamos con método, no con intuición"
            copy="Cada proyecto sigue un proceso estratégico claro: diagnóstico, definición, sistema y activación."
          />
          <Reason
            title="Tenemos independencia intelectual"
            copy="No vendemos lo que el cliente pide, sino lo que necesita. Decimos la verdad estratégica, incluso cuando es incómoda."
          />
          <Reason
            title="Acompañamos como socios estratégicos"
            copy="Nos involucramos en el negocio del cliente y en sus decisiones clave, con visión de largo plazo."
          />
        </div>
      </div>

      <div className="mt-20 border-t border-ecom-dark/10 pt-16">
        <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-dark/60">
          El equipo
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name}>
              <div className="aspect-square w-full rounded-2xl bg-ecom-dark/10" />
              <h3 className="mt-5 font-display text-lg font-medium text-ecom-dark">
                {member.name}
              </h3>
              <p className="text-sm font-medium uppercase tracking-wide text-ecom-red">
                {member.role}
              </p>
              <p className="mt-3 text-ecom-dark/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reason({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <h3 className="font-display text-base font-medium text-ecom-dark">
        {title}
      </h3>
      <p className="mt-2 text-ecom-dark/70">{copy}</p>
    </div>
  );
}
