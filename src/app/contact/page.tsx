import { Mail, MapPin, Globe } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ALCAO EOOD. We're here to help with your cocoa and chocolate product needs.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#702E3E] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-white/80">We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#702E3E]/10 rounded-lg">
                    <MapPin className="text-[#702E3E]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      Ul. Knyaz Boris I 80<br />
                      Parvomay 4270<br />
                      Bulgaria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#702E3E]/10 rounded-lg">
                    <Mail className="text-[#702E3E]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      <a href="mailto:sales@alcao.eu" className="hover:text-[#702E3E]">sales@alcao.eu</a><br />
                      <a href="mailto:info@alcao.eu" className="hover:text-[#702E3E]">info@alcao.eu</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#702E3E]/10 rounded-lg">
                    <Globe className="text-[#702E3E]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Part of</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      <a href="https://www.altinmarka.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#702E3E] underline">
                        ALTINMARKA GROUP
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday - Friday: 9:00 - 18:00</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
