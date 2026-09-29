import Breadcrumbs from "../../small_component/Breadcrumbs";
import ProfileCard from "../../small_component/ProfileCard";
import Title from "../../small_component/Title";

import ExhibitionBanner from "../../assets/imgs/ExhibitionBanner.webp";
import movieCover_1 from "../../assets/imgs/movieCover_1.webp";
import ExhibitionLayout from "../../assets/imgs/ExhibitionLayout.webp";

// ============================================================
//  戶外電影片單：要換片改這個陣列即可
//  ⚠️ 目前三筆都是同一份範例資料（片名含 Lorem），上線前請換成真實內容
// ============================================================
const FILM_SAMPLE = {
	cover: movieCover_1,
	title: "Film 01｜Lorem in the Wind",
	intro:
		"在一個海邊小鎮，風總會帶來來自遠方的聲音。一名少年偶然聽見了屬於過去的秘密，開始踏上尋找答案的旅程。這是一部關於傾聽與等待的電影，像風一樣輕柔，卻能穿透時間。",
};
const FILMS = [FILM_SAMPLE, FILM_SAMPLE, FILM_SAMPLE];

export default function OtherActivitiesPage() {
	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs word="Plan" word2="Other" />
				</div>

				<div className="space-y-[30px]">
					<div className="w-full aspect-[1917/796]">
						<img
							className="w-full h-full object-cover"
							src={ExhibitionBanner}
							alt=""
						/>
					</div>
					<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
						<p className="bodyText text-center lg:bodyText-web">
							Under the Sky, Words Turn to Light
							一塊幕布，一片星空，一段段被影像喚醒的記憶。
							我們精選與展覽主題呼應的電影——關於遠方、離開、回來與未曾說出的話。
							坐在草地上，與陌生人並肩，讓光與影帶著你走向那些未被述說的故事。
						</p>
					</div>
				</div>

				<div>
					{/* 原標題是從講座頁複製來的「講者介紹」，這區放的是電影，改成片單 */}
					<Title
						className="headline"
						title="放映片單｜FILMS"
						layout="horizontal"
					/>
					<div className="headline w-full mx-auto px-[40px] mt-[var(--title-gap)] space-y-[100px] lg:max-w-7xl">
						{FILMS.map((f, i) => (
							<ProfileCard
								key={i}
								size="350px"
								src={f.cover}
								name={f.title}
								variant="movie"
								content={f.intro}
							/>
						))}
					</div>
				</div>

				<div className="space-y-[35px] w-full mx-auto px-[40px] mt-[60px] lg:mt-[100px] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center md:gap-[100px]">
					<div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
						<img
							className="w-full h-full object-cover"
							src={ExhibitionLayout}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					</div>

					<div className="md:w-[400px] min-[1180px]:flex-1 space-y-[20px] lg:space-y-[35px] lg:order-[-1]">
						<h2 className="subtitle-bold lg:subtitle-bold-web">
							活動資訊｜Event Info
						</h2>
						{/* ⚠️ 假文字，上線前請換成實際的放映時間、地點 */}
						<p className="bodyText lg:bodyText-bold-web">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Doloremque odit dicta eum tempore doloribus repudiandae quasi
							debitis inventore natus, repellat commodi minus cum saepe optio
							consequatur rem nobis ut quam.
						</p>
					</div>
				</div>

				<div className="max-w-[82.2vw] mx-auto">
					<hr className="border-t border-primary my-8 mb-[70px]" />
					<Title
						className="headline"
						title="注意事項｜Notice"
						layout="horizontal"
					/>
					<p className="bodyText lg:bodyText-web text-center mt-[var(--title-gap-text)]">
						活動當日請自備坐墊或野餐墊。如遇雨天，活動將改至室內或延期，將於社群公告。現場可攜帶輕食與飲料，並請自行帶走垃圾。
					</p>
				</div>
			</main>
		</section>
	);
}
