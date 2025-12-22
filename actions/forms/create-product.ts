"use server"

import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";
import { createProductSchema } from "@/validation/product";
import z from "zod";

export default async function createProduct(data: z.infer<typeof createProductSchema>): Promise<ResponseType> {
    try {

        const { data: parsedData, success, error } = createProductSchema.safeParse(data);

        if (!success) {
            return {
                message: "Validation error",
                success: false,
                error,
            };
        }

        let discountPrice: string | null = null;

        if (parsedData.discount) {
            const discountInPrice = Number(parsedData.price) * (Number(parsedData.discount) / 100);
            discountPrice = String(Number(parsedData.price) - discountInPrice)
        }

        const product = await prisma.product.create({
            data: {
                ...parsedData,
                discountPrice: discountPrice || null,
            }
        })

        if (!product) {
            return {
                message: "Failed to create product",
                success: false,
            };
        }

        return {
            message: "Product created successfully",
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