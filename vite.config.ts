import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import qiankun from 'vite-plugin-qiankun';
import path from 'path'

export default defineConfig({
  plugins: [
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
  base: process.env.NODE_ENV === 'production' ? import.meta.env.VITE_BACKEND_URL : '/' // 生产环境需固定base
});
