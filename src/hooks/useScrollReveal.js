import { useEffect } from "react";
import { useLocation } from "react-router";
import { reveal, REVEAL_SELECTOR } from "../config/motion";

// ============================================================
//  useScrollReveal：捲動進場動畫（取代原本的 ScrollReveal 套件）
//  帶有 .headline 的元素捲進畫面時，由下往上淡入。
//
//  - 在 App.jsx（主站外框）呼叫一次，全站所有頁面都生效，各頁不必再呼叫
//  - 動畫本體是 App.css 的 .js-reveal .headline，參數讀 config/motion.js 的 reveal
//  - 「先隱藏」只在 JS 有執行時才發生（root.jsx 替 <html> 加上 js-reveal），
//    所以搜尋引擎、關掉 JS 的瀏覽器看到的都是完整內容
//  - 使用者系統設定「減少動態效果」時，直接顯示不做動畫
// ============================================================
const REVEALED = "is-revealed";

export default function useScrollReveal() {
	const { pathname } = useLocation();

	useEffect(() => {
		const showAll = () =>
			document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add(REVEALED));

		if (
			!("IntersectionObserver" in window) ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			showAll();
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					// 露出比例達 viewFactor 就觸發；比視窗還高的元素永遠達不到比例，
					// 改用「已佔滿半個視窗」判斷
					const tallEnough = entry.intersectionRect.height >= window.innerHeight * 0.5;
					if (entry.intersectionRatio >= reveal.viewFactor || tallEnough) {
						entry.target.classList.add(REVEALED);
						io.unobserve(entry.target);
					}
				}
			},
			{ threshold: [0, 0.25, 0.5, reveal.viewFactor, 1] },
		);

		const observe = (root) => {
			if (root.matches?.(REVEAL_SELECTOR)) io.observe(root);
			root.querySelectorAll?.(REVEAL_SELECTOR).forEach((el) => io.observe(el));
		};
		observe(document.body);

		// 之後才出現的元素（切換分頁、輪播換頁等）也要接上
		const mo = new MutationObserver((mutations) => {
			for (const m of mutations) m.addedNodes.forEach((n) => n.nodeType === 1 && observe(n));
		});
		mo.observe(document.body, { childList: true, subtree: true });

		return () => {
			io.disconnect();
			mo.disconnect();
		};
	}, [pathname]);
}
