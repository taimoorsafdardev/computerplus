'use client';

import { ProductCard } from "@/components/product-card";
import { Product } from '@/types/product';
import { useEffect, useState, useCallback } from "react";
import Loader from "../Loader";
import { SessionType } from "@/lib/auth/core/session";
import { useInView } from "react-intersection-observer";

const PAGE_SIZE = 12;

export const Products = ({ user, filter, search }: { user: SessionType, filter: string, search: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ threshold: 0 });

    // Reset on filter or search change
    useEffect(() => {
        setProducts([]);
        setPage(0);
        setHasMore(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [filter, search]);

    const fetchProducts = useCallback(async () => {
        if (!hasMore) return;

        try {
            setLoader(true);
            const params = new URLSearchParams();
            params.set("skip", (page * PAGE_SIZE).toString());
            params.set("take", PAGE_SIZE.toString());
            if (filter) params.set("category", filter);
            if (search) params.set("search", search);

            const res = await fetch(`/api/fetching/fetch-products?${params.toString()}`);
            const json = await res.json();

            if (json.success) {
                setProducts(prev => {
                    const combined = [...prev, ...json.data];
                    const unique = Array.from(new Map(combined.map(p => [p.id, p])).values());
                    return unique;
                });

                if (json.data.length < PAGE_SIZE) setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    }, [page, filter, search, hasMore]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    useEffect(() => {
        if (inView && hasMore && !loader) setPage(prev => prev + 1);
    }, [inView, hasMore, loader]);

    return (
        <section className="w-full pb-20">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} user={user} />
                ))}
            </div>

            {loader && <div className="mt-6 w-full flex items-center justify-center"><Loader /></div>}
            {!loader && hasMore && <div ref={ref} className="h-6"></div>}
            {!loader && products.length === 0 && <p className="text-center text-gray-500 mt-10">No products found.</p>}
        </section>
    );
}
