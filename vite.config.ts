import vue from '@vitejs/plugin-vue'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// @ts-ignore: nodejs的全局变量
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore VantResolver
  plugins: [vue(), Components({ resolvers: [VantResolver()] })],
  resolve: {
    alias: {
      // @ts-ignore: nodejs的全局变量
      "@": path.resolve(__dirname, './src')
    }
  },
})
