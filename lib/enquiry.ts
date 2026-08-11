// Helpers for rendering stored enquiries in the admin dashboard.

// The contact route folds "Service" and "Budget" into the message body so a
// single column holds everything. Pull them back out to show as badges.
export function parseEnquiry(message: string) {
  const msg = message || '';
  const serviceMatch = msg.match(/Service:\s*(.+)/);
  const budgetMatch = msg.match(/Budget:\s*(.+)/);
  const timelineMatch = msg.match(/Timeline:\s*(.+)/);
  const idx = msg.indexOf('\n\nService:');
  const body = (idx >= 0 ? msg.slice(0, idx) : msg).trim();
  return {
    service: serviceMatch ? serviceMatch[1].trim() : '',
    budget: budgetMatch ? budgetMatch[1].trim() : '',
    timeline: timelineMatch ? timelineMatch[1].trim() : '',
    body,
  };
}

export function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}
