import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// 按 o 開瀏覽器時改用 Edge（Vite 的 open 套件會讀這個環境變數）
process.env.BROWSER = 'msedge'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Tsio_Design',
  server: {
    host: true
  }
})