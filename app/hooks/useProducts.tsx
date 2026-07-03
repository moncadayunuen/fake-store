"use client"

import {useQuery} from "@tanstack/react-query";
import Services from "@/app/services";
import {Product} from "@/app/types/Product";

type ProductsResponse = {
    data: Product[];
}

export const useProducts = () => {

    return useQuery<ProductsResponse>({
        queryKey: ['products'],
        queryFn: () => Services.getAllProducts()
    })
}