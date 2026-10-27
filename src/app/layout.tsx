import type { Metadata } from "next";
import Script from "next/script";
import { Merriweather, Public_Sans } from "next/font/google";
import SiteHeader from "@/components/chrome/SiteHeader";
import SiteFooter from "@/components/chrome/SiteFooter";
import SiteEventTracker from "@/components/SiteEventTracker";
import AttributionTracker from "@/components/AttributionTracker";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Homepage typography is the site standard: Merriweather for display, Public Sans for body.
const display = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
// One gtag.js load serves both GA4 and Google Ads; use whichever id exists.
const GTAG_LOADER_ID = GA_ID || GOOGLE_ADS_ID;

export const metadata: Metadata = {
  title: {
    default: "GovCon Giants - Learn Government Contracting",
    template: "%s | GovCon Giants",
  },
  description: "Free resources to help you win federal contracts. Join thousands of entrepreneurs breaking into the $700+ billion federal marketplace.",
  metadataBase: new URL("https://govcongiants.com"),
  openGraph: {
    siteName: "GovCon Giants",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        {GTAG_LOADER_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_LOADER_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GA_ID ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ""}
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `}
            </Script>
          </>
        )}
        <AttributionTracker />
        <SiteEventTracker />
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a1e1545b2d4c061bc44e305"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
