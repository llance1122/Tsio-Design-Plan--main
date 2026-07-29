// ============================================================
//  Spacing Design Tokens — 全站唯一版面間距來源
//  改這裡 → 所有「小標題 → 內文」的間距（19 處）全站跟著改
// ============================================================

// ---- 小標題與內文的間距 (px) ----
// 內文是圖片／卡片時用這組（視覺重量大，需要多留白）
export const titleGap = {
	mobile: 60, // <768px
	tablet: 70, // 768–1023px（md）
	desktop: 80, // ≥1024px（lg）
};

// 內文是純文字時用這組（參照工作坊頁 h2→內文的節奏 20/35）
export const titleGapText = {
	mobile: 40, // <768px
	tablet: 50, // 768–1023px（md）
	desktop: 60, // ≥1024px（lg）
};

// ============================================================
//  把 token 注入成「帶斷點」的 CSS 變數，供 mt-[var(--title-gap)] 讀取
//  斷點值無法用 style.setProperty 表達，所以改注入 <style> 標籤
//  於 main.jsx 啟動時（render 前）呼叫一次即可
// ============================================================
export function applySpacingVars() {
	const style = document.createElement("style");
	style.id = "spacing-tokens";
	style.textContent = `
:root { --title-gap: ${titleGap.mobile}px; --title-gap-text: ${titleGapText.mobile}px; }
@media (min-width: 768px) { :root { --title-gap: ${titleGap.tablet}px; --title-gap-text: ${titleGapText.tablet}px; } }
@media (min-width: 1024px) { :root { --title-gap: ${titleGap.desktop}px; --title-gap-text: ${titleGapText.desktop}px; } }
`;
	document.head.appendChild(style);
}
