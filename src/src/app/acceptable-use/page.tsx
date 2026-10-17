import { LegalPage, Section, P, Ul } from "@/components/site/Legal";

export const metadata = { title: "Acceptable Use Policy" };

export default function AcceptableUsePage() {
  return (
    <LegalPage title="Acceptable Use Policy" kicker="Use the Site Legally & Responsibly">
      <Section title="1 · Purpose">
        <P>
          This policy sets out what you may and may not do when using this
          platform. It exists to keep the site lawful, safe and reliable for
          everyone.
        </P>
      </Section>

      <Section title="2 · What You Must Not Do">
        <Ul>
          <li>
            Make a <strong>straw purchase</strong> — buying a firearm for
            someone who is prohibited from possessing one, or arranging one for
            another person. This is a federal crime.
          </li>
          <li>
            Provide false, misleading or incomplete information in connection
            with any purchase or background check.
          </li>
          <li>
            Resell firearms or ammunition without the proper federal and state
            licenses, or ship items to places where they are unlawful.
          </li>
          <li>
            Use the site to commit, facilitate or conceal any crime.
          </li>
          <li>
            Scrape, bulk-download or reuse product data, images or content
            without our written permission.
          </li>
          <li>
            Attempt to disrupt, overload or gain unauthorized access to the
            site, its servers or its data.
          </li>
          <li>
            Use the site to harass, threaten or defame any person, or to post
            unlawful content.
          </li>
        </Ul>
      </Section>

      <Section title="3 · Enforcement">
        <P>
          We may refuse service, cancel orders or restrict access to anyone who
          violates this policy or applicable law. Where we believe a crime has
          been committed, we will report it to the appropriate authorities.
        </P>
      </Section>

      <Section title="4 · Age & Responsibility">
        <P>
          You confirm you are at least 18 years old, are legally permitted to
          use this site, and are responsible for ensuring your use complies with
          all applicable laws.
        </P>
      </Section>
    </LegalPage>
  );
}
