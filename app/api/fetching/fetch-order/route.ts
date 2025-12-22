import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";
import { SessionType } from "@/lib/auth/core/session";

export async function GET(req: Request) {
    try {
        const user = await getCurrentUser() as SessionType

        if (!user) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return Response.json({ success: false, message: "Order ID required" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                user: true, // include user details
                orderItems: {
                    include: {
                        product: true, // include product info for each item
                    },
                },
            },
        });

        if (!order) {
            return Response.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        // Only allow regular users to see their own orders
        if (user.role === "user" && order.userId !== user.id) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        return Response.json({ success: true, data: order });
    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Failed to fetch order" }, { status: 500 });
    }
}
