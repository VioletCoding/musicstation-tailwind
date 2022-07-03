import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// @ts-ignore: nodejs的全局变量
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @ts-ignore: nodejs的全局变量
      "@": path.resolve(__dirname, './src')
    }
  },
})
