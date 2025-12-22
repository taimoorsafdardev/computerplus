import z from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().min(1, "Image URL is required"),
    description: z.string().min(1, "Description is required"),
    tag: z.string().min(1, "Tag is required"),
    price: z.string().min(1, "Price is required"),
    discount: z.string().optional(),
    category: z.string().min(1, "Category is required"),
})

export const updateProductSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    image: z.string().min(1, "Image URL is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    tag: z.string().min(1, "Tag is required").optional(),
    price: z.string().min(1, "Price is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    discount: z.string().optional(),
})