// ============================================================
//  文章的共用小工具：連結與封面（首頁、文章總覽、文章內頁共用）
//  文章資料本身由各頁的 loader 在伺服器端讀取（見 server/articles.js）
// ============================================================
import { url } from "./paths";
// 沒上傳海報時的預設圖：列表卡片與內頁大圖用同一張，避免「列表一張、內頁另一張」的錯覺
import defaultCover from "../assets/imgs/default-cover.webp";

export const articleLink = (article) => `/Articles/${article.slug}`;

// 海報網址要接上網站 base；沒有海報就用預設圖
export const articleCover = (article) =>
	article.cover ? url(article.cover) : defaultCover;
