'use client';

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import { Order } from "@/types/order";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { format } from "@/lib/format";
import { toast } from "sonner";
import { SessionType } from "@/lib/auth/core/session";
import Link from "next/link";

type Props = {
    user: SessionType
    id: string
}

export default function OrderDetails({ user, id }: Props) {
    const orderId = id;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState<Date>()
    const [returnDate, setReturnDate] = useState<Date>()
    const [status, setStatus] = useState(order?.status || "pending");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/fetching/fetch-order?id=${orderId}`);
                const json = await res.json();

                if (json.success) {
                    setOrder(json.data);
                } else {
                    setOrder(null);
                }
            } catch (err) {
                console.error(err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId]);

    useEffect(() => {
        if (order) {
            setStatus(order.status); // <-- update state when order changes
            setDeliveryDate(order.deliveryDate ? new Date(order.deliveryDate) : undefined);
            setReturnDate(order.returnDate ? new Date(order.returnDate) : undefined);
        }
    }, [order]);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!order) return;

        try {
            setFormLoading(true);

            const formData = new FormData(e.currentTarget);
            const status = formData.get("status") as string;
            const deliveredBy = formData.get("deliveredBy") as string;

            // Prepare payload
            const payload = {
                status,
                deliveredBy,
                deliveryDate: deliveryDate ? deliveryDate.toISOString() : null,
                returnDate: returnDate ? returnDate.toISOString() : null,
            };

            const res = await fetch(`/api/order/update?id=${order.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                setOrder(result.data); // update local state
                toast.success("Updated Info")
            } else {
                toast.error(result.message || "Failed to update order");
            }

        } catch (error) {
            console.error(error);
        } finally {
            setFormLoading(false);
        }
    }


    if (loading) return <div className="w-full flex justify-center py-10"><Loader /></div>;
    if (!order) return <div className="text-center py-10">Order not found</div>;

    return (
        <main className="container mx-auto mt-10 mb-20 px-8">
            <h1 className="text-2xl font-bold mb-6">Order Details</h1>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-semibold">User Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="capitalize"><strong>Name:</strong> {order.user?.name}</p>
                        <p><strong>Email:</strong> {order.user?.email}</p>
                        <p><strong>Phone:</strong> {order.user?.phone}</p>
                        <p><strong>Address:</strong> {order.user?.address}, {order.user?.city}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-semibold">Order Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>OID:</strong> {order.id}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Placed Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }) : "-"}</p>
                        <p><strong>Delivered By:</strong> {order.deliveredBy || "-"}</p>
                        <p><strong>Delivery Date:</strong> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString("en", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }) : "-"}</p>
                        <p><strong>Return Date:</strong> {order.returnDate ? new Date(order.returnDate).toLocaleDateString("en", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }) : "-"}</p>
                        <p><strong>Total Amount:</strong> Rs.{Number(order.total).toLocaleString()}</p>
                    </CardContent>
                    {user?.role === "admin" && (
                        <CardFooter className="w-full flex items-center justify-end">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"outline"}>
                                        Edit Info
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Order Details</DialogTitle>
                                        <DialogDescription>
                                            You can update the order status, delivery person, and dates here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form className="mt-2" onSubmit={onSubmit}>
                                        <div className="space-y-2">
                                            <Label>Status</Label>
                                            <Select value={status} onValueChange={(value) => setStatus(value as "pending" | "cancelled" | "delivered" | "returned")} name="status">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="pending">pending</SelectItem>
                                                        <SelectItem value="cancelled">cancelled</SelectItem>
                                                        <SelectItem value="delivered">delivered</SelectItem>
                                                        <SelectItem value="returned">returned</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            <Label>Delivered By</Label>
                                            <Input
                                                name="deliveredBy"
                                                placeholder="delivery boy name"
                                                autoComplete="off"
                                                type="text"
                                                defaultValue={order.deliveredBy || ""}
                                            />
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            <Label>Delivery Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        data-empty={!deliveryDate}
                                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {deliveryDate ? format(deliveryDate) : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={deliveryDate} onSelect={setDeliveryDate} />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="space-y-2 mt-4">
                                            <Label>Return Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        data-empty={!returnDate}
                                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {returnDate ? format(returnDate) : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <Button className="w-full mt-6" disabled={formLoading} type="submit">
                                            {formLoading ? <Loader /> : "Save Changes"}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    )}
                </Card>
            </section>

            {/* Order Items */}
            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {order.orderItems?.map((item) => (
                        <div key={item.id} className="relative hover:bg-neutral-100 transition-all rounded-2xl p-4 border shadow-sm">

                            {/* Product Image */}
                            {item.productImage ? (
                                <Image
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="rounded-xl transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    width={600}
                                    height={600}
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                                    No Image
                                </div>
                            )}

                            {/* Product Info */}
                            <div className="flex flex-col gap-1 mt-4">
                                <Link href={`/product/${item.productId}`} prefetch={true} className="font-semibold hover:underline text-sm text-gray-900">
                                    {item.productName.length > 50 ? item.productName.slice(0, 50) + "..." : item.product.name}
                                </Link>

                                <p className="font-semibold text-accent text-lg">
                                    Rs.{item.discount ? Number(item.discountPrice).toLocaleString() : Number(item.unitPrice).toLocaleString()}
                                </p>

                                <p className="text-gray-500 text-sm">Unit Total Price: {item.quantity} x {item.discount ? Number(item.discountPrice).toLocaleString() : Number(item.unitPrice).toLocaleString()} = Rs.{item.discount ? (Number(item.discountPrice) * item.quantity).toLocaleString() : (Number(item.unitPrice) * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
