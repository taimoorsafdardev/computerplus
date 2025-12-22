import updateProduct from "@/actions/forms/update-product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, message: "Product ID required" }, { status: 400 });

        const data = await req.json();

        const result = await updateProduct(id, data);
        return NextResponse.json(result);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 });
    }
}