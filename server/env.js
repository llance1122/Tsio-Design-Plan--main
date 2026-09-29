// ============================================================
//  環境設定的單一入口：讀取 server/.env，並整理出網站子路徑 BASE_PATH
//  後端（config.js）、前端打包（vite.config.js）與 react-router.config.js
//  都從這裡取 BASE_PATH，三邊永遠一致。
// ============================================================
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 讀取 server/.env（Node 20.12+ 內建，不需 dotenv 套件）。
// 檔案不存在時沿用環境變數或預設值（Docker 由 docker-compose 傳入環境變數）
try {
	process.loadEnvFile(path.join(__dirname, ".env"));
} catch {
	// 沒有 server/.env 是正常情況（Docker、或本機直接用預設值）
}

// 子路徑前綴：整個網站掛在此路徑下（如 "/tsio-design"）。留空 = 網域根目錄。
// 統一成 "" 或 "/xxx"（去掉結尾斜線）
export const BASE_PATH = (process.env.BASE_PATH || "").replace(/\/+$/, "");
