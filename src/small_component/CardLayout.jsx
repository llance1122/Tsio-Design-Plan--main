import { Link } from "react-router";
import defaultCover from "../assets/imgs/default-cover.webp";

// ============================================================
//  列表卡片：文章、展覽、工作坊共用
//  連結與封面由呼叫端明確傳入，卡片本身不需要知道資料是哪一種
//  （以前靠 id 裡有沒有 "-W00"、"-E00" 猜，改 id 命名就會連錯頁）。
// ============================================================
export default function CardLayout({ to, image, title, date }) {
	return (
		<Link
			to={to}
			className="group flex flex-col md:w-full md:max-w-[600px] lg:max-w-[750px]"
		>
			<div className="w-full aspect-video overflow-hidden">
				<img
					className="w-full h-full object-cover transition duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:scale-105"
					src={image || defaultCover}
					alt={title || "封面圖"}
					loading="lazy"
					decoding="async"
				/>
			</div>
			{/* 標題 */}
			<h3 className="bodyText lg:bodyText-web mt-[25px]">{title}</h3>
			{/* 日期 */}
			<p className="bodyText text-[12px] lg:bodyText-web mt-[10px]">{date}</p>
		</Link>
	);
}
