import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Client Portfolio Service Manager',
  description: 'CPSM Next.js copy for Momentum Data Solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
