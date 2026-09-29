import { Outlet, useLocation } from "react-router";

// ============================================================
//  PageTransition
//  換頁進場動畫：切換路由時，整頁內容淡入 + 微微上浮，
//  手感刻意對齊 ScrollReveal 的 .headline（同一組 motion token）。
//
//  重點說明：
//  - key={pathname}：換路由時強制重新掛載，CSS animation 才會重新播放。
//    （沒有 key 的話元素不會重建，動畫只會在第一次載入時跑一次。）
//  - 動畫本體是 App.css 的 .page-enter，參數讀 config/motion.js
//    注入的 --page-enter-* 變數，要調快慢／幅度改那邊即可。
//  - Nav 與 Footer 留在 App.jsx 的外層、不包進來，
//    換頁時只有內容區在動，導覽列不會跟著閃。
//
//  className：把原本掛在 <Outlet /> 位置上的排版 class 傳進來，
//  避免多包一層 div 影響外層 space-y 的節奏。
// ============================================================
export default function PageTransition({ className = "" }) {
	const { pathname } = useLocation();

	return (
		<div key={pathname} className={`page-enter ${className}`}>
			<Outlet />
		</div>
	);
}
