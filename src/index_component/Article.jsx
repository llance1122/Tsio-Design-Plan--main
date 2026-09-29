import Title from "../small_component/Title";
import MoreLink from "../small_component/MoreLink";
import CardLayout from "../small_component/CardLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { articleLink, articleCover } from "../lib/articles";
import "swiper/css";
import "swiper/css/pagination";

const ArticleCard = ({ article }) => (
	<CardLayout
		to={articleLink(article)}
		image={articleCover(article)}
		title={article.title}
		date={article.date}
	/>
);

// 手機用輪播、平板以上（md）用三欄格線。
// 兩種版型都輸出、用 CSS 切換，伺服器產生的 HTML 在任何螢幕寬度都直接是對的版型
const ArticleCarousel = ({ latestArticles }) => (
	<>
		<div className="w-full sm:max-w-[500px] p-5 md:hidden">
			<Swiper
				modules={[Pagination]} // 啟用分頁點模組
				spaceBetween={20} // 每個 Slide 之間的間距
				slidesPerView={1} // 手機模式下只顯示一個 Slide
				pagination={{ clickable: true }} // 啟用分頁點，點擊可切換
				className="article-swiper-container"
			>
				{latestArticles.map((article) => (
					<SwiperSlide key={article.id}>
						<div className="py-4">
							<ArticleCard article={article} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
		<div className="mt-10 hidden md:grid grid-cols-3 gap-x-15 gap-y-16">
			{latestArticles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	</>
);

// 首頁「報導」區塊。最新三篇文章由首頁的 loader 在伺服器端讀好傳進來（見 Main.jsx）
export default function Article({ latestArticles }) {
	return (
		<section className="w-full mx-auto px-[40px] lg:max-w-7xl">
			<Title titleEN="article" title="報導" />

			<div className="headline flex justify-center mt-[var(--title-gap)]">
				<ArticleCarousel latestArticles={latestArticles} />
			</div>
			<MoreLink
				to="/Articles"
				label="查看報導"
				className="headline mt-[60px] lg:mt-[100px]"
			/>
		</section>
	);
}
