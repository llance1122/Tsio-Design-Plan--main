// ============================================================
//  後端設定：集中管理埠號、密碼、路徑等
//  正式環境的密碼／密鑰請放在 server/.env（不會進 git）
// ============================================================
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 讀取 server/.env（Node 20.12+ 內建，不需 dotenv 套件）
// 檔案不存在時就沿用下面的預設值（僅適合本機開發）
try {
	process.loadEnvFile(path.join(__dirname, ".env"));
} catch {
	console.warn("[config] 找不到 server/.env，使用預設值（僅限本機開發）");
}

export const PORT = Number(process.env.PORT) || 3001;

// 後台登入密碼：正式環境務必在 .env 覆寫
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234";

// 簽發登入 token 用的密鑰：正式環境務必在 .env 換成隨機長字串
export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-please-change";

// 資料與檔案路徑
export const DB_PATH = path.join(__dirname, "data.db");
export const UPLOAD_DIR = path.join(__dirname, "uploads");
export const DIST_DIR = path.join(__dirname, "..", "dist");
