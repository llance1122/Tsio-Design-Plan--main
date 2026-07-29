// ============================================================
//  一次性匯入：把現有的 src/data/article.json 搬進 SQLite
//  可重複執行——slug（= 原始 id）已存在的會自動略過，不會重複匯入
//  用法： npm run import:articles
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "src", "data", "article.json");

const articles = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const insert = db.prepare(
	`INSERT OR IGNORE INTO articles (slug, title, description, date, location, cover, blocks, created_at)
	 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
);

let added = 0;
articles.forEach((a, i) => {
	// 只保留 subtitle / paragraph 區塊；title / heroImage / date 改由上層欄位表示
	const blocks = (a.newsContent || [])
		.filter((b) => b.type === "subtitle" || b.type === "paragraph")
		.map((b) => ({ type: b.type, content: b.content }));

	// 以遞增秒數保留原始檔案順序（列表以 created_at 排序）
	const createdAt = `2025-01-01 00:00:${String(i).padStart(2, "0")}`;

	const info = insert.run(
		a.id, // slug = 原始 id，保留舊網址（/Articles/ALUM-A001）
		a.title,
		a.description || "",
		a.date || "",
		a.location || "",
		null, // cover：原本是佔位圖，先留空，前端用預設圖
		JSON.stringify(blocks),
		createdAt
	);
	if (info.changes) added++;
});

const total = db.prepare("SELECT COUNT(*) AS n FROM articles").get().n;
console.log(`匯入完成：新增 ${added} 篇（已存在的略過），目前資料庫共 ${total} 篇。`);
