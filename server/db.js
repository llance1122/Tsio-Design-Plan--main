// ============================================================
//  資料庫層：使用 Node 24 內建的 SQLite（node:sqlite）
//  免安裝、免編譯原生模組，Windows 與 Docker(Linux) 皆通用
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { DB_PATH } from "./config.js";

// 確保資料庫所在目錄存在（Docker 掛載 volume 時尤其重要）
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);

// WAL 模式：讀寫並行更順、也較不易鎖檔
db.exec("PRAGMA journal_mode = WAL;");

// 文章表
//  - id       ：自動編號（不再用字串規則判斷型別）
//  - slug     ：網址用（匯入的舊文章沿用原始 id 以保留舊連結）
//  - blocks   ：內文區塊陣列（subtitle / paragraph）存成 JSON 字串
//  - cover    ：上傳海報的網址路徑，可為 NULL（前端會退回預設圖）
//  - created_at：建立時間，用於排序（新→舊）
db.exec(`
CREATE TABLE IF NOT EXISTS articles (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  date        TEXT NOT NULL DEFAULT '',
  location    TEXT NOT NULL DEFAULT '',
  cover       TEXT,
  blocks      TEXT NOT NULL DEFAULT '[]',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

export default db;
