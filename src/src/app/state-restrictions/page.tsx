import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "State Restrictions" };

export default function StateRestrictionsPage() {
  return (
    <InfoPage title="State Restrictions" kicker="Know Your Local Law">
      <p>
        Firearm laws vary significantly by state and locality. We honor all
        state-level restrictions on magazine capacity, firearm features,
        ammunition type and shipping destinations.
      </p>
      <p>
        Some states (e.g., California, Hawaii, Massachusetts, New York, New
        Jersey, Washington D.C.) impose additional requirements on online
        purchases. Your FFL will confirm eligibility before any transfer.
      </p>
    </InfoPage>
  );
}
