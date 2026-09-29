// ============================================================
//  後端設定：集中管理埠號、密碼、路徑等
//  正式環境的密碼／密鑰請放在 server/.env 或 Docker 的 .env（都不會進 git）
// ============================================================
import path from "node:path";
import { fileURLToPath } from "node:url";
// env.js 會先讀取 server/.env，所以下面的 process.env 已經包含檔案裡的設定
export { BASE_PATH } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = Number(process.env.PORT) || 3001;

// 後台登入密碼：正式環境務必覆寫
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234";

// 簽發登入 token 用的密鑰：正式環境務必換成隨機長字串
export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-please-change";

// 資料與檔案路徑
// DATA_DIR：資料庫與上傳圖片的存放目錄。
//  - 本機開發：預設 server/ 目錄
//  - Docker 部署：設成掛載的 volume（如 /data），讓資料在重建容器後保留
const DATA_DIR = process.env.DATA_DIR || __dirname;
export const DB_PATH = path.join(DATA_DIR, "data.db");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

// react-router build 的輸出：
//  client = 瀏覽器端的程式、圖片與預先產生好的頁面；server = 伺服器端渲染程式
export const BUILD_DIR = path.join(__dirname, "..", "build");
