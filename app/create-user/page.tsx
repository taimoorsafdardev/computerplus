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
import { Input } from '@/components/ui/input';
import { userSchema } from '@/validation/user';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { toast } from 'sonner';
import { signUp } from '@/actions/auth/sign-up';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            address: '',
            city: '',
            phone: '',
            role: 'user'
        },
    });

    async function onSubmit(values: z.infer<typeof userSchema>) {
        try {
            setLoader(true);
            const response = await signUp(values);

            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="relative min-h-screen bg-background px-4 py-10">

            {/* Background */}
            {/* <div
                className="absolute inset-0 bg-linear-to-br from-pink-200 via-pink-300 to-pink-400 -z-10"
                style={{
                    backgroundImage: `
                    radial-gradient(circle at 30% -20%, rgba(241, 39, 120, 0.2), transparent 40%),
                    radial-gradient(circle at 80% 60%, rgba(241, 39, 120, 0.13), transparent 40%),
                    radial-gradient(circle at 10% 90%, rgba(241, 39, 120, 0.13), transparent 40%)
                    `,
                }}
            /> */}

            {/* Top-aligned card */}
            <div className="max-w-3xl mx-auto mt-12">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create User</CardTitle>
                        <CardDescription>Enter details below to create a user</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-between gap-5">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your email" {...field} type="email" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-5">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="••••••••" {...field} type="password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Phone + City */}
                                <div className="flex items-center justify-between gap-5">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your phone" {...field} type="number" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your city" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                                >
                                    {loader ? <Loader /> : 'Create User'}
                                </Button>
                            </form>
                        </Form>

                        <hr className="my-4 h-0.5 w-full bg-linear-to-r from-transparent via-white to-transparent" />

                        {/* Support section */}
                        <div className="mt-6 text-center text-md text-secondary-foreground">
                            <p>For Queries, Contact us:</p>
                            <p className="mt-2 font-medium">
                                0321-6901448 · 0320-7405669
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
