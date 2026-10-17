import { LegalPage, Section, P, Ul } from "@/components/site/Legal";

export const metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" kicker="How We Use Cookies">
      <Section title="1 · What Are Cookies?">
        <P>
          Cookies are small text files placed on your device when you visit a
          website. They help the site remember information about your visit,
          such as the items in your cart or your preferences.
        </P>
      </Section>

      <Section title="2 · Cookies We Use">
        <Ul>
          <li>
            <strong>Strictly necessary</strong> — cookies that make the site
            work, including remembering your cart on your own device.
          </li>
          <li>
            <strong>Analytics</strong> — anonymous statistics on how the site is
            used (pages visited, time on site, traffic sources) so we can
            improve it.
          </li>
          <li>
            <strong>Functionality</strong> — preferences such as previously
            searched terms, to make browsing easier.
          </li>
        </Ul>
        <P>
          We do not use advertising or tracking cookies to profile you across
          other websites.
        </P>
      </Section>

      <Section title="3 · Managing Cookies">
        <P>
          You can block or delete cookies through your browser settings at any
          time. Most browsers also allow you to browse privately, which
          prevents cookies from being stored after you close the browser.
          Blocking strictly necessary cookies may affect features such as
          your saved cart.
        </P>
      </Section>

      <Section title="4 · Your Cart Is Local">
        <P>
          Your cart is stored in your browser&apos;s local storage on your own
          device, not in cookies on our servers. It never leaves your device and
          can be deleted by clearing your cart.
        </P>
      </Section>

      <Section title="5 · Changes & Contact">
        <P>
          We may update this policy as our use of cookies changes. Questions?
          See our{" "}
          <a className="text-brand-700 underline" href="/privacy">Privacy Policy</a> or contact us.
        </P>
      </Section>
    </LegalPage>
  );
}
