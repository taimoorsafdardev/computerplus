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

const PAGE_SIZE = 20;

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });

  const statusColorMap: Record<OrderStatus, string> = {
    pending: "text-yellow-500 bg-yellow-100",
    cancelled: "text-red-500 bg-red-100",
    delivered: "text-green-500 bg-green-100",
    returned: "text-blue-500 bg-blue-100",
  };

  const fetchOrders = useCallback(async (pageToFetch: number) => {
    if (!hasMore) return;

    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("skip", (pageToFetch * PAGE_SIZE).toString());
      params.set("take", PAGE_SIZE.toString());

      const res = await fetch(`/api/fetching/fetch-orders?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setOrders(prev => {
          // Deduplicate by order ID
          const combined = [...prev, ...json.data];
          const unique = Array.from(new Map(combined.map(o => [o.id, o])).values());
          return unique;
        });

        if (json.data.length < PAGE_SIZE) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  // Fetch on page change
  useEffect(() => {
    fetchOrders(page);
  }, [page, fetchOrders]);

  // Intersection Observer to load next page
  useEffect(() => {
    if (inView && hasMore && !loading) setPage(prev => prev + 1);
  }, [inView, hasMore, loading]);


  return (
    <main className="container mx-auto mt-10">
      <section>
        <h1 className="text-2xl font-bold">Order List</h1>
        <p>Here you can view all your orders that you have placed.</p>

        <ScrollArea className="mt-4 mb-20">
          <Table className="min-w-full">
            <TableCaption>A list of your recent orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Placed</TableHead>
                <TableHead>OID</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
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
                    <Link href={`/order/${order.id}`}>{order.id}</Link>
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
