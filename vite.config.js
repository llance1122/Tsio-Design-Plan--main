import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { BASE_PATH } from "./server/env.js";

// ============================================================
//  前端打包設定
//  - reactRouter()：React Router 框架模式（路由在 src/routes.js、頁面產生方式在 react-router.config.js）
//  - imagetools()：讓圖片 import 可以帶參數即時裁切／轉檔，
//    例如分享預覽圖：import og from "./x.webp?w=1200&h=630&fit=cover&format=jpg"
//  - base：網站子路徑，與後端共用 server/env.js 的 BASE_PATH
// ============================================================
export default defineConfig({
	base: `${BASE_PATH}/`,
	plugins: [
		tailwindcss(),
		reactRouter(),
		imagetools({
			// 圖片網址帶 ?og 時：裁成 1200×630 的 jpg，當作 LINE / FB 分享預覽圖
			defaultDirectives: (url) =>
				url.searchParams.has("og")
					? new URLSearchParams({ w: "1200", h: "630", fit: "cover", format: "jpg", quality: "82" })
					: new URLSearchParams(),
		}),
	],
});
