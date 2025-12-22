import { Product } from "@/types/product";
import Image from "next/image";

export default function ProductDetail({ product }: { product: Product }) {
    return (
        <section className="mt-10 flex justify-center py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                <div className="flex justify-center">
                    <div className="relative w-[700px] h-[700px] md:w-[700px] md:h-[700px]">
                        <Image
                            src={product.image as string}
                            alt={product.name}
                            width={750}
                            height={750}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start max-w-160">
                    <h1 className="text-4xl font-bold mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center justify-center gap-4">
                        {product.tag !== 'none' && (
                            <p className="text-white px-4 rounded-xl py-1 bg-accent font-semibold mb-3 uppercase tracking-wide text-sm">
                                {product.tag}
                            </p>
                        )}
                        {product.discount && (
                            <p className="text-white px-4 rounded-xl py-1 bg-green-500 font-semibold mb-3 uppercase tracking-wide text-sm">
                                -{product.discount}% OFF
                            </p>
                        )}
                    </div>

                    <div>
                        <h1 className="font-semibold text-lg mt-2">Category - <span>{product.category}</span></h1>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        {product.discount ? (
                            <>
                                <p className="text-3xl font-bold text-primary mb-6 mt-4">
                                    Rs.{Number(product.discountPrice).toLocaleString()}
                                </p>
                                <p className="text-xl font-bold text-primary mb-6 mt-4 line-through italic">
                                    Rs.{Number(product.price).toLocaleString()}
                                </p>
                            </>
                        ) : (
                            <p className="text-3xl font-bold text-primary mb-6 mt-4">
                                Rs.{Number(product.price).toLocaleString()}
                            </p>
                        )}
                    </div>


                    <div
                        className="prose prose-sm max-w-full text-gray-700 mb-6"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />

                </div>

            </div>
        </section>
    );
}
