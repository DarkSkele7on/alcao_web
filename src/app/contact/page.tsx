import { Mail, MapPin, Globe, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ALCAO EOOD. We're here to help with your cocoa and chocolate product needs.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative py-20 hero-pattern overflow-hidden" style={{ background: "linear-gradient(to bottom right, #702E3E, #5a2432, #3d1520)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <p className="text-[#f0c8d0] font-semibold text-sm uppercase tracking-wider mb-3">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Contact Us</h1>
          <p className="mt-4 text-lg text-white/60">We&apos;d love to hear from you.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Address", content: <>Ul. Knyaz Boris I 80<br />Parvomay 4270<br />Bulgaria</> },
                  { icon: Mail, title: "Email", content: <><a href="mailto:sales@alcao.eu" className="hover:text-[#702E3E] transition-colors">sales@alcao.eu</a><br /><a href="mailto:info@alcao.eu" className="hover:text-[#702E3E] transition-colors">info@alcao.eu</a></> },
                  { icon: Globe, title: "Part of", content: <a href="https://www.altinmarka.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#702E3E] transition-colors underline decoration-gray-300 hover:decoration-[#702E3E]">ALTINMARKA GROUP</a> },
                ].map(({ icon: Icon, title, content }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#702E3E]/10 to-[#702E3E]/5 rounded-xl">
                      <Icon className="text-[#702E3E]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{title}</h3>
                      <p className="text-gray-600 mt-1 text-sm">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#702E3E]/10 rounded-lg">
                  <Clock className="text-[#702E3E]" size={16} />
                </div>
                <h3 className="font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-1.5 ml-11">
                <p>Monday - Friday: 9:00 - 18:00</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg shadow-black/5 h-[250px]">
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
          </div>

          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
