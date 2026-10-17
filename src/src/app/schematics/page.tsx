import { InfoPage } from "@/components/site/InfoPage";

export const metadata = { title: "Gun Schematics" };

export default function SchematicsPage() {
  return (
    <InfoPage
      title="Gun Schematics"
      kicker="Exploded Diagrams for Every Platform"
      cta={{ href: "/category/gun_parts", label: "Shop Gun Parts" }}
    >
      <p>
        Browse interactive exploded-view diagrams for the most popular rifles,
        pistols and shotguns. Each schematic is labeled with the exact part
        number so you can order replacements without guessing.
      </p>
      <p>
        Find your platform&apos;s manual, torque specs and OEM part numbers all in
        one place.
      </p>
    </InfoPage>
  );
}
