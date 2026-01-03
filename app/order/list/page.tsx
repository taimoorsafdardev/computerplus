'use client';

import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/Loader";
import { Order, OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "@/lib/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE = 20;

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [timeHours, setTimeHours] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });

  const statusColorMap: Record<OrderStatus, string> = {
    all: "",
    pending: "text-yellow-500 bg-yellow-100",
    cancelled: "text-red-500 bg-red-100",
    delivered: "text-green-500 bg-green-100",
    returned: "text-blue-500 bg-blue-100",
  };

  const fetchOrders = useCallback(
    async (pageToFetch: number) => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.set("skip", (pageToFetch * PAGE_SIZE).toString());
        params.set("take", PAGE_SIZE.toString());

        if (status !== "all") {
          params.set("status", status);
        }

        if (timeHours !== "all") {
          params.set("hours", String(timeHours));
        }

        const res = await fetch(`/api/fetching/fetch-orders?${params.toString()}`);
        const json = await res.json();

        if (json.success) {
          setOrders(prev =>
            pageToFetch === 0 ? json.data : [...prev, ...json.data]
          );

          if (json.data.length < PAGE_SIZE) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [status, timeHours]
  );

  useEffect(() => {
    fetchOrders(page);
  }, [page, fetchOrders]);

  useEffect(() => {
    setOrders([]);
    setPage(0);
    setHasMore(true);
  }, [status, timeHours]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <main className="container mx-auto mt-10 px-8">
      <section>

        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold">Order List</h1>
            <p>Here you can view all your orders that you have placed.</p>
          </div>
          <div className="flex gap-4">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as OrderStatus | "all")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={timeHours === "all" ? "all" : String(timeHours)}
              onValueChange={(value) =>
                setTimeHours(value === "all" ? "all" : Number(value))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="1">Last hour</SelectItem>
                <SelectItem value="24">Last 24 hours</SelectItem>
                <SelectItem value="168">Last week</SelectItem>
                <SelectItem value="672">Last month</SelectItem>
                <SelectItem value="2016">Last 3 months</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>

        <ScrollArea className="mt-4 mb-20">
          <Table className="min-w-full">
            <TableCaption>A list of your recent orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Placed</TableHead>
                <TableHead>OID</TableHead>
                <TableHead className="w-37.5">Status</TableHead>
                <TableHead>Delivered By</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.createdAt ? format(order.createdAt) : "-"}</TableCell>
                  <TableCell className="font-medium hover:underline">
                    <Link href={`/order/${order.id}`} prefetch={true}>{order.id}</Link>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "inline-block px-4 py-1 rounded-full font-medium text-sm text-left",
                        statusColorMap[order.status]
                      )}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>{order?.deliveredBy || "-"}</TableCell>
                  <TableCell>{order.deliveryDate ? format(order.deliveryDate) : "-"}</TableCell>
                  <TableCell>{order?.returnDate ? format(order.returnDate) : "-"}</TableCell>
                  <TableCell className="text-right font-semibold">Rs.{Number(order.total).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {loading && <div className="w-full flex justify-center py-4"><Loader /></div>}
          {!loading && hasMore && <div ref={ref} className="h-6"></div>}
        </ScrollArea>
      </section>
    </main>
  );
}
