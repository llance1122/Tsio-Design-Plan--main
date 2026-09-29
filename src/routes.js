import { index, layout, route } from "@react-router/dev/routes";
import exhibitions from "./data/exhibitions.json";

// ============================================================
//  路由表：網址 → 頁面檔案（路徑相對於 src/）
//
//  - layout("App.jsx")：主站外框（Nav + 內容 + Footer），底下的頁面都套用
//  - 後台 /admin 不在外框裡，有自己的版面
//  - 每個頁面檔可以匯出 meta（分享資訊）、loader（伺服器端讀資料）
//
//  新增頁面：在這裡加一行 route()，內容固定的頁面再到 react-router.config.js 加進 prerender。
// ============================================================
export default [
	layout("App.jsx", [
		index("index_component/Main.jsx"),
		route("About", "routers/AboutPage.jsx"),
		route("Enroll", "routers/EnrollPage.jsx"),
		route("Contact", "routers/ContactPage.jsx"),
		route("Articles", "routers/ArticlesPage.jsx"),
		route("Articles/:articleId", "routers/SingleArticlePage.jsx"),
		route("Plan", "routers/PlanPage.jsx"),
		route("Plan/ExhibitionList", "routers/PlanFolder/ExhibitionListPage.jsx"),
		// 每檔展覽的版面差異大，各自一個頁面檔，檔名 = 展覽 id（見 exhibitions.json）
		...exhibitions.map((e) =>
			route(`Plan/ExhibitionList/${e.id}`, `routers/PlanFolder/exhibitions/${e.id}.jsx`),
		),
		route("Plan/Workshop", "routers/PlanFolder/WorkshopPage.jsx"),
		route("Plan/Workshop/List", "routers/PlanFolder/WorkshopListPage.jsx"),
		route("Plan/Workshop/:workshopId", "routers/PlanFolder/SingleWorkshopPage.jsx"),
		route("Plan/Market", "routers/PlanFolder/MarketPage.jsx"),
		route("Plan/Lecture", "routers/PlanFolder/LecturePage.jsx"),
		route("Plan/Other", "routers/PlanFolder/OtherActivitiesPage.jsx"),
		route("*", "routers/NotFoundPage.jsx"),
	]),
	route("admin", "admin/AdminApp.jsx"),
];
