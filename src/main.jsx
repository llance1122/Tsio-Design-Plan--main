import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyMotionVars } from "./config/motion.js";
import { applySpacingVars } from "./config/spacing.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import AboutPage from "./routers/AboutPage.jsx";
import PlanPage from "./routers/PlanPage.jsx";
import EnrollPage from "./routers/EnrollPage.jsx";
import ContactPage from "./routers/ContactPage.jsx";
import ArticlesPage from "./routers/ArticlesPage.jsx";
import SingleArticlePage from "./routers/SingleArticlePage.jsx";
import NotFoundPage from "./routers/NotFoundPage.jsx";

// 引入你的主頁面元件
import Main from "./index_component/Main.jsx";

// 引入你的所有活動子頁面元件
import ExhibitionPage from "./routers/PlanFolder/ExhibitionPage.jsx";
import WorkshopPage from "./routers/PlanFolder/WorkshopPage.jsx";
import SingleWorkshopPage from "./routers/PlanFolder/SingleWorkshopPage.jsx";
import MarketPage from "./routers/PlanFolder/MarketPage.jsx";
import LecturePage from "./routers/PlanFolder/LecturePage.jsx";
import OtherActivitiesPage from "./routers/PlanFolder/OtherActivitiesPage.jsx";
import WorkshopListPage from "./routers/PlanFolder/WorkshopListPage.jsx";
import ExhibitionListPage from "./routers/PlanFolder/ExhibitionListPage.jsx";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />, // App 應該包含 <Outlet /> 來渲染其 children
			children: [
				{
					index: true,
					element: <Main />, // 根路徑 /
				},
				{
					path: "About",
					element: <AboutPage />,
				},
				{
					path: "Enroll",
					element: <EnrollPage />,
				},
				{
					path: "Contact",
					element: <ContactPage />,
				},
				{
					path: "Articles",
					children: [
						{ index: true, element: <ArticlesPage /> },
						{ path: ":articleId", element: <SingleArticlePage /> },
					],
				},
				{
					path: "Plan", // 總父路由，用於所有 Plan 相關的 URL
					children: [
						{
							index: true, // /Plan 路由
							element: <PlanPage />,
						},
						{
							path: "ExhibitionList",
							element: <ExhibitionListPage />,
						},
						{
							path: "ExhibitionList/2024-E001",
							element: <ExhibitionPage />,
						},
						{
							path: "Market",
							element: <MarketPage />,
						},
						{
							path: "Lecture",
							element: <LecturePage />,
						},
						{
							path: "Other",
							element: <OtherActivitiesPage />,
						},
						{
							path: "Workshop",
							element: <WorkshopPage />,
						},
						{
							path: "Workshop/List",
							element: <WorkshopListPage />,
						},
						{
							path: "Workshop/:workshopId",
							element: <SingleWorkshopPage />,
						},
					],
				},
				{
					path: "*",
					element: <NotFoundPage />,
				},
			],
		},
	],
	{
		basename: "/Tsio_Design",
	}
);

// 啟動時把 motion / spacing token 注入成 CSS 變數，讓 Tailwind class 的 var() 生效
applyMotionVars();
applySpacingVars();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
