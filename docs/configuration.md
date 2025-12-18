# Configuration

XeoContext is driven by a single JSON configuration file: `xeocontext.config.json`. This file tells the application where to find your documents and how to structure the navigation.

## File Location

When running in Docker, this file must be mounted to:
`/usr/share/nginx/html/content/xeocontext.config.json`

## Configuration Schema

```json
{
  "projectName": "System Name",
  "projectDomain": "system.example.com",
  "navigation": [
    {
      "title": "Global Architecture",
      "items": [
        {
          "title": "Overview",
          "href": "/"
        },
        {
          "title": "Infrastructure",
          "href": "/global/infrastructure"
        }
      ]
    },
    {
      "title": "Domains",
      "items": [
        {
          "title": "Identity",
          "href": "/domains/identity"
        }
      ]
    }
  ],
  "openapi": "/global/gateway/openapi.yaml",
  "asyncapi": "/global/gateway/asyncapi.yaml"
}
```

### Properties

| Field | Type | Description |
| :--- | :--- | :--- |
| `projectName` | `string` | The name of your application/project. |
| `projectDomain` | `string` | The domain of your project, used for identity. |
| `navigation` | `array` | List of navigation groups to organize the sidebar. |
| `openapi` | `string` | **Path** to the Master OpenAPI file (usually `/global/gateway/openapi.yaml`). |
| `asyncapi` | `string` | **Path** to the Master AsyncAPI file (usually `/global/gateway/asyncapi.yaml`). |

### Navigation Group

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The heading for this group of links in the sidebar. |
| `items` | `array` | List of navigation items. |

### Navigation Item

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The display name of the link. |
| `href` | `string` | The content path. URLs starting with `/` map to the content directory. <br> - `/` -> `/README.md` <br> - `/path/to/doc` -> `/path/to/doc.md` or `/path/to/doc/readme.md` |

## Path Resolution

All paths in `path`, `openapi`, and `asyncapi` are **relative** to the `content/` root in the container.

For example, if you mount a folder `./my-docs` to `/usr/share/nginx/html/content/my-docs`, your config path would be `my-docs/file.md`.

Usually, it is cleaner to map your folders directly into the content root:
- Host `./system-design` -> Container `/usr/share/nginx/html/content/system-design`
- Config `path`: `system-design/file.md`
