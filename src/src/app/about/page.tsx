import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <InfoPage title="About CaliberGuns" kicker="Built On Trust">
      <p>
        CaliberGuns is a family-owned online firearms retailer serving
        shooters, hunters and collectors. We combine a huge catalog of new and
        used guns with gunbroker-style auction listings and the parts depth of
        a specialty house.
      </p>
      <p>
        Every firearm purchase is handled by licensed FFL partners, every order
        is backed by our price-match and 30-day return guarantees, and every
        transaction is processed with bank-grade security.
      </p>
      <p>
        We believe in promoting responsible gun ownership — safe storage,
        proper training and strict compliance with all federal, state and local
        law.
      </p>
    </InfoPage>
  );
}
