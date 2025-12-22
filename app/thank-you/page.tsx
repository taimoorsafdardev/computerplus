'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<div className="flex justify-center mt-20">Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasCheckedRef = useRef(false);

    const orderId = searchParams.get('orderId');

    useEffect(() => {
        if (hasCheckedRef.current) return; // 🛑 prevent second run
        hasCheckedRef.current = true;

        const lastOrderId = sessionStorage.getItem('last_order_id');

        if (!orderId || lastOrderId !== orderId) {
            router.replace('/order/new');
            return;
        }

        sessionStorage.removeItem('last_order_id');
    }, [orderId, router]);

    if (!orderId) return null;

    return (
        <div className="flex mt-20 justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-background p-8 text-center">
                <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-600" />

                <h1 className="text-2xl font-bold">Order Placed Successfully</h1>

                <p className="mt-2 text-muted-foreground">
                    Order ID:
                    <span className="ml-1 font-medium">{orderId}</span>
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Button asChild className="w-full">
                        <Link href="/order/list">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            View Orders
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                        <Link href="/order/new">Create New Order</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
