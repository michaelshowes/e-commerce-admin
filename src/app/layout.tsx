import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import ModalProvider from '@providers/ModalProvider';
import ToastProvider from '@providers/ToastProvider';

import '@/globals.scss';
import { ThemeProvider } from '@providers/ThemeProvider';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Admin',
  description: 'Admin'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={font.className}>
          <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem
          >
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
