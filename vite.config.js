import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true
      }
    })
  ],
  build: {
    assetsInlineLimit: 4096, // 小于4KB的图片转Base064内联
    assetsDir: 'static', // 打包后静态资源目录
    rollupOptions: {
      output: {
        // 哈希化文件名（默认已支持，但可自定义格式）
        assetFileNames: 'assets/[name]-[hash:8][extname]',
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        // 拆分代码
        manualChunks: {
          react: ['react', 'react-dom']
          // 可根据需要继续添加其他依赖的拆分
        }
      }
    },
    //在 Vite 中，Tree Shaking 通常是默认开启的，只要你使用的是 ES6 模块系统，并且打包工具支持 Tree Shaking，就可以自动享受这项优化。
    minify: 'esbuild', // 这个配置指定了在构建时使用 esbuild 工具对代码进行压缩。压缩的目的是减少代码体积，例如去除多余的空格、注释，缩短变量名等，从而提升代码在生产环境中的加载速度。
    sourcemap: false // sourcemap 文件的作用是将压缩后的代码映射回原始的源代码，方便在调试时定位问题。设置为 false 意味着不生成 sourcemap 文件，这样可以减小构建产物的体积。
  },
  server: {
    // 配置开发服务器相关选项
    hmr: {
      // 配置热更新相关选项
      protocol: 'ws',
      // 指定热更新使用的协议为 WebSocket（ws）。WebSocket 是一种在单个 TCP 连接上进行全双工通讯的协议，适合用于实时通信场景，热更新通过 WebSocket 实现服务器和客户端之间的实时通信，当代码发生变化时，服务器可以及时将更新信息推送给客户端。
      overlay: false
      // 禁用热更新时的错误覆盖层。默认情况下，当热更新过程中出现错误时，Vite 会在浏览器页面上显示一个错误覆盖层，显示错误信息。将此选项设置为 `false` 后，错误覆盖层将不会显示。
    }
  }
})
