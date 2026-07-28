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

export default function AboutStudio() {
  return (
    <section id="studio" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="text-right">
        <p className="text-sm font-medium tracking-[0.2em] text-ecom-dark/50 uppercase">
          About the
        </p>
        <h2 className="mt-1 font-display text-4xl font-medium text-ecom-dark sm:text-5xl">
          Studio <span className="text-ecom-orange">&#10038;</span>
        </h2>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {team.map((member) => (
          <div key={member.name}>
            <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-ecom-dark to-ecom-black" />
            <h3 className="mt-5 font-display text-lg font-medium text-ecom-orange">
              {member.name}
            </h3>
            <p className="text-sm font-medium tracking-wide text-ecom-dark/50 uppercase">
              {member.role}
            </p>
            <p className="mt-3 text-ecom-dark/70">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
