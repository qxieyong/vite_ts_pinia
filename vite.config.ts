import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// gzip压缩
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    //hmr: { overlay: false },
    https: false, // 是否开启 https
    open: false, // 是否自动在浏览器打开
    port: 5174, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      threshold: 1024 * 1024 * 5 // 对大于 5MB 的文件进行压缩
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/scss';`
      }
    }
  }
})
