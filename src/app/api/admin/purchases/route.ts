import { NextRequest, NextResponse } from "next/server";
import { buildPurchaseReport } from "@/lib/purchase-attribution";
import { extractPassword, isAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limitParam = Number(request.nextUrl.searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 2000) : 500;

  try {
    const report = await buildPurchaseReport(limit);
    return NextResponse.json(report, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to build purchase report";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
