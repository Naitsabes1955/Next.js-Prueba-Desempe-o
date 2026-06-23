import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/services/auth";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", //only if the conection its secure  (methods https) proccess.env = 
  sameSite: "lax" as const,
  path: "/",
};

const accessCookieOptions = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 15, 
};

export async function POST() {
  try {
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "Refresh token not found" }, { status: 401 });
    }

    const token = refreshAccessToken(refreshToken);
    const response = NextResponse.json({ token }, { status: 200 });
    response.cookies.set("accessToken", token, accessCookieOptions);
    return response;
  } catch (error) {
    const msg = (error as Error).message || "Invalid Refresh Token";
    return NextResponse.json({ message: msg }, { status: 401 });
  }
}
