"use client"

import { Funnel, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import Loader from "../Loader";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sidebar() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    useEffect(() => {
        async function load() {
            try {
                setLoader(true);
                const res = await fetch("/api/fetching/fetch-categories");
                const json = await res.json();

                if (json.success) {
                    setCategories(json.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoader(false);
            }
        }

        load();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams as any);
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <section className="pb-20">
            <div className="flex items-center gap-2">
                <Funnel size={18} className="text-gray-500" />
                <h1 className="font-semibold text-xl">Filters</h1>
            </div>
            <form onSubmit={handleSearch} className="mt-4 relative w-full max-w-sm group">
                <Input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-3 transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:outline-none group-focus-within:shadow-md"
                />

                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </form>


            {/* Loader */}
            {loader ? (
                <div className="flex items-center justify-center mt-6">
                    <Loader />
                </div>
            ) : (
                <div className="mt-7">
                    {/* <h1 className="text-lg mt-6 font-semibold">Popular Filters</h1>
                    <div className="flex flex-col gap-2 mt-2">
                        {categories.slice(0, 5).map((category) => (
                            <Link
                                href={`?filter=${category.name}`}
                                key={category.name}
                                className="text-sm hover:text-black font-semibold text-gray-500"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div> */}

                    {/* <h1 className="text-lg mt-4 font-semibold">All Categories</h1> */}
                    <div className="flex flex-col gap-2 mt-2">
                        {categories.map((category) => (
                            <Link
                                href={`?filter=${category.name}`}
                                key={category.name}
                                className="text-sm hover:text-black font-semibold text-gray-500"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
