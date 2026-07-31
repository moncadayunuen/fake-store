"use client"

import {useCartStore} from "@/app/store/cartStore";
import {FaShoppingCart} from "react-icons/fa";
import {useSearchStore} from "@/app/store/searchStore";
import {usePathname} from "next/navigation";

const Nav = () => {
    const cart = useCartStore((state) => state.cart)
    const search = useSearchStore((state) => state.search);
    const setSearch = useSearchStore((state) => state.setSearch);
    const pathname = usePathname();
    console.log(pathname);
    return (
        <div className={"w-full bg-orange-600"}>
            <div className={"w-full flex justify-between container mx-auto py-8 px-8"}>
                <div className="w-full flex items-center gap-8">
                    <div className={"w-max border-r-2 border-white"}>
                        <h1 className={"text-white text-3xl font-black pr-2"}>Mi App store</h1>
                        <p className={"text-white text-sm font-medium"}>Busca los mejores productos</p>
                    </div>
                    {
                        (pathname === "/") && (
                            <div className="relative">
                                <input
                                    className="w-full h-[56px] bg-transparent placeholder:text-slate-200 text-white text-lg border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-200 hover:border-slate-200 shadow-sm focus:shadow"
                                    placeholder="Buscar por producto"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    className="absolute top-2 right-2 flex items-center rounded h-[40px] bg-white py-1 px-2.5 border border-transparent text-center text-sm text-orange-600 transition-all shadow-sm hover:shadow focus:bg-slate-100 focus:shadow-none active:bg-slate-800 hover:bg-slate-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
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
                        )
                    }
                </div>
                {
                    (cart.length > 0) && (
                        <>
                            <div className={"relative flex items-center "}>
                                <span className={"text-sm absolute w-[20px] h-[20px] bg-orange-400 rounded-full flex items-center justify-center text-white -right-3 top-2"}>{cart.length}</span>
                                <span className={"text-2xl text-white"}><FaShoppingCart /></span>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Nav;