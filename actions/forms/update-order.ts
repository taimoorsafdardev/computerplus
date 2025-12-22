"use server";

import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";
import { updateOrderSchema } from "@/validation/order";
import z from "zod";

export default async function updateOrder(id: string, data: z.infer<typeof updateOrderSchema>): Promise<ResponseType> {
    try {
        if (!id) {
            return { success: false, message: "Order ID is required" };
        }

        const parseResult = updateOrderSchema.safeParse(data);

        if (!parseResult.success) {
            return {
                success: false,
                message: "Validation error",
                error: parseResult.error,
            };
        }

        const parsedData = parseResult.data;

        const updated = await prisma.order.update({
            where: { id },
            data: parsedData
        });

        if (!updated) {
            return { success: false, message: "Failed to update order" };
        }

        return {
            success: true,
            message: "Order updated successfully",
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
