// ============================================================
//  後台 API 呼叫層：集中處理 token 與錯誤
// ============================================================
import { url } from "../lib/paths";

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
	if (!r.ok) throw new Error("密碼錯誤");
	const { token } = await r.json();
	setToken(token);
	return token;
}

export async function fetchArticles() {
	const r = await fetch(url("/api/articles"));
	if (!r.ok) throw new Error("讀取失敗");
	return r.json();
}

// 取單篇完整資料（含內文區塊），用於編輯時帶入表單
export async function fetchArticle(slug) {
	const r = await fetch(url(`/api/articles/${slug}`));
	if (!r.ok) throw new Error("讀取文章失敗");
	return r.json();
}

export async function updateArticle(id, formData) {
	const r = await fetch(url(`/api/articles/${id}`), {
		method: "PUT",
		headers: { Authorization: `Bearer ${getToken()}` },
		body: formData,
	});
	if (r.status === 401) {
		clearToken();
		throw new Error("登入已失效，請重新登入");
	}
	if (!r.ok) {
		const e = await r.json().catch(() => ({}));
		throw new Error(e.error || "更新失敗");
	}
	return r.json();
}

export async function createArticle(formData) {
	const r = await fetch(url("/api/articles"), {
		method: "POST",
		headers: { Authorization: `Bearer ${getToken()}` }, // 不要手動設 Content-Type，讓瀏覽器帶 multipart 邊界
		body: formData,
	});
	if (r.status === 401) {
		clearToken();
		throw new Error("登入已失效，請重新登入");
	}
	if (!r.ok) {
		const e = await r.json().catch(() => ({}));
		throw new Error(e.error || "發布失敗");
	}
	return r.json();
}

export async function deleteArticle(id) {
	const r = await fetch(url(`/api/articles/${id}`), {
		method: "DELETE",
		headers: { Authorization: `Bearer ${getToken()}` },
	});
	if (r.status === 401) {
		clearToken();
		throw new Error("登入已失效，請重新登入");
	}
	if (!r.ok) throw new Error("刪除失敗");
	return r.json();
}
