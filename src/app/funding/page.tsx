import type { Metadata } from "next";
import TrackedRedirect from "@/components/TrackedRedirect";

// Clickthrough is counted before forwarding. Update FUNDING_DEST in one place
// if the destination ever changes; /encore-funding imports it too.
// Repointed from the old gov.encore-funding.com partner page to Encore's new
// primary SEO site (encoregov.com); UTM attribution preserved.
export const FUNDING_DEST =
  "https://encoregov.com/government-contractor-financing?utm_source=Eric+Coffie&utm_medium=Referral";

export const metadata: Metadata = {
  title: "Encore Funding — Government Contractor Financing",
  robots: { index: false, follow: false },
};

export default function FundingRedirectPage() {
  return <TrackedRedirect to={FUNDING_DEST} slug="funding" />;
}
