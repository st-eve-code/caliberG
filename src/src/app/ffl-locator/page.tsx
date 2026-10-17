import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "FFL Locator" };

export default function FflLocatorPage() {
  return (
    <InfoPage title="FFL Locator" kicker="Ship to a Dealer Near You">
      <p>
        Firearms ship to the licensed FFL dealer (gun store) of your choice.
        Once your order is placed, we contact your dealer to confirm the
        transfer and forward your contact info so the dealer can reach you when
        it arrives.
      </p>
      <p>
        Use a tool like the ATF&apos;s FFL eZ Check, or simply search for a local
        gun store — most shops offer online-transfer fees between $20–$50.
      </p>
      <p>
        Typical steps: place your order → choose your FFL → we verify & ship →
        dealer completes the background check → you take it home.
      </p>
    </InfoPage>
  );
}
