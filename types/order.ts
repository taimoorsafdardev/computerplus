import { SessionType } from "@/lib/auth/core/session";
import { Product } from "./product";

export type OrderStatus = 'pending' | 'cancelled' | 'delivered' | "returned";

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
    name: string
    image: string
    quantity: number;
    price: string
    productId: string;
    product: Product
    orderId: string;
    createdAt?: Date;
    updatedAt?: Date;
}