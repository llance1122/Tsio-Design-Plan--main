// ============================================================
//  把後端路徑接上網站 base，讓子路徑部署（如 /tsio-design/）也正確。
//  import.meta.env.BASE_URL 來自 vite.config 的 base（結尾一定有斜線）。
//  例：base="/tsio-design/" 時 url("/api/articles") → "/tsio-design/api/articles"
//     base="/" 時          url("/api/articles") → "/api/articles"
// ============================================================
const BASE = import.meta.env.BASE_URL;

export function url(p) {
	return `${BASE}${String(p).replace(/^\/+/, "")}`;
}
