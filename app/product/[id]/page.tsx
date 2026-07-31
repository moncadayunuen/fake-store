import ProductDetail from "./productDetail";

export const dynamicParams = false;

export function generateStaticParams() {
    return Array.from({ length: 20 }, (_, index) => ({
        id: String(index + 1),
    }));
}

export default function Page() {
    return <ProductDetail />;
}