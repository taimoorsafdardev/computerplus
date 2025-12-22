import fetchProduct from "@/actions/fetching/fetch-product";
import ProductDetail from "@/components/product-detail";
import { Product } from "@/types/product";

type Props = {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    const res = await fetchProduct({ id })

    return <ProductDetail product={res.data as Product} />;
}
