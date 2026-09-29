import { NavLink } from "react-router";
import Breadcrumbs from "../../small_component/Breadcrumbs";
import ProfileCard from "../../small_component/ProfileCard";
import Title from "../../small_component/Title";
import CrossfadeImages from "../../small_component/CrossfadeImages";

import lectureSpeaker_1 from "../../assets/imgs/lectureSpeaker_1.webp";
import ExhibitionLayout from "../../assets/imgs/ExhibitionLayout.webp";
import lectureImg_1 from "../../assets/imgs/lectureImg_1.webp";
import lectureImg_2 from "../../assets/imgs/lectureImg_2.webp";
import lectureImg_3 from "../../assets/imgs/lectureImg_3.webp";
import { pageMeta } from "../../lib/meta";
import ogImage from "../../assets/imgs/lectureImg_1.webp?og";

export const meta = ({ location }) =>
	pageMeta({
		title: "講座",
		description: "邀請走過這條路的前輩，談創作背後那段無聲的過程。",
		image: ogImage,
		location,
	});

// ============================================================
//  講座頁的內容資料：要換講者、場次，改下面兩個陣列即可
//  ⚠️ 目前三筆都是同一份範例資料，上線前請換成真實內容
// ============================================================
const SPEAKER_SAMPLE = {
	photo: lectureSpeaker_1,
	name: "林哲翔",
	job: "產品設計師／自由創作者",
	intro:
		"Talk 01｜設計是一條彎彎的路，還是可以折返的橋？畢業後進入科技業，曾任職於新創公司與大型 UX 團隊，後選擇離開制度、走向自由接案。他將分享關於「選擇」的故事——在創意與穩定、在理想與現實之間的每一次掙扎。設計不是直線，也不是答案，而是一種反覆折返與自問的方式。「我花了很多年，才學會不要為了成功而設計。」",
};
const SPEAKERS = [SPEAKER_SAMPLE, SPEAKER_SAMPLE, SPEAKER_SAMPLE];

const TALK_SAMPLE = {
	label: "【TALK 01】",
	topic: "設計是一條彎彎的路，還是可以折返的橋？",
	time: "2025.08.17（日）14:00–15:30",
	place: "設醮展場A區講座角落",
	speaker: "林哲翔",
};
const TALKS = [TALK_SAMPLE, TALK_SAMPLE, TALK_SAMPLE];

export default function LecturePage() {
	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs word="Plan" word2="Lecture" />
				</div>

				<ImageGallery />

				<div>
					<Title
						className="headline"
						title="講座活動｜TALKS & SHARING"
						layout="horizontal"
					/>
					<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
						<p className="headline bodyText lg:bodyText-web">
							我們經常在展覽裡談創作，談設計，談作品的樣貌。但我們更在意的是，這些作品背後那段無聲的過程——那些不被記錄的掙扎、遲疑、離開、或轉彎。《遠方還未說的話》是一場關於時間的展覽，也是一種溫柔的回望。它來自那些曾經走過這條路的人，帶著他們在現實與夢想之間行走的傷痕與光。用作品替代語言，告訴還在路上的我們一件事：你不是孤單的。在這裡，我們邀請你聽見那些未說出口的話。或許來自未來的你，也會留下幾句話，給還沒出發的人。「展覽不只是結果，它是一段曾經沒機會說出來的旅程。」— Lorem Chang, 策展人
						</p>
					</div>
				</div>

				<div>
					<Title
						className="headline"
						title="講者介紹｜GUEST SPEAKERS"
						layout="horizontal"
					/>
					<div className="headline w-full mx-auto px-[40px] mt-[var(--title-gap)] space-y-[100px] lg:max-w-7xl">
						{SPEAKERS.map((s, i) => (
							<ProfileCard
								key={i}
								size="250px"
								src={s.photo}
								name={s.name}
								job={s.job}
								content={s.intro}
							/>
						))}
					</div>
				</div>

				<div>
					<Title
						className="headline"
						title="講座資訊｜SCHEDULE"
						layout="horizontal"
					/>
					<div className="space-y-[35px] w-full mx-auto px-[40px] mt-[var(--title-gap)] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center md:gap-[100px]">
						<div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
							<img
								className="w-full h-full object-cover"
								src={ExhibitionLayout}
								alt=""
								loading="lazy"
								decoding="async"
							/>
						</div>

						<ul className="bodyText lg:bodyText-web min-[1180px]:flex-1 space-y-[20px] lg:space-y-[35px]">
							{TALKS.map((t, i) => (
								<li key={i} className="space-y-[10px]">
									<h2>{t.label}</h2>
									<p>
										{t.topic}
										<br />
										{t.time}
										<br />
										{t.place}
									</p>
									<p>{t.speaker}</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<hr className="border-t border-primary my-8 mb-[70px]" />
					<Title
						className="headline"
						title="報名方式｜RESERVE A SEAT"
						layout="horizontal"
					/>
					<p className="bodyText lg:bodyText-web text-center mt-[var(--title-gap-text)]">
						講座免費參加，部分座位可預約，名額有限。點擊報名連結或現場候補入場。
					</p>
					{/* 原本是沒有動作的 <button>，改成連到報名頁 */}
					<NavLink
						to="/Enroll"
						className="bodyText lg:bodyText-web bg-gray py-3 px-6 mx-auto block w-fit mt-[30px]"
					>
						立即報名 Register Now
					</NavLink>
				</div>
			</main>
		</section>
	);
}

// 頂部圖庫：手機輪流淡入，平板以上（md）左一大、右兩小。
// 兩種版型都輸出、用 CSS 切換，伺服器產生的 HTML 在任何螢幕寬度都直接是對的版型
const ImageGallery = () => {
	const images = [lectureImg_1, lectureImg_2, lectureImg_3];

	return (
		<>
			<CrossfadeImages images={images} className="w-full aspect-video md:hidden" />
			<DesktopGallery images={images} />
		</>
	);
};

const DesktopGallery = ({ images }) => {
	return (
		<div className="w-full aspect-video hidden md:flex">
			<div className="w-[50%] h-full">
				<img className="h-full w-full object-cover" src={images[0]} alt="" />
			</div>
			<div className="w-[50%] h-full flex flex-col">
				<div className="w-full h-[50%]">
					<img className="h-full w-full object-cover" src={images[1]} alt="" />
				</div>
				<div className="w-full h-[50%]">
					<img className="h-full w-full object-cover" src={images[2]} alt="" />
				</div>
			</div>
		</div>
	);
};
