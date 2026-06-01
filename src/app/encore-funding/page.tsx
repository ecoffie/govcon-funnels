import type { Metadata } from "next";
import TrackedRedirect from "@/components/TrackedRedirect";
import { FUNDING_DEST } from "../funding/page";

export const metadata: Metadata = {
  title: "Encore Funding — Government Contractor Financing",
  robots: { index: false, follow: false },
};

export default function EncoreFundingRedirectPage() {
  return <TrackedRedirect to={FUNDING_DEST} slug="encore-funding" />;
}
