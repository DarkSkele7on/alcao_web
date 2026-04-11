import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#702E3E] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">ALCAO</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              ALCAO EOOD is a subsidiary of ALTINMARKA GROUP &mdash; one of the world&apos;s largest cocoa and
              chocolate manufacturers. We deliver premium cocoa products and chocolate to the food industry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-white/80 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/recipes" className="text-white/80 hover:text-white transition-colors">Recipes</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop/chocolate" className="text-white/80 hover:text-white transition-colors">Chocolate</Link></li>
              <li><Link href="/shop/cocoa" className="text-white/80 hover:text-white transition-colors">Cocoa</Link></li>
              <li><Link href="/shop/confectionery" className="text-white/80 hover:text-white transition-colors">Confectionery</Link></li>
              <li><Link href="/shop/vegan" className="text-white/80 hover:text-white transition-colors">Vegan</Link></li>
              <li><Link href="/shop/cacaonly" className="text-white/80 hover:text-white transition-colors">Cacaonly</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Ul. Knyaz Boris I 80, Parvomay 4270, Bulgaria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:sales@alcao.eu" className="text-white/80 hover:text-white transition-colors">sales@alcao.eu</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:info@alcao.eu" className="text-white/80 hover:text-white transition-colors">info@alcao.eu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} ALCAO EOOD. All rights reserved.</p>
          <p>
            Part of{" "}
            <a
              href="https://www.altinmarka.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline"
            >
              ALTINMARKA GROUP
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
