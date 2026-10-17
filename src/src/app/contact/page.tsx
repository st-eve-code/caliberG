import { InfoPage } from "@/components/site/InfoPage";
import { config, formattedAddress } from "@/lib/config";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact Us"
      kicker="We Usually Reply Within 2 Hours"
      cta={{ href: "/support", label: "Visit Support Center" }}
    >
      <p>
        <strong>Phone:</strong>{" "}
        <a href={config.phoneHref} className="text-brand-700 underline">
          {config.phone}
        </a>{" "}
        ({config.supportHours})
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${config.supportEmail}`} className="text-brand-700 underline">
          {config.supportEmail}
        </a>
      </p>
      <p>
        <strong>FFL / dealer questions:</strong>{" "}
        <a href={`mailto:${config.dealersEmail}`} className="text-brand-700 underline">
          {config.dealersEmail}
        </a>
      </p>
      <p>
        <strong>Location:</strong> {formattedAddress}
      </p>
      <p>
        For fastest service, include your order number and the item SKU in your
        message.
      </p>
    </InfoPage>
  );
}
