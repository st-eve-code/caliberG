import { LegalPage, Section, P, Ul } from "@/components/site/Legal";

export const metadata = { title: "Cancellation Policy" };

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation Policy" kicker="Before Your Order Ships">
      <Section title="1 · Cancelling Before Confirmation">
        <P>
          Because every order is confirmed with you personally on WhatsApp, you
          can cancel at any point before the order is confirmed and arranged
          without any charge. If you send a receipt and then change your mind,
          simply let us know and no order will be placed.
        </P>
      </Section>

      <Section title="2 · Cancelling After Confirmation">
        <Ul>
          <li>
            <strong>Before shipment:</strong> you may cancel a confirmed order
            for a full refund of any amount paid, minus any non-refundable
            transfer or cancellation fees incurred on your behalf.
          </li>
          <li>
            <strong>After shipment:</strong> your order is instead covered by
            our{" "}
            <a className="text-brand-700 underline" href="/returns">Returns Policy</a>.
          </li>
          <li>
            <strong>Firearms:</strong> once a firearm has shipped to an FFL
            dealer, it cannot be cancelled; the{" "}
            <a className="text-brand-700 underline" href="/returns">Returns Policy</a> applies.
          </li>
        </Ul>
      </Section>

      <Section title="3 · How to Cancel">
        <P>
          Contact us on WhatsApp or via email with your receipt. Please have the
          receipt available so we can locate the order quickly.
        </P>
      </Section>

      <Section title="4 · Our Right to Cancel">
        <P>
          We may cancel an order at our discretion — for example if we cannot
          lawfully ship an item to your location, if the item is no longer
          available, or if there was a pricing error. In that case any amount
          paid will be refunded in full.
        </P>
      </Section>
    </LegalPage>
  );
}
