import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Order Lookup" };

export default function OrderLookupPage() {
  return (
    <InfoPage title="Order Lookup" kicker="Track Your Order">
      <p>
        Orders ship within 24 hours on parts & accessories, and firearms move to
        your FFL within 48 hours.
      </p>
      <p>
        You&apos;ll receive a confirmation email the moment your order is placed, a
        shipping notice with tracking once it leaves the warehouse, and a
        notification when your dealer confirms the FFL transfer.
      </p>
    </InfoPage>
  );
}
