import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-ecom-cream/10 bg-ecom-dark text-ecom-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo-secundario.png"
              alt="Ecommetrica"
              width={180}
              height={44}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm text-ecom-cream/70">
              Construimos ecosistemas digitales seguros para el crecimiento
              sostenible de los negocios.
            </p>
          </div>

          <FooterColumn
            title="Sitemap"
            links={[
              { href: "/studio", label: "Studio" },
              { href: "/work", label: "Work" },
              { href: "/blog", label: "Blog" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { href: "/contact", label: "Contact us" },
              { href: "/#services", label: "Services" },
              { href: "/contact", label: "Let's talk" },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { href: "/legal/privacy-policy", label: "Privacy policy" },
              { href: "/legal/terms-of-service", label: "Terms of service" },
              { href: "/faq", label: "FAQ" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ecom-cream/10 pt-6 text-xs text-ecom-cream/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Ecommetrica. All rights reserved.</p>
          <p>Estrategia · Tecnolog&iacute;a · Marketing</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ecom-cream/50">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-ecom-cream/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
