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
