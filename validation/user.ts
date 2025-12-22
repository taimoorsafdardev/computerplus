import z from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long").trim(),
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().length(11, "Phone number must be 11 characters long").trim(),
    city: z.string(),
    address: z.string(),
    role: z.enum(["user", "admin"])
})

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})