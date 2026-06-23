import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken, refreshAccessToken } from "@/services/auth";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", //only if the conection its secure  (methods https) proccess.env = true
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 15,
};

export async function GET() {
  try {
    const cookiesStore = await cookies();
    let accessToken = cookiesStore.get("accessToken")?.value;
    let payload;

    if (accessToken) {
      try {
        payload = verifyAccessToken(accessToken);
      } catch {
        accessToken = undefined;
      }
    }

    if (!accessToken) {
      const refreshToken = cookiesStore.get("refreshToken")?.value;
      if (!refreshToken) {
        return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
      }

      accessToken = refreshAccessToken(refreshToken);
      payload = verifyAccessToken(accessToken);

      const response = NextResponse.json(
        { token: accessToken, user: { id: payload.sub, name: payload.name, email: payload.email } },
        { status: 200 }
      );
      response.cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
      return response;
    }

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    return NextResponse.json(
      { token: accessToken, user: { id: payload.sub, name: payload.name, email: payload.email } },
      { status: 200 }
    );
  } catch (error) {
    const msg = (error as Error).message || "Invalid Token";
    return NextResponse.json({ message: msg }, { status: 401 });
  }
}
