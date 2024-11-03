import Footer from "@/components/Footer"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Bhagyalakshmi Builders | Premier Real Estate Builders in Thrissur",
  description: "Bhagyalakshmi Builders - Leading real estate builders & construction company in Thrissur, Kerala. 5-star rated construction experts specializing in premium residential and commercial projects. Visit our office at Kolazhy or call 097466 10770.",
  keywords: [
    "Bhagyalakshmi Builders",
    "real estate Thrissur",
    "construction company Kerala",
    "builders Thrissur",
    "property developers Kerala",
    "Kolazhy construction",
    "residential projects Thrissur",
    "commercial construction Kerala"
  ],
  openGraph: {
    title: "Bhagyalakshmi Builders - Premier Construction Company in Thrissur",
    description: "Top-rated real estate builders specializing in premium residential and commercial projects in Thrissur, Kerala. Experience excellence in construction.",
    locale: "en_IN",
    type: "website",
    siteName: "Bhagyalakshmi Builders",
  },
  images: [
    {
      url: 'logo.png',
      width: 1200,
      height: 630,
      alt: 'Bhagyalakshmi Builders - Premier Real Estate Developers',
    }
  ],
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  alternates: {
    canonical: "https://www.bhagyalakshmibuilders.com",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`antialiased`}>
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
