import updateOrder from "@/actions/forms/update-order";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, message: "Order ID required" }, { status: 400 });

        const data = await req.json();

        const result = await updateOrder(id, data);
        return NextResponse.json(result);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Failed to update order" }, { status: 500 });
    }
}