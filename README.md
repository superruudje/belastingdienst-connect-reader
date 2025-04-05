# Belastingdienst Connect Reader

The **Belastingdienst Connect Reader** is a web component for rendering dynamic forms and UI elements based on a provided configuration. It works as a standalone custom element and can be integrated into both plain HTML websites and Vue 3 applications.

## Features

- ✅ Works in any HTML page, regardless of framework
- ✅ Built with Vue 3 and exports as a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- ✅ Supports JSON configuration via URL or inline string
- ✅ Uses Pinia for internal state management
- ✅ Compatible with `@belastingdienst/bldc-components-vue3`

---

## Installation

### Option 1: CDN (for non-Vue websites)

```html
<script src="https://cdn.jsdelivr.net/npm/belastingdienst-connect-reader"></script>
```

Place the component tag wherever you want to render the reader:

```html
<belastingdienst-connect-reader
  checker-url="https://example.com/checker.json">
</belastingdienst-connect-reader>
```

### Option 2: NPM (for Vue or build-based apps)

```bash
npm install @rudihaamke/belastingdienst-connect-reader
```

---

## Usage

### In Non-Vue Websites

Once the script is included, you can use the component like any regular HTML element:

```html
<belastingdienst-connect-reader
  checker-url="https://example.com/checker.json">
</belastingdienst-connect-reader>
```

You may also pass a raw JSON string:

```html
<belastingdienst-connect-reader
  checker-json='{"type": "form", "store": {...}}'>
</belastingdienst-connect-reader>
```

### In Vue 3 Applications

Since this is a Custom Element, you can use it directly in Vue templates **without registering it**:

```vue
<template>
  <belastingdienst-connect-reader
    checker-url="https://example.com/checker.json" />
</template>
```

> Ensure the script is loaded via CDN or bundled using Vite or Webpack.

#### Alternatively, use it via module import

If you want to bundle it directly:

```ts
import 'belastingdienst-connect-reader'; // registers the element globally
```

Then use it in your template as usual.

---

## Props

| Prop           | Type   | Required | Description                              |
|----------------|--------|----------|------------------------------------------|
| `checker-url`  | String | Optional | URL pointing to the JSON config file     |
| `checker-json` | String | Optional | JSON string representing the configuration |

> One of `checker-url` or `checker-json` must be provided.

---

## Development

```bash
# Install dependencies
npm install

# Build for production (outputs a single JS file)
npm run build
```

### Output

The build will generate a single JavaScript file:
```
dist/belastingdienst-connect-reader.js
```

---

## Example Config (checker.json)

```json
{
  "type": "form",
  "store": {
    "variables": [
      {"name": "user.name", "value": "John Doe"}
    ]
  }
}
```

---

## License

MIT

---

## Maintainer

Rudi Haamke · [npmjs.com/~superruudje](https://www.npmjs.com/~superruudje)