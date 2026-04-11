"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "alcao-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie className="w-8 h-8 text-burgundy shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-sm text-gray-700 flex-1">
          We use cookies for essential site functionality and to improve your
          experience. By accepting, you consent to our use of cookies in
          accordance with our privacy policy.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy-dark transition-colors"
          >
            Accept
          </button>
        </div>
        <button
          onClick={handleDecline}
          className="absolute top-2 right-2 sm:static p-1 text-gray-400 hover:text-gray-600"
          aria-label="Close cookie banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
