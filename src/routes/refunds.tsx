import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/site/legal";

export const Route = createFileRoute("/refunds")({
  head: legalHead(
    "Refunds & Cancellation Policy — WashOnCall",
    "Cancellation windows, refund timelines and the WashOnCall free rewash guarantee for doorstep vehicle washes.",
  ),
  component: () => (
    <LegalPage
      eyebrow="Policies"
      title="Refunds & Cancellation"
      intro="Plans change. Here's exactly what happens to your money when they do."
      sections={[
        { h: "Free cancellation window", p: "Cancel up to 2 hours before your slot for a full refund, no questions asked. Cancellations inside 2 hours carry a ₹99 washer mobilisation fee." },
        { h: "Washer no-show", p: "If the washer does not arrive within 30 minutes of your slot window, the booking is auto-cancelled and fully refunded, plus a ₹100 credit to your wallet." },
        { h: "Rewash guarantee", p: "Unhappy with the finish? Raise it within 24 hours with photos and we arrange a free rewash, or refund the package amount if a rewash isn't possible." },
        { h: "Refund timelines", p: "Refunds are initiated instantly and reach UPI accounts within 24 hours, and cards or netbanking within 5–7 business days, depending on your bank." },
        { h: "Partner-initiated cancellations", p: "If a partner cancels, we auto-rebook you with the next best-rated partner at the same price, or refund in full if you prefer." },
        { h: "Add-ons and coupons", p: "Refunds are calculated on the amount actually paid. Coupon value is not refunded in cash but the coupon is restored to your account." },
      ]}
    />
  ),
});
