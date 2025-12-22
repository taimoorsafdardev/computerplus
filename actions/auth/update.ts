"use server"

import { SettingsFormValues } from "@/components/home/Settings";
import { SessionType, updateUserSessionData } from "@/lib/auth/core/session";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";
import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";
import { cookies } from "next/headers";

export default async function updateUser(values: SettingsFormValues): Promise<ResponseType> {
    try {
        const user = await getCurrentUser() as SessionType

        const update = await prisma.user.update({
            where: { id: user.id },
            data: values
        })

        if (!update) {
            return {
                message: "Failed to update user",
                success: false
            }
        }

        await updateUserSessionData(update, await cookies())

        return {
            message: "User updated successfully",
            success: true
        }
    } catch (error) {
        console.error(error)
        return {
            message: "Error updating user",
            success: false
        }
    }
}