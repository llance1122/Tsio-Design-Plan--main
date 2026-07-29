import { Link } from "react-router";
import {
	workshopImages,
	articleImages,
	exhibitionImages,
} from "../data/imagesObjects";
import defaultCover from "../assets/imgs/default-cover.jpg";
import { url } from "../lib/paths";

// 決定卡片點擊後前往的路由
function getCardLink(item) {
	// 文章（來自後端 API）：用 slug
	if (item.slug) return `/Articles/${item.slug}`;

	// 其餘（工作坊 / 展覽，仍讀本地 JSON）：沿用 id 命名規則
	const id = String(item.id);
	if (id.includes("-W00")) return `/Plan/Workshop/${id}`;
	if (id.includes("-E00")) return `/Plan/ExhibitionList/${id}`;
	if (id.includes("-A00")) return `/Articles/${id}`;
	return `/${id}`;
}

// 決定卡片封面圖
function getCardImage(item) {
	// 後端文章：用上傳的海報網址（接上 base）；沒有海報就用預設圖
	// （用 "cover" in item 判斷「這是 API 文章」，即使值為 null）
	if (item.cover) return url(item.cover);
	if ("cover" in item) return defaultCover;

	// 本地 JSON：用 image key 去對照表找圖
	const key = item.image;
	if (!key) return defaultCover;
	if (key.includes("-A00")) return articleImages[key] || defaultCover;
	if (key.includes("-W00")) return workshopImages[key] || defaultCover;
	if (key.includes("-E00")) return exhibitionImages[key] || defaultCover;
	return defaultCover;
}

export default function CardLayout({ item }) {
	if (!item) return null;

	return (
		<Link
			to={getCardLink(item)}
			className="group flex flex-col md:w-full md:max-w-[600px] lg:max-w-[750px]"
		>
			<div className="w-full aspect-video overflow-hidden">
				<img
					className="w-full h-full object-cover transition duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:scale-105"
					src={getCardImage(item)}
					alt={item.title || "封面圖"}
				/>
			</div>
			{/* 標題 */}
			<h3 className="bodyText lg:bodyText-web mt-[25px]">{item.title}</h3>
			{/* 日期 */}
			<p className="bodyText text-[12px] lg:bodyText-web mt-[10px]">{item.date}</p>
		</Link>
	);
}
