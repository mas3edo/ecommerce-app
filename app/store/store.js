import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { toast } from 'react-toastify';

export const useStore = create(
    persist(
        (set) => ({
            cart: [],
            favorites: [],
            orders: [],

            // --- Cart Actions ---
            addToCart: (product) => set((state) => {
                const existingProduct = state.cart.find((item) => item.id === product.id);
                toast.success(`${product.title} added to cart!`, {
                    icon: '🛒',
                    progressStyle: { background: '#22c55e'  }
                });
                if (existingProduct) {
                    return {
                        cart: state.cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                }
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }),
            removeFromCart: (productId) => set((state) => {
                const itemToRemove = state.cart.find(i => i.id === productId);
                if (itemToRemove) {
                    toast.info(`${itemToRemove.title || itemToRemove.name} removed from cart`);
                }
                return {
                    cart: state.cart.filter((item) => item.id !== productId),
                };
            }),
            updateQuantity: (productId, quantity) => set((state) => ({
                cart: state.cart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                ),
            })),
            clearCart: () => set({ 
                cart: [],
                ...(() => { toast.warn("Cart cleared successfully"); return {}; })()
            }),

            // --- Favorites Actions ---
            toggleFavorite: (product) => set((state) => {
                const isFavorite = state.favorites.some((item) => item.id === product.id);
                if (isFavorite) {
                    toast.info(`${product.title} removed from favorites`);
                    return { favorites: state.favorites.filter((item) => item.id !== product.id) };
                }
                toast.success(`${product.title} added to favorites!`, {
                    icon: '❤️',
                    progressStyle: { background: '#22c55e' }
                });
                return { favorites: [...state.favorites, product] };
            }),
            clearFavorites: () => set({ favorites: [] }),

            // --- Orders Actions ---
            addOrder: (order) => set((state) => ({
                orders: [order, ...state.orders],
            })),
            clearOrders: () => set({ orders: [] }),
        }),
        {
            name: 'techflow-storage', // name of the item in the local storage
        }
    )
);
