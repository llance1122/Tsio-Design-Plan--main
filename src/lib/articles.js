// ============================================================
//  文章資料存取：前台（首頁、文章總覽、單篇）與後台共用
// ============================================================
import { url } from "./paths";
// 沒上傳海報時的預設圖：列表卡片與內頁大圖用同一張，避免「列表一張、內頁另一張」的錯覺
import defaultCover from "../assets/imgs/default-cover.webp";

// 文章列表（不含內文），後端已依建立時間新→舊排序
export async function fetchArticles() {
	const r = await fetch(url("/api/articles"));
	if (!r.ok) throw new Error("讀取失敗");
	return r.json();
}

// 單篇完整資料（含內文區塊）。找不到時丟出 message 為 "notfound" 的錯誤
export async function fetchArticle(slug) {
	const r = await fetch(url(`/api/articles/${slug}`));
	if (r.status === 404) throw new Error("notfound");
	if (!r.ok) throw new Error("讀取文章失敗");
	return r.json();
}

export const articleLink = (article) => `/Articles/${article.slug}`;

// 海報網址要接上網站 base；沒有海報就用預設圖
export const articleCover = (article) =>
	article.cover ? url(article.cover) : defaultCover;
