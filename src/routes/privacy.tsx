import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/site/legal";

export const Route = createFileRoute("/privacy")({
  head: legalHead(
    "Privacy Policy — WashOnCall",
    "How WashOnCall collects, uses and protects your personal data, location and payment information.",
  ),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We collect the minimum data needed to send a washer to your door and keep your booking safe."
      sections={[
        { h: "Data we collect", p: "Name, mobile number, service address, vehicle details, booking history and device location when you choose GPS detection. Payment details are handled by Razorpay; we never store card numbers." },
        { h: "How we use it", p: "To match you with nearby partners, route the washer to your address, process payments and refunds, and provide support. Aggregated, anonymised data informs pricing and coverage decisions." },
        { h: "Sharing with partners", p: "Partners receive only what is required to fulfil the job: first name, masked phone number, service address and vehicle type. Your number is masked during calls." },
        { h: "Retention", p: "Booking records are retained for seven years for tax and dispute purposes. Location traces are deleted 30 days after job completion." },
        { h: "Your rights", p: "You may request access, correction or deletion of your data at privacy@washoncall.in. We respond within 30 days." },
        { h: "Cookies", p: "We use essential cookies for sessions and analytics cookies to understand feature usage. You can opt out of analytics from your account settings." },
      ]}
    />
  ),
});
