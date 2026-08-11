import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Terms of Service | ${site.name}` },
  description: `The terms that apply to using the ${site.domain} website and to engaging ${site.name} for software development work.`,
  alternates: { canonical: '/terms' },
};

const updated = 'January 2026';

export default function TermsPage() {
  return (
    <section className="container-g py-16 md:py-20">
      <div className="max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-5 tracking-tight">Terms of Service</h1>
        <p className="text-sm text-slate-500 mt-4">Last updated: {updated}</p>

        <div className="prose max-w-none mt-10">
          <p>
            These terms cover your use of {site.domain}. Client engagements are governed by a
            separate signed agreement, and where the two differ, that agreement wins.
          </p>

          <h2>Using this website</h2>
          <p>
            You may browse this site and use the contact form for genuine business enquiries. Please
            do not attempt to gain unauthorised access to any part of it, submit automated or
            fraudulent enquiries, or use it in a way that disrupts other visitors.
          </p>

          <h2>Content and accuracy</h2>
          <p>
            All content on this site — text, design, code, illustrations, and logos — belongs to{' '}
            {site.name} unless stated otherwise. You may quote short extracts with attribution and a
            link, but please do not republish substantial portions without written permission.
          </p>
          <p>
            Articles and guidance here are general information, not professional advice for your
            specific situation. Pricing ranges and timelines are indicative; only a written quote we
            have issued to you is binding.
          </p>

          <h2>Quotes and engagements</h2>
          <p>
            A quote is an offer to perform a defined scope for a stated price, valid for 30 days
            unless we say otherwise. Work begins once you accept in writing and, where applicable,
            the first milestone payment clears. Anything outside the agreed scope is quoted
            separately and only proceeds once you approve it.
          </p>

          <h2>Intellectual property in delivered work</h2>
          <p>
            On receipt of full payment, all intellectual property in the deliverables created
            specifically for you transfers to you, including source code, design files, and
            documentation. We retain ownership of pre-existing tools, libraries, and internal
            components, and grant you a perpetual licence to use them as part of your deliverables.
            Open-source components remain under their own licences.
          </p>

          <h2>Confidentiality</h2>
          <p>
            We treat your business information as confidential and will sign your NDA or ours before
            we see anything sensitive. We may reference the engagement in general terms in our
            portfolio only where you have agreed; otherwise it stays anonymous.
          </p>

          <h2>Payment</h2>
          <p>
            Invoices are payable within 14 days of issue unless the engagement agreement says
            otherwise. We invoice in USD, GBP, EUR, AED, or INR. Bank charges and currency
            conversion costs are the payer&apos;s responsibility. We may pause work on materially
            overdue invoices after giving you written notice.
          </p>

          <h2>Warranties and liability</h2>
          <p>
            We warrant that our work will be performed with reasonable skill and care, and we fix
            defects in delivered work reported within 30 days of that milestone&apos;s acceptance at
            no charge. Beyond that, and to the extent the law permits, our total liability under any
            engagement is limited to the fees you have paid us for it, and we are not liable for
            indirect or consequential loss, including lost profits or lost data. Nothing here
            excludes liability that cannot lawfully be excluded.
          </p>

          <h2>Third-party services</h2>
          <p>
            Projects usually depend on services we do not control — hosting, payment gateways, model
            providers, app stores. Their availability, pricing, and policies are theirs to set, and
            we are not responsible for changes they make.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may end an engagement with 30 days written notice. You pay for work
            completed and committed up to that point, and we hand over everything produced so far
            along with a documented transition.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, and the courts of Pune, Maharashtra have
            exclusive jurisdiction — unless a signed engagement agreement specifies otherwise.
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
          <Link href="/privacy" className="text-brand-light hover:underline">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-brand-light hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
