import type { Metadata } from 'next';
import './globals.css';
import SiteLayout from '@/layout/siteLayout';
import { ThemeProvider } from '@/layout/themeProvider';
import { Hanken_Grotesk } from 'next/font/google';


const hankenGrotesk = Hanken_Grotesk({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pranto Shohan',
  description: 'Portfolio website of Pranto Shohan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hankenGrotesk.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
