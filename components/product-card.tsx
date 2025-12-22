'use client';

import Image from "next/image";
import { Product } from '@/types/product';
import Link from 'next/link';
import { Pencil, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { SessionType } from "@/lib/auth/core/session";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";

type ProductCardProps = {
  product: Product;
  user: SessionType
};

export function ProductCard({ product, user }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  async function handleDelete(productId: string) {
    try {
      const response = await fetch(`/api/product/delete?id=${productId}`, {
        method: 'DELETE',
      });
      const json = await response.json();

      if (json.success) {
        toast.success(json.message);
        window.location.reload()
        // Remove deleted product from UI
      } else {
        toast.error(json.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  }

  async function handleAddToCart() {
    const exists = cartItems.some((item) => item.productId === product.id);

    if (exists) {
      toast.warning(`Already in the cart!`);
      return;
    }

    addToCart(product, quantity);
    toast.success(`Check New Order Page!`);
  }


  return (
    <div className="relative hover:bg-neutral-100 transition-all rounded-2xl p-4">

      {/* Tag at top-right */}
      {product.tag !== "none" && (
        <div className="absolute capitalize top-8 right-0 transform rotate-45 bg-red-500 text-white text-xs font-bold px-3 py-1 shadow-md">
          {product.tag}
        </div>
      )}

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="overflow-hidden rounded-xl group">
        <Image
          src={product.image}
          alt={product.name}
          className="rounded-xl transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          width={600}
          height={600}
        />
      </Link>


      {/* Product Info */}
      <div className="flex flex-col gap-1 mt-4">
        <Link
          href={`/product/${product.id}`}
          className="font-semibold text-sm text-gray-900 hover:underline"
        >
          {product.name.length > 55
            ? product.name.slice(0, 55) + "..."
            : product.name}
        </Link>

        {product.discount ? (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-accent text-lg">
                Rs.{Number(product.discountPrice).toLocaleString()}
              </span>
              <span className="font-semibold  text-accent/80 text-sm line-through">
                Rs.{Number(product.price).toLocaleString()}
              </span>
            </div>
            <span className="text-xs bg-accent px-3 py-[3px] text-white rounded-full">
              -{product.discount}% Off
            </span>
          </div>
        ) : (
          <span className="font-semibold text-accent text-lg">
            Rs.{Number(product.price).toLocaleString()}
          </span>
        )}

        {/* Quantity + Cart Button */}
        <div className="flex items-center justify-between mt-2">
          {product.tag !== "out of stock" && (
            <>
              <div className="flex items-center border rounded-md overflow-hidden bg-gray-100">
                <button
                  onClick={decrease}
                  className="cursor-pointer px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-x-0 border-gray-300 outline-none"
                />
                <button
                  onClick={increase}
                  className="cursor-pointer px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-1">
                <ShoppingCart
                  onClick={handleAddToCart}
                  size={36}
                  className="text-white bg-accent rounded-full p-2 cursor-pointer"
                />
                {user.role === "admin" && (
                  <>
                    <Link href={`/product/edit/${product.id}`}>
                      <Pencil
                        size={36}
                        className="text-white bg-indigo-500 rounded-full p-2 cursor-pointer"
                      />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash
                          size={36}
                          className="text-white bg-red-500 rounded-full p-2 cursor-pointer"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id as string)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </>
          )}
          {(product.tag === "out of stock" && user.role === "admin") && (
            <div className="flex items-center justify-end gap-1 w-full">
              <Link href={`/product/edit/${product.id}`}>
                <Pencil
                  size={36}
                  className="text-white bg-indigo-500 rounded-full p-2 cursor-pointer"
                />
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash
                    size={36}
                    className="text-white bg-red-500 rounded-full p-2 cursor-pointer"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(product.id as string)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
