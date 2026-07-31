import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/fake-store",
    assetPrefix: "/fake-store",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
            },
        ],
    },
};

export default nextConfig;
