import { ReactNode } from 'react';
import SideMenuWrapper from '@/components/Navigation/SideMenuWrapper';
import { Providers } from './providers';

import '@/styles/globals.css';

export const metadata = {
  title: 'Membrant',
  description: 'Personal project management & self improvement',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
      <body>
        <Providers>
          <SideMenuWrapper />
          <main style={{ marginLeft: 60, transition: 'margin-left 0.3s ease' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
