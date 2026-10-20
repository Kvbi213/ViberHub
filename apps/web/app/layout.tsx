import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeHub — Local-First Agent Observability & Collaborative Coding',
  description: 'High-precision real-time observability platform for autonomous AI coding agents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Geist:wght@100..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8F9FB] text-[#1C1C1E] antialiased selection:bg-blue-100 selection:text-blue-900 relative min-h-screen">
        {/* Subtle radial ambient background glow & Apple specular gradient */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(255,255,255,0.95),rgba(244,245,248,0.7))]" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
