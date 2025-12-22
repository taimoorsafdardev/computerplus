import { SessionType } from "@/lib/auth/core/session";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const user = await getCurrentUser() as SessionType;

        if (!user) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const url = new URL(req.url);
        const skip = parseInt(url.searchParams.get("skip") || "0");
        const take = parseInt(url.searchParams.get("take") || "20");

        const userRole = user.role;
        const userId = user.id;

        let where: any = {};
        if (userRole === "user") {
            where.userId = userId;
        }

        const orders = await prisma.order.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                orderItems: {
                    include: {
                        product: true, // include product inside each orderItem
                    },
                },
            },
        });

        return Response.json({
            success: true,
            data: orders,
        });
    } catch (err) {
        console.error(err);
        return Response.json(
            { success: false, message: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
