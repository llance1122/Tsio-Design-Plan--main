import workshopsData from "../../data/workshops.json";
import { coverUrl } from "../../data/covers";
import { pageMeta } from "../../lib/meta";
// 橫幅很寬，自動置中裁切會切到文字，改用另存的裁好版本（src/assets/og/）
import ogImage from "../../assets/og/workshop_banner-og.webp?og";
import CardLayout from "../../small_component/CardLayout";
import Breadcrumbs from "../../small_component/Breadcrumbs";

export const meta = ({ location }) =>
	pageMeta({ title: "工作坊總覽", image: ogImage, location });

export default function WorkshopListPage() {
	return (
		<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[15vh] lg:mt-[24vh]">
			<Breadcrumbs word="Plan" word2="Workshop" />
			<h2 className="text-center heading-bold lg:heading-bold-web mt-[40px]">工作坊總覽</h2>
			{workshopsData.length > 0 ? (
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[60px] mt-[60px]">
					{workshopsData.map((workshop) => (
						<CardLayout
							key={workshop.id}
							to={`/Plan/Workshop/${workshop.id}`}
							image={coverUrl(workshop.cover)}
							title={workshop.title}
							date={workshop.date}
						/>
					))}
				</div>
			) : (
				// workshops.json 是空陣列時，顯示空狀態而不是一片空白
				<p className="bodyText lg:bodyText-web text-center mt-[60px]">
					工作坊資訊即將公布，敬請期待。
				</p>
			)}
		</section>
	);
}
