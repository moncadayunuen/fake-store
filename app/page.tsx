"use client";

import {useProducts} from "@/app/hooks/useProducts";
import {Product} from "@/app/types/Product";
import {useMemo, useState} from "react";
import {Loader} from "@/app/components/loader/Loader";
import Image from 'next/image'
import {useCartStore} from "@/app/store/cartStore";
import {FaShoppingCart} from "react-icons/fa";

export default function Home() {
    const { data, isPending } = useProducts();
    const [search, setSearch] = useState<string>("");
    const addToCart = useCartStore((state) => state.addToCart)
    const cart = useCartStore((state) => state.cart)
    const filteredProducts = useMemo(() => {
        const value = search.toLowerCase();
        return data?.data.filter((product: Product) => {
            return product.title.toLowerCase().includes(value);
        })
    }, [search, data?.data]);
console.log(cart);
  return (
    <div className="min-h-screen flex flex-col flex-1 bg-zinc-100 font-sans px-4 py-8">

        <div className={"w-full flex justify-between container mx-auto pb-8"}>
            <div className={"w-max border-r-2 border-slate-600"}>
                <h1 className={"text-orange-600 text-3xl font-black pr-2"}>Mi App store</h1>
                <p className={"text-slate-700 text-sm font-medium"}>Busca los mejores productos</p>
            </div>
            {
                (cart.length > 0) && (
                    <>
                        <div className={"relative flex items-center "}>
                            <span className={"text-sm absolute w-[20px] h-[20px] bg-orange-400 rounded-full flex items-center justify-center text-white -right-3 top-2"}>{cart.length}</span>
                            <span className={"text-2xl"}><FaShoppingCart /></span>
                        </div>
                    </>
                )
            }
            <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                    <input
                        className="w-full h-[50px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Buscar por producto"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="absolute top-1 right-1 flex items-center rounded h-[41px] bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-800 hover:bg-slate-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-4 h-4 mr-2">
                            <path fillRule="evenodd"
                                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                  clipRule="evenodd"/>
                        </svg>

                        Buscar
                    </button>
                </div>
            </div>
        </div>

        {
            (isPending) ?
                <>
                    <Loader />
                </>
                :
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 container mx-auto"}>
                    {
                        filteredProducts?.map((product: Product) => {
                            return (
                                <div key={product.id}
                                     className={"bg-slate-100 rounded-2xl p-4 border border-zinc-200 flex flex-col gap-y-2 justify-between"}>
                                    <Image src={product.image} alt="Product Image" width={150} height={150} className="w-full rounded-2xl h-[200px] object-contain py-4 bg-slate-200 px-4" />
                                    <h2 className={"text-2xl font-bold text-orange-400"}>{product.title.length <= 40 ? product.title : product.title.slice(0, 40) + "..."}</h2>
                                    <div className={"flex justify-between"}>
                                        <p><strong>Precio </strong>${product.price}</p>
                                        <p className={"bg-gray-200 text-orange-400 px-2 uppercase text-sm rounded-md"}>{product.category}</p>
                                    </div>
                                    <p className={"text-sm text-slate-900"}>{product.price}
                                        {(product.description.length <= 100) ? product.description : product.description.slice(0, 100) + "..."}
                                    </p>
                                    <button type={"button"} onClick={() => addToCart(product)} className={"bg-orange-400 p-4 rounded-2xl text-white font-medium hover:bg-orange-500 transition cursor-pointer"}>Agregar a carrito</button>
                                </div>
                            )
                        }) ?? <>
                            <p className={"text-center text-white"}>No hay productos cargados</p>
                        </>
                    }
                </div>
        }
    </div>
  );
}
