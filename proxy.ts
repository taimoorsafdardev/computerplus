import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const session = request.cookies.get(process.env.COOKIE_SESSION_KEY as string);
    const { pathname } = request.nextUrl;

    // Allow UploadThing endpoints to bypass middleware
    if (pathname.startsWith("/api/uploadthing")) {
        return NextResponse.next();
    }

    const isLogin = pathname === "/login";
    const isPublicPath = ["/login"].includes(pathname);

    if (!session && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && isLogin) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Match all routes (except static files)
export const config = {
    matcher: [
        "/((?!_next|static|.*\\.).*)", // Keep your old matcher
    ],
};