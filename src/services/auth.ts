import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";
import User from "@/database/models/User";
import type { AuthForm, AuthResponse } from "@/types/auth";

const jwtSecret = process.env.JWT_SECRET ?? "";

if (!jwtSecret) {
  console.warn("JWT_SECRET is not set. Tokens will be signed with an insecure default for development.");
}

type JwtPayload = { sub: string; email: string; name: string };
type StoredUser = { id: string; name: string; email: string; password: string };
const inMemoryUsers = new Map<string, StoredUser>();
const useDb = !!process.env.MONGO_URI;

const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, jwtSecret || "dev_secret_change_me", { expiresIn: "15m" });

const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, jwtSecret || "dev_secret_change_me", { expiresIn: "30d" });

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtSecret || "dev_secret_change_me") as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtSecret || "dev_secret_change_me") as JwtPayload;
};

export const refreshAccessToken = (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  return signAccessToken(payload);
};

const generateTokens = (payload: JwtPayload) => ({
  accessToken: signAccessToken(payload),
  refreshToken: signRefreshToken(payload),
});

export const registerUser = async (data: AuthForm): Promise<AuthResponse & { refreshToken: string }> => {
  const email = data.email.toLowerCase().trim();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  if (useDb) {
    await connectDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("The email is alredy registered");
    }

    const user = await User.create({
      name: data.name?.trim() ?? "",
      email,
      password: hashedPassword,
    });

    const tokens = generateTokens({ sub: user._id.toString(), email: user.email, name: user.name });

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  if (inMemoryUsers.has(email)) {
    throw new Error("The email is alredy registered");
  }

  const id = String(Date.now()) + Math.random().toString(36).slice(2, 8);
  const user: StoredUser = { id, name: data.name?.trim() ?? "", email, password: hashedPassword };
  inMemoryUsers.set(email, user);

  const tokens = generateTokens({ sub: id, email, name: user.name });

  return {
    token: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: { id, name: user.name, email: user.email },
  };
};

export const loginUser = async (data: AuthForm): Promise<AuthResponse & { refreshToken: string }> => {
  const email = data.email.toLowerCase().trim();

  if (useDb) {
    await connectDb();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("invalid Credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error("invalid Credentials");
    }

    const tokens = generateTokens({ sub: user._id.toString(), email: user.email, name: user.name });

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    };
  }

  const user = inMemoryUsers.get(email);
  if (!user) {
    throw new Error("invalid Credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("invalid Credentials");
  }

  const tokens = generateTokens({ sub: user.id, email: user.email, name: user.name });
  return { token: tokens.accessToken, refreshToken: tokens.refreshToken, user: { id: user.id, name: user.name, email: user.email } };
};
