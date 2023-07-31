import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  base:'./',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
      { find: /^~/, replacement: '' }
    ],
    extensions: ['.js', '.mjs', '.vue', '.json', '.less', '.css'],
  },
  define: { 'process.env': {} },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  dev: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      }
    },
  },
  build: {
    outDir: 'vitebuild',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      }
    }
  }
}))
