import { AsyncAPIViewer } from '@/components/AsyncAPIViewer';
import { notFound } from 'next/navigation';
import { getServerConfig, getContentPath } from '@/lib/server-utils';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import path from 'path';

export const metadata = {
    title: 'AsyncAPI Specification - XeoContext',
    description: 'Event-driven architecture documentation',
};

export default async function AsyncAPIPage() {
    const config = await getServerConfig();

    if (!config || !config.asyncapi) {
        notFound();
    }

    const contentPath = getContentPath();
    const relativePath = config.asyncapi.startsWith('/') ? config.asyncapi.slice(1) : config.asyncapi;
    const asyncApiFilePath = path.join(contentPath, relativePath);

    let parsedSchema = null;
    let errorMsg = null;

    try {
        // Bundle the API definition (resolves external $refs to other files)
        // SwaggerParser can often handle generic dereferencing if we treat it right, 
        // but strictly it's for OpenAPI. 
        // However, for pure $ref resolution of a YAML file, it usually works or we can use @apidevtools/json-schema-ref-parser directly if installed.
        // SwaggerParser inherits from ref-parser.

        // Bundle the API definition (resolves external $refs to other files)
        // using generic JSON Schema Ref Parser which avoids "not a valid Openapi" errors.
        parsedSchema = await $RefParser.bundle(asyncApiFilePath);

    } catch (err: any) {
        console.error("Error parsing AsyncAPI spec:", err);
        errorMsg = err.message || "Unknown error parsing API specification";
    }

    if (errorMsg) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-7xl animate-in fade-in duration-500">
                <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
                    <h3 className="font-semibold mb-2">Failed to load AsyncAPI Definition</h3>
                    <p className="whitespace-pre-wrap">{errorMsg}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
            <div className="pt-8 px-4 max-w-7xl mx-auto w-full pb-20">
                <div className="flex flex-col space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                        AsyncAPI Specification
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Explore the event-driven architecture, channels, and messages defined in the system.
                    </p>
                </div>

                <div className="w-full">
                    <AsyncAPIViewer schema={parsedSchema} />
                </div>
            </div>
        </div>
    );
}
