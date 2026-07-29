// ============================================================
//  Express 入口
//  一支服務同時處理：登入 / 文章 API / 上傳圖片 / 前端網站
//  本機開發：前端跑 vite(5181)，透過 proxy 打到這裡(3001)
//  正式環境：只跑這支，直接吐打包後的 dist
// ============================================================
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { PORT, UPLOAD_DIR, DIST_DIR } from "./config.js";
import { verifyPassword, issueToken } from "./auth.js";
import articlesRouter from "./routes/articles.js";

// 確保 uploads 資料夾存在
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.use(express.json());

// ---- 登入 ----
app.post("/api/login", (req, res) => {
	const { password } = req.body || {};
	if (!verifyPassword(password)) {
		return res.status(401).json({ error: "密碼錯誤" });
	}
	res.json({ token: issueToken() });
});

// ---- 文章 API ----
app.use("/api/articles", articlesRouter);

// ---- 上傳的圖片（靜態）----
app.use("/uploads", express.static(UPLOAD_DIR));

// ---- 前端網站（正式環境才有 dist）----
if (fs.existsSync(DIST_DIR)) {
	app.use(express.static(DIST_DIR));
	// SPA fallback：非 API / uploads 的 GET 一律回 index.html，
	// 讓 react-router 的深層網址重新整理也不會 404
	app.use((req, res, next) => {
		if (req.method !== "GET") return next();
		if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) return next();
		res.sendFile(path.join(DIST_DIR, "index.html"));
	});
}

// ---- 上傳／驗證等錯誤的統一處理 ----
app.use((err, req, res, next) => {
	console.error(err);
	res.status(400).json({ error: err.message || "伺服器錯誤" });
});

app.listen(PORT, () => {
	console.log(`後端已啟動： http://localhost:${PORT}`);
});
