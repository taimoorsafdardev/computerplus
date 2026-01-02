import { SessionType } from "@/lib/auth/core/session";
import { Product } from "./product";

export type OrderStatus = 'all' | 'pending' | 'cancelled' | 'delivered' | "returned";

export type Order = {
    id: string;
    userId: string;
    user: SessionType
    status: OrderStatus;
    deliveredBy?: string;
    total: string;
    orderItems: OrderItem[];
    deliveryDate?: Date;
    returnDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type OrderItem = {
    id?: string;

    quantity: number;

    productName: string
    productImage: string
    unitPrice: string
    discount: string
    discountPrice: string

    total: string

    productId: string;
    product: Product

    orderId: string;

    createdAt?: Date;
    updatedAt?: Date;
}