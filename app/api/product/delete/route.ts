import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }

        // Delete the product
        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to delete product" },
            { status: 500 }
        );
    }
}
