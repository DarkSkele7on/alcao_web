import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#702E3E] to-[#3d1520] text-white mt-auto relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/2 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Image
              src="/images/alcao-logo.svg"
              alt="ALCAO"
              width={100}
              height={50}
              className="h-10 w-auto mb-5 brightness-0 invert opacity-90"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              ALCAO EOOD is a subsidiary of ALTINMARKA GROUP &mdash; one of the world&apos;s largest cocoa and
              chocolate manufacturers. We deliver premium cocoa products and chocolate to the food industry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-white/80">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Shop", href: "/shop" },
                { name: "About Us", href: "/about" },
                { name: "Recipes", href: "/recipes" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-white/80">Categories</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Chocolate", href: "/shop/chocolate" },
                { name: "Cocoa", href: "/shop/cocoa" },
                { name: "Confectionery", href: "/shop/confectionery" },
                { name: "Vegan", href: "/shop/vegan" },
                { name: "Cacaonly", href: "/shop/cacaonly" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-white/80">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="text-white/60">Ul. Knyaz Boris I 80, Parvomay 4270, Bulgaria</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Mail size={14} />
                </div>
                <div className="space-y-1">
                  <a href="mailto:sales@alcao.eu" className="text-white/60 hover:text-white transition-colors block">sales@alcao.eu</a>
                  <a href="mailto:info@alcao.eu" className="text-white/60 hover:text-white transition-colors block">info@alcao.eu</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} ALCAO EOOD. All rights reserved.</p>
          <p>
            Part of{" "}
            <a
              href="https://www.altinmarka.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/60"
            >
              ALTINMARKA GROUP
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
