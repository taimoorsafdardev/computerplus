import z from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export const updateCategorySchema = z.object({
    id: z.string().min(1, "Category ID is required"),
    name: z.string().min(1, "Name is required").optional(),
})