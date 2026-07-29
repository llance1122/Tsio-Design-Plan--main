import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { reveal, REVEAL_SELECTOR } from "../config/motion";

// ============================================================
//  useScrollReveal
//  共用進場動畫 hook，取代各頁重複的 ScrollReveal().reveal(...)。
//  參數預設讀 config/motion.js 的 token，需要客製時再傳入覆寫。
//
//  用法：
//    useScrollReveal();                       // 套用預設 .headline 進場
//    useScrollReveal(".card");                // 換選擇器
//    useScrollReveal(".card", { delay: 200 }); // 覆寫部分參數
// ============================================================
export default function useScrollReveal(selector = REVEAL_SELECTOR, overrides) {
	useEffect(() => {
		ScrollReveal().reveal(selector, { ...reveal, ...overrides });
	}, [selector, overrides]);
}
