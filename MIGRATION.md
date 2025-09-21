# Migration Guide: Gridsome to Vue 3 + Vite

This document outlines the migration from the old Gridsome-based website to the new Vue 3 + Vite setup.

## What Changed

### Build System
- **Before**: Gridsome 0.7.0 (deprecated)
- **After**: Vite 5.0+ (modern, fast)

### Framework
- **Before**: Vue 2.6.12 (maintenance mode)
- **After**: Vue 3.4+ (latest with Composition API)

### Styling
- **Before**: Bootstrap 4.5.3
- **After**: Bootstrap 5.3.2 + Custom SCSS

### Development Tools
- **Before**: Basic ESLint setup
- **After**: ESLint + Prettier + TypeScript

## Key Improvements

### Performance
- ⚡ **Faster builds**: Vite is 10-100x faster than Webpack
- 🚀 **Hot Module Replacement**: Instant updates during development
- 📦 **Better tree shaking**: Smaller bundle sizes

### Developer Experience
- 🔧 **TypeScript support**: Better IDE support and error catching
- 🎨 **Prettier integration**: Consistent code formatting
- 🛠️ **Modern tooling**: Latest development tools and practices

### Code Quality
- 📝 **Composition API**: More maintainable and reusable code
- 🎯 **Type safety**: Catch errors at compile time
- 📋 **Better linting**: More comprehensive code quality checks

## File Structure Changes

### Removed Files
- `gridsome.config.js` - Replaced by `vite.config.js`
- `gridsome.server.js` - No longer needed
- `src/index.html` - Moved to root `index.html`

### New Files
- `vite.config.js` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `env.d.ts` - TypeScript environment definitions
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `src/routes.ts` - Vue Router configuration
- `src/utils/markdown.ts` - Markdown processing utilities

### Updated Files
- `package.json` - Completely rewritten with modern dependencies
- `src/main.js` → `src/main.ts` - Converted to TypeScript
- All Vue components - Converted to Vue 3 Composition API
- SCSS files - Updated with modern CSS variables and utilities

## Component Migration

### Vue 2 → Vue 3 Changes

#### Before (Vue 2)
```vue
<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  methods: {
    handleClick() {
      console.log(this.message)
    }
  }
}
</script>
```

#### After (Vue 3 Composition API)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello')

const handleClick = () => {
  console.log(message.value)
}
</script>
```

### Template Changes
- `g-link` → `router-link`
- `g-image` → `img` (with proper optimization)
- `static-query` → Computed properties with utility functions

## Content Management

### Markdown Processing
- **Before**: Gridsome's built-in markdown processing
- **After**: Custom `markdown.ts` utility with `markdown-it`

### Content Structure
- Same markdown files in `content/posts/`
- Same frontmatter format
- Enhanced with TypeScript interfaces

## Deployment

### Netlify Configuration
The `netlify.toml` file remains the same:
```toml
[build]
  publish = "dist"
```

### Build Commands
- **Before**: `gridsome build`
- **After**: `npm run build` (which runs `vite build`)

## Benefits of Migration

1. **Future-proof**: Using actively maintained technologies
2. **Performance**: Significantly faster development and builds
3. **Developer Experience**: Better tooling and TypeScript support
4. **Maintainability**: Cleaner, more modern code structure
5. **Scalability**: Easier to add new features and maintain

## Rollback Plan

If you need to rollback to the old system:
1. Checkout the previous commit before migration
2. Run `yarn install` to restore old dependencies
3. Use `yarn develop` and `yarn build` as before

## Support

For questions about the migration or the new setup, please refer to:
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
