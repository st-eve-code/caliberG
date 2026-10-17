import { LegalPage, Section, P } from "@/components/site/Legal";
import { config } from "@/lib/config";

export const metadata = { title: "Warranty & Disclaimer" };

export default function WarrantyPage() {
  return (
    <LegalPage title="Warranty & Disclaimer" kicker="What We Cover, What We Don't">
      <Section title="1 · Manufacturer Warranties">
        <P>
          New firearms and many accessories are covered by the warranty of the
          original manufacturer, which you should register with the brand.
          Please keep your receipt, as manufacturers generally require proof of
          purchase.
        </P>
      </Section>

      <Section title="2 · Used & Collectible Items">
        <P>
          Used, consignment and collectible firearms are sold &ldquo;as is
          &mdash; where is&rdquo; and may show normal wear consistent with their
          age and condition as described in the listing. No additional warranty
          is provided beyond what is stated in the listing itself.
        </P>
      </Section>

      <Section title="3 · Ammunition & Reloading Components">
        <P>
          Ammunition, powder, primers and similar products are hazardous
          materials and are sold strictly &ldquo;as is&rdquo;. They must be
          stored and used in accordance with the manufacturer&apos;s
          instructions. Never combine or modify components — reloading errors
          can cause serious injury.
        </P>
      </Section>

      <Section title="4 · Disclaimer of Warranties">
        <P>
          To the fullest extent permitted by law, {config.siteName} makes no
          express or implied warranties of any kind, including implied
          warranties of merchantability or fitness for a particular purpose,
          other than those that cannot be excluded by law.
        </P>
      </Section>

      <Section title="5 · Limitation of Liability">
        <P>
          To the maximum extent permitted by law, we are not liable for any
          damages — including personal injury, property damage, or lost profits —
          arising from the use, misuse or failure of any product purchased
          through the platform, or from any information provided on the site.
        </P>
      </Section>

      <Section title="6 · Product Information">
        <P>
          We work to ensure listings are accurate, but specifications, images
          and descriptions are for reference and may differ slightly from the
          item shipped. We do not guarantee that descriptions are free of
          error, and we reserve the right to correct errors.
        </P>
      </Section>
    </LegalPage>
  );
}
