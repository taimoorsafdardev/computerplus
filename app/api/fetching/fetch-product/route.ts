import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const product = await prisma.product.findUnique({
            where: { id: id as string },
        });

        return Response.json({
            success: true,
            data: product,
        });
    } catch (err) {
        return Response.json(
            { success: false, message: "Failed to fetch product" },
            { status: 500 }
        );
    }
}