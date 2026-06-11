import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "admin@zaimahtech.ae";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "ZaimahAdmin@2024";

export async function POST(request: NextRequest) {
  const body = await request.json() as { email?: string; password?: string };

  if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("zaimah-admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true });
}
