'use client'

import { Suspense, useEffect, useState } from "react";
import { Products } from "@/components/home/products";
import Sidebar from "@/components/home/sidebar";
import { SessionType } from "@/lib/auth/core/session";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";
import { useSearchParams } from "next/navigation";

export default function Page() {
    return (
        <Suspense fallback={<div className="flex justify-center mt-20">Loading page...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const [user, setUser] = useState<SessionType | null>(null);
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter") || "";
    const search = searchParams.get("search") || "";

    useEffect(() => {
        async function fetchUser() {
            const u = await getCurrentUser();
            setUser(u as SessionType);
        }
        fetchUser();
    }, []);

    if (!user) return <div className="flex justify-center mt-20">Loading user...</div>;

    return (
        <main className="container mx-auto">
            <div className="border-b py-6">
                <h1 className="text-2xl font-bold capitalize">Welcome back! {user.name}</h1>
                <p>Visit the store and find your favorite products.</p>
            </div>
            <section className="grid grid-cols-[240px_1fr] gap-6 mt-6">
                <Sidebar />
                <Products user={user} filter={filter} search={search} />
            </section>
        </main>
    );
}
