import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// 按 o 開瀏覽器時改用 Edge（Vite 的 open 套件會讀這個環境變數）
process.env.BROWSER = 'msedge'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 部署在 NAS 的 /tsio-design/ 子路徑下（只有 443 可用，用路徑分流）。
  // 若改到別的路徑或根目錄，這裡與後端的 BASE_PATH 要一起改。
  base: '/tsio-design/',
  server: {
    host: true,
    // 開發時把 API 與上傳圖片的請求轉給後端（server/index.js，預設 3001 埠）
    // 後端已原生服務 /tsio-design 前綴，故原樣轉發、不需改寫路徑
    proxy: {
      '/tsio-design/api': 'http://localhost:3001',
      '/tsio-design/uploads': 'http://localhost:3001'
    }
  }
})