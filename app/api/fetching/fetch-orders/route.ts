import { SessionType } from "@/lib/auth/core/session";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/types/order";

export async function GET(req: Request) {
    try {
        const user = (await getCurrentUser()) as SessionType;

        if (!user) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const url = new URL(req.url);

        const skip = Number(url.searchParams.get("skip") ?? 0);
        const take = Number(url.searchParams.get("take") ?? 20);
        const status = url.searchParams.get("status") as OrderStatus | null;
        const hours = url.searchParams.get("hours");

        const where: { userId?: string, status?: OrderStatus, createdAt?: { gte: Date } } = {};

        // 🔐 Role-based access
        if (user.role === "user") {
            where.userId = user.id;
        }

        // 🎯 Status filter
        if (status) {
            where.status = status;
        }

        // ⏱️ Time filter (hours)
        if (hours) {
            const hoursInt = Number(hours);
            const fromDate = new Date(Date.now() - hoursInt * 60 * 60 * 1000);

            where.createdAt = {
                gte: fromDate,
            };
        }

        const orders = await prisma.order.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                orderItems: {
                    include: {
                        product: true,
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
