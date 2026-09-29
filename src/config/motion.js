// ============================================================
//  Motion Design Tokens — 全站唯一動畫參數來源
//  改這裡 → JS 動畫（ScrollReveal / Banner / 輪播）
//           + CSS 變數（Tailwind class 的 hover / Nav / 卡片）全部跟著改
// ============================================================

// ---- 語意化時長 (ms) ----
export const duration = {
	fast: 200, // 小互動：顏色變化（Footer）
	base: 300, // 一般互動：hover 位移、選單滑入、卡片放大
	slow: 1000, // 進場淡入、圖片交叉淡入
	banner: 1400, // 首頁 Banner 擦入
};

// ---- 緩動曲線 ----
export const easing = {
	standard: "ease-in-out",
	wipe: "cubic-bezier(0.77, 0, 0.175, 1)", // 近似 GSAP power3.inOut
	// 過衝一次再回彈的近似彈簧感（僅對位移/縮放/旋轉等 spatial 屬性有效）
	// 想更 Q 彈：把 1.56 調大（如 1.8）；想收斂：調小（如 1.3）
	spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ---- 輪播 / 自動播放間隔 (ms) ----
export const interval = {
	banner: 5000, // Banner 每張停留
	bannerStagger: 0, // 左右欄錯落
	crossfade: 6000, // 手機圖片交叉淡入
};

// ---- 跑馬燈公告（Marquee）----
export const marquee = {
	// 跑完一整輪的時間 (ms)：數字越大跑越慢。
	// 實際速度也受文字長度影響（同樣時間要跑完更長的內容就會變快），
	// 換過公告文字後覺得快慢跑掉，回來微調這一個值即可。
	duration: 32000,
};

// ---- 進場動畫（ScrollReveal，JS 專用）----
export const REVEAL_SELECTOR = ".headline";
export const reveal = {
	duration: duration.slow,
	distance: "20px",
	origin: "bottom",
	easing: easing.spring,
	// 觸發時機：元素露出多少比例才開始動畫（0=露出1px就觸發，1=完全進入才觸發）
	// 覺得太早 → 調大；覺得太晚 → 調小
	viewFactor: 0.7,
	// reset: false, // 需要每次捲回都重播時可打開
};

// ---- 換頁進場（PageTransition，CSS 專用）----
// 切換頁面時整頁淡入＋微微上浮，刻意沿用 reveal 的同一組手感，
// 讓「捲到就淡入」和「換頁就淡入」看起來是同一種語言。
// 想讓換頁更俐落：把 duration 調小（例如 duration.base * 2 = 600）；
// 想讓上浮更明顯：把 distance 調大（例如 "40px"）。
export const pageEnter = {
	duration: reveal.duration,
	distance: reveal.distance,
	easing: reveal.easing,
};

// ---- 首頁散排圖庫捲動視差（JS 專用，ImageGallery）----
// 每張圖以不同速度跟隨捲動，產生前後景深的漂浮感
export const galleryParallax = {
	maxShift: 130, // 平板以上（≥768 散排版型）：速度係數 ±1 時的最大位移 (px)
	maxShiftMobile: 45, // 手機：堆疊排版位移要小，避免圖片互撞
	lerp: 0.08, // 追隨平滑度（越小越黏滯有慣性、越大越即時）
};

// ---- 首頁 Banner 視差擦入（JS 專用）----
export const banner = {
	interval: interval.banner,
	stagger: interval.bannerStagger,
	duration: duration.banner,
	ease: easing.wipe,
	parallaxOffset: "18%", // 內層反向位移量
	initialScale: 1.06, // 進場前縮放
};

// ============================================================
//  把 token 注入成 CSS 變數，供 Tailwind class 以 var() 讀取
//  於 main.jsx 啟動時（render 前）呼叫一次即可
// ============================================================
export function applyMotionVars() {
	const root = document.documentElement.style;
	root.setProperty("--motion-fast", `${duration.fast}ms`);
	root.setProperty("--motion-base", `${duration.base}ms`);
	root.setProperty("--motion-slow", `${duration.slow}ms`);
	root.setProperty("--motion-banner", `${duration.banner}ms`);
	root.setProperty("--motion-ease-standard", easing.standard);
	root.setProperty("--motion-ease-wipe", easing.wipe);
	root.setProperty("--motion-ease-spring", easing.spring);
	root.setProperty("--motion-marquee", `${marquee.duration}ms`);
	root.setProperty("--page-enter-duration", `${pageEnter.duration}ms`);
	root.setProperty("--page-enter-distance", pageEnter.distance);
	root.setProperty("--page-enter-ease", pageEnter.easing);
}
