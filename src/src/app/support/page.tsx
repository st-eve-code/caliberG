import { InfoPage } from "@/components/site/InfoPage";
import { config } from "@/lib/config";

export const metadata = { title: "Support" };

export default function SupportPage() {
  return (
    <InfoPage
      title="Support Center"
      kicker="We're Here to Help"
      cta={{ href: "/contact", label: "Contact Support" }}
    >
      <p>
        Find answers to common questions about ordering, FFL transfers,
        shipping, returns, and state restrictions in our help articles.
      </p>
      <p>
        Our support team is available {config.supportHours}. Typical reply time
        is under 2 hours during business hours.
      </p>
      <p>
        <strong>Quick links:</strong> Order Lookup · Returns Policy · State
        Restrictions · FFL Locator
      </p>
    </InfoPage>
  );
}
