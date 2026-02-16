import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Body font - highly readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Heading font - modern, friendly geometric
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// Mono font for code
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gojo | Find Your Perfect Home",
    template: "%s | Gojo",
  },
  description:
    "Making your first home journey simple and stress-free. Browse properties, save favorites, and connect with trusted agents.",
  keywords: [
    "real estate",
    "homes for sale",
    "first-time homebuyer",
    "property listings",
    "houses",
    "apartments",
  ],
  authors: [{ name: "Gojo" }],
  creator: "Gojo",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Gojo",
    title: "Gojo | Find Your Perfect Home",
    description:
      "Making your first home journey simple and stress-free. Browse properties, save favorites, and connect with trusted agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gojo | Find Your Perfect Home",
    description:
      "Making your first home journey simple and stress-free. Browse properties, save favorites, and connect with trusted agents.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#2D2824" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} font-body antialiased bg-[#F8F8F8]`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
