import { useEffect, useRef } from "react";
import { galleryParallax, duration, easing } from "../config/motion";
import bgGray from "../assets/bg_gray.jpg";

// ⬇⬇⬇ 找到正式圖片後，只要替換這幾行 import 即可 ⬇⬇⬇
import img1 from "../assets/photos/DSCF8777.webp"; // 左上・直幅（大）
import img2 from "../assets/photos/DSCF8885.webp"; // 右側・橫幅（大）
import img3 from "../assets/photos/RYK01728.webp"; // 左下・橫幅（大）
import floatImg1 from "../assets/photos/DSCF8773.webp"; // 漂浮小圖 1
import floatImg2 from "../assets/photos/RYK01732.webp"; // 漂浮小圖 2
import floatImg3 from "../assets/photos/RYK02408.webp"; // 漂浮小圖 3
// ⬆⬆⬆ 找到正式圖片後，只要替換這幾行 import 即可 ⬆⬆⬆

// 中央 sticky 標語：圖片捲動流過、標語釘在視窗中央（文案可自行替換）
const STICKY_TAGLINE = "「在日常裡，設下一場醮。」";

/*
  版位設定：
  - 散排版型從 md（平板）就啟用：iPad 直向也走桌機散排，只有手機直疊
  - className 內「md:」開頭 = 散排位置（絕對定位，百分比 → 等比例縮放）
  - 其餘 = 手機版（由上往下堆疊、左右交錯；小張漂浮圖在手機隱藏）
  - aspect-[..] 控制每張圖的長寬比；想換裁切比例改這裡
  - speed = 捲動視差速度係數（仿 MOTOYA）：
      0  → 不調整，跟著頁面正常捲動（大圖）
      負值 → 比捲動快、往上跑（小圖，數值越大跑越快）
      數值 × motion.js 的 galleryParallax.maxShift = 實際最大位移
*/
const galleryImages = [
	// ---- 大圖三張：不做視差，正常捲動 ----
	{
		src: img1,
		alt: "",
		speed: 0,
		className:
			"w-[80%] mr-auto aspect-[3/4] md:absolute md:top-0 md:left-0 md:w-[38%]",
	},
	{
		src: img2,
		alt: "",
		speed: 0,
		className:
			"w-[70%] ml-auto aspect-[6/5] md:absolute md:top-[27%] md:right-0 md:w-[33%]",
	},
	{
		src: img3,
		alt: "",
		speed: 0,
		className:
			"w-[85%] mx-auto aspect-[8/5] md:absolute md:top-[66%] md:left-[7.5%] md:w-[48%]",
	},
	// ---- 小圖三張：快速往上漂（手機隱藏；位置先仿 MOTOYA，之後再調） ----
	{
		src: floatImg1,
		alt: "",
		speed: -1.5,
		className:
			"hidden md:block md:absolute md:top-[14%] md:left-[55%] md:w-[16%] aspect-[4/3]",
	},
	{
		src: floatImg2,
		alt: "",
		speed: -2.1,
		className:
			"hidden md:block md:absolute md:top-[48%] md:left-[13%] md:w-[12%] aspect-[3/4]",
	},
	{
		src: floatImg3,
		alt: "",
		speed: -1.2,
		className:
			"hidden md:block md:absolute md:top-[80%] md:right-[9%] md:w-[15%] aspect-[5/4]",
	},
];

// ============================================================
//  捲動視差 + 標語進場：
//  - 視差：以圖庫中心對視窗中心的偏移量當進度（-1 ～ +1），
//    每張圖乘上自己的 speed，再用 lerp 平滑追隨 → 慣性漂浮感。
//    transform 放在「外層 wrapper」，與內層 .headline 的
//    ScrollReveal 淡入各自獨立、互不干擾。
//  - 標語：不用 ScrollReveal（那會在標語隨內容上行時就提早觸發），
//    改在「釘住視窗中央的瞬間」才淡入 + 上浮，跟 MOTOYA 一樣。
//    離場不用淡出 —— 由 Main.jsx 的白色蓋幕層（較高 z-index）
//    從下方滑上來把釘住的標語蓋掉。
// ============================================================
function useGalleryParallax(speeds) {
	const sectionRef = useRef(null); // 內層散排圖庫（視差進度計算基準）
	const itemRefs = useRef([]); // 每張圖的視差 wrapper
	const stickyRef = useRef(null); // sticky 佔位層（偵測釘住時機）
	const pillRef = useRef(null); // 標語藥丸本體（淡入目標）

	useEffect(() => {
		// 使用者系統偏好減少動態 → 停用視差與標語動畫（標語維持靜態可見）
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		// 標語初始狀態：透明 + 從中央下方 20px 準備上浮
		// （用 CSS translate 屬性做置中 + 位移，transition 讀 motion token）
		const pill = pillRef.current;
		let pillRevealed = false;
		if (pill) {
			pill.style.transition = `opacity ${duration.slow}ms ${easing.standard}, translate ${duration.slow}ms ${easing.spring}`;
			pill.style.opacity = "0";
			pill.style.translate = "0 calc(-50% + 20px)";
		}
		const current = new Array(speeds.length).fill(0);
		let rafId;

		const tick = () => {
			const vh = window.innerHeight;

			// ---- 標語：sticky 佔位層貼到視窗中央（= 釘住瞬間）才淡入 ----
			const sticky = stickyRef.current;
			if (!pillRevealed && pill && sticky) {
				if (sticky.getBoundingClientRect().top <= vh / 2 + 1) {
					pillRevealed = true;
					pill.style.opacity = "1";
					pill.style.translate = "0 -50%";
				}
			}

			// ---- 圖片視差 ----
			const section = sectionRef.current;
			if (section) {
				const rect = section.getBoundingClientRect();
				// 進度：區塊在視窗下方 = -1 → 通過中心 = 0 → 捲出上方 = +1
				const raw =
					(vh / 2 - (rect.top + rect.height / 2)) / ((vh + rect.height) / 2);
				const progress = Math.max(-1, Math.min(1, raw));
				// 散排版型從 md（768px）啟用，視差幅度跟著切換
				const maxShift =
					window.innerWidth >= 768
						? galleryParallax.maxShift
						: galleryParallax.maxShiftMobile;

				itemRefs.current.forEach((el, i) => {
					if (!el) return;
					const target = progress * speeds[i] * maxShift;
					current[i] += (target - current[i]) * galleryParallax.lerp;
					el.style.transform = `translate3d(0, ${current[i].toFixed(2)}px, 0)`;
				});
			}
			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [speeds]);

	return { sectionRef, itemRefs, stickyRef, pillRef };
}

export default function ImageGallery() {
	const { sectionRef, itemRefs, stickyRef, pillRef } = useGalleryParallax(
		galleryImages.map((img) => img.speed),
	);

	return (
		// 外層：背景圖 + 頂部留白（比照 PlanPage 的 bg_gray 做法）
		// 底部不用 padding 收尾，改用「尾巴」spacer —— sticky 的釘住範圍
		// 只算內容不算 padding，要用實際內容才能讓標語多釘一段
		<section
			className="w-full pt-[80px] lg:pt-[160px]"
			style={{ backgroundImage: `url(${bgGray})` }}
		>
			{/* 中央 sticky 標語：直接掛在 section 下，
			    釘住範圍 = 圖庫 + 尾巴（h-0 不佔排版空間） */}
			<div
				ref={stickyRef}
				className="sticky top-1/2 z-10 h-0 flex items-start justify-center pointer-events-none"
			>
				{/* -translate-y-1/2 是無動畫（reduced-motion）時的置中後備；
				    一般情況由 hook 以 inline translate 接手做置中 + 上浮淡入 */}
				<p
					ref={pillRef}
					style={{ fontFamily: '"Shippori Mincho", serif' }}
					className="-translate-y-1/2 bg-secondary/95 px-[18px] py-[12px] lg:px-[25px] lg:py-[16px] text-primary text-[15px] md:text-[20px] lg:text-[24px] tracking-[0.25em] shadow-sm"
				>
					{STICKY_TAGLINE}
				</p>
			</div>

			{/* 內層：原本的散排圖庫（視差進度以這層計算）
			    md 以上改為絕對定位散排（含 iPad），手機維持直疊 */}
			<div
				ref={sectionRef}
				className="relative w-full flex flex-col gap-16 md:block md:gap-0 md:aspect-[1588/1936]"
			>
				{galleryImages.map((img, i) => (
					<div
						key={i}
						ref={(el) => (itemRefs.current[i] = el)}
						className={`will-change-transform ${img.className}`}
					>
						<div className="headline w-full h-full overflow-hidden bg-gray-100">
							<img
								src={img.src}
								alt={img.alt}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				))}
			</div>

			{/* 尾巴：圖片走完後標語繼續釘住的距離（55vh）。
			    Main.jsx 的白色蓋幕層會蓋掉尾巴「最後 15vh」，
			    前面 40vh 留給標語單獨漂浮在紋理上 */}
			<div className="h-[55vh]" aria-hidden="true" />
		</section>
	);
}
