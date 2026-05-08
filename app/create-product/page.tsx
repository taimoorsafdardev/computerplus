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
import { useRouter } from 'next/navigation';
import { createProductSchema } from '@/validation/product';
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
import createProduct from '@/actions/forms/create-product';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function Page() {
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const editor = useRef(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof createProductSchema>>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: '',
            description: '',
            image: '',
            price: '',
            tag: '',
            discount: '',
            discountPrice: '',
            category: '',
        },
    });


    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/fetching/fetch-categories");
                const json = await res.json();

                if (json.success) {
                    setCategories(json.data);
                } else {
                    toast.error("Failed to fetch categories");
                }
            } catch (err) {
                toast.error("Error fetching categories");
            } finally {
                setLoadingCategories(false);
            }
        }

        load();
    }, []);

    async function onSubmit(values: z.infer<typeof createProductSchema>) {
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

            // Replace with your actual API action for creating product
            const response = await createProduct(values)

            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="flex items-center justify-center px-4 min-h-screen bg-background relative">
            <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
                <CardHeader className="shrink-0">
                    <CardTitle className="text-2xl">Create Product</CardTitle>
                    <CardDescription>Enter details below to create product</CardDescription>
                </CardHeader>

                <CardContent className="overflow-y-auto pr-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-1 gap-6 pb-6"
                        >
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    const val = e.target.value;
                                                    const discount = form.getValues('discount');
                                                    if (val && discount) {
                                                        const p = Number(val) - (Number(val) * Number(discount) / 100);
                                                        form.setValue('discountPrice', Math.round(p).toString());
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Discount and Discount Price */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount (%)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    placeholder="0" 
                                                    {...field} 
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        const val = e.target.value;
                                                        const price = Number(form.getValues('price'));
                                                        if (price && val) {
                                                            const p = price - (price * Number(val) / 100);
                                                            form.setValue('discountPrice', Math.round(p).toString());
                                                        } else if (!val) {
                                                            form.setValue('discountPrice', '');
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="discountPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount Price</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    placeholder="0" 
                                                    {...field} 
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        const val = e.target.value;
                                                        const price = Number(form.getValues('price'));
                                                        if (price && val) {
                                                            const d = ((price - Number(val)) / price) * 100;
                                                            form.setValue('discount', d.toFixed(1).replace(/\.0$/, ''));
                                                        } else if (!val) {
                                                            form.setValue('discount', '');
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Tag */}
                            <FormField
                                control={form.control}
                                name="tag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tag</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                            {categories.length === 0 && !loadingCategories && (
                                <div className="text-red-500 text-sm">
                                    Please create a category before adding products.
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>

                                        {loadingCategories ? (
                                            <div className="text-sm text-gray-500">Loading categories...</div>
                                        ) : (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        {categories.map((cat: any) => (
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
                                    <JoditEditor
                                        ref={editor}
                                        value={form.watch('description')}
                                        onChange={(val: any) => form.setValue('description', val)}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>

                            {/* Upload Image */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormControl>
                                                <FormField
                                                    control={form.control}
                                                    name="image"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="mb-2">Product Image</FormLabel>
                                                            <FormControl>
                                                                {field.value ? (
                                                                    <div className="relative w-full">
                                                                        <img
                                                                            src={field.value}
                                                                            alt="Product Image"
                                                                            className="w-full rounded-md border"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                field.onChange(""); // Clear the image
                                                                                toast.info("Image removed");
                                                                            }}
                                                                            className="absolute cursor-pointer top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
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
                                                                        className="h-96 w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-indigo-50 transition"
                                                                    />
                                                                )}
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </FormControl>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <Button
                                disabled={(categories.length === 0 && !loadingCategories) || loader}
                                type="submit"
                                className="w-full hover:shadow-lg active:scale-95"
                            >
                                {loader ? <Loader /> : 'Create Product'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
