import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/studio", label: "Studio" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ecom-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-secundario.png"
            alt="Ecommetrica"
            width={160}
            height={40}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide uppercase md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 transition-colors hover:text-ecom-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-ecom-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecom-red md:inline-block"
        >
          Let&rsquo;s talk
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative md:hidden">
      <summary className="list-none cursor-pointer select-none rounded-md border border-white/20 px-3 py-2 text-sm text-white">
        Menu
      </summary>
      <div className="absolute right-0 mt-2 flex w-48 flex-col gap-1 rounded-xl border border-white/10 bg-ecom-black p-3 shadow-lg">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-white uppercase tracking-wide hover:bg-white/5"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-1 rounded-md bg-ecom-orange px-3 py-2 text-center text-sm font-medium text-white"
        >
          Let&rsquo;s talk
        </Link>
      </div>
    </details>
  );
}
