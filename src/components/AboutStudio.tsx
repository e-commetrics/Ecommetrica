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
      <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-dark/60">
        About the studio
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
    </section>
  );
}
