"use server";

import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";
import { createProductSchema } from "@/validation/product";
import z from "zod";

export default async function updateProduct(id: string, data: z.infer<typeof createProductSchema>): Promise<ResponseType> {
    try {
        if (!id) {
            return { success: false, message: "Product ID is required" };
        }

        const parseResult = createProductSchema.safeParse(data);

        if (!parseResult.success) {
            return {
                success: false,
                message: "Validation error",
                error: parseResult.error,
            };
        }

        const parsedData = parseResult.data;

        let discountPrice: string | null = null;
        if (parsedData.discount) {
            const discountInPrice = Number(parsedData.price) * (Number(parsedData.discount) / 100);
            discountPrice = String(Number(parsedData.price) - discountInPrice);
        }

        const updated = await prisma.product.update({
            where: { id },
            data: {
                ...parsedData,
                discountPrice: discountPrice || null,
            },
        });

        if (!updated) {
            return { success: false, message: "Failed to update product" };
        }

        return {
            success: true,
            message: "Product updated successfully",
            data: updated,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error: error as Error,
        };
    }
}
