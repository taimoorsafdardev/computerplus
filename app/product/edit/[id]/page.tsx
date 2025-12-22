'use client';

import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/Loader';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';
import { createProductSchema, updateProductSchema } from '@/validation/product';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UploadButton } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import { Category } from '@/types/category';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditProductPage() {
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const editor = useRef(null);
    const router = useRouter();
    const { id } = useParams();

    const form = useForm<z.infer<typeof createProductSchema>>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: '',
            description: '',
            image: '',
            price: '',
            tag: '',
            discount: '',
            category: '',
        },
    });

    // Fetch categories
    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await fetch("/api/fetching/fetch-categories");
                const json = await res.json();
                if (json.success) setCategories(json.data);
                else toast.error("Failed to fetch categories");
            } catch {
                toast.error("Error fetching categories");
            } finally {
                setLoadingCategories(false);
            }
        }
        loadCategories();
    }, []);

    // Fetch product by ID
    useEffect(() => {
        async function loadProduct() {
            if (!id) return;

            try {
                const res = await fetch(`/api/fetching/fetch-product?id=${id}`);
                const json = await res.json();
                if (json.success) {
                    const product = json.data;
                    form.reset({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        discount: product.discount || '',
                        tag: product.tag,
                        category: product.category,
                        image: product.image,
                    });
                } else {
                    toast.error("Product not found");
                }
            } catch {
                toast.error("Failed to fetch product");
            }
        }
        loadProduct();
    }, [id, form]);

    async function onSubmit(values: z.infer<typeof updateProductSchema>) {
        try {
            setLoader(true);

            if (!values.image) {
                toast.error("Please upload a product image.");
                setLoader(false);
                return;
            }
            if (!values.category) {
                toast.error("Please select a category.");
                setLoader(false);
                return;
            }
            if (!values.tag) {
                toast.error("Please select a tag.");
                setLoader(false);
                return;
            }

            const res = await fetch(`/api/product/update?id=${id}`, {
                method: 'PUT',
                body: JSON.stringify(values),
            });

            const json = await res.json();
            if (!json.success) toast.error(json.message);
            else {
                toast.success(json.message);
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="flex items-center justify-center px-4 min-h-screen bg-background relative">
            <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
                <CardHeader className="shrink-0">
                    <CardTitle className="text-2xl">Edit Product</CardTitle>
                    <CardDescription>Update product details below</CardDescription>
                </CardHeader>

                <CardContent className="overflow-y-auto pr-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 pb-6">
                            {/* Name */}
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Price */}
                            <FormField control={form.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Discount */}
                            <FormField control={form.control} name="discount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount (%)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Tag */}
                            <FormField
                                control={form.control}
                                name="tag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tag</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select tag" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="none">None</SelectItem>
                                                    <SelectItem value="out of stock">Out of Stock</SelectItem>
                                                    <SelectItem value="new arrival">New Arrival</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        {loadingCategories ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {categories.map((cat: Category) => (
                                                            <SelectItem key={cat.id} value={cat.name}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <div className="border rounded-md overflow-hidden bg-white h-64">
                                    <JoditEditor ref={editor} value={form.watch('description')} onChange={val => form.setValue('description', val)} />
                                </div>
                                <FormMessage />
                            </FormItem>

                            {/* Image */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Image</FormLabel>
                                        <FormControl>
                                            {field.value ? (
                                                <div className="relative w-full">
                                                    <img
                                                        src={field.value}
                                                        alt="Product"
                                                        className="w-full rounded-md border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            field.onChange(""); // Clear image
                                                            toast.info("Image removed");
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 rounded-full text-white w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        if (res && res.length > 0) {
                                                            field.onChange(res[0].url); // Set uploaded file URL
                                                            toast.success("Image uploaded!");
                                                        }
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error(`Upload failed: ${error.message}`);
                                                    }}
                                                    className="h-96 w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 hover:bg-indigo-50 transition cursor-pointer"
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={loader} type="submit" className="w-full">
                                {loader ? <Loader /> : "Update Product"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}