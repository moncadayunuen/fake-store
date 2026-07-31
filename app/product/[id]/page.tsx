"use client";

import { useProductById } from "@/app/hooks/useProductById";
import { useParams } from "next/navigation";
import {Loader} from "@/app/components/loader/Loader";
import Image from "next/image";
import Link from "next/link";
import {FaChevronLeft, FaDollarSign, FaEdit, FaUser} from "react-icons/fa";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMutateProduct} from "@/app/hooks/useMutateProduct";

type Inputs = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ProductDetail = () => {
    const { id } = useParams();
    const [isEditing,setIsEditing] = useState<boolean>(false);
    const numericId = Number(id);
    const { isPending, data, isError } = useProductById(isNaN(numericId) ? 0 : numericId);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        values: data
    })
    const { mutateAsync: updateProduct, isPending: isUpdating } = useMutateProduct(numericId);

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-100">
                <p className="text-red-500 font-sans">Producto no encontrado.</p>
            </div>
        );
    }

    const handleEditingMode = () => {
        setIsEditing(true);
    }

    const onSubmit = async (formData: Inputs) => {
        try {
            const result = await updateProduct(
                {...formData, image: data.image, price: Number(formData.price)}
            );
            if(result.id) setIsEditing(false);
        } catch (e) {
            console.log("error",e);
        }
    }

    const handleCloseEditingMode = () => {
        setIsEditing(false);
        reset(data);
    }

    return (
        <div className="min-h-screen flex flex-col flex-1 bg-zinc-100 font-sans px-4 py-8">
            <div className="flex items-center justify-end container mx-auto pb-8">
                <Link href={"/"} className={"bg-white text-orange-600 p-4 hover:bg-slate-200 transition h-[50px] flex items-center justify-center rounded-xl font-bold min-w-50 gap-2"}>
                     <i className={"text-orange-600"}><FaChevronLeft /></i> Regresar
                </Link>
            </div>
            <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-sm container gap-8 flex flex-col lg:flex-row border border-zinc-200">
                <div className="w-full">
                    <Image
                        src={data.image}
                        alt="Product Image"
                        width={350}
                        height={350}
                        className="w-full rounded-2xl xl:h-[500px] object-contain py-4 bg-slate-200 px-4" />
                </div>
                <div className={"w-full flex flex-col justify-between gap-y-8"}>
                    <h1 className="text-6xl font-bold text-zinc-800">{data.title}</h1>
                    <div className={"flex flex-col gap-y-2"}>
                        <p className={"bg-orange-100 w-max px-2 rounded-sm uppercase text-orange-600"}>{data.category}</p>
                        <p className={"text-xl text-slate-400"}>{data.description}</p>
                    </div>
                    <div className={"flex flex-row justify-between"}>
                        <p className={"text-4xl font-black text-orange-600"}>${data.price} us</p>
                        <button
                            type={"button"}
                            onClick={handleEditingMode}
                            className={"flex justify-center p-4 bg-slate-100 gap-x-2 items-center font-medium rounded-xl hover:bg-slate-200 cursor-pointer"}>
                            {(isEditing) ? "Editando" : "Editar"} <i><FaEdit /></i>
                        </button>
                    </div>
                </div>
            </div>
            {
                (isEditing) && (
                    <>
                        {
                            (isUpdating) ? <Loader />
                            :
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto bg-white p-6 rounded-lg shadow-sm container flex flex-col gap-y-4 border border-zinc-200 mt-16">
                                <h3 className={"text-3xl font-bold"}>Actualiza tu producto</h3>
                                <div className="grid grid-cols-1">
                                        <div className="w-full flex- flex-col gap-y-4 relative">
                                            <label className={"font-bold text-xl text-slate-600"}>Producto</label>
                                            <div className="relative">
                                                <input type="text"
                                                       {...register("title",{required: true})}
                                                       className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 h-[50px] text-slate-600 text-lg border border-slate-100 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                       placeholder="Producto"/>
                                                <i className="absolute w-5 h-5 top-4 right-2.5 text-slate-300">
                                                    <FaUser />
                                                </i>
                                            </div>
                                            {errors.title && (<><span className={"bg-red-400 text-white p-1 rounded-sm relative top-2"}>
                                                Campo requerido
                                            </span></>)
                                            }
                                        </div>
                                    </div>
                                    <div className="grid xl:grid-cols-2 gap-4">
                                        <div className="w-full flex- flex-col gap-y-4">
                                            <label className={"font-bold text-xl text-slate-600"}>Categoría</label>
                                            <div className="relative">
                                                <input
                                                    {...register("category",{required: true})}
                                                    type="text"
                                                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 h-[50px] text-slate-600 text-lg border border-slate-100 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                    placeholder="Categoría"/>
                                            </div>
                                            {errors.category && (<><span className={"bg-red-400 text-white p-1 rounded-sm relative top-2"}>
                                                Campo requerido
                                            </span></>)
                                            }
                                        </div>
                                        <div className="w-full flex- flex-col gap-y-4">
                                            <label className={"font-bold text-xl text-slate-600"}>Precio</label>
                                            <div className="relative">
                                                <input type="number"
                                                       step="0.01"
                                                       {...register("price",{required: true})}
                                                       className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 h-[50px] text-slate-600 text-lg border border-slate-100 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                       placeholder="Producto"/>
                                                <i className="absolute w-5 h-5 top-4 right-2.5 text-slate-300">
                                                    <FaDollarSign />
                                                </i>
                                            </div>
                                            {errors.price && (<><span className={"bg-red-400 text-white p-1 rounded-sm relative top-2"}>
                                                Campo requerido
                                            </span></>)
                                            }
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div className="w-full flex- flex-col gap-y-4">
                                            <label className={"font-bold text-xl text-slate-600"}>Descripción</label>
                                            <div className="relative">
                        <textarea
                            rows={5}
                            {...register("description", {required: true})}
                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 min-h-[50px] text-slate-600 text-lg border border-slate-100 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Descripción del producto"></textarea>
                                            </div>
                                        </div>
                                        {errors.description && (<><span className={"bg-red-400 text-white p-1 rounded-sm relative top-2"}>
                                                Campo requerido
                                            </span></>)
                                        }
                                    </div>
                                    <div className={"flex gap-x-8"}>
                                        <button type={"button"} onClick={handleCloseEditingMode} className={"bg-slate-100 text-black text-xl uppercase font-bold p-4 hover:bg-slate-200 transition h-[50px] flex items-center justify-center rounded-xl font-bold w-full gap-2 cursor-pointer"}>Cancelar</button>
                                        <button type={"submit"} className={"bg-orange-600 text-white text-xl uppercase font-bold p-4 hover:bg-slate-200 transition h-[50px] flex items-center justify-center rounded-xl font-bold w-full gap-2 cursor-pointer"}>Actualizar</button>
                                    </div>
                                </form>
                        }
                    </>
                )
            }
        </div>
    );
};

export default ProductDetail;