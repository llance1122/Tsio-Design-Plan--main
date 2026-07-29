import { Link } from "react-router";
import { workshopImages } from "../data/imagesObjects";
import { articleImages } from "../data/imagesObjects";
import { exhibitionImages } from "../data/imagesObjects";
import defaultCover from "../assets/imgs/default-cover.jpg";

//工作坊封面圖
function findImage(key) {
	if (!key) return defaultCover;

	let imageSrc;

	if (key.includes("-A00")) {
		imageSrc = articleImages[key];
	} else if (key.includes("-W00")) {
		imageSrc = workshopImages[key];
	} else if (key.includes("-E00")) {
		imageSrc = exhibitionImages[key];
	}

	return imageSrc || defaultCover;
}

function getCardLink(itemId) {
	if (itemId.includes("-A00")) {
		// 文章
		return `/Articles/${itemId}`;
	} else if (itemId.includes("-W00")) {
		// 工作坊
		return `/Plan/Workshop/${itemId}`;
	} else if (itemId.includes("-E00")) {
		// 展覽
		return `/Plan/ExhibitionList/${itemId}`;
	} else {
		// 如果 ID 格式不符，提供一個備用路徑
		return `/${itemId}`;
	}
}
//TODO: 把articleImages補齊 並把路由搞定
export default function CardLayout({ item }) {
	if (!item) return null;

	const targetPath = getCardLink(item.id);

	return (
		<Link
			to={targetPath}
			className="group flex flex-col md:w-full md:max-w-[600px] lg:max-w-[750px]"
		>
			<div className="w-full aspect-video overflow-hidden">
				<img
					className="w-full h-full object-cover transition duration-[var(--motion-base)] ease-[var(--motion-ease-spring)] group-hover:scale-105"
					// 使用 item.image 作為 key
					src={findImage(item.image)}
					alt={item.title || "封面圖"}
				/>
			</div>
			{/* 標題 */}
			<h3 className="bodyText lg:bodyText-web mt-[25px]">{item.title}</h3>
			{/* 日期 */}
			<p className="bodyText text-[12px] lg:bodyText-web  mt-[10px]">
				{item.date}
			</p>
		</Link>
	);
}
