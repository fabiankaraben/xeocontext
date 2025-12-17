"use client";

import dynamic from "next/dynamic";
import { useConfig } from "@/lib/config-context";
import { fetchContent } from "@/lib/api";
import { useEffect, useState } from "react";

const AsyncApiRenderer = dynamic(
    () => import("@/components/renderers/AsyncApiRenderer").then((mod) => mod.AsyncApiRenderer),
    { ssr: false }
);

export default function AsyncApiPage() {
    const { config } = useConfig();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (config?.asyncapi) {
            fetchContent(config.asyncapi)
                .then((text) => {
                    // Pre-process content to replace relative refs with absolute URLs
                    // This forces the parser to use HTTP resolver instead of FS resolver
                    if (typeof window !== 'undefined') {
                        const baseUrl = `${window.location.origin}/content`;
                        // Remove leading slash from config path if present to calculate relative depth
                        const currentPath = config.asyncapi!.startsWith('/') ? config.asyncapi!.slice(1) : config.asyncapi!;
                        const currentDir = currentPath.split('/').slice(0, -1).join('/'); // e.g. global/gateway

                        return text.replace(/(\$ref:\s*)(['"]?)([^'"\s]+)(\2)/g, (match, prefix, quote, ref, suffix) => {
                            if (ref.startsWith('http')) return match;

                            const stack = currentDir.split('/');
                            const parts = ref.split('/');

                            for (const part of parts) {
                                if (part === '.') continue;
                                if (part === '..') {
                                    if (stack.length > 0) stack.pop();
                                } else {
                                    stack.push(part);
                                }
                            }

                            const absolutePath = stack.join('/');
                            const absoluteUrl = `${baseUrl}/${absolutePath}`;

                            return `${prefix}${quote}${absoluteUrl}${suffix}`;
                        });
                    }
                    return text;
                })
                .then(setContent)
                .catch((err) => console.error("Failed asyncapi content", err))
                .finally(() => setLoading(false));
        }
    }, [config]);

    if (loading) return <div>Loading content...</div>;
    if (!config?.asyncapi) return <div>No AsyncAPI file configured.</div>;

    const asyncApiConfig = {
        parserOptions: {
            resolve: {
                file: false
            }
        }
    };

    return (
        <div className="h-full overflow-y-auto w-full px-4 md:px-8 py-10">
            <AsyncApiRenderer schema={content} config={asyncApiConfig} />
        </div>
    );
}
