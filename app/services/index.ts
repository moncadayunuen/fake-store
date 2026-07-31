import httpClient from "@/app/utils/HttpClient";
import { Product } from "../types/Product";

const Services = {
    getAllProducts: async () => {
        const result = await httpClient.get('/products');
        return result;
    },
    getById: async (id: number) => {
        const {data} = await httpClient.get('/products/' + id);
        return data;
    },
    updateProduct: async (productId: number, updatedData: Product) => {
        const {data} = await httpClient.put('/products/' + productId, updatedData);
        return data;
    }
}

export default Services;