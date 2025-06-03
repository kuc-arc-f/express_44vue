import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//
export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [vue()],
      define: {
        "process.env.NODE_ENV": '"production"',
      }, 
      build: {
        lib: {
          entry: [
            './src/main.ts',
          ],
          formats: ['es'],
          fileName: '[name]',
        },
        rollupOptions: {
          output: {
            dir: './public/static'
          }
        },
        emptyOutDir: false,
        copyPublicDir: false
      }
    }
  } else {
    return {
      plugins: [vue()]
    }
  }
})
