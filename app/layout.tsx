import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WealthCalc - Free Indian Investment Calculators | SIP, PPF, FD, EMI',
    template: '%s | WealthCalc'
  },
  description: 'India\'s most comprehensive free investment calculator suite. Calculate SIP, Lumpsum, PPF, FD, RD, EMI, CAGR & Compound Interest with real formulas. Plan your financial goals smartly.',
  keywords: [
    'SIP calculator',
    'investment calculator India',
    'PPF calculator',
    'FD calculator',
    'EMI calculator',
    'mutual fund calculator',
    'CAGR calculator',
    'compound interest calculator',
    'financial planning India',
    'wealth calculator',
    'RD calculator',
    'lumpsum calculator'
  ],
  authors: [{ name: 'WealthCalc' }],
  creator: 'WealthCalc',
  publisher: 'WealthCalc',
  metadataBase: new URL('https://wealthcalc.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://wealthcalc.in',
    siteName: 'WealthCalc',
    title: 'WealthCalc - Free Indian Investment Calculators',
    description: 'Plan smarter, invest better with India\'s most comprehensive free investment calculator suite. 8 calculators, 100% free, real formulas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WealthCalc - Indian Investment Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WealthCalc - Free Indian Investment Calculators',
    description: 'Plan smarter, invest better with India\'s most comprehensive free investment calculator suite.',
    images: ['/og-image.png'],
    creator: '@wealthcalc',
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'WealthCalc',
              description: 'India\'s most comprehensive free investment calculator suite',
              url: 'https://wealthcalc.in',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
              },
              featureList: [
                'SIP Calculator',
                'Lumpsum Calculator',
                'PPF Calculator',
                'FD Calculator',
                'RD Calculator',
                'EMI Calculator',
                'CAGR Calculator',
                'Compound Interest Calculator',
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
