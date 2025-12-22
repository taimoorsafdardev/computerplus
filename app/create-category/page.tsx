'use client';

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
import Loader from '@/components/Loader';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCategorySchema } from '@/validation/category';
import { Input } from '@/components/ui/input';
import createCategory from '@/actions/forms/create-category';

export default function Page() {
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: '',
        },
    });

    async function onSubmit(values: z.infer<typeof createCategorySchema>) {
        try {
            setLoader(true);

            // Replace with your actual API action for creating category
            const response = await createCategory(values);

            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                form.reset()
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="flex items-start mt-10 justify-center px-4 min-h-screen bg-background relative">
            {/* Background */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 30% -20%, rgba(241, 39, 120, 0.2), transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(241, 39, 120, 0.13), transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(241, 39, 120, 0.13), transparent 40%)
          `,
                }}
            />

            <Card className="w-120 max-w-3xl max-h-[90vh]flex flex-col">
                <CardHeader className="shrink-0">
                    <CardTitle className="text-2xl">Create Category</CardTitle>
                    <CardDescription>Enter details below to create category</CardDescription>
                </CardHeader>

                <CardContent className="overflow-y-auto pr-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-1 gap-6 pb-6"
                        >

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full hover:shadow-lg active:scale-95"
                            >
                                {loader ? <Loader /> : 'Create Category'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
