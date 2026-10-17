import { LegalPage, Section, P, Ul } from "@/components/site/Legal";

export const metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" kicker="Accessible to Everyone">
      <Section title="1 · Our Commitment">
        <P>
          We are committed to making this site usable by as many people as
          possible, including people with disabilities. We aim to follow the
          Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as the
          benchmark for our pages.
        </P>
      </Section>

      <Section title="2 · What We Do">
        <Ul>
          <li>Maintain clear, readable text and sufficient color contrast.</li>
          <li>Provide keyboard navigation and visible focus states.</li>
          <li>Use descriptive text for images, buttons and links.</li>
          <li>Support screen readers and assistive technologies.</li>
          <li>Avoid content that flashes at rates known to trigger seizures.</li>
        </Ul>
      </Section>

      <Section title="3 · Feedback">
        <P>
          We are always working to improve. If you encounter a page or feature
          that is difficult to use, or if you have suggestions, please tell us.
          We will do our best to address the issue and to respond within a
          reasonable time.
        </P>
      </Section>
    </LegalPage>
  );
}
