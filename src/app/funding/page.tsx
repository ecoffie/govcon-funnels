import type { Metadata } from "next";
import TrackedRedirect from "@/components/TrackedRedirect";
import { FUNDING_DEST } from "@/lib/funding-dest";

export { FUNDING_DEST };

export const metadata: Metadata = {
  title: "Encore Funding — Government Contractor Financing",
  robots: { index: false, follow: false },
};

export default function FundingRedirectPage() {
  return <TrackedRedirect to={FUNDING_DEST} slug="funding" />;
}
