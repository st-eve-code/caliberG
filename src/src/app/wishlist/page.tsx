import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Wish List" };

export default function WishlistPage() {
  return (
    <InfoPage
      title="Your Wish List"
      kicker="Saved For Later"
      cta={{ href: "/browse", label: "Browse Products" }}
    >
      <p>
        Use the heart icon on any product card to save it here for later. Keep
        an eye on your saved items — we&apos;ll alert you when the price drops.
      </p>
    </InfoPage>
  );
}
