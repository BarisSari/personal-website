import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue()
  ],
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '~': resolve(process.cwd(), 'src')
    }
  },
  assetsInclude: ['*.md', 'content/**/*.md', 'content/**/*.jpg', 'content/**/*.jpeg', 'content/**/*.png'],
  optimizeDeps: {
    include: ['gray-matter']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          bootstrap: ['bootstrap', 'bootstrap-vue-3']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['..', './content']
    }
  },
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Use modern Sass API
        silenceDeprecations: ['legacy-js-api'] // Silence the deprecation warnings
      }
    }
  }
})
