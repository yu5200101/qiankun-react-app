import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import qiankun from 'vite-plugin-qiankun';
import path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // 加载所有变量（包括非 VITE_ 前缀）
  return {
    plugins: [
      cssInjectedByJsPlugin(),
      // 开发模式下关闭  react-refresh
      process.env.NODE_ENV === 'development' ? null : react(),
      qiankun('react-sub-app', { useDevMode: true }) // 子应用名称需与主应用注册一致
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      port: 3001,
      cors: true, // 允许跨域
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    base: process.env.NODE_ENV === 'production' ? `${env.VITE_BACKEND_URL}/react` : '/' // 使用 loadEnv 加载的变量
  }
})
