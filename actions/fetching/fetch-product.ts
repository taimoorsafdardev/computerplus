import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/types/response";

export default async function fetchProduct({ id }: { id: string }): Promise<ResponseType> {
    try {

        const product = await prisma.product.findUnique({
            where: { id },
        })

        return {
            message: "Product fetched successfully",
            success: true,
            data: product
        }
    } catch (error) {
        console.error(error)
        return {
            message: "Failed to fetch product",
            success: false,
            data: null
        }
    }
}