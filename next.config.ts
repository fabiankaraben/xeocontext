import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
    experimental: {
        // @ts-expect-error - turbo is a valid option in experimental config for some versions
        turbo: {
            resolveAlias: {
                fs: path.join(process.cwd(), 'src/empty-module.ts'),
                path: path.join(process.cwd(), 'src/empty-module.ts'),
                os: path.join(process.cwd(), 'src/empty-module.ts'),
                buffer: path.join(process.cwd(), 'src/empty-module.ts'),
                util: path.join(process.cwd(), 'src/empty-module.ts'),
            },
        },
    },
    webpack: (config: any, { isServer }: { isServer: boolean }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
                buffer: false,
                util: false,
                'process/browser': false,
            };
            config.resolve.alias = {
                ...config.resolve.alias,
                fs: false,
            };
        }
        return config;
    },
};

export default nextConfig;
