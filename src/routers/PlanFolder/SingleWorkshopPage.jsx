import { data, NavLink } from "react-router";
import workshopsData from "../../data/workshops.json";
import { coverUrl } from "../../data/covers";
import defaultCover from "../../assets/imgs/default-cover.webp";
import Breadcrumbs from "../../small_component/Breadcrumbs";
import Title from "../../small_component/Title";
import { pageMeta } from "../../lib/meta";
// 橫幅很寬，自動置中裁切會切到文字，改用另存的裁好版本（src/assets/og/）
import ogImage from "../../assets/og/workshop_banner-og.webp?og";

// 工作坊內頁：資料來自 workshops.json，打包時就依每筆資料產生好 HTML（見 react-router.config.js）
export function loader({ params }) {
	const workshop = workshopsData.find((w) => w.id === params.workshopId);
	if (!workshop) return data({ workshop: null }, { status: 404 });
	return { workshop };
}

export const meta = ({ loaderData, location }) => {
	const workshop = loaderData?.workshop;
	if (!workshop) return pageMeta({ title: "找不到工作坊", location, noindex: true });
	return pageMeta({
		title: workshop.title,
		description: workshop.description,
		image: ogImage,
		location,
	});
};

export default function SingleWorkshopPage({ loaderData }) {
	const { workshop } = loaderData;

	if (!workshop) {
		return (
			<section className="w-full mx-auto px-[40px] lg:max-w-7xl mt-[25vh] lg:mt-[30vh] mb-[20vh] text-center space-y-[30px]">
				<h2 className="heading-bold lg:heading-bold-web">找不到這個工作坊</h2>
				<NavLink
					to="/Plan/Workshop/List"
					className="inline-block bodyText lg:bodyText-web border border-primary px-[32px] py-[14px] tracking-[0.1em] text-primary transition-colors duration-[var(--motion-base)] hover:bg-primary hover:text-secondary"
				>
					回工作坊總覽
				</NavLink>
			</section>
		);
	}

	const cover = coverUrl(workshop.cover) || defaultCover;

	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[15vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs
						word="Plan"
						word2="Workshop"
						word3={workshop.title}
					/>
				</div>

				<div className="w-full aspect-video">
					<img
						className="w-full h-full object-cover"
						src={cover}
						alt={workshop.title}
					/>
				</div>

				<div className="w-full mx-auto px-[40px] lg:max-w-3xl space-y-[var(--title-gap-text)]">
					<Title title={workshop.title} layout="horizontal" />

					<ul className="bodyText lg:bodyText-web space-y-[10px] text-center">
						<li>日期：{workshop.date}</li>
						<li>時間：{workshop.time}</li>
						<li>地點：{workshop.location}</li>
					</ul>

					<p className="bodyText lg:bodyText-web">{workshop.description}</p>

					<div className="flex justify-center pt-[20px]">
						<NavLink
							to="/Enroll"
							className="inline-block bodyText lg:bodyText-web border border-primary px-[32px] py-[14px] tracking-[0.1em] text-primary transition-colors duration-[var(--motion-base)] hover:bg-primary hover:text-secondary"
						>
							我要報名
						</NavLink>
					</div>
				</div>
			</main>
		</section>
	);
}
