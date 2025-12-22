import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const skip = parseInt(url.searchParams.get("skip") || "0");
        const take = parseInt(url.searchParams.get("take") || "12");
        const category = url.searchParams.get("category") || undefined;
        const search = url.searchParams.get("search") || undefined;

        const where: any = {};

        if (category) where.category = category;
        if (search) where.name = { contains: search, mode: "insensitive" };

        const products = await prisma.product.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        });

        return Response.json({
            success: true,
            data: products,
        });
    } catch (err) {
        console.error(err);
        return Response.json(
            { success: false, message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
