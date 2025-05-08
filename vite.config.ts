import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// gzip压缩
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    return {
        server: {
            //hmr: { overlay: false },
            https: false, // 是否开启 https
            open: false, // 是否自动在浏览器打开
            port: 5174, // 端口号
            host: "0.0.0.0",
            proxy: {
                [env.VITE_BASE_URL]: {
                    target: env.VITE_PROXY_TARGET,
                    changeOrigin: true,
                    secure: false, // 如果是https接口，需要配置这个参数
                    // ws: true, //websocket支持
                    rewrite: (path) => path.replace(new RegExp(`^${env.VITE_BASE_URL}`), '')
                },
            },
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                    ElementPlusResolver()
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            viteCompression({
                threshold: 1024 * 1024 * 5 // 对大于 5MB 的文件进行压缩
            })
        ],
        build: {
            minify: 'terser',
            terserOptions: mode === 'production' ? {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            } : {},
            rollupOptions: {
                output: {
                    entryFileNames: "js/[name]-[hash].js",  //入口js文件存放
                    chunkFileNames: "js/[name]-[hash].js", //其他js文件存放
                    assetFileNames(assetInfo) { //其他文件的配置
                        if (assetInfo.name.endsWith('.css')) {
                            return 'css/[name]-[hash].css';
                        }
                        const imgExts = ['.png', '.jpg', '.jpeg', 'webp', '.svg', '.gif', '.ico'];
                        if (imgExts.some(ext => assetInfo.name.endsWith(ext))) {
                            return 'img/[name]-[hash].[ext]';
                        }
                        return "assets/[name]-[hash].[ext]"
                    },
                    manualChunks(id) {
                        console.log(id);
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }

            }
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
					additionalData: `@use '@/assets/scss' as *;`
				},
            }
        }
    }
})
