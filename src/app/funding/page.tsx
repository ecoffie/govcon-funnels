import type { Metadata } from "next";
import TrackedRedirect from "@/components/TrackedRedirect";

// Same destination + UTM tags as the previous vercel.json redirect — only now
// the clickthrough is counted before forwarding. Update FUNDING_DEST in one
// place if the destination ever changes.
export const FUNDING_DEST =
  "https://gov.encore-funding.com/govcon-giants-partner-government-contractor-funding/?utm_source=Eric+Coffie&utm_medium=Referral";

export const metadata: Metadata = {
  title: "Encore Funding — Government Contractor Financing",
  robots: { index: false, follow: false },
};

export default function FundingRedirectPage() {
  return <TrackedRedirect to={FUNDING_DEST} slug="funding" />;
}
