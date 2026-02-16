import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ManCaveAI - Free AI Man Cave Design Generator | Transform Any Room',
  description: 'Upload a photo of your basement, garage, or spare room and get instant AI-powered man cave design transformations. Free to use, no signup required. 30-second results.',
  metadataBase: new URL('https://mancaveai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ManCaveAI - Free AI Man Cave Design Generator',
    description: 'Transform your basement, garage, or spare room into the ultimate man cave with AI. Upload a photo, pick a style, get results in 30 seconds.',
    url: 'https://mancaveai.com',
    siteName: 'ManCaveAI',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ManCaveAI - Free AI Man Cave Design Generator',
    description: 'Transform any room into your dream man cave with AI. Upload a photo, get instant design results.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ManCaveAI',
  url: 'https://mancaveai.com',
  description: 'Free AI-powered man cave design tool that transforms photos of basements, garages, and spare rooms into custom man cave designs.',
}

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ManCaveAI',
  url: 'https://mancaveai.com',
  description: 'Free AI-powered man cave design tool. Upload a photo of your basement, garage, or spare room and get instant design transformations.',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'ManCaveAI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6412402740623801"
          crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
