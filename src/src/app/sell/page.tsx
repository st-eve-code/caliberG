import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Sell Your Guns" };

export default function SellPage() {
  return (
    <InfoPage
      title="Sell Your Guns"
      kicker="Consign or Sell Fast"
      cta={{ href: "/contact", label: "Get a Quote" }}
    >
      <p>
        Turn your firearms into cash. Sell us your guns outright or list them
        on the Sovereign Arms auction board — you pick how fast you want to move
        them and what reserve you&apos;re comfortable with.
      </p>
      <p>
        We handle the photos, the listing, payment processing and FFL shipping.
        Most sellers receive an offer within 24 hours, and payment is issued
        within 48 hours of the transfer being completed.
      </p>
      <p>
        Already a dealer or moving a whole collection? Contact our consignment
        team for volume pricing and managed collections.
      </p>
    </InfoPage>
  );
}
