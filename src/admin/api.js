// ============================================================
//  後台 API 呼叫層：集中處理 token 與錯誤
// ============================================================
import { url } from "../lib/paths";

// 讀取文章與前台共用同一份實作
export { fetchArticles, fetchArticle } from "../lib/articles";

const TOKEN_KEY = "tsio_admin_token";

export function getToken() {
	return sessionStorage.getItem(TOKEN_KEY);
}
export function setToken(t) {
	sessionStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
	sessionStorage.removeItem(TOKEN_KEY);
}

export async function login(password) {
	const r = await fetch(url("/api/login"), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ password }),
	});
	if (r.status === 429) {
		const e = await r.json().catch(() => ({}));
		throw new Error(e.error || "嘗試次數過多，請稍後再試");
	}
	if (!r.ok) throw new Error("密碼錯誤");
	const { token } = await r.json();
	setToken(token);
	return token;
}

// 需要登入的請求：自動帶 token；401 時清掉 token，讓畫面回到登入頁
async function authFetch(path, options, failMsg) {
	const r = await fetch(url(path), {
		...options,
		// 不要手動設 Content-Type，上傳表單時讓瀏覽器自己帶 multipart 邊界
		headers: { Authorization: `Bearer ${getToken()}` },
	});
	if (r.status === 401) {
		clearToken();
		throw new Error("登入已失效，請重新登入");
	}
	if (!r.ok) {
		const e = await r.json().catch(() => ({}));
		throw new Error(e.error || failMsg);
	}
	return r.json();
}

export const createArticle = (formData) =>
	authFetch("/api/articles", { method: "POST", body: formData }, "發布失敗");

export const updateArticle = (id, formData) =>
	authFetch(`/api/articles/${id}`, { method: "PUT", body: formData }, "更新失敗");

export const deleteArticle = (id) =>
	authFetch(`/api/articles/${id}`, { method: "DELETE" }, "刪除失敗");
