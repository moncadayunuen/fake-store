import { useMutation, useQueryClient } from "@tanstack/react-query";
import Services from "@/app/services";
import { Product } from "@/app/types/Product";

export const useMutateProduct = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, Product>({
        mutationFn: (updatedData) => Services.updateProduct(id, updatedData),
        onSuccess: (updatedProduct) => {
            queryClient.setQueryData(["productById", updatedProduct.id], updatedProduct);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};