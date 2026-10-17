import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Shipping & FFL Transfers" };

export default function ShippingPage() {
  return (
    <InfoPage title="Shipping & FFL Transfers" kicker="Fast, Safe Delivery">
      <p>
        Parts, ammunition, magazines and accessories ship directly to your door.
        Most in-stock items leave our warehouse the same business day.
      </p>
      <p>
        <strong>Firearms</strong> ship to your local licensed FFL dealer, who
        completes the required background check before you take possession.
        Handguns require the buyer to be 21+; long guns 18+.
      </p>
      <p>
        <strong>Free shipping</strong> on parts & accessories over $75. Ammunition
        ships via ground only and cannot be sent to PO boxes.
      </p>
      <p>
        If you buy a firearm and an accessory together, your parts will ship
        immediately while the firearm goes to your dealer.
      </p>
    </InfoPage>
  );
}
