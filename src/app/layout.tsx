import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Discover Our Products | mettā muse",
  description:
    "Explore mettā muse's curated collection of handcrafted artisan products, premium apparel, and luxury accessories. Discover timeless craftsmanship and sustainable design.",
  keywords: [
    "mettā muse",
    "artisan products",
    "handcrafted apparel",
    "sustainable fashion",
    "luxury goods",
    "ethical accessories",
  ],
  authors: [{ name: "mettā muse" }],
  creator: "mettā muse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mettamuse.com",
    title: "Discover Our Products | mettā muse",
    description:
      "Explore mettā muse's curated collection of handcrafted artisan products, premium apparel, and luxury accessories.",
    siteName: "mettā muse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Our Products | mettā muse",
    description:
      "Explore mettā muse's curated collection of handcrafted artisan products, premium apparel, and luxury accessories.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mettamuse.com/#organization",
        name: "mettā muse",
        url: "https://mettamuse.com",
        logo: "https://mettamuse.com/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+44 221 133 5360",
          contactType: "Customer Support",
          email: "customercare@mettamuse.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://mettamuse.com/#website",
        url: "https://mettamuse.com",
        name: "mettā muse",
        description:
          "Discover handcrafted artisan fashion, accessories, and curated lifestyle essentials.",
        publisher: {
          "@id": "https://mettamuse.com/#organization",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": "https://mettamuse.com/products#webpage",
        url: "https://mettamuse.com",
        name: "Discover Our Products | mettā muse",
        isPartOf: {
          "@id": "https://mettamuse.com/#website",
        },
        description:
          "Explore mettā muse's curated collection of handcrafted artisan products, premium apparel, and luxury accessories.",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
