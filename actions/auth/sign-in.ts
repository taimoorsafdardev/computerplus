"use server";

import { ResponseType } from "@/types/response";
import { loginSchema } from "@/validation/user";
import { cookies } from "next/headers";
import { z } from "zod";
import { comparePassword } from "@/lib/auth/core/passwordHasher";
import { createUserSession } from "@/lib/auth/core/session";
import { prisma } from "@/lib/prisma";

export async function signIn(
    userData: z.infer<typeof loginSchema>
): Promise<ResponseType> {
    try {

        const { success, data, error } = loginSchema.safeParse(userData);

        if (!success)
            return {
                message: "Validation error",
                success: false,
                error
            };

        const user = await prisma.user.findFirst({
            where: {
                username: data.username,
            },
        });

        if (user == null)
            return {
                message: "No account found with this username",
                success: false,
            };

        const isCorrectPassword = await comparePassword({
            hashedPassword: user.password,
            password: data.password,
            salt: user.salt,
        });

        if (!isCorrectPassword) {
            return {
                message: "Invalid password provided",
                success: false,
            };
        }

        await createUserSession(user, await cookies());

        return {
            message: "Account Logged in",
            success: true,
        };
    } catch (error) {
        return {
            message: "Something went wrong",
            success: false,
            error: error as Error
        }
    }
}