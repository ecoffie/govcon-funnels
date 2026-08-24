import type { Metadata } from "next";
import TrackedRedirect from "@/components/TrackedRedirect";

// Clickthrough is counted before forwarding. Update FUNDING_DEST in one place
// if the destination ever changes; /encore-funding imports it too.
//
// ⚠️ VERIFY THE DESTINATION RETURNS 200 BEFORE CHANGING THIS. It has broken once
// already: in June 2026 we repointed from gov.encore-funding.com to Encore's then-new
// SEO site, encoregov.com/government-contractor-financing. By 2026-08-24 Encore had
// reversed that migration — encoregov.com now 301s straight back to
// gov.encore-funding.com, and /government-contractor-financing does NOT exist there,
// so every referral we sent landed on a 404. A partner's redirect is not ours to
// control; the only safe destination is one we have curled.
//
// Now pointed at Encore's own GovCon Giants partner page — purpose-built for our
// referrals (title: "GovCon Giants Partner: Government Contractor Funding", 17
// mentions of the brand on the page), on the host they actually serve. Verified
// 2026-08-24: HTTP 200, and the UTM query string passes through intact.
export const FUNDING_DEST =
  "https://gov.encore-funding.com/govcon-giants-partner-government-contractor-funding/?utm_source=Eric+Coffie&utm_medium=Referral";

export const metadata: Metadata = {
  title: "Encore Funding — Government Contractor Financing",
  robots: { index: false, follow: false },
};

export default function FundingRedirectPage() {
  return <TrackedRedirect to={FUNDING_DEST} slug="funding" />;
}
