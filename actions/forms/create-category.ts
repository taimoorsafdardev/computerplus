"use server"

import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";
import { createCategorySchema } from "@/validation/category";
import z from "zod";

export default async function createCategory(data: z.infer<typeof createCategorySchema>): Promise<ResponseType> {
    try {

        const { data: parsedData, success, error } = createCategorySchema.safeParse(data);

        if (!success) {
            return {
                message: "Validation error",
                success: false,
                error,
            };
        }

        const category = await prisma.category.create({
            data: {
                ...parsedData,
            }
        })

        if (!category) {
            return {
                message: "Failed to create category",
                success: false,
            };
        }

        return {
            message: "Category created successfully",
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