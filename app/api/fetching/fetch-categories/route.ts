import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
        });

        return Response.json({
            success: true,
            data: categories,
        });
    } catch (err) {
        return Response.json(
            { success: false, message: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
