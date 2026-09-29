import { useEffect, useState } from "react";
import { interval } from "../config/motion";

// ============================================================
//  CrossfadeImages
//  多張圖疊在同一格、輪流淡入淡出。用在手機版版面放不下多欄圖片時
//  （關於頁、講座頁頂部圖庫）。間隔讀 config/motion.js 的 interval.crossfade。
// ============================================================
export default function CrossfadeImages({ images, className = "w-full aspect-video" }) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const id = setInterval(
			() => setCurrent((i) => (i + 1) % images.length),
			interval.crossfade,
		);
		return () => clearInterval(id);
	}, [images.length]);

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{images.map((img, index) => (
				<img
					key={index}
					src={img}
					alt=""
					className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[var(--motion-slow)] ease-[var(--motion-ease-standard)] ${index === current ? "opacity-100" : "opacity-0"}`}
				/>
			))}
		</div>
	);
}
