import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Gift Cards" };

export default function GiftCardsPage() {
  return (
    <InfoPage
      title="Gift Cards"
      kicker="The Gift They'll Actually Use"
      cta={{ href: "/browse", label: "Shop Gift Ideas" }}
    >
      <p>
        CaliberGuns gift cards are delivered by email, work on everything in
        the store, and never expire. They&apos;re the perfect gift for anyone who
        has ever said &ldquo;I&apos;ve been eyeing one of those.&rdquo;
      </p>
    </InfoPage>
  );
}
