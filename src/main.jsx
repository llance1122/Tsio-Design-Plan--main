import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyMotionVars } from "./config/motion.js";
import { applySpacingVars } from "./config/spacing.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
// 首頁是最常見的入口，直接打包進主程式；其餘頁面用到才下載（見下方 page()）
import Main from "./index_component/Main.jsx";

// 延遲載入：每頁各自打包成一個小檔，訪客開首頁時不必下載其他頁（尤其是後台）的程式
const page = (load) => () => load().then((m) => ({ Component: m.default }));

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />, // App 內含 <Outlet />，負責渲染下面的 children
			HydrateFallback: () => null, // 直接開子頁網址時，頁面程式下載完成前先不顯示內容
			children: [
				{ index: true, element: <Main /> },
				{ path: "About", lazy: page(() => import("./routers/AboutPage.jsx")) },
				{ path: "Enroll", lazy: page(() => import("./routers/EnrollPage.jsx")) },
				{ path: "Contact", lazy: page(() => import("./routers/ContactPage.jsx")) },
				{
					path: "Articles",
					children: [
						{ index: true, lazy: page(() => import("./routers/ArticlesPage.jsx")) },
						{
							path: ":articleId",
							lazy: page(() => import("./routers/SingleArticlePage.jsx")),
						},
					],
				},
				{
					path: "Plan",
					children: [
						{ index: true, lazy: page(() => import("./routers/PlanPage.jsx")) },
						{
							path: "ExhibitionList",
							lazy: page(() => import("./routers/PlanFolder/ExhibitionListPage.jsx")),
						},
						{
							path: "ExhibitionList/:exhibitionId",
							lazy: page(() => import("./routers/PlanFolder/ExhibitionDetailPage.jsx")),
						},
						{ path: "Market", lazy: page(() => import("./routers/PlanFolder/MarketPage.jsx")) },
						{ path: "Lecture", lazy: page(() => import("./routers/PlanFolder/LecturePage.jsx")) },
						{
							path: "Other",
							lazy: page(() => import("./routers/PlanFolder/OtherActivitiesPage.jsx")),
						},
						{ path: "Workshop", lazy: page(() => import("./routers/PlanFolder/WorkshopPage.jsx")) },
						{
							path: "Workshop/List",
							lazy: page(() => import("./routers/PlanFolder/WorkshopListPage.jsx")),
						},
						{
							path: "Workshop/:workshopId",
							lazy: page(() => import("./routers/PlanFolder/SingleWorkshopPage.jsx")),
						},
					],
				},
				{ path: "*", lazy: page(() => import("./routers/NotFoundPage.jsx")) },
			],
		},
		{
			// 後台：/admin（不套用主站 App 版面，不含 Nav / Footer）
			path: "/admin",
			HydrateFallback: () => null,
			lazy: page(() => import("./admin/AdminApp.jsx")),
		},
	],
	{
		basename: import.meta.env.BASE_URL.replace(/\/+$/, "") || "/",
	},
);

// 啟動時把 motion / spacing token 注入成 CSS 變數，讓 Tailwind class 的 var() 生效
applyMotionVars();
applySpacingVars();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
