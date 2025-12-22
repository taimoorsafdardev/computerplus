import z from "zod";

export const updateOrderSchema = z.object({
    status: z.string().optional(),
    deliveryDate: z.string().nullable().optional(),
    returnDate: z.string().nullable().optional(),
    deliveredBy: z.string().optional(),
});