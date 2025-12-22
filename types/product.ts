import { OrderItem } from "./order";

export type Product = {
    id?: string;
    name: string;
    image: string;
    description: string;
    tag: "new arrival" | "out of stock" | "none";
    price: string;
    discount?: string;
    discountPrice?: string;
    category: string;
    orderItem: OrderItem[];
    createdAt?: Date;
    updatedAt?: Date;
};