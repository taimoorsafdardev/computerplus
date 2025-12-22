// import { create } from 'zustand';

// interface CartStore {
//     addToCart: (itemId: string, quantity: number) => void;
//     removeFromCart: (itemId: string) => void;
//     clearCart: () => void;
//     getCartItems: () => { itemId: string; quantity: number }[];
// }

// export const useCartStore = create<CartStore>((set, get) => ({
//     addToCart: (itemId, quantity) => {
//         const currentItems = get().getCartItems();
//         const itemIndex = currentItems.findIndex(item => item.itemId === itemId);  

//         if (itemIndex > -1) {
//             currentItems[itemIndex].quantity += quantity;
//         } else {
//             currentItems.push({ itemId, quantity });
//         }
//         set({ cartItems: currentItems });
//     },

//     removeFromCart: (itemId) => {
//         const currentItems = get().getCartItems().filter(item => item.itemId !== itemId);
//         set({ cartItems: currentItems });
//     },     
//     clearCart: () => {
//         set({ cartItems: [] });
//     },
//     getCartItems: () => {
//         return get().cartItems || [];
//     }
// }));

