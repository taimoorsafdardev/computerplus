
// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { format, parseISO } from 'date-fns';
// import { Calendar as CalendarIcon, Search, Link as LinkIcon } from 'lucide-react';
// import { motion } from 'framer-motion';

// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// // import { Calendar } from '@/components/ui/calendar';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Header from '@/components/layout/header';
// import Footer from '@/components/layout/footer';

// // const reportSchema = z.object({
// //   startDate: z.date({
// //     required_error: 'A start date is required.',
// //   }),
// //   endDate: z.date({
// //     required_error: 'An end date is required.',
// //   }),
// // }).refine((data) => data.endDate >= data.startDate, {
// //   message: "End date cannot be before start date.",
// //   path: ["endDate"],
// // });

// // type ReportFormValues = z.infer<typeof reportSchema>;

// // Mock data - in a real app, this would come from an API
// const mockOrders = [
//   { id: 'ORD001', date: '2023-10-01', customer: 'Liam Johnson', amount: 250.00 },
//   { id: 'ORD002', date: '2023-10-03', customer: 'Olivia Smith', amount: 150.50 },
//   { id: 'ORD003', date: '2023-10-05', customer: 'Noah Williams', amount: 320.75 },
//   { id: 'ORD004', date: '2023-10-10', customer: 'Emma Brown', amount: 45.00 },
//   { id: 'ORD005', date: '2023-10-12', customer: 'Ava Jones', amount: 89.99 },
//   { id: 'ORD006', date: '2023-10-15', customer: 'Oliver Garcia', amount: 500.00 },
//   { id: 'ORD007', date: '2023-10-18', customer: 'Sophia Miller', amount: 120.00 },
//   { id: 'ORD008', date: '2023-10-22', customer: 'Isabella Davis', amount: 75.25 },
//   { id: 'ORD009', date: '2023-10-25', customer: 'Mason Rodriguez', amount: 210.00 },
//   { id: 'ORD010', date: '2023-10-28', customer: 'Mia Martinez', amount: 95.50 },
// ];

// export default function ReportPage() {
//   const [orders, setOrders] = useState(mockOrders);

//   const form = useForm<ReportFormValues>({
//     resolver: zodResolver(reportSchema),
//     defaultValues: {
//       startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//       endDate: new Date(),
//     }
//   });

//   function onSubmit(values: ReportFormValues) {
//     console.log('Fetching report for:', values);
//     // In a real app, you would fetch data from an API:
//     // const response = await fetch(`/api/reports?start=${format(values.startDate, 'yyyy-MM-dd')}&end=${format(values.endDate, 'yyyy-MM-dd')}`);
//     // const data = await response.json();
//     // setOrders(data);

//     // For now, we'll just filter the mock data
//     const filteredOrders = mockOrders.filter(order => {
//       const orderDate = parseISO(order.date); // Use parseISO to avoid timezone issues
//       return orderDate >= values.startDate && orderDate <= values.endDate;
//     });
//     setOrders(filteredOrders);
//   }

//   const totalSpent = orders.reduce((acc, order) => acc + order.amount, 0);

//   return (
//     <div className="flex min-h-dvh flex-col">
//       <Header />
//       <main className="flex-1 bg-background p-4 md:p-8">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold font-headline">Sales Report</h1>
//                 <p className="text-muted-foreground">
//                   View and filter your sales data.
//                 </p>
//               </div>
//               <Button type="submit" className="transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
//                 <Search className="mr-2 h-4 w-4" />
//                 Generate Report
//               </Button>
//             </div>

//             <Card className="mb-8">
//               <CardContent className="pt-6">
//                 <div className="flex w-full items-center justify-between gap-4 md:gap-8 px-4">
//                   <FormField
//                     control={form.control}
//                     name="startDate"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col">
//                         <FormLabel>Start Date</FormLabel>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <FormControl>
//                               <Button
//                                 variant={'outline'}
//                                 className={cn(
//                                   'w-[320px] pl-3 text-left font-normal',
//                                   !field.value && 'text-muted-foreground'
//                                 )}
//                               >
//                                 {field.value ? (
//                                   format(field.value, 'PPP')
//                                 ) : (
//                                   <span>Pick a date</span>
//                                 )}
//                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                               </Button>
//                             </FormControl>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar
//                               mode="single"
//                               captionLayout="dropdown-buttons"
//                               fromYear={2015}
//                               toYear={2025}
//                               selected={field.value}
//                               onSelect={field.onChange}
//                               disabled={(date) =>
//                                 date > new Date() || date < new Date('1900-01-01')
//                               }
//                               initialFocus
//                             />
//                           </PopoverContent>
//                         </Popover>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <motion.div
//                     animate={{
//                       rotate: [0, 5, -5, 0],
//                       y: [-2, 2, -2],
//                     }}
//                     transition={{
//                       duration: 5,
//                       ease: 'easeInOut',
//                       repeat: Infinity,
//                     }}
//                     className="hidden md:block"
//                   >
//                     <LinkIcon className="h-8 w-8 text-muted-foreground/80" />
//                   </motion.div>

//                   <FormField
//                     control={form.control}
//                     name="endDate"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col">
//                         <FormLabel>End Date</FormLabel>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <FormControl>
//                               <Button
//                                 variant={'outline'}
//                                 className={cn(
//                                   'w-[320px] pl-3 text-left font-normal',
//                                   !field.value && 'text-muted-foreground'
//                                 )}
//                               >
//                                 {field.value ? (
//                                   format(field.value, 'PPP')
//                                 ) : (
//                                   <span>Pick a date</span>
//                                 )}
//                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                               </Button>
//                             </FormControl>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar
//                               mode="single"
//                               captionLayout="dropdown-buttons"
//                               fromYear={2015}
//                               toYear={2025}
//                               selected={field.value}
//                               onSelect={field.onChange}
//                               disabled={(date) =>
//                                 date > new Date() || date < new Date('1900-01-01')
//                               }
//                               initialFocus
//                             />
//                           </PopoverContent>
//                         </Popover>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </form>
//         </Form>

//         <Card>
//           <CardHeader>
//             <CardTitle>Results</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[120px]">Order ID</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell className="font-medium">{order.id}</TableCell>
//                     <TableCell>{order.customer}</TableCell>
//                     <TableCell>{format(parseISO(order.date), 'PPP')}</TableCell>
//                     <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
//                   </TableRow>
//                 ))}
//                 {orders.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={4} className="text-center h-24">
//                       No results found for the selected date range.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//               <TableFooter>
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-lg font-bold">Total Spent</TableCell>
//                   <TableCell className="text-right text-lg font-bold">
//                     ${totalSpent.toFixed(2)}
//                   </TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//       <Footer />
//     </div>
//   );
// }
