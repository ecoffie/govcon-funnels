import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import AttributionTracker from "@/components/AttributionTracker";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "GovCon Giants - Learn Government Contracting",
    template: "%s | GovCon Giants",
  },
  description: "Free resources to help you win federal contracts. Join thousands of entrepreneurs breaking into the $700+ billion federal marketplace.",
  metadataBase: new URL("https://www.govcongiants.com"),
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
      <body className={`${inter.variable} antialiased`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <AttributionTracker />
        <JsonLd data={organizationJsonLd()} />
        <SiteNav />
        <ExitIntentPopup />
        {children}
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
