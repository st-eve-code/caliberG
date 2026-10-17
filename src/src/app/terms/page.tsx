import { LegalPage, Section, P, Ul } from "@/components/site/Legal";
import { config } from "@/lib/config";

export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      kicker="The Fine Print"
    >
      <Section title="1 · Acceptance of Terms">
        <P>
          By accessing or using {config.siteName} you agree to these Terms of
          Use and to our{" "}
          <a className="text-brand-700 underline" href="/privacy">Privacy Policy</a>. If you do not
          agree, please do not use the site.
        </P>
      </Section>

      <Section title="2 · Eligibility & Legal Compliance">
        <P>
          You must be at least 18 years old to use this site, and at least 21 to
          purchase a handgun or handgun ammunition. You are responsible for
          complying with all federal, state and local laws that apply to the
          purchase, possession, storage and transfer of firearms in your
          jurisdiction.
        </P>
        <Ul>
          <li>
            Firearms are only sold where the transaction is lawful and are
            transferred exclusively through licensed FFL dealers with the
            required background checks.
          </li>
          <li>
            You agree you are not prohibited by law from purchasing or
            possessing a firearm (for example, under 18 U.S.C. § 922).
          </li>
          <li>
            Providing false information to purchase a firearm is a federal
            crime — we take this seriously and cooperate with law enforcement.
          </li>
        </Ul>
      </Section>

      <Section title="3 · Orders & Payment">
        <P>
          We do not process payments on this platform. When you complete an
          order, your cart generates a receipt that you send to us on WhatsApp.
          A sale is only confirmed once we agree on the order with you directly,
          including availability, shipping and payment method.
        </P>
        <Ul>
          <li>Prices are subject to change and may be corrected for errors.</li>
          <li>
            A listing does not guarantee availability — we will confirm stock
            before completing any order.
          </li>
          <li>
            Payment arrangements are made privately between you and us; we never
            ask you to enter payment details on this site.
          </li>
        </Ul>
      </Section>

      <Section title="4 · Firearms, FFL & Background Checks">
        <P>
          Firearms ship only to the licensed FFL dealer you name, who will
          conduct the background check required by law before releasing the
          firearm. You are responsible for selecting a dealer willing to
          accept the transfer and for complying with any fees that dealer
          charges.
        </P>
      </Section>

      <Section title="5 · Ammunition, Parts & Restricted Items">
        <P>
          Ammunition and magazines are shipped only where permitted. Some
          states restrict capacity, features or shipping — we honor those
          restrictions and may decline orders that cannot be fulfilled
          lawfully. See{" "}
          <a className="text-brand-700 underline" href="/state-restrictions">State Restrictions</a>.
        </P>
      </Section>

      <Section title="6 · Cancellations & Returns">
        <P>
          Orders are subject to our{" "}
          <a className="text-brand-700 underline" href="/cancellation">Cancellation Policy</a> and{" "}
          <a className="text-brand-700 underline" href="/returns">Returns Policy</a>.
        </P>
      </Section>

      <Section title="7 · Prohibited Use">
        <P>
          You agree not to use the site to violate any law, including arranging
          straw purchases, reselling firearms without the proper license, or
          shipping restricted items. See our{" "}
          <a className="text-brand-700 underline" href="/acceptable-use">Acceptable Use Policy</a>.
        </P>
      </Section>

      <Section title="8 · Intellectual Property">
        <P>
          All content on the site — including product data, images, text,
          graphics and logos — is owned by or licensed to {config.siteName} and
          may not be copied, scraped or reused without our written permission.
        </P>
      </Section>

      <Section title="9 · Disclaimers">
        <P>
          The site and all products are provided on an &ldquo;as is&rdquo; basis
          without warranties of any kind, to the fullest extent permitted by
          law. We do not warrant that the site will be error-free or
          uninterrupted, and we are not liable for damage or loss arising from
          your use of the site or any product purchased. See our{" "}
          <a className="text-brand-700 underline" href="/warranty">Warranty & Disclaimer</a>.
        </P>
      </Section>

      <Section title="10 · Limitation of Liability">
        <P>
          To the maximum extent permitted by law, {config.siteName} and its
          owners, employees and agents are not liable for any indirect,
          incidental, special or consequential damages, or any loss of profits
          or data, arising out of or related to your use of the site or any
          purchase.
        </P>
      </Section>

      <Section title="11 · Changes to These Terms">
        <P>
          We may revise these terms at any time. Changes take effect when posted
          on this page. Your continued use of the site constitutes acceptance of
          the current terms.
        </P>
      </Section>

      <Section title="12 · Contact">
        <P>
          Questions about these terms? Email{" "}
          <a className="text-brand-700 underline" href={`mailto:${config.supportEmail}`}>
            {config.supportEmail}
          </a>{" "}
          or reach us through WhatsApp.
        </P>
      </Section>
    </LegalPage>
  );
}
