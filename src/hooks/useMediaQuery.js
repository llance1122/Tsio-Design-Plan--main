import { useCallback, useSyncExternalStore } from "react";

// ============================================================
//  useMediaQuery
//  回傳 CSS media query 目前是否成立，視窗尺寸改變時自動更新。
//  全站判斷「手機／平板／桌機」都走這支，取代各頁各自監聽 resize。
//
//  用法：
//    const isMobile = useMediaQuery(BREAKPOINTS.mobile);
//    const isLg = useMediaQuery("(min-width: 1024px)");
// ============================================================

// 常用斷點（對齊 Tailwind：md = 768px、lg = 1024px）
export const BREAKPOINTS = {
	mobile: "(max-width: 768px)", // 手機（含 768 本身，沿用各頁原本的判斷）
	tabletDown: "(max-width: 1024px)", // 手機 + 平板
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
};

export default function useMediaQuery(query) {
	const subscribe = useCallback(
		(onChange) => {
			const mql = window.matchMedia(query);
			mql.addEventListener("change", onChange);
			return () => mql.removeEventListener("change", onChange);
		},
		[query],
	);
	return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}
