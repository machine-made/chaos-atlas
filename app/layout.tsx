// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/themes';
import MacOSCompatibility from '@/components/ui/MacOSCompatibility';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chaos Atlas',
  description: 'Interactive web application for exploring chaotic dynamical systems through strange attractors, bifurcation diagrams, and spatiotemporal patterns',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <MacOSCompatibility />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
