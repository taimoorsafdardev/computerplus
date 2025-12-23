'use client';

import { Product } from '@/types/product';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { OrderItem } from '@/types/order';

interface CartContextType {
  cartItems: OrderItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  placeOrder: () => Promise<string>;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'erp_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);

  /* 🔁 Load cart from localStorage on first render */
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  }, []);

  /* 💾 Save cart to localStorage on change */
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id!,
          orderId: '',
          quantity,
          price: String(product.price),
          name: product.name,
          image: product.image,
          discount: String(product.discount) ?? null,
          discountPrice: String(product.discountPrice) ?? null,
          product, // optional, full product object
          productName: product.name,
          productImage: product.image,
          unitPrice: String(product.price),
          total: String(Number(product.discountPrice ?? product.price) * quantity),
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  async function placeOrder(): Promise<string> {
    try {
      const res = await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ ensures cookies are sent
        body: JSON.stringify({
          total: totalAmount.toString(),
          items: cartItems.map((item) => ({
            productName: item.product.name,
            productImage: item.product.image,
            unitPrice: item.product.price,
            discount: item.product.discount,
            discountPrice: item.product.discountPrice,
            productId: item.productId,
            quantity: item.quantity,
            total: item.product.discount ? String(Number(item.product.discountPrice) * item.quantity) : String(Number(item.unitPrice) * item.quantity),
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Order failed');
      }

      sessionStorage.setItem('last_order_id', data.orderId);
      clearCart();

      return data.orderId;
    } catch (error) {
      console.error('Place order failed:', error);
      throw error;
    }
  }

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + (item.product?.discount ? Number(item.product.discountPrice) * item.quantity : Number(item.unitPrice) * item.quantity),
        0
      ),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
