"use server"

import { cookies } from "next/headers";
import { getUserFromSession } from "../core/session";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  return await getUserFromSession(await cookies());
});