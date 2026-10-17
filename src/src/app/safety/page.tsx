import Link from "next/link";
import { LegalPage, Section, P, Ul } from "@/components/site/Legal";
import { config } from "@/lib/config";

export const metadata = { title: "Firearm Safety & Compliance" };

export default function SafetyPage() {
  return (
    <LegalPage title="Firearm Safety & Compliance" kicker="Own Responsibly">
      <Section title="1 · The Four Rules of Firearm Safety">
        <P>
          Whether you are a first-time owner or a seasoned shooter, these rules
          save lives:
        </P>
        <Ul>
          <li>Treat every firearm as if it is loaded.</li>
          <li>Never point the muzzle at anything you are not willing to destroy.</li>
          <li>Keep your finger off the trigger until your sights are on target.</li>
          <li>Be sure of your target and what is beyond it.</li>
        </Ul>
      </Section>

      <Section title="2 · Safe Storage">
        <P>
          Firearms must be stored securely and unloaded, out of reach of
          children and anyone not authorized to use them. We strongly recommend
          a quality lockbox or safe. Trigger locks, cable locks and
          firearm-specific safes are available in our{" "}
          <Link className="text-brand-700 underline" href="/category/gear">gear section</Link>.
        </P>
        <P>
          Responsible storage is not just good practice — in many states it is
          the law, and it is the best way to prevent accidents and theft.
        </P>
      </Section>

      <Section title="3 · Transport & Travel">
        <P>
          Transporting firearms across state lines is regulated by federal law
          (18 U.S.C. § 926A) and by the laws of each state you travel through.
          Always check local rules before traveling with a firearm, especially
          by air or across state borders.
        </P>
      </Section>

      <Section title="4 · Ownership & Training">
        <P>
          Taking a certified safety and marksmanship course before your first
          purchase is strongly recommended. Practice regularly, know your
          firearm&apos;s manual, and never modify a firearm beyond the
          manufacturer&apos;s specifications without proper guidance.
        </P>
      </Section>

      <Section title="5 · Legal Compliance">
        <P>
          {config.siteName} sells firearms only through licensed FFL dealers
          with the required background checks, and only where the sale is
          lawful. You are responsible for complying with the laws of your state
          and locality. See our{" "}
          <a className="text-brand-700 underline" href="/state-restrictions">State Restrictions</a> for
          more information.
        </P>
      </Section>
    </LegalPage>
  );
}
