import httpClient from "@/app/utils/HttpClient";

const Services = {
    getAllProducts: () => {
        const result = httpClient.get('/products');
        return result;
    }
}

export default Services;