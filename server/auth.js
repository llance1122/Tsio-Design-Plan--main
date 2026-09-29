// ============================================================
//  登入驗證：單一管理員密碼 → 簽發 JWT token
//  之後要多帳號時，把 verifyPassword 換成查使用者表即可
// ============================================================
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { ADMIN_PASSWORD, JWT_SECRET } from "./config.js";

// 常數時間比較，避免以回應時間猜密碼（時序攻擊）
function safeEqual(a, b) {
	const ba = Buffer.from(String(a));
	const bb = Buffer.from(String(b));
	if (ba.length !== bb.length) return false;
	return crypto.timingSafeEqual(ba, bb);
}

export function verifyPassword(password) {
	return typeof password === "string" && safeEqual(password, ADMIN_PASSWORD);
}

export function issueToken() {
	// token 有效期（伺服器端上限）。前端用 sessionStorage 保存，
	// 關閉瀏覽器即清除，所以重開後台一定要重新登入。
	return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
}

// 保護需要登入的路由：檢查 Authorization: Bearer <token>
export function requireAuth(req, res, next) {
	const header = req.headers.authorization || "";
	const token = header.startsWith("Bearer ") ? header.slice(7) : null;
	if (!token) return res.status(401).json({ error: "需要登入" });
	try {
		jwt.verify(token, JWT_SECRET);
		next();
	} catch {
		res.status(401).json({ error: "登入已失效，請重新登入" });
	}
}

// ---- 登入失敗次數限制（防暴力猜密碼）----
// 同一個 IP 在 15 分鐘內失敗 5 次，就暫停登入到這段時間結束。
// 只記在記憶體：伺服器重啟會歸零，對單一管理員的小網站已足夠。
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const fails = new Map(); // ip → { count, first }

function currentRecord(ip) {
	const rec = fails.get(ip);
	if (rec && Date.now() - rec.first > WINDOW_MS) {
		fails.delete(ip); // 時間窗已過，重新計算
		return null;
	}
	return rec;
}

// 放在登入路由前：已達上限就直接回 429，不再比對密碼
export function loginGuard(req, res, next) {
	const rec = currentRecord(req.ip);
	if (rec && rec.count >= MAX_FAILS) {
		const minutes = Math.ceil((rec.first + WINDOW_MS - Date.now()) / 60000);
		return res.status(429).json({ error: `嘗試次數過多，請 ${minutes} 分鐘後再試` });
	}
	next();
}

export function recordLoginFailure(ip) {
	const rec = currentRecord(ip);
	if (rec) rec.count += 1;
	else fails.set(ip, { count: 1, first: Date.now() });
}

export function clearLoginFailures(ip) {
	fails.delete(ip);
}
