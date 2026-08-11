export default function Nav() {
  return (
    <nav className="fixed top-8 left-16 z-50 w-fit transition-all duration-300 ease-in-out">
      <figure>
        <img
          src="/arturo/logo.png"
          alt="Logo Arturo"
          className="h-16 w-16 transition-transform duration-200 hover:scale-105"
        />
      </figure>
    </nav>
  );
}
