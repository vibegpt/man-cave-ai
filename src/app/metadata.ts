import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Man Cave AI Generator - Design Your Dream Basement, Garage, or Spare Room',
  description: 'Transform your basement, garage, or spare room into the ultimate man cave with AI. Generate custom designs, style ideas, and shoppable product lists. Free first design, no credit card required.',
  openGraph: {
    title: 'Man Cave AI Generator - Design Your Dream Basement, Garage, or Spare Room',
    description: 'Transform your basement, garage, or spare room into the ultimate man cave with AI. Generate custom designs, style ideas, and shoppable product lists.',
    url: 'https://mancaveai.com',
    siteName: 'ManCaveAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Man Cave AI Generator - Design Your Dream Basement, Garage, or Spare Room',
    description: 'Transform your basement, garage, or spare room into the ultimate man cave with AI.',
    images: ['/twitter-image.jpg'],
  },
};
