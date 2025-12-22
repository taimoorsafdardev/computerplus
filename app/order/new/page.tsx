'use client';

import {
  Search,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import Footer from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalAmount,
    placeOrder,
  } = useCart();

  const router = useRouter();

  // 🔍 Fetch products from API when user types
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/fetching/fetch-products?search=${encodeURIComponent(searchTerm)}&take=20`
        );
        const data = await res.json();
        setSearchResults(data.success ? data.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast.success("Added to Cart")
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    updateQuantity(productId, qty);
  };

  const handlePlaceOrder = () => {
    const orderId = placeOrder();
    toast.success("Order Placed");
    router.push('/order/list');
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 bg-rose-50/20 p-4 md:p-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: PRODUCT SEARCH */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Find Products</CardTitle>
              <CardDescription>Search products to add</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search product..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <ScrollArea className="h-96 mt-4">
                <div className="space-y-3 pr-4">

                  {loading && (
                    <p className="text-sm text-muted-foreground text-center pt-10">
                      Searching...
                    </p>
                  )}

                  {!loading && searchResults.map((product: Product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <Image
                        src={product.image as string}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <Link href={`/product/${product.id}`} className='hover:underline'>
                          {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Rs.{Number(product.price).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAddToCart(product)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {!loading && searchTerm && searchResults.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center pt-10">
                      No products found
                    </p>
                  )}

                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* RIGHT: ORDER SUMMARY */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Wrap table inside ScrollArea */}
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[72px]">Product</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-40 text-center">Qty</TableHead>
                      <TableHead className="w-[120px] text-right">Price</TableHead>
                      <TableHead className="w-[120px] text-right">Total</TableHead>
                      <TableHead className="w-20 text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.productId}>
                        {/* Product Image */}
                        <TableCell className="text-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="mx-auto rounded-md object-cover"
                          />
                        </TableCell>

                        {/* Product Name */}
                        <TableCell className="max-w-[260px] truncate">
                          <Link href={`/product/${item.productId}`} className='hover:underline'>
                            {item.name}
                          </Link>
                        </TableCell>

                        {/* Quantity */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <Input
                              type="number"
                              value={item.quantity}
                              className="h-8 w-14 text-center"
                              onChange={(e) =>
                                handleUpdateQuantity(item.productId, Number(e.target.value))
                              }
                            />

                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>

                        {/* Price */}
                        <TableCell className="text-right">
                          Rs.{Number(item.price).toLocaleString()}
                        </TableCell>

                        {/* Total */}
                        <TableCell className="text-right font-medium">
                          Rs.{(Number(item.price) * item.quantity).toLocaleString()}
                        </TableCell>

                        {/* Action */}
                        <TableCell className="text-center">
                          <div className='flex justify-center cursor-pointer'>
                            <Trash2
                              onClick={() => removeFromCart(item.productId)}
                              className="h-4 w-4 text-destructive"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-bold text-lg">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold text-lg">
                        Rs.{totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableFooter>
                </Table>
              </ScrollArea>

              <Separator className="my-6" />

              <div className="flex justify-end">
                <Button
                  disabled={!cartItems.length}
                  onClick={handlePlaceOrder}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
