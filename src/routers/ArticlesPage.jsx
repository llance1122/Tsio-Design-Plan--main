import CardLayout from "../small_component/CardLayout";
import { articleLink, articleCover } from "../lib/articles";
import { pageMeta } from "../lib/meta";
import ogImage from "../assets/imgs/default-cover.webp?og";

export const meta = ({ location }) =>
	pageMeta({
		title: "文章總覽",
		description: "設醮的校友特稿與活動報導。",
		image: ogImage,
		location,
	});

// 伺服器即時讀資料庫，後台發文後重新整理就看得到
export function loader({ context }) {
	return { articles: context.articles.list() };
}

export default function ArticlesPage({ loaderData }) {
	const { articles } = loaderData;

	return (
		<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			<h2 className="text-center heading-bold lg:heading-bold-web">文章總覽</h2>

			{articles.length === 0 ? (
				<p className="bodyText lg:bodyText-web text-center mt-[60px]">目前還沒有文章。</p>
			) : (
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
					{articles.map((article) => (
						<CardLayout
							key={article.id}
							to={articleLink(article)}
							image={articleCover(article)}
							title={article.title}
							date={article.date}
						/>
					))}
				</div>
			)}
		</section>
	);
}
