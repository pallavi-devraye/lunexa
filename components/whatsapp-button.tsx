import { MessageCircle } from 'lucide-react';
import { site, showWhatsApp, whatsappLink } from '@/lib/site';

// Floating chat launcher, styled in the brand gradient rather than WhatsApp
// green. Against this dark canvas the green reads as a bolted-on third-party
// widget, and to a Western B2B buyer a green bubble is a small-business tell.
// The gradient, ring and shadow mirror .btn-primary so it looks native.
export function WhatsAppButton() {
  if (!showWhatsApp) return null;

  return (
    <a
      href={whatsappLink(`Hi ${site.name}, I'd like a quote for a project.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full
                 bg-gradient-to-b from-brand-light via-brand to-brand-dark text-white
                 ring-1 ring-inset ring-white/20 shadow-glow-sm hover:shadow-glow
                 transition hover:scale-105"
    >
      <MessageCircle size={25} />
    </a>
  );
}
