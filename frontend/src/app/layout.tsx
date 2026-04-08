import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CartProvider } from '@/hooks/useCart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scentcepts | Luxury Perfume Decants & Full Bottles',
  description: 'Discover your signature scent with our curated collection of luxury designer and niche fragrances. Shipping across Kenya.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
