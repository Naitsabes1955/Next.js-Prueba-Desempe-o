import { NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 0,
};

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set("accessToken", "", COOKIE_OPTIONS);
  response.cookies.set("refreshToken", "", COOKIE_OPTIONS);
  return response;
}
