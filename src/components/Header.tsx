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
    <header className="sticky top-0 z-50 border-b border-ecom-dark/10 bg-ecom-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-principal.png"
            alt="Ecommetrica"
            width={160}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide uppercase md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ecom-dark/80 transition-colors hover:text-ecom-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-ecom-dark px-5 py-2.5 text-sm font-medium text-ecom-cream transition-colors hover:bg-ecom-red md:inline-block"
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
      <summary className="list-none cursor-pointer select-none rounded-md border border-ecom-dark/20 px-3 py-2 text-sm">
        Menu
      </summary>
      <div className="absolute right-0 mt-2 flex w-48 flex-col gap-1 rounded-xl border border-ecom-dark/10 bg-ecom-cream p-3 shadow-lg">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide hover:bg-ecom-dark/5"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-1 rounded-md bg-ecom-dark px-3 py-2 text-center text-sm font-medium text-ecom-cream"
        >
          Let&rsquo;s talk
        </Link>
      </div>
    </details>
  );
}
