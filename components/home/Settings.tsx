'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Category } from '@/types/category';
import { SessionType } from '@/lib/auth/core/session';
import updateUser from '@/actions/auth/update';
import Loader from '../Loader';

const settingsSchema = z.object({
    name: z.string().min(1, 'Business name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function Settings({ user }: { user: SessionType }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loader, setLoader] = useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
        },
    });

    const { isDirty } = form.formState

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/fetching/fetch-categories");
                const json = await res.json();
                if (json.success) {
                    setCategories(json.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingCategories(false);
            }
        }

        load();
    }, []);

    async function handleDelete(id: string) {
        const confirmDelete = confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        try {
            // loading state
            setLoadingCategories(true);

            const res = await fetch(`/api/fetching/delete-category?id=${id}`, {
                method: "DELETE",
            });

            const json = await res.json();

            if (!json.success) {
                toast.error(json.message || "Failed to delete");
                return;
            }

            toast.success("Category deleted");

            // remove from UI instantly
            setCategories(prev => prev.filter(cat => cat.id as string !== id));

        } catch (err) {
            toast.error("Error deleting category");
        } finally {
            setLoadingCategories(false);
        }
    }


    async function onSubmit(values: SettingsFormValues) {
        try {
            setLoader(true)
            const res = await updateUser(values);
            if (res.success) {
                toast.success("Settings updated successfully");
            } else {
                toast.error(res.message || "Failed to update settings");
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="flex min-h-dvh flex-col">
            <main className="flex-1 bg-background p-4 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-bold font-headline">Settings</h1>
                                <p className="text-muted-foreground">
                                    Manage your account and business information.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Business Information</CardTitle>
                                        <CardDescription>Update your public business details.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Business Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your Business Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="your.email@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Your Phone Number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123 Main St" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your City" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='flex items-center justify-end w-full'>
                                            <Button
                                                disabled={loader || !isDirty} // disabled if loading OR nothing changed
                                                type="submit"
                                            >
                                                {loader ? <Loader /> : "Save Changes"}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Categories</CardTitle>
                                        <CardDescription>Check your all categories</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Categories content can go here */}
                                        {loadingCategories ? (
                                            <div className="text-sm text-muted-foreground">Loading categories...</div>
                                        ) : categories.length === 0 ? (
                                            <div className="text-sm text-muted-foreground">No categories found.</div>
                                        ) : (
                                            <div className="space-y-3">
                                                {categories.map((cat: any) => (
                                                    <div
                                                        key={cat.id}
                                                        className="flex items-center justify-between p-3 border rounded-lg bg-card transition"
                                                    >
                                                        {/* LEFT: Category name */}
                                                        <span className="font-medium">{cat.name}</span>

                                                        {/* RIGHT: Delete button */}
                                                        <button
                                                            onClick={() => handleDelete(cat.id)}
                                                            className="text-red-500 hover:text-red-600 transition"
                                                        >
                                                            <Trash2 className='cursor-pointer' size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    );
}
