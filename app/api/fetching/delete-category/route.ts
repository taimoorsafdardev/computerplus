import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id)
            return Response.json({ success: false, message: "ID is required" });

        await prisma.category.delete({
            where: { id },
        });

        return Response.json({ success: true, message: "Category deleted" });
    } catch (error) {
        return Response.json(
            { success: false, message: "Failed to delete category", error },
            { status: 500 }
        );
    }
}
