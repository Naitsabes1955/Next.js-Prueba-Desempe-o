import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/services/auth";
import { removeFavorite } from "@/services/favorites";

const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) throw new Error("No authenticated");
  return verifyAccessToken(token);
};

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getUser();
    const { id } = await params;
    await removeFavorite(payload.sub, id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting favorite" }, { status: 401 });
  }
}
