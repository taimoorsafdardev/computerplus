"use server";

import { generateSalt, hashPassword } from "@/lib/auth/core/passwordHasher";
import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";
import { userSchema } from "@/validation/user";
import { z } from "zod";

export const signUp = async (
    userData: z.infer<typeof userSchema>
): Promise<ResponseType> => {
    const { success, data, error } =
        userSchema.safeParse(userData);

    if (!success)
        return {
            message: "Validation error",
            success: false,
            error,
        };

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: data.email },
                { username: data.username },
            ]
        },
    });

    if (existingUser != null)
        return {
            message: "User already exists",
            success: false,
        };

    try {
        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password, salt);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                username: data.username,
                password: hashedPassword as string,
                salt,
                role: "user",
                address: data.address,
                city: data.city,
                phone: data.phone,
            },
        });

        if (!user)
            return {
                message: "Unable to create user",
                success: false,
            };

        return {
            message: "User created successfully",
            success: true,
        };
    } catch (error) {
        return {
            message: "Something went wrong",
            success: false,
            error: error as Error
        }
    }
};