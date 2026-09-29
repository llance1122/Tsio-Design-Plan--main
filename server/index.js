// ============================================================
//  Express 入口：一支服務同時處理
//    登入 / 文章 API / 上傳圖片 / 網站頁面（React Router 伺服器端渲染）
//
//  頁面怎麼產生：
//   - 靜態頁（關於、計畫、展覽…）：打包時就產生好 HTML（build/client/<路徑>/index.html），直接送出
//   - 首頁、文章頁：有人瀏覽時由伺服器即時產生 HTML（內容來自資料庫）
//
//  兩種模式：
//   - npm run dev：開發模式，Vite 掛在這支伺服器裡，改前端程式會即時更新
//   - npm start / Docker：正式模式，使用 react-router build 的輸出
//
//  整站可掛在子路徑（BASE_PATH，如 /tsio-design）下
// ============================================================
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { createRequestHandler } from "@react-router/express";
import { PORT, UPLOAD_DIR, BUILD_DIR, BASE_PATH } from "./config.js";
import {
	verifyPassword,
	issueToken,
	loginGuard,
	recordLoginFailure,
	clearLoginFailures,
} from "./auth.js";
import articlesRouter from "./routes/articles.js";
import { listArticles, getArticleBySlug } from "./articles.js";

const B = BASE_PATH; // "" 或 "/tsio-design"
const isProd = process.env.NODE_ENV === "production" || process.argv.includes("--prod");

// 確保 uploads 資料夾存在
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.disable("x-powered-by");

// ---- 登入 ----
app.post(`${B}/api/login`, express.json(), loginGuard, (req, res) => {
	const { password } = req.body || {};
	if (!verifyPassword(password)) {
		recordLoginFailure(req.ip);
		return res.status(401).json({ error: "密碼錯誤" });
	}
	clearLoginFailures(req.ip);
	res.json({ token: issueToken() });
});

// ---- 文章 API ----
app.use(`${B}/api/articles`, express.json(), articlesRouter);

// ---- 上傳的圖片（靜態）----
app.use(`${B}/uploads`, express.static(UPLOAD_DIR));

// ---- API 的錯誤統一回 JSON（上傳格式不符、檔案太大等）----
app.use(`${B}/api`, (err, req, res, next) => {
	console.error(err);
	res.status(400).json({ error: err.message || "伺服器錯誤" });
});

// ---- 網頁 ----
// 交給頁面 loader 使用的伺服器端資料（例如首頁的最新文章、文章內頁）。
// 頁面程式透過 context 取得，不必自己打 API，也不會把資料庫程式打包進網站。
const getLoadContext = () => ({
	articles: { list: listArticles, get: getArticleBySlug },
});

if (isProd) {
	const CLIENT_DIR = path.join(BUILD_DIR, "client");

	// 打包產生的 JS / CSS / 圖片：檔名含內容雜湊，可以讓瀏覽器長期快取
	app.use(
		`${B}/assets`,
		express.static(path.join(CLIENT_DIR, "assets"), { immutable: true, maxAge: "1y" }),
	);

	// 預先產生的靜態頁：/About → build/client/About/index.html
	// （有子路徑時 React Router 會放在 build/client/<子路徑>/About/index.html）
	const PRERENDER_DIR = path.join(CLIENT_DIR, B);
	app.use(B || "/", (req, res, next) => {
		if (req.method !== "GET" && req.method !== "HEAD") return next();
		const rel = decodeURIComponent(req.path).replace(/^\/+|\/+$/g, "");
		if (rel.includes("..")) return next();
		const file = path.join(PRERENDER_DIR, rel, "index.html");
		if (rel && fs.existsSync(file)) return res.sendFile(file);
		next();
	});

	// 其他打包輸出的檔案（預先產生頁面的 .data 等）
	app.use(B || "/", express.static(CLIENT_DIR, { index: false, redirect: false }));

	// 其餘頁面：伺服器即時渲染
	const build = await import(pathToFileURL(path.join(BUILD_DIR, "server", "index.js")).href);
	app.all("*", createRequestHandler({ build, getLoadContext }));
} else {
	// 開發模式：Vite 以 middleware 形式掛進來（含熱更新），頁面每次請求都用最新程式渲染
	const vite = await import("vite").then((v) =>
		v.createServer({ server: { middlewareMode: true } }),
	);
	app.use(vite.middlewares);
	app.all("*", async (req, res, next) => {
		try {
			const build = await vite.ssrLoadModule("virtual:react-router/server-build");
			return createRequestHandler({ build, getLoadContext })(req, res, next);
		} catch (err) {
			vite.ssrFixStacktrace(err);
			next(err);
		}
	});
}

app.listen(PORT, () => {
	const mode = isProd ? "正式模式" : "開發模式";
	console.log(`網站已啟動（${mode}）： http://localhost:${PORT}${B || ""}/`);
}).on("error", (err) => {
	if (err.code === "EADDRINUSE") {
		console.error(
			`\n${PORT} 埠已經被其他程式佔用（通常是另一個 npm run dev / npm start 還開著）。\n` +
				`請先關掉那個視窗，或在 server/.env 設定 PORT=其他數字 後再啟動。\n`,
		);
		process.exit(1);
	}
	throw err;
});

