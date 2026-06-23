import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/services/auth";
import { addFavorite, removeFavorite, getFavoritesByUser } from "@/services/favorites";

const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) throw new Error("No authenticated");
  return verifyAccessToken(token);
};

export async function GET() {
  try {
    const payload = await getUser();
    const recipes = await getFavoritesByUser(payload.sub);
    return NextResponse.json({ recipes }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "No authenticated" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = await getUser();
    const { recipeId } = await req.json();
    await addFavorite(payload.sub, recipeId);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error saving favorite" }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  try {
    const payload = await getUser();
    const { recipeId } = await req.json();
    await removeFavorite(payload.sub, recipeId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting favorite" }, { status: 401 });
  }
}