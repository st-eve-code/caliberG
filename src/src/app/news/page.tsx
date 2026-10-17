import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "News & Reviews" };

export default function NewsPage() {
  return (
    <InfoPage
      title="Gun News & Reviews"
      kicker="The Shooting Sports Source"
      cta={{ href: "/browse", label: "Shop the Reviews" }}
    >
      <p>
        Hands-on reviews, new product announcements and industry news from our
        editorial team. We test the gear we sell, so you know what you&apos;re
        getting before you buy.
      </p>
    </InfoPage>
  );
}
