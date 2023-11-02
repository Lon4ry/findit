import React from 'react';
import './globals.css';
import { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import CopyrightComponent from '../client/components/copyright.component';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: 'FindIT',
  description: '',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: '300x300',
      url: '/icons/icon.svg',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/svg+xml',
      sizes: '300x300',
      url: '/icons/icon.svg',
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${ibmPlexMono.variable}`}>
      <body>
        {children}
        <CopyrightComponent />
      </body>
    </html>
  );
}
