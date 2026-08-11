import type { Metadata } from 'next';

// The login page is a client component and cannot export metadata itself.
export const metadata: Metadata = {
  title: { absolute: 'Admin sign in' },
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
