import { NextResponse } from "next/server";
import { runAllChecks } from "@/lib/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await runAllChecks();
  return NextResponse.json(report);
}
