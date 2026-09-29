import { data } from "react-router";
import { articleCover } from "../lib/articles";
import { pageMeta } from "../lib/meta";
import { url } from "../lib/paths";
import Breadcrumbs from "../small_component/Breadcrumbs";

// 文章內頁：有人瀏覽時由伺服器即時讀資料庫產生 HTML，
// 後台新發的文章也立刻有完整內容（搜尋引擎、LINE 預覽都讀得到）
export function loader({ params, context }) {
	const article = context.articles.get(params.articleId); // 網址上的值是文章 slug
	// 找不到時回 404 狀態碼，畫面顯示「找不到這篇文章」
	if (!article) return data({ article: null }, { status: 404 });
	return { article };
}

export const meta = ({ loaderData, location }) => {
	const article = loaderData?.article;
	if (!article) return pageMeta({ title: "找不到文章", location, noindex: true });
	return pageMeta({
		title: article.title,
		description: article.description,
		// 有上傳海報就用海報，沒有就用網站預設的分享圖
		image: article.cover ? url(article.cover) : undefined,
		uncropped: Boolean(article.cover),
		location,
	});
};

export default function SingleArticlePage({ loaderData }) {
	const { article } = loaderData;

	if (!article) {
		return (
			<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
				<Breadcrumbs word="Article" />
				<p className="bodyText lg:bodyText-web text-center mt-[60px]">找不到這篇文章。</p>
			</section>
		);
	}

	// 主圖：優先用上傳的海報，沒有則用與列表卡片相同的預設圖
	const hero = articleCover(article);

	return (
		<section className="w-full mx-auto md:px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			{/* 外層 section 在 md 以上才有 px-[40px]，這層用 md:px-0 互補，
			    否則 ≥768px 時兩層內距會疊成 80px */}
			<div className="px-[40px] md:px-0 mb-[40px]">
				<Breadcrumbs word="Article" word2={article.title} />
			</div>
			<div className="w-full space-y-[20px] lg:space-y-[2%]">
				<div className="m-auto w-full px-[40px] pb-10 lg:px-0 md:max-w-3xl xl:max-w-5xl">
					<h2 className="text-left heading lg:heading-web">{article.title}</h2>
				</div>
				<div className="w-full aspect-[2/1]">
					<img
						className="w-full h-full object-cover"
						src={hero}
						alt={article.title}
					/>
				</div>
				<div className="flex justify-end px-[40px] md:px-0">
					<p className="bodyText lg:bodyText-web">{article.date}</p>
				</div>
			</div>
			<div className="w-full mx-auto px-[40px] lg:max-w-3xl space-y-[10px] lg:space-y-[20px]">
				{article.blocks.map((block, i) => renderer(block, i))}
			</div>
		</section>
	);
}

function renderer(value, i) {
	switch (value.type) {
		case "subtitle":
			return (
				<h3
					key={i}
					className="subtitle-bold lg:subtitle-bold-web mt-[5vh] lg:mt-[15vh]"
				>
					{value.content}
				</h3>
			);
		case "paragraph":
			return (
				<p key={i} className="bodyText lg:bodyText-web">
					{value.content}
				</p>
			);
		default:
			return null;
	}
}
