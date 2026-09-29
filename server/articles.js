// ============================================================
//  文章資料存取（只在伺服器端執行）
//  文章 API（routes/articles.js）與網頁的伺服器端渲染（index.js 的 getLoadContext）
//  共用這一份，查詢邏輯只寫一次。
// ============================================================
import db from "./db.js";

// 列表：不含內文，依建立時間新→舊
export function listArticles() {
	return db
		.prepare(
			"SELECT id, slug, title, description, date, location, cover, created_at FROM articles ORDER BY created_at DESC, id DESC"
		)
		.all();
}

// 單篇（含內文區塊）。column 只會是程式內寫死的 "slug" 或 "id"
export function findArticle(column, value) {
	const row = db.prepare(`SELECT * FROM articles WHERE ${column} = ?`).get(value);
	if (row) row.blocks = JSON.parse(row.blocks);
	return row;
}

export const getArticleBySlug = (slug) => findArticle("slug", slug);
