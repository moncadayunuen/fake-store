import {useQuery} from "@tanstack/react-query";
import Services from "@/app/services";

export const useProductById = (id?: number) => {
    return useQuery({
        queryKey: ['productById', id],
        queryFn: () => Services.getById(id ? id : 0),
        enabled: Boolean(id),
    })
}