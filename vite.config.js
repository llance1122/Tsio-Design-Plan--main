import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import articles from "./src/data/article.json" with { type: "json" };
import { SITE, PAGES, articlePages, pageTitle } from "./src/config/pages.js";

// 按 o 開瀏覽器時改用 Edge（Vite 的 open 套件會讀這個環境變數）
process.env.BROWSER = "msedge";

// ============================================================
//  網站子路徑：與後端共用同一個 BASE_PATH 設定，不必兩邊手動對齊
//  - 本機：讀 server/.env（和後端 server/config.js 讀的是同一個檔）
//  - Docker：docker-compose 以 build args 傳入（來源是專案根目錄的 .env）
//  留空 = 掛在網域根目錄；例如 "/tsio-design" = 掛在 /tsio-design/ 底下
// ============================================================
try {
	process.loadEnvFile("server/.env");
} catch {
	// 沒有 server/.env 就用環境變數或預設值（根目錄）
}
const BASE_PATH = (process.env.BASE_PATH || "").replace(/\/+$/, "");
const BASE = `${BASE_PATH}/`;

const escapeHtml = (s) =>
	String(s)
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

// ============================================================
//  預渲染頁面資訊（頁面清單在 src/config/pages.js）
//  1. NAS 的 Web Station 是 Nginx、沒有 SPA fallback，/Plan/xxx 直接開會 404。
//     替每一頁建同名資料夾放 index.html，Nginx 就找得到實體檔案，
//     載入後再交給 react-router 顯示對應頁面。
//  2. 每頁的 index.html 寫入各自的 description、og:* 標籤（瀏覽器分頁標題固定為網站名），
//     分享連結時 LINE / FB 會抓到該頁的標題與預覽圖（它們不執行 JS，只讀 HTML）。
//  3. 預覽圖自動裁成 1200×630 jpg，輸出到 dist/og/。
// ============================================================
function prerenderPages() {
	let root;
	let outDir;
	return {
		name: "prerender-pages",
		apply: "build",
		configResolved(config) {
			root = config.root;
			outDir = path.resolve(root, config.build.outDir);
		},
		async closeBundle() {
			const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
			const ogImages = new Map(); // 原圖路徑 → 網址，同一張圖只轉一次
			fs.mkdirSync(path.join(outDir, "og"), { recursive: true });

			// focus：裁切的水平重心，0 = 靠左、0.5 = 置中、1 = 靠右
			async function ogImage(src, focus = 0.5) {
				const key = `${src}@${focus}`;
				if (ogImages.has(key)) return ogImages.get(key);
				const name = src.replace(/^src\/assets\//, "").replace(/[\\/]/g, "-").replace(/\.\w+$/, "");
				const file = focus === 0.5 ? `${name}.jpg` : `${name}-f${Math.round(focus * 100)}.jpg`;

				const img = sharp(path.resolve(root, src));
				const { width, height } = await img.metadata();
				// 先依重心切出 1200:630 的範圍，再縮成 1200×630
				const cropW = Math.min(width, Math.round((height * 1200) / 630));
				const cropH = Math.min(height, Math.round((width * 630) / 1200));
				const left = Math.min(width - cropW, Math.max(0, Math.round(width * focus - cropW / 2)));
				const top = Math.round((height - cropH) / 2);
				await img
					.extract({ left, top, width: cropW, height: cropH })
					.resize(1200, 630)
					.jpeg({ quality: 82, mozjpeg: true })
					.toFile(path.join(outDir, "og", file));

				const href = `${SITE.url}/og/${file}`;
				ogImages.set(key, href);
				return href;
			}

			for (const page of [...PAGES, ...articlePages(articles)]) {
				const title = pageTitle(page.title);
				const description = page.description || SITE.description;
				const image = await ogImage(page.image || SITE.image, page.imageFocus);
				// Nginx 會把 /About 導到 /About/，這裡用導向後的網址
				const pageUrl = SITE.url + (page.path === "/" ? "/" : `${page.path}/`);
				const head = [
					`<title>${escapeHtml(SITE.name)}</title>`,
					`<meta name="description" content="${escapeHtml(description)}" />`,
					page.noindex && `<meta name="robots" content="noindex" />`,
					`<meta property="og:type" content="website" />`,
					`<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
					`<meta property="og:title" content="${escapeHtml(title)}" />`,
					`<meta property="og:description" content="${escapeHtml(description)}" />`,
					`<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
					`<meta property="og:image" content="${escapeHtml(image)}" />`,
					`<meta property="og:image:width" content="1200" />`,
					`<meta property="og:image:height" content="630" />`,
					`<meta name="twitter:card" content="summary_large_image" />`,
				]
					.filter(Boolean)
					.join("\n    ");
				const html = template.replace(/<title>.*?<\/title>/s, head);

				const dir = path.join(outDir, page.path);
				fs.mkdirSync(dir, { recursive: true });
				fs.writeFileSync(path.join(dir, "index.html"), html);
			}
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), prerenderPages()],
	// 由上方 BASE_PATH 決定（router basename、API 網址會自動跟著變）
	base: BASE,
	server: {
		host: true,
		// 開發時把 API 與上傳圖片的請求轉給後端（server/index.js，預設 3001 埠）
		// 路徑要帶上 base，子路徑部署時才轉得到（後端也掛在同一個前綴下）
		proxy: {
			[`${BASE}api`]: "http://localhost:3001",
			[`${BASE}uploads`]: "http://localhost:3001",
		},
	},
});
