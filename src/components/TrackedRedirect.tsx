"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * A tracking interstitial for redirect links (e.g. /funding, /encore-funding).
 *
 * A bare vercel.json redirect fires before any page renders, so the click is
 * never counted. This renders a near-instant page instead: it fires a Vercel
 * Analytics custom event + a GA4 event for the clickthrough, then forwards the
 * visitor to `to` (UTM tags preserved). Net effect: every clickthrough is
 * counted exactly, with no visible delay.
 */
export default function TrackedRedirect({
  to,
  slug,
}: {
  to: string;
  slug: string;
}) {
  useEffect(() => {
    // Vercel Web Analytics custom event
    try {
      track("funding_redirect", { slug });
    } catch {
      /* analytics blocked — still redirect */
    }
    // GA4 event (if the gtag loader is present)
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "funding_redirect", {
        event_category: "redirect",
        event_label: slug,
        destination: to,
      });
    }
    // Forward. Small timeout lets the beacons flush; falls through instantly
    // for users with analytics blocked.
    const t = window.setTimeout(() => {
      window.location.replace(to);
    }, 120);
    return () => window.clearTimeout(t);
  }, [to, slug]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, system-ui, sans-serif",
        color: "#475569",
      }}
    >
      <p>
        Taking you to Encore Funding&hellip;{" "}
        <a href={to} style={{ color: "#7c3aed", fontWeight: 600 }}>
          Click here
        </a>{" "}
        if you&apos;re not redirected.
      </p>
    </main>
  );
}
