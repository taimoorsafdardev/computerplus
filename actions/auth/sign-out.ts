"use server";

import { removeUserFromSession } from "@/lib/auth/core/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    await removeUserFromSession(await cookies());
    redirect("/");
}