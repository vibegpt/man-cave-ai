import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Man Cave AI Generator - Design Your Dream Basement, Garage, or Spare Room",
  description: "Transform your basement, garage, or spare room into the ultimate man cave with AI. Generate custom designs, style ideas, and shoppable product lists. Free first design, no credit card required.",
  openGraph: {
    title: "Man Cave AI Generator - Design Your Dream Basement, Garage, or Spare Room",
    description: "Transform your basement, garage, or spare room into the ultimate man cave with AI. Generate custom designs, style ideas, and shoppable product lists.",
    url: "https://mancaveai.com",
    siteName: "ManCaveAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Man Cave AI Generator - Design Your Dream Basement, Garage, or Spare Room",
    description: "Transform your basement, garage, or spare room into the ultimate man cave with AI.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Man Cave AI Generator",
              "operatingSystem": "Web",
              "applicationCategory": "DesignApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free first design, no credit card required."
              },
              "url": "https://mancaveai.com",
              "description": "AI-powered tool to design and visualize custom man caves for basements, garages, and spare rooms."
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
