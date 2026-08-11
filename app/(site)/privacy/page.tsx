import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Privacy Policy | ${site.name}` },
  description: `How ${site.name} collects, uses, stores, and protects personal information submitted through this website.`,
  alternates: { canonical: '/privacy' },
};

const updated = 'January 2026';

export default function PrivacyPage() {
  return (
    <section className="container-g py-16 md:py-20">
      <div className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-5 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mt-4">Last updated: {updated}</p>

        <div className="prose max-w-none mt-10">
          <p>
            This policy explains what personal information {site.name} (&ldquo;we&rdquo;) collects
            through {site.domain}, why we collect it, and what we do with it. We have tried to write
            it in plain language rather than legal boilerplate.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>Information you give us.</strong> When you submit the contact form we collect
            your name, email address, and the details of your enquiry. Company, country, phone
            number, service, budget, and timeline are optional — the form works without them.
          </p>
          <p>
            <strong>Information collected automatically.</strong> Our hosting provider records
            standard server logs, including IP address, browser type, and the pages requested. If
            analytics is enabled, it is loaded only for visitors outside the UK, EU/EEA, and
            Switzerland, where prior consent would be required before setting non-essential cookies.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and prepare a quote</li>
            <li>To provide services under an agreement with you</li>
            <li>To keep records required for accounting and tax</li>
            <li>To keep the website secure and working correctly</li>
          </ul>
          <p>
            We do not sell your data, rent it, or add you to a marketing list you did not ask to
            join. We do not use it to train any machine learning model.
          </p>

          <h2>Legal basis (UK/EU visitors)</h2>
          <p>
            Where the UK GDPR or EU GDPR applies, we process contact-form data on the basis of
            <em> legitimate interests</em> (responding to a business enquiry you initiated) or{' '}
            <em>steps prior to entering a contract</em>. Security logging rests on legitimate
            interests in protecting the service.
          </p>

          <h2>Who we share it with</h2>
          <p>
            Only the service providers needed to run this website and reply to you: our hosting
            provider, our database provider, and our email provider. Each processes data on our
            instructions under its own agreement. We also disclose information where the law
            requires it.
          </p>

          <h2>Where it is stored</h2>
          <p>
            We are based in India and our providers may store data in other countries. Where
            personal data is transferred out of the UK or EEA, the transfer relies on the standard
            contractual clauses or another approved safeguard offered by that provider.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries are kept for up to 24 months unless they become a client relationship, in
            which case project records are kept for as long as our agreement and applicable
            accounting law require. You can ask us to delete an enquiry sooner.
          </p>

          <h2>Cookies</h2>
          <p>
            This website sets no advertising or tracking cookies. Where analytics runs, it is
            suppressed entirely for visitors in the UK, EU/EEA, and Switzerland. The admin area sets
            a single session cookie, which is strictly necessary and only ever issued to a signed-in
            administrator.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to give you a copy of your data, correct it, delete it, or restrict how
            we use it, and you can object to processing based on legitimate interests. Email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days. If
            you are in the UK or EU and are not satisfied with our response, you may complain to
            your national data protection authority.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over HTTPS, enquiry data is stored in an access-controlled database,
            and administrative access is restricted and signed. No system is perfectly secure, so we
            ask you not to send passwords, card numbers, or other sensitive credentials through the
            contact form.
          </p>

          <h2>Children</h2>
          <p>
            This is a business website and is not directed at children. We do not knowingly collect
            information from anyone under 16.
          </p>

          <h2>Changes</h2>
          <p>
            If we change this policy we will update the date at the top of this page. Material
            changes will be highlighted here.
          </p>

          <h2>Contact</h2>
          <p>
            {site.name}
            <br />
            {site.address.full}
            <br />
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            Phone: <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-brand-light hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-brand-light hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
