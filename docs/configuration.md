# Configuration

XeoContext is driven by a single JSON configuration file: `xeocontext.config.json`. This file tells the application where to find your documents and how to structure the navigation.

## File Location

When running in Docker, this file must be mounted to:
`/usr/share/nginx/html/content/xeocontext.config.json`

## Configuration Schema

```json
{
  "title": "My System Docs",
  "files": {
    "systemDesign": [
      {
        "title": "Architecture Overview",
        "path": "system-design/architecture.md",
        "slug": "overview"
      },
      {
        "title": "Database Schema",
        "path": "system-design/database.md",
        "slug": "database"
      }
    ],
    "openapi": "openapi/my-api-v1.yaml",
    "asyncapi": "asyncapi/events-v1.yaml"
  }
}
```

### Properties

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The name of your application/project. Displayed in the header. |
| `files` | `object` | Contains the path definitions for your documentation. |
| `files.systemDesign` | `array` | List of Markdown files to render in the System Design tab. |
| `files.openapi` | `string` | **Relative path** to your OpenAPI/Swagger specification file (YAML or JSON). |
| `files.asyncapi` | `string` | **Relative path** to your AsyncAPI specification file (YAML or JSON). |

### System Design Entry

Each item in the `systemDesign` array requires:

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The display name in the sidebar navigation. |
| `slug` | `string` | The URL identifier. Example: `overview` becomes `/system/overview`. |
| `path` | `string` | **Relative path** to the Markdown file within the mounted content volume. |

## Path Resolution

All paths in `path`, `openapi`, and `asyncapi` are **relative** to the `content/` root in the container.

For example, if you mount a folder `./my-docs` to `/usr/share/nginx/html/content/my-docs`, your config path would be `my-docs/file.md`.

Usually, it is cleaner to map your folders directly into the content root:
- Host `./system-design` -> Container `/usr/share/nginx/html/content/system-design`
- Config `path`: `system-design/file.md`
