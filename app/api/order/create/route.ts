import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/nextjs/currentUser';
import { SessionType } from '@/lib/auth/core/session';

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser() as SessionType

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();

        const {
            items,
            total,
        }: {
            total: string;
            items: {
                productId: string;
                quantity: number;
                price: string;
            }[];
        } = body;

        if (!items || items.length === 0 || !total) {
            return NextResponse.json(
                { success: false, message: 'Invalid payload' },
                { status: 400 }
            );
        }

        // 🧾 Create order
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                status: 'pending',
                total,
                orderItems: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
        });
    } catch (error) {
        console.error('CREATE ORDER ERROR:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create order' },
            { status: 500 }
        );
    }
}
