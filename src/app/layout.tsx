import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PostHogProvider } from '@/lib/posthog-provider';
import { PageViewTracker } from '@/components/PageViewTracker';
import { Suspense } from 'react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HISL - Human Intelligence Systems Lab",
  description: "Sovereign AI tailored to you. Offline-first orchestration platform for construction, pharma, and regulated environments. Human + AI with soul.",
  keywords: ["AI", "construction", "pharma", "sovereign AI", "offline-first", "compliance", "sustainability"],
  authors: [{ name: "Michael Howard MCIOB" }],
  creator: "HISL",
  publisher: "HISL",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hisl.ai",
    title: "HISL - Human Intelligence Systems Lab",
    description: "Sovereign AI tailored to you. Offline-first orchestration platform for construction, pharma, and regulated environments.",
    siteName: "HISL",
  },
  twitter: {
    card: "summary_large_image",
    title: "HISL - Human Intelligence Systems Lab",
    description: "Sovereign AI tailored to you. Offline-first orchestration platform for construction, pharma, and regulated environments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
