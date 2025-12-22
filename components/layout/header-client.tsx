"use client";

import { logout } from "@/actions/auth/sign-out";
import { SessionType } from "@/lib/auth/core/session";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";

export default function HeaderClient({ user }: { user: SessionType }) {
    const pathname = usePathname()

    if (pathname === '/login') {
        return null;
    }

    return (
        <header className="container px-8 mx-auto w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-16 items-center">

                {/* Logo - left */}
                <Link href="/" className="mr-6 flex items-center gap-2">
                    <Logo />
                    <span className="hidden font-bold font-headline sm:inline-block text-xl">Computer Plus</span>
                </Link>

                {/* Desktop Navigation - right aligned */}
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex ml-auto">
                    <Link href="/" className="nav-link">Home</Link>

                    {/* <div className="relative group">
                        <span className="nav-link">Order</span>
                        <div className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <Link href="/order/new" className="block px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground">
                                New Order
                            </Link>
                            <Link href="/order/list" className="block px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground">
                                Order List
                            </Link>
                        </div>
                    </div> */}

                    {/* <Link href="/report" className="nav-link">Report</Link> */}
                    <Link href="/order/list" className="nav-link">Order Lists</Link>
                    <Link href="/order/new" className="nav-link">New Order</Link>
                    {user?.role === "admin" && <Link href="/create-user" className="nav-link">Create User</Link>}
                    {user?.role === "admin" && <Link href="/create-product" className="nav-link">Create Product</Link>}
                    {user?.role === "admin" && <Link href="/create-category" className="nav-link">Create Category</Link>}
                    {user?.role === "admin" && <Link href="/settings" className="nav-link">Settings</Link>}
                    {/* <Link href="/cart" className="nav-link">Cart</Link> */}
                    <Link href="/support" className="nav-link">Support</Link>
                    <p onClick={() => logout()} className="nav-link">Logout</p>
                </nav>
            </div >

            <style jsx>{`
      .nav-link {
        position: relative;
        font-weight: 600;
        cursor: pointer;
        display: inline-block;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 400ms;
        transition-property: color;
      }

      .nav-link:after {
        content: "";
        pointer-events: none;
        bottom: -2px;
        left: 50%;
        position: absolute;
        width: 0%;
        height: 2px;
        background-color: #ec1f24;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 400ms;
        transition-property: width, left;
      }

      .nav-link:hover:after,
      .nav-link:focus:after {
        width: 100%;
        left: 0%;
      }
    `}</style>
        </header >
    )
}