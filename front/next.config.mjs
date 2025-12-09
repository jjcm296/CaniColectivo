/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.impericon.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "pub-f8de2ca09de9456fa76c4e73ad5508bd.r2.dev",
                pathname: "/**",
            }
        ],
    },
};

export default nextConfig;
