import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalLoader from "@/components/GlobalLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nitish Singh - Full Stack Developer",
  description: "Portfolio website showcasing modern web development projects, real-time GitHub integration, and professional skills. Built with Next.js, TypeScript, and cutting-edge technologies.",
  keywords: ["Nitish Singh", "Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Nitish Singh", url: "https://github.com/thenitishmind" }],
  creator: "Nitish Singh",
  publisher: "Nitish Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nitish-singh.vercel.app',
    title: "Nitish Singh - Full Stack Developer",
    description: "Portfolio website showcasing modern web development projects with real-time GitHub integration",
    siteName: "Nitish Singh Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nitish Singh - Full Stack Developer",
    description: "Portfolio website showcasing modern web development projects with real-time GitHub integration",
    creator: '@thenitishmind',
  },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
      { url: '/nitish-favicon-new.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/icon',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GlobalLoader />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
