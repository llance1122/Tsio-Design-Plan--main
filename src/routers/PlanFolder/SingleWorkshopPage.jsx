import { useParams, NavLink } from "react-router";
import workshopsData from "../../data/workshops.json";
import { workshopImages } from "../../data/imagesObjects";
import defaultCover from "../../assets/imgs/default-cover.jpg";
import Breadcrumbs from "../../small_component/Breadcrumbs";
import Title from "../../small_component/Title";

export default function SingleWorkshopPage() {
	const { workshopId } = useParams();
	const workshop = workshopsData.find((w) => w.id === workshopId);

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

	const cover = workshopImages[workshop.image] || defaultCover;

	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[15vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs word="Project" word2="Workshop" />
				</div>

				<div className="w-full aspect-video">
					<img
						className="w-full h-full object-cover"
						src={cover}
						alt={workshop.title}
					/>
				</div>

				<div className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-3xl space-y-[var(--title-gap-text)]">
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
