import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Users, Globe, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "ALCAO EOOD - A subsidiary of ALTINMARKA GROUP, one of the world's largest cocoa and chocolate manufacturers.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#702E3E] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About ALCAO</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Transforming cocoa into complete solutions &mdash; from raw materials to inspiration.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                ALCAO EOOD was founded in 2012 and is wholly owned by{" "}
                <a href="https://www.altinmarka.com/" target="_blank" rel="noopener noreferrer" className="text-[#702E3E] font-medium hover:underline">
                  ALTINMARKA GROUP
                </a>{" "}
                &mdash; one of the world&apos;s largest companies for cocoa and chocolate production.
              </p>
              <p>
                We specialize in the production and supply of high-quality cocoa products and chocolate
                for the food industry. Our core activities include the production of cocoa powder, cocoa
                butter, cocoa mass, and various types of chocolate, intended for industrial manufacturers,
                the HORECA sector, households, and distributors.
              </p>
              <p>
                We work with carefully selected raw materials and modern production technologies, which
                allows us to guarantee consistently high quality, product stability, and compliance with
                international standards.
              </p>
            </div>
          </div>
          <div className="relative h-80 md:h-full rounded-xl overflow-hidden bg-gray-100">
            <Image
              src="/images/alcao-logo.svg"
              alt="ALCAO"
              fill
              className="object-contain p-12"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our mission is to provide reliable and competitive solutions to our partners, combining
            quality, flexibility, and professional service. We strive to build long-term partnerships
            and to be a trusted supplier for our clients.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <Factory className="mx-auto text-[#702E3E] mb-3" size={36} />
            <p className="text-3xl font-bold text-gray-900">2012</p>
            <p className="text-sm text-gray-500 mt-1">Founded</p>
          </div>
          <div className="text-center">
            <Users className="mx-auto text-[#702E3E] mb-3" size={36} />
            <p className="text-3xl font-bold text-gray-900">222</p>
            <p className="text-sm text-gray-500 mt-1">Employees</p>
          </div>
          <div className="text-center">
            <Globe className="mx-auto text-[#702E3E] mb-3" size={36} />
            <p className="text-3xl font-bold text-gray-900">264M</p>
            <p className="text-sm text-gray-500 mt-1">EUR Net Sales</p>
          </div>
          <div className="text-center">
            <Award className="mx-auto text-[#702E3E] mb-3" size={36} />
            <p className="text-3xl font-bold text-gray-900">2.6x</p>
            <p className="text-sm text-gray-500 mt-1">Sales Growth</p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Location</h2>
          <div className="bg-white rounded-xl p-8 max-w-xl mx-auto text-center">
            <p className="text-gray-600">
              <strong>ALCAO EOOD</strong><br />
              Ul. Knyaz Boris I 80<br />
              Parvomay 4270<br />
              Bulgaria
            </p>
            <div className="mt-4 space-y-1 text-sm text-gray-500">
              <p>sales@alcao.eu | info@alcao.eu</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Partner with Us?</h2>
        <p className="mt-4 text-gray-500">Explore our products or get in touch with our team.</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#702E3E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#5a2432] transition-colors"
          >
            Browse Products <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-[#702E3E] text-[#702E3E] px-8 py-3 rounded-lg font-bold hover:bg-[#702E3E]/5 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
