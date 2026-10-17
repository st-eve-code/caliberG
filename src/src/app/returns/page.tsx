import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Returns Policy" };

export default function ReturnsPage() {
  return (
    <InfoPage title="Returns Policy" kicker="30-Day Guarantee">
      <p>
        Unused items in original packaging can be returned within 30 days for a
        full refund. Ammunition is non-returnable for safety and legal reasons.
      </p>
      <p>
        Firearm returns must be processed through an FFL. Contact support for a
        return authorization before shipping anything back.
      </p>
    </InfoPage>
  );
}
