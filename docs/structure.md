# Content & Structure Guidelines

This guide explains how to organize your files and write content that leverages XeoContext's rendering features.

## Recommended Directory Structure

We recommend keeping your documentation in a dedicated repository or a `docs/` folder in your repo.

```
my-docs/
├── xeocontext.config.json    # Main Config
├── system-design/            # Markdown Files
│   ├── 01-overview.md
│   ├── 02-database.md
│   └── images/               # Static images for markdown
├── openapi/                  # REST API Specs
│   └── api-spec.yaml
└── asyncapi/                 # Event Specs
    └── event-spec.yaml
```

## System Design (Markdown)

XeoContext uses a robust Markdown renderer with support for GitHub Flavored Markdown (GFM).

### Diagrams (Mermaid)
You can write Mermaid diagrams directly in your markdown using code blocks with the `mermaid` language.

    ```mermaid
    graph TD;
        A[Client] -->|HTTP| B(Load Balancer);
        B -->|Route| C{Service};
        C -->|Get| D[Database];
    ```

### Code Blocks
Standard code highlighting is supported.

    ```typescript
    interface User {
      id: string;
      name: string;
    }
    ```

### Inline Code
Use backticks for inline commands or references, e.g., `` `GET /users` ``.

### Headings
Use standard `# H1`, `## H2`, `### H3` tags. The application automatically generates a **Table of Contents (TOC)** based on these headers.

## APIs

### OpenAPI
Your OpenAPI 3.0+ file (YAML or JSON) is rendered using Swagger UI. This provides an interactive console for your API consumers.

### AsyncAPI
Your AsyncAPI 2.0+ file is rendered using a unified AsyncAPI component, perfect for visualizing message-driven architectures (Channels, Subscribe/Publish operations).
