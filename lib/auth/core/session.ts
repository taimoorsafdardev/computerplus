import { redisClient } from "@/lib/redis";
import { Cookies } from "@/types/cookies";
import { email, z } from "zod";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 1 * 7;
const COOKIE_SESSION_KEY = "session-id"

export const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  address: z.string(),
  city: z.string(),
  phone: z.string(),
  salt: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SessionType = z.infer<typeof sessionSchema>;

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null
  return getUserSessionById(sessionId);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "delete" | "get">
) {
  const sessionId = cookies.get(
    COOKIE_SESSION_KEY as string
  )?.value;
  if (sessionId == null) return null;
  await redisClient.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY as string);
}

function stringifyBigInt(obj: SessionType) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

export async function createUserSession(
  user: SessionType,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = await generateSessionId();
  const data = sessionSchema.parse(user)
  await redisClient.set(`session:${sessionId}`, stringifyBigInt(data), {
    ex: SESSION_EXPIRATION_SECONDS
  })
  setCookie(sessionId, cookies)
}

export async function updateUserSessionData(
  user: SessionType,
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(
    COOKIE_SESSION_KEY as string
  )?.value;
  if (sessionId == null) return null;
  const data = sessionSchema.parse(user)
  await redisClient.set(`session:${sessionId}`, stringifyBigInt(data), {
    ex: SESSION_EXPIRATION_SECONDS
  })
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY as string, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  const user = await redisClient.get(`session:${sessionId}`);
  return user || null
}

function generateSessionId(): Promise<string> {
  const array = new Uint8Array(512); // 256 bits
  crypto.getRandomValues(array);
  return Promise.resolve(
    Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}