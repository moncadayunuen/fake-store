"use client";

import {useProducts} from "@/app/hooks/useProducts";
import {Product} from "@/app/types/Product";
import {useMemo, useState} from "react";
import {Loader} from "@/app/components/loader/Loader";
import Image from 'next/image'
import {useCartStore} from "@/app/store/cartStore";
import {useSearchStore} from "@/app/store/searchStore";
import {FaShoppingCart} from "react-icons/fa";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
}

export default function Home() {
    const { data, isPending } = useProducts();
    const addToCart = useCartStore((state) => state.addToCart);
    const search = useSearchStore((state) => state.search);
    const categories = useState<Category []>([]);
    const [selectedCategory,setSelectedCategory] = useState<string>("all");
    const cart = useCartStore((state) => state.cart)

    const filteredProducts = useMemo(() => {
        const value = search.toLowerCase();
        return data?.data.filter((product: Product) => {
            const matchesSearch = product.title.toLowerCase().includes(value);
            const matchesQuery = (selectedCategory === "all" || product.category === selectedCategory)
            return matchesSearch && matchesQuery;
        })
    }, [search, data?.data,selectedCategory]);

    const filteredCategories = useMemo(() => {
        return ["all", ...new Set(data?.data.map(product => product.category))];
    }, [categories]);

  return (
    <div className="min-h-screen flex flex-col flex-1 bg-zinc-100 font-sans px-4 py-8">

        {
            (isPending) ?
                <>
                    <Loader />
                </>
                :
                <div className={"container mx-auto"}>
                    <div className={`grid grid-cols-5 gap-4 mb-8`}>
                        {
                            filteredCategories.map((category,i) => {
                                return (
                                    <div onClick={() => setSelectedCategory(category)} key={i}
                                         className={`transition cursor-pointer h-[200px] text-orange-600 font-bold text-2xl flex items-center justify-center rounded-2xl hover:bg-slate-300 ${(selectedCategory === category) ? "bg-slate-300" : "bg-slate-200"}`}>
                                        <p className={"uppercase text-center"}>{category}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"}>
                        {
                            filteredProducts?.map((product: Product) => {
                                const quantity = cart.filter(item => item.id === product.id).length;

                                return (
                                    <div key={product.id} className={"bg-slate-100 rounded-2xl p-4 border border-zinc-200 flex flex-col gap-y-2 justify-between"}>
                                        <div className={"relative flex items-center relative"}>
                                            <Image src={product.image} alt="Product Image" width={150} height={150} className="w-full rounded-2xl h-[200px] object-contain py-4 bg-slate-200 px-4" />
                                            <button
                                                type={"button"}
                                                onClick={() => addToCart(product)}
                                                className={"bg-orange-400 p-4 rounded-2xl text-white absolute top-4 right-4 font-medium hover:bg-orange-500 transition cursor-pointer"}
                                            >
                                                <FaShoppingCart />
                                            </button>
                                            {quantity > 0 && (
                                                <span className="absolute top-4 left-4 rounded-md bg-white px-2 py-1 text-slate-400">
                                                    x{quantity}
                                                </span>
                                            )}
                                        </div>
                                        <h2 className={"text-2xl font-bold text-orange-400"}>{product.title.length <= 40 ? product.title : product.title.slice(0, 40) + "..."}</h2>
                                        <div className={"flex justify-between items-center"}>
                                            <p className={"text-lg"}><strong>Precio </strong>${product.price}</p>
                                            <p className={"bg-gray-200 text-slate-600 px-2 py-1 uppercase text-sm rounded-md"}>{product.category}</p>
                                        </div>
                                        <p className={"text-lg text-slate-900"}>
                                            {(product.description.length <= 100) ? product.description : product.description.slice(0, 100) + "..."}
                                        </p>
                                        <Link
                                            className={"bg-orange-400 p-4 rounded-2xl text-white font-medium hover:bg-orange-500 transition cursor-pointer text-center"}
                                            href={"/product/" + product.id}
                                        >
                                            Ver producto
                                        </Link>
                                    </div>
                                )
                            }) ?? <>
                                <p className={"text-center text-white"}>No hay productos cargados</p>
                            </>
                        }
                    </div>
                </div>
        }
    </div>
  );
}
