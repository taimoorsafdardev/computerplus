import OrderDetails from "@/components/home/OrderDetails";
import { SessionType } from "@/lib/auth/core/session";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const user = await getCurrentUser() as SessionType
    if (!user) {
        return <div>Please log in to view your order details.</div>
    }
    return (
        <OrderDetails user={user} id={id} />
    )
}