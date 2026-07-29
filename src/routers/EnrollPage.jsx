import { NavLink } from "react-router";
import Title from "../small_component/Title";

export default function EnrollPage() {
	return (
		<section className="space-y-[10vh]">
			<main className="w-full mx-auto px-[40px] xl:px-0 lg:max-w-3xl mt-[15vh] lg:mt-[24vh] space-y-[var(--title-gap-text)]">
				<Title title="報名參與" titleEN="Enroll" layout="horizontal" />

				<div className="space-y-[20px] lg:space-y-[35px] bodyText lg:bodyText-web text-center">
					<p>
						想加入設醮的活動嗎？無論是工作坊、講座還是市集，
						我們都歡迎你的參與。各項活動的報名時間與方式，
						會在對應的活動頁面與社群公告。
					</p>
					<p>目前若有報名或合作需求，歡迎直接與我們聯絡。</p>
				</div>

				<div className="flex flex-col items-center gap-[20px] sm:flex-row sm:justify-center">
					<NavLink
						to="/Plan"
						className="inline-block bodyText lg:bodyText-web border border-primary px-[32px] py-[14px] tracking-[0.1em] text-primary transition-colors duration-[var(--motion-base)] hover:bg-primary hover:text-secondary"
					>
						查看所有活動
					</NavLink>
					<NavLink
						to="/Contact"
						className="inline-block bodyText lg:bodyText-web border border-primary px-[32px] py-[14px] tracking-[0.1em] text-primary transition-colors duration-[var(--motion-base)] hover:bg-primary hover:text-secondary"
					>
						聯絡我們
					</NavLink>
				</div>
			</main>
		</section>
	);
}
