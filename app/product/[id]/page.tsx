'use client';
import { useEffect, useState, use } from 'react';
import ProductDetail from '@/components/product-detail';
import MainLoader from '@/components/MainLoader';
import { Product } from '@/types/product';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params); // unwrap the promise
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`/api/fetching/fetch-product?id=${resolvedParams.id}`)
            .then(res => res.json())
            .then(json => setProduct(json.data));
    }, [resolvedParams.id]);

    if (!product) return <MainLoader />;
    return <ProductDetail product={product} />;
}
