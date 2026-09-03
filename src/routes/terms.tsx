import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/site/legal";

export const Route = createFileRoute("/terms")({
  head: legalHead(
    "Terms of Service — WashOnCall",
    "The terms governing your use of the WashOnCall doorstep vehicle wash marketplace, bookings and payments.",
  ),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="WashOnCall is a marketplace that connects vehicle owners with independent washing companies. These terms govern your use of our platform."
      sections={[
        { h: "1. Our role", p: "WashOnCall facilitates discovery, booking and payment between customers and independent washing companies. The wash service itself is performed by the partner you select, who is solely responsible for its quality and execution." },
        { h: "2. Bookings", p: "A booking is confirmed once payment is captured and the partner accepts. Slot timings are estimates; partners may arrive within a 30-minute window of the selected slot." },
        { h: "3. Pricing and commission", p: "Prices are set by partners and shown inclusive of applicable taxes at checkout. WashOnCall retains a platform commission of 15–25% (typically 20%) per completed booking, disclosed transparently at checkout." },
        { h: "4. Customer responsibilities", p: "You must provide accurate address details, safe access to the vehicle, and remove valuables before the wash. Water and power are carried by the washer unless otherwise agreed." },
        { h: "5. Damage and liability", p: "Claims of damage must be raised within 24 hours with photographic evidence. Verified claims are covered under partner insurance up to the limits notified at the time of booking." },
        { h: "6. Prohibited use", p: "You may not use the platform to solicit partners off-platform, submit fraudulent bookings, or misuse coupons and referral credits." },
        { h: "7. Governing law", p: "These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Gurugram, Haryana." },
      ]}
    />
  ),
});
