import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Users, Globe, Award } from "lucide-react";
import type { Metadata } from "next";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description: "ALCAO EOOD - A subsidiary of ALTINMARKA GROUP, one of the world's largest cocoa and chocolate manufacturers.",
};

const stats = [
  { icon: Factory, value: "2012", label: "Founded" },
  { icon: Users, value: "222", label: "Employees" },
  { icon: Globe, value: "264M", label: "EUR Net Sales" },
  { icon: Award, value: "2.6x", label: "Sales Growth" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 hero-pattern overflow-hidden" style={{ background: "linear-gradient(to bottom right, #702E3E, #5a2432, #3d1520)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#f0c8d0]/5 rounded-full blur-3xl animate-float" />
        <div className="relative max-w-7xl mx-auto px-4">
          <p className="text-[#f0c8d0] font-semibold text-sm uppercase tracking-wider mb-3 animate-fade-in">Our Story</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-slide-up">About ALCAO</h1>
          <p className="mt-5 text-lg text-white/60 max-w-2xl animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
            Transforming cocoa into complete solutions &mdash; from raw materials to inspiration.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L48 73.3C96 66.7 192 53.3 288 46.7C384 40 480 40 576 43.3C672 46.7 768 53.3 864 53.3C960 53.3 1056 46.7 1152 40C1248 33.3 1344 26.7 1392 23.3L1440 20V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Story</h2>
            <div className="mt-8 space-y-5 text-gray-600 leading-relaxed text-lg">
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
          <div className="relative h-80 md:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl shadow-black/5 border border-gray-100">
            <Image
              src="/images/alcao-logo.png"
              alt="ALCAO"
              fill
              className="object-contain p-16"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 text-center section-divider pt-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our mission is to provide reliable and competitive solutions to our partners, combining
            quality, flexibility, and professional service. We strive to build long-term partnerships
            and to be a trusted supplier for our clients.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 card-hover">
              <div className="inline-flex p-4 bg-gradient-to-br from-[#702E3E]/10 to-[#702E3E]/5 rounded-2xl mb-5">
                <Icon className="text-[#702E3E]" size={28} />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-gray-900">
                <AnimatedCounter value={value} />
              </p>
              <p className="text-sm text-gray-500 mt-3 font-medium uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map + Location */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 section-divider pt-8">Our Location</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-gray-100 h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.2!2d25.2267!3d42.1003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ae9f8a4d3b0001%3A0x400a01269bf5a20!2sParvomay%2C%20Bulgaria!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ALCAO EOOD Location - Parvomay, Bulgaria"
              />
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-xl shadow-black/5 border border-gray-100 flex flex-col justify-center">
              <p className="text-gray-600 text-lg leading-relaxed">
                <strong className="text-gray-900 text-xl block mb-3">ALCAO EOOD</strong>
                Ul. Knyaz Boris I 80<br />
                Parvomay 4270<br />
                Bulgaria
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm">
                <a href="mailto:sales@alcao.eu" className="text-[#702E3E] hover:underline font-medium">sales@alcao.eu</a>
                <a href="mailto:info@alcao.eu" className="text-[#702E3E] hover:underline font-medium">info@alcao.eu</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Ready to Partner with Us?</h2>
        <p className="mt-4 text-gray-500 text-lg">Explore our products or get in touch with our team.</p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-[#702E3E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#5a2432] transition-all hover:shadow-xl hover:shadow-[#702E3E]/20 hover:-translate-y-0.5"
          >
            Browse Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-[#702E3E] text-[#702E3E] px-8 py-4 rounded-xl font-bold hover:bg-[#702E3E]/5 transition-all hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
