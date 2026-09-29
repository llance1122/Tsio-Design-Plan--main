import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import appCss from "./App.css?url";
import { motionCssVars } from "./config/motion";
import { spacingCssVars } from "./config/spacing";

// ============================================================
//  整份 HTML 的外框（取代原本的 index.html + main.jsx）
//  每一頁的 HTML 都從這裡長出來：<head> 放樣式與各頁的 meta，<body> 放頁面內容
// ============================================================

// 不顯示分頁 logo：用 1×1 透明圖，避免瀏覽器改抓 /favicon.ico 而顯示預設圖示
const BLANK_ICON =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const links = () => [
	{ rel: "icon", href: BLANK_ICON },
	{ rel: "stylesheet", href: appCss },
];

// 動畫與間距參數直接寫進 <head>，頁面一出現樣式就正確
const TOKENS_CSS = `${motionCssVars()}\n${spacingCssVars()}`;

// JS 有執行才啟用「捲動進場」的先隱藏效果（見 App.css 的 .js-reveal）
const REVEAL_FLAG = `document.documentElement.classList.add("js-reveal")`;

export function Layout({ children }) {
	return (
		// suppressHydrationWarning：上面那行腳本會在 React 接手前改動 <html> 的 class
		<html lang="zh-Hant" suppressHydrationWarning>
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<style dangerouslySetInnerHTML={{ __html: TOKENS_CSS }} />
				<script dangerouslySetInnerHTML={{ __html: REVEAL_FLAG }} />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function Root() {
	return <Outlet />;
}

// 非預期錯誤（例如資料庫讀取失敗）時顯示的畫面
export function ErrorBoundary({ error }) {
	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: "網站發生錯誤，請稍後再試。";
	if (import.meta.env.DEV && error instanceof Error) console.error(error);
	return (
		<main className="w-full mx-auto px-[40px] mt-[25vh] text-center space-y-[30px]">
			<h1 className="heading-bold lg:heading-bold-web">{message}</h1>
			<a href={import.meta.env.BASE_URL} className="bodyText underline">
				回首頁
			</a>
		</main>
	);
}
