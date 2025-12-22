"use client";

import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import Loader from "../Loader";

const name = "Computer Plus Sahiwal"

export const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoader(true);
        const res = await fetch("/api/fetching/fetch-categories", {
          method: "GET",
        });
        const json = await res.json();

        if (json.success) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoader(false)
      }
    }
    load();
  }, [])

  return (
    <section className="border-b mb-6 py-1 bg-background/60 backdrop-blur supports-backdrop-filter:bg-background/40">
      <div className="py-2">
        <h2 className="text-2xl font-headline font-semibold text-foreground">
          Welcome {name}!
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-4">

          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="group cursor-pointer relative flex items-center gap-2 border border-border/40 transition-all duration-300"
                >
                  All Categories
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="animate-in fade-in-0 zoom-in-95 duration-200 w-48"
              >
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} className="hover:bg-primary/10 hover:text-primary cursor-pointer">{category.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          {loader ? <Loader /> : (
            <nav className="hidden items-center gap-6 md:flex">
              {categories.slice(0, 4).map((category) => (
                <Link
                  href="#"
                  key={category.name}
                  className={cn(
                    "relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="relative w-full max-w-sm group">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-3 transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:outline-none group-focus-within:shadow-md"
          />

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-300 group-focus-within:translate-x-1 group-focus-within:text-primary"
          />
        </div>
      </div>
    </section >
  );
};
