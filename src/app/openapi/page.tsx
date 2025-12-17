"use client";

import dynamic from "next/dynamic";
import { useConfig } from "@/lib/config-context";

const OpenApiRenderer = dynamic(
    () => import("@/components/renderers/OpenApiRenderer").then((mod) => mod.OpenApiRenderer),
    { ssr: false }
);

export default function OpenApiPage() {
    const { config } = useConfig();

    if (!config?.openapi) return <div>No OpenAPI file configured.</div>;

    const specUrl = config.openapi.startsWith('/') ? `/content${config.openapi}` : `/content/${config.openapi}`;

    return (
        <div className="h-full overflow-y-auto w-full px-4 md:px-8 py-10">
            <OpenApiRenderer spec={specUrl} />
        </div>
    );
}
