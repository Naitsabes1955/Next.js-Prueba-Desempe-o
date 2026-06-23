import { NextResponse } from "next/server";
import { registerUser } from "@/services/auth";
import type { AuthForm } from "@/types/auth";
import { sendWelcomeEmail } from "@/services/mail";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const accessCookieOptions = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 15, // 15 minutes
};

const refreshCookieOptions = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AuthForm;
    const result = await registerUser(payload);

    await sendWelcomeEmail(result.user.email, result.user.name);

    const response = NextResponse.json(
      { token: result.token, user: result.user },
      { status: 201 }
    );

    response.cookies.set("accessToken", result.token, accessCookieOptions);
    response.cookies.set("refreshToken", result.refreshToken, refreshCookieOptions);
    return response;
  } catch (error) {
    const msg = (error as Error).message || "Error In server";
    const status = msg.includes("invalid") || msg.includes("password") || msg.includes("credentials") || msg.includes("registrad") ? 400 : 500;
    return NextResponse.json({ message: msg }, { status });
  }
}
