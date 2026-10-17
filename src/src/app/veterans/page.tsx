import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Veterans & First Responder Discount" };

export default function VeteransPage() {
  return (
    <InfoPage
      title="Sovereign Arms Valor Program"
      kicker="Proud to Serve Those Who Serve"
      cta={{ href: "/contact", label: "Verify & Enroll" }}
    >
      <p>
        Active and retired military, veterans, first responders and law
        enforcement get exclusive discounts across our entire catalog — guns,
        parts, ammo and optics.
      </p>
      <p>
        Verification is handled securely through our partner ID check in about
        two minutes. Once verified, your discount is applied automatically at
        checkout on eligible items.
      </p>
      <p>
        Questions? Email our Valor team and we&apos;ll get you squared away.
      </p>
    </InfoPage>
  );
}
