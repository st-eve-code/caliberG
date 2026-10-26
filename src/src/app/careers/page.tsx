import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <InfoPage
      title="Careers at CaliberGuns"
      kicker="Join the Team"
      cta={{ href: "/contact", label: "Send a Resume" }}
    >
      <p>
        We&apos;re always looking for passionate shooters who know their stuff — in
        sales, logistics, gunsmithing and marketing. FFL-friendly roles
        available across the country.
      </p>
    </InfoPage>
  );
}
