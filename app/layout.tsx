import { CartProvider } from '@/context/cart-context';
import type { Metadata } from 'next';
import { Toaster } from "sonner"
import Header from '@/components/layout/header';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Computer Plus',
  description: 'Your one-stop shop for computer parts and peripherals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Toaster position="top-center" duration={1200} richColors />
        </CartProvider>
      </body>
    </html>
  );
}
