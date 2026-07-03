import {create} from "zustand/react";
import {Product} from "@/app/types/Product";

interface CartItem extends Product {
    quantity: number;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (product: Product) => void;
}

export const useCartStore = create<CartStore>((set,get) => ({
    cart: [],
    addToCart: (product: Product) => {
        const productInCart = get().cart.find((item : Product) => item.id === product.id);
        if (productInCart) {
            set({
                cart: get().cart.map((item: CartItem) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            });
            return;
        }
        set({
            cart: [...get().cart, { ...product, quantity: 1 }],
        });
    }
}))