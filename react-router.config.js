import { BASE_PATH } from "./server/env.js";
import exhibitions from "./src/data/exhibitions.json" with { type: "json" };
import workshops from "./src/data/workshops.json" with { type: "json" };

// ============================================================
//  React Router 框架設定：決定每一頁「什麼時候」產生 HTML
//
//  - prerender 清單內的頁面：打包時就產生好 HTML 檔（最快，內容固定的頁面用這個）
//  - 其餘頁面（首頁、文章）：有人瀏覽時由伺服器即時產生（內容來自資料庫，隨時會變）
//
//  新增一個內容固定的頁面時，記得把網址加進 STATIC_PAGES。
//  展覽、工作坊內頁會依 JSON 資料自動加入，不用手動維護。
// ============================================================
const STATIC_PAGES = [
	"/About",
	"/Enroll",
	"/Contact",
	"/Plan",
	"/Plan/ExhibitionList",
	"/Plan/Workshop",
	"/Plan/Workshop/List",
	"/Plan/Market",
	"/Plan/Lecture",
	"/Plan/Other",
];

export default {
	appDirectory: "src",
	buildDirectory: "build",
	basename: BASE_PATH || "/",
	ssr: true,
	prerender: [
		...STATIC_PAGES,
		...exhibitions.map((e) => `/Plan/ExhibitionList/${e.id}`),
		...workshops.map((w) => `/Plan/Workshop/${w.id}`),
	],
};
