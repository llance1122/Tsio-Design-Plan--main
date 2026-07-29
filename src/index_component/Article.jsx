import Title from "../small_component/Title";
import MoreLink from "../small_component/MoreLink";
import CardLayout from "../small_component/CardLayout";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ArticleCarousel = ({ latestArticles }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (isMobile) {
		return (
			<div className="w-full sm:max-w-[500px] p-5">
				<Swiper
					modules={[Pagination]} // 啟用分頁點模組
					spaceBetween={20} // 每個 Slide 之間的間距
					slidesPerView={1} // 手機模式下只顯示一個 Slide
					pagination={{ clickable: true }} // 啟用分頁點，點擊可切換
					className="article-swiper-container"
				>
					{latestArticles.map((article) => (
						<SwiperSlide key={article.id}>
							{/* **SwiperSlide 內部直接渲染 CardLayout** */}
							<div className="py-4">
								<CardLayout item={article} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		);
	} else {
		return (
			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-15 gap-y-16">
				{latestArticles.map((article) => (
					<CardLayout key={article.id} item={article} />
				))}
			</div>
		);
	}
};

export default function Article() {
	const [latestArticles, setLatestArticles] = useState([]);

	useEffect(() => {
		// API 已依建立時間新→舊排序，取前三筆即為最新文章
		fetch("/api/articles")
			.then((r) => r.json())
			.then((data) => setLatestArticles(data.slice(0, 3)))
			.catch(() => setLatestArticles([]));
	}, []);

	return (
		<section className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-7xl">
			<div className="">
				<Title titleEN="article" title="報導" />
			</div>

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
