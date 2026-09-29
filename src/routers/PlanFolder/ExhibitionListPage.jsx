import exhibitionsData from "../../data/exhibitions.json";
import { coverUrl } from "../../data/covers";
import { pageMeta } from "../../lib/meta";
import ogImage from "../../assets/imgs/ExhibitionBanner.webp?og";
import CardLayout from "../../small_component/CardLayout";
import Breadcrumbs from "../../small_component/Breadcrumbs";

export const meta = ({ location }) =>
	pageMeta({
		title: "展覽總覽",
		description: "「對話的對話」— 青年設計師與創作者的主題展，涵蓋平面、空間、影像與裝置。",
		image: ogImage,
		location,
	});

export default function ExhibitionListPage() {
	return (
		<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			<Breadcrumbs word="Plan" word2="Exhibition" />
			<h2 className="text-center heading-bold lg:heading-bold-web mt-[40px]">展覽總覽</h2>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
				{exhibitionsData.map((exhibition) => (
					<CardLayout
						key={exhibition.id}
						to={`/Plan/ExhibitionList/${exhibition.id}`}
						image={coverUrl(exhibition.cover)}
						title={exhibition.title}
						date={exhibition.date}
					/>
				))}
			</div>
		</section>
	);
}
