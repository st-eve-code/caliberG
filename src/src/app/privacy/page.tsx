import { LegalPage, Section, P, Ul } from "@/components/site/Legal";
import { config } from "@/lib/config";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      kicker="Your Data Stays Yours"
    >
      <Section title="1 · Our Approach to Privacy">
        <P>
          {config.siteName} is built around a simple idea: we do not need your
          payment details, and we do not want them. We never collect, store or
          process card or bank information on this platform, and orders are
          completed privately over WhatsApp.
        </P>
        <P>
          This policy explains what little information we handle, how it is
          used, and the choices you have.
        </P>
      </Section>

      <Section title="2 · What We Collect">
        <P>We collect only the following:</P>
        <Ul>
          <li>
            <strong>Information you send us on WhatsApp</strong> — anything you
            share during an order conversation (such as your name, contact
            details, shipping address and FFL dealer) is held by us and
            WhatsApp under their terms, and used only to complete your order.
          </li>
          <li>
            <strong>Your cart</strong> — stored locally in your browser on your
            own device. It is never uploaded to our servers and can be deleted
            by you at any time by clearing your cart.
          </li>
          <li>
            <strong>Basic usage data</strong> — anonymous analytics such as the
            pages you visit and how long you stay, used to improve the site.
          </li>
          <li>
            <strong>Contact form messages</strong> — if you contact us, we use
            the details you provide to reply to you.
          </li>
        </Ul>
      </Section>

      <Section title="3 · What We Never Collect">
        <Ul>
          <li>Credit card or banking details — no payment is taken on the site.</li>
          <li>A password or account credentials — there is no account system.</li>
          <li>Any purchase history tied to you personally.</li>
        </Ul>
      </Section>

      <Section title="4 · How We Use Information">
        <P>Information is used only to:</P>
        <Ul>
          <li>Respond to your WhatsApp order and confirm details with you;</li>
          <li>Answer questions sent through the contact form;</li>
          <li>Improve and secure the website; and</li>
          <li>Comply with applicable law.</li>
        </Ul>
        <P>
          We never sell, rent or share your personal information with third
          parties for marketing purposes.
        </P>
      </Section>

      <Section title="5 · Cookies">
        <P>
          We use a small number of cookies and similar technologies — for
          example to remember your cart and to understand site usage. You can
          control cookies through your browser settings. See our{" "}
          <a className="text-brand-700 underline" href="/cookies">Cookie Policy</a> for details.
        </P>
      </Section>

      <Section title="6 · Where Data Is Held">
        <P>
          WhatsApp conversations are handled under WhatsApp&apos;s own privacy
          and security terms, which apply to messages exchanged with us. Site
          analytics data may be processed by third-party analytics providers
          under their respective privacy policies.
        </P>
      </Section>

      <Section title="7 · Data Retention">
        <P>
          WhatsApp order conversations are kept only as long as needed to
          complete and support your order. Your browser-stored cart is kept on
          your device until you delete it. We do not maintain a customer
          database.
        </P>
      </Section>

      <Section title="8 · Your Rights">
        <P>
          Depending on where you live, you may have the right to access, correct
          or delete the personal information we hold about you. Because we hold
          almost nothing beyond your messages, these rights are usually
          satisfied by simply deleting your messages or clearing your cart. To
          exercise any right, contact us and we will help.
        </P>
      </Section>

      <Section title="9 · Security">
        <P>
          We apply reasonable technical and organizational measures to protect
          the site and the small amount of information we handle. No method of
          transmission over the internet is 100% secure, but we take this
          seriously.
        </P>
      </Section>

      <Section title="10 · Changes to This Policy">
        <P>
          We may update this policy from time to time. Material changes will be
          posted on this page with a revised date. Continued use of the site
          after changes are posted means you accept the updated policy.
        </P>
      </Section>

      <Section title="11 · Contact">
        <P>
          Questions about this policy? Email{" "}
          <a className="text-brand-700 underline" href={`mailto:${config.supportEmail}`}>
            {config.supportEmail}
          </a>{" "}
          or reach us through WhatsApp.
        </P>
      </Section>
    </LegalPage>
  );
}
