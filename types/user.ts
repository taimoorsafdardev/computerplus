import { Order } from "./order";

export type User = {
    id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    city: string;
    address: string;
    phone: string;
    role?: string;
    salt?: string;
    orders: Order[];
    createdAt?: Date;
    updatedAt?: Date;
};