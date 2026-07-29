import { useState, useEffect, useCallback } from "react";
import banner1_A from "../assets/banner/desktop/banner1_A.webp";
import banner1_B from "../assets/banner/desktop/banner1_B.webp";
import banner2_A from "../assets/banner/desktop/banner2_A.webp";
import banner2_B from "../assets/banner/desktop/banner2_B.webp";
import banner3_A from "../assets/banner/desktop/banner3_A.webp";
import banner3_B from "../assets/banner/desktop/banner3_B.webp";
import banner4_A from "../assets/banner/desktop/banner4_A.webp";
import banner4_B from "../assets/banner/desktop/banner4_B.webp";
import { banner as bannerMotion } from "../config/motion";

// 左欄圖片陣列 — 未來擴充只需在此新增圖片
const leftImages = [banner1_A, banner2_A, banner3_A, banner4_A];
// 右欄圖片陣列 — 未來擴充只需在此新增圖片
const rightImages = [banner1_B, banner2_B, banner3_B, banner4_B];

/*
  手機 / 平板單欄用的整張原圖：
  - 手機（< 768px）→ assets/banner/mobile
  - 平板（768 〜 1023px）→ assets/banner/tablet
  丟進對應資料夾即自動套用，檔名裡的數字決定輪播順序，增減圖片都不用改程式。
  （只掃圖檔副檔名，資料夾裡的說明檔不會被誤抓）
*/
const mobileModules = import.meta.glob(
	"../assets/banner/mobile/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG}",
	{ eager: true, import: "default" },
);
const tabletModules = import.meta.glob(
	"../assets/banner/tablet/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG}",
	{ eager: true, import: "default" },
);

// 依檔名中的數字排序，輸出圖片網址陣列
function sortByNumber(modules) {
	return Object.entries(modules)
		.sort(([a], [b]) => {
			const num = (p) => Number(p.split("/").pop().match(/(\d+)/)?.[1] ?? 0);
			return num(a) - num(b);
		})
		.map(([, src]) => src);
}

const mobileImages = sortByNumber(mobileModules);
// 平板還沒放圖時退回用手機圖，畫面不會開天窗
const tabletImages = (() => {
	const imgs = sortByNumber(tabletModules);
	return imgs.length > 0 ? imgs : mobileImages;
})();

// 動畫參數統一來自 config/motion.js
const INTERVAL = bannerMotion.interval; // 每張停留時間 (ms)
const STAGGER = bannerMotion.stagger; // 右欄比左欄晚啟動的毫秒數
const DURATION = bannerMotion.duration; // 擦入動畫時長 (ms)
const EASE = bannerMotion.ease; // 擦入緩動

/*
  核心機制（取自附檔 kiiro 輪播）：
  - 新圖（active）用 clip-path 從一側「擦入」蓋住舊圖
  - 內層圖反向位移 → 揭露時產生視差感
  - 左欄由上往下、右欄由下往上，方向相反
  - 舊圖（before）維持完整顯示墊在下層，被蓋住後再重置回隱藏初始態
*/

// 單一欄位的輪播狀態：active = 正在擦入的新圖，before = 墊底的舊圖
function useCarouselColumn(length) {
	const [state, setState] = useState({ active: 0, before: null });

	// 切下一張：把目前 active 標記為 before，並把 active 推進到下一張
	const advance = useCallback(() => {
		setState(({ active }) => ({
			active: (active + 1) % (length || 1),
			before: active,
		}));
	}, [length]);

	// 動畫結束後清掉 before，讓舊圖回到隱藏初始態
	useEffect(() => {
		if (state.before === null) return;
		const timer = setTimeout(
			() => setState((s) => ({ ...s, before: null })),
			DURATION + 100,
		);
		return () => clearTimeout(timer);
	}, [state.before]);

	return { ...state, advance };
}

export default function Banner() {
	const {
		active: leftActive,
		before: leftBefore,
		advance: advanceLeft,
	} = useCarouselColumn(leftImages.length);
	const {
		active: rightActive,
		before: rightBefore,
		advance: advanceRight,
	} = useCarouselColumn(rightImages.length);
	// 手機、平板各自的張數可能與切半圖不同，獨立計數避免索引對不上
	const {
		active: mobileActive,
		before: mobileBefore,
		advance: advanceMobile,
	} = useCarouselColumn(mobileImages.length);
	const {
		active: tabletActive,
		before: tabletBefore,
		advance: advanceTablet,
	} = useCarouselColumn(tabletImages.length);

	// 左欄先切換，右欄延遲 STAGGER 毫秒，形成錯落感
	useEffect(() => {
		const timer = setInterval(() => {
			advanceLeft();
			advanceMobile();
			advanceTablet();
			setTimeout(advanceRight, STAGGER);
		}, INTERVAL);
		return () => clearInterval(timer);
	}, [advanceLeft, advanceRight, advanceMobile, advanceTablet]);

	return (
		<section className="relative h-screen w-full">
			{/* 頂部漸層暗角：把照片上緣稍微壓暗，
			    讓 nav 的 mix-blend-difference 在中間調（接近 50% 灰）的圖上也拉得開反差 */}
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[22vh] bg-linear-to-b from-black/10 to-transparent" />
			{/* 手機（< 768px）：單欄輪播整張原圖（左右切半的圖在直向版型拼不回來） */}
			<div className="h-full w-full md:hidden">
				<CarouselColumn
					side="left"
					images={mobileImages}
					active={mobileActive}
					before={mobileBefore}
					full
				/>
			</div>
			{/* 平板（768 〜 1023px）：同樣單欄，但吃 tablet 資料夾的圖 */}
			<div className="hidden h-full w-full md:block lg:hidden">
				<CarouselColumn
					side="left"
					images={tabletImages}
					active={tabletActive}
					before={tabletBefore}
					full
				/>
			</div>
			{/* lg 以上：左右兩欄各自輪播，中縫拼接 */}
			<div className="hidden h-full w-full lg:flex flex-row">
				<CarouselColumn
					side="left"
					images={leftImages}
					active={leftActive}
					before={leftBefore}
				/>
				<CarouselColumn
					side="right"
					images={rightImages}
					active={rightActive}
					before={rightBefore}
				/>
			</div>
		</section>
	);
}

// side 決定擦入方向：left 由上往下、right 由下往上，並搭配反向視差位移
// full = 單欄整張原圖模式：填滿整個容器、裁切改回置中
function CarouselColumn({ side, images, active, before, full = false }) {
	const hiddenClip =
		side === "left" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)";
	const offsetY =
		side === "left"
			? `-${bannerMotion.parallaxOffset}`
			: bannerMotion.parallaxOffset;

	return (
		<div
			className={
				full
					? "relative h-full w-full overflow-hidden"
					: "relative h-full basis-1/2 overflow-hidden"
			}
		>
			{images.map((src, i) => {
				const isActive = i === active;
				const isBefore = i === before;
				const revealed = isActive || isBefore;

				const itemStyle = {
					position: "absolute",
					inset: 0,
					overflow: "hidden",
					clipPath: revealed ? "inset(0 0 0 0)" : hiddenClip,
					transition: isActive ? `clip-path ${DURATION}ms ${EASE}` : "none",
					zIndex: isActive ? 2 : 1,
					pointerEvents: "none",
				};

				const imgStyle = {
					position: "absolute",
					inset: 0,
					backgroundImage: `url(${src})`,
					backgroundSize: "cover",
					// 貼齊中縫：左欄以右緣、右欄以左緣對齊，讓整張圖切半後中縫永遠連續
					// full 模式是整張原圖，維持置中裁切即可
					backgroundPosition: full
						? "center"
						: side === "left"
							? "right center"
							: "left center",
					backgroundRepeat: "no-repeat",
					transform: revealed
						? "translateY(0) scale(1)"
						: `translateY(${offsetY}) scale(${bannerMotion.initialScale})`,
					transition: isActive ? `transform ${DURATION}ms ${EASE}` : "none",
					willChange: "transform",
				};

				return (
					<div key={i} style={itemStyle}>
						<div style={imgStyle} />
					</div>
				);
			})}
		</div>
	);
}
